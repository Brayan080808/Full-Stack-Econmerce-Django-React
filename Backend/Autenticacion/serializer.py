from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate
from django.core.exceptions import ObjectDoesNotExist
from django.db.models import Q
import re
User = get_user_model()


class ContactSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=50,trim_whitespace=True,required=True)
    email = serializers.EmailField(required=True)
    post = serializers.CharField(max_length=300,trim_whitespace=True,required=True)
    
class RegisterSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=30, trim_whitespace=True, required=True)
    email = serializers.EmailField(required=True, trim_whitespace=True)
    password = serializers.CharField(
        min_length=8,
        max_length=50,
        required=True,
        trim_whitespace=True,
        write_only=True,
        error_messages={
            'required': 'La contraseña es obligatoria',
            'min_length': 'La contraseña debe tener al menos 8 caracteres',
            'max_length': 'La contraseña debe tener como máximo 50 caracteres'
        }
    )
    
    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("El nombre de usuario ya esta en uso.")
        return value

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("El email ya esta en uso.")
        return value

    def validate_password(self, value):
        # Verificaciones de la contraseña
        if not any(char.isdigit() for char in value):
            raise serializers.ValidationError("La contrasena debe contener al menos un numero.")
        if not any(char.isupper() for char in value):
            raise serializers.ValidationError("La contrasena debe contener al menos una letra mayuscula.")
        if not any(char.islower() for char in value):
            raise serializers.ValidationError("La contrasena debe contener al menos una letra minuscula.")
        if not re.search(r'[!@#$%^&*(),.?":{}|<>]', value):
            raise serializers.ValidationError("La contrasena debe contener al menos un caracter especial como !@#$%^&*().")
        return value

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)  
        user.save()
        return user
    
    class Meta:
        model = User
        fields = ['username', 'password', 'email']


class UserDataSerializer(serializers.ModelSerializer):  
    class Meta:
        model = User
        fields = ['id','username','email']
        

class LoginSerializer(serializers.Serializer):
    info = serializers.CharField(required=True)
    password = serializers.CharField(required=True, write_only=True)

    def validate(self, attrs):
        try:
            user = User.objects.get(Q(username=attrs['info']) | Q(email = attrs['info']))
            
            if not user.check_password(attrs['password']):
                raise ObjectDoesNotExist
            
            attrs['user'] = user
            return attrs
            
            
        except ObjectDoesNotExist:
            raise serializers.ValidationError('Credenciales incorrectas.')
            
        
      



