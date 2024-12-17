from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.throttling import AnonRateThrottle
from django.core.exceptions import ObjectDoesNotExist
from django.core.cache import cache
from django.core.mail import send_mail
from django.db.models import Q
from django.contrib.auth import get_user_model
from google.auth.transport import requests
from smtplib import SMTPException

import random
from google.oauth2 import id_token

from .serializer import UserDataSerializer,RegisterSerializer,ContactSerializer,LoginSerializer

User = get_user_model()


class CustomAnonThrottle(AnonRateThrottle):
    # rate = '1/5min'  # Permite 1 solicitud cada 5 minutos
    rate = "2/m"
    
class Contact_Us(APIView):
    def post(self, request):
        serializer = ContactSerializer(data=request.data)
        if serializer.is_valid():
            name = serializer.validated_data['name']
            email = serializer.validated_data['email']
            post = serializer.validated_data['post']        

            try:
                EmailService.send_contact_email(name, email, post)
                
                return Response({'message': 'Email enviado con éxito'}, status=status.HTTP_200_OK)
            except SMTPException:
                return Response({'message': 'Error al enviar el mensaje.'}, status=status.HTTP_503_SERVICE_UNAVAILABLE)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class UserData(RetrieveUpdateAPIView):
    serializer_class = UserDataSerializer
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        return self.request.user
    
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)    
    
class EmailService():
    @staticmethod
    def send_verification_email(user, verification_code):
        send_mail(
            'Verifica tu correo',
            f'Tu codigo de verificacion: {verification_code}',
            'bryanayala080808@gmail.com',
            [user.email],
            fail_silently=False,
        )

    @staticmethod
    def send_contact_email(name, email, post):
        send_mail(
            name,
            f"{email}\n{post}",
            email,
            ['bryanayala080808@gmail.com'],
            fail_silently=False,
        )

class VerificationManager():
    @staticmethod
    def generate_verification_code(user_id):
        code = random.randint(100000, 999999)
        cache.set(f'verification_code_{user_id}', code, timeout=300)
        return code

    @staticmethod
    def verify_code(user_id, code):
        cache_code = cache.get(f'verification_code_{user_id}')
        return cache_code == code
    
class Resent_Email(APIView):
    permission_classes = [AllowAny]  # Permite acceso a cualquier usuario
    throttle_classes = [CustomAnonThrottle]  # Aplica la limitación solo a esta vista
    
    def get(self,request,id):
        id = int(id)
        user = User.objects.get(id=id)
        verification_code = VerificationManager.generate_verification_code(id)
        cache.set(f'verification_code_{id}', verification_code, timeout=300)
        
        EmailService.send_verification_email(user, verification_code)
        return Response({'message':'Email enviado con exito '},status=status.HTTP_200_OK)
      
class Login(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        
        if serializer.is_valid():
            user = serializer.validated_data['user']
        
            if not user.email_verified:
                verification_code = VerificationManager.generate_verification_code(user.id)
                EmailService.send_verification_email(user, verification_code)
                return Response({'id':user.id},status=status.HTTP_412_PRECONDITION_FAILED)
        
        
            refresh = RefreshToken.for_user(user)        
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }, status=status.HTTP_200_OK)
            
        return Response(status=status.HTTP_400_BAD_REQUEST)

class Register(APIView):

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        
        if serializer.is_valid():
            user = serializer.save()   
            code = VerificationManager.generate_verification_code(user.id)
            EmailService.send_verification_email(user,code)
        
            return Response({'id':user.id}, status=status.HTTP_201_CREATED)
        
        else:

            if serializer.errors.get('email'):
                return Response({'message':"Este email ya esta en uso"}, status=status.HTTP_400_BAD_REQUEST)
            
            if serializer.errors.get('username'):
                return Response({'message':"Este username ya esta en uso"}, status=status.HTTP_400_BAD_REQUEST)
            
            if serializer.errors.get('password'):
                return Response({'message':serializer.errors.get('password', [])[0]}, status=status.HTTP_400_BAD_REQUEST)
            
            return Response(status=status.HTTP_400_BAD_REQUEST)
                          
    def get(self, request):
        code = int(request.query_params.get('code'))
        id = int(request.query_params.get('id')) 
        
        try:
            user = User.objects.get(id=id)
            
            
            if not VerificationManager.verify_code(id, code):
                return Response({'error': 'Codigo de verificacion invalido o expirado.'}, status=status.HTTP_400_BAD_REQUEST)
                
            user.email_verified = True
            user.save()
            cache.delete(f'verification_code_{id}')
            refresh_token = RefreshToken.for_user(user)
            
            return Response({ "refresh_token": str(refresh_token), "access_token":str(refresh_token.access_token)}, status=status.HTTP_200_OK)
            
            
        except ObjectDoesNotExist:
            return Response({'error': 'Usuario no encontrado.'}, status=status.HTTP_404_NOT_FOUND)
              
class Update_Password(APIView):  

    def get(self,request):
        
        info = request.query_params.get('info')
        
        try:
            user = User.objects.get(Q(email=info) | Q(username=info))
            
            code = VerificationManager.generate_verification_code(user.id)
            EmailService.send_verification_email(user,code)
          
            return Response({'id':user.id}, status=status.HTTP_200_OK)
         
        except ObjectDoesNotExist:
            return Response({'message': 'Usuario no encontrado.'}, status=status.HTTP_404_NOT_FOUND)
        
    def patch(self,request):
        code = int(request.data['code'])
        id = int(request.data['id']) 
        password = request.data['password']
     
        try:
            user = User.objects.get(id=id)
            if not VerificationManager.verify_code(id,code):
                return Response({'message': 'Codigo de verificacion invalido o expirado.'}, status=status.HTTP_401_UNAUTHORIZED)
                
                
            user.set_password(password)
            user.save()
            cache.delete(f'verification_code_{id}')     
            refresh_token = RefreshToken.for_user(user)
            
            return Response({ "refresh_token": str(refresh_token), "access_token":str(refresh_token.access_token)}, status=status.HTTP_200_OK)
            
            
        except ObjectDoesNotExist:
            return Response({'message': 'Usuario no encontrado.'}, status=status.HTTP_404_NOT_FOUND)
            
class GoogleLoginView(APIView):
    def post(self, request):
        token = request.data.get('token', None)

        if token is None:
            return Response({'error': 'Invalid request'}, status=status.HTTP_400_BAD_REQUEST)

        try:
        
            # Verificar el token de Google
            info = id_token.verify_oauth2_token(token, requests.Request(), '945649629687-5vriks54rlc0rij1us6uiapggld7cnok.apps.googleusercontent.com')
        
            if info['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
                raise ValueError('Wrong issuer.')

            email = info['email']
            
            
            user = User.objects.get(email=email)
            user.email_verified = True  
            user.save()
            refresh_token = RefreshToken.for_user(user)
            access_token = refresh_token.access_token
                
            return Response({'access': str(access_token),'refresh': str(refresh_token)}, status=status.HTTP_200_OK)
            
            
                
        except ValueError as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
        except ObjectDoesNotExist:
            return Response({'message':'Usuario does not exist'},status=status.HTTP_400_BAD_REQUEST)
