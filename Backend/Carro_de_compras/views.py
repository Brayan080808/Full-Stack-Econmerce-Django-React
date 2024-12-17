from .models import Carro_compra,Whishlist
from .serializer import Carro_compra_Serializer,Whishlist_Serializer
from rest_framework import viewsets,generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from django.core.exceptions import ObjectDoesNotExist
from django.core.exceptions import PermissionDenied
from rest_framework import status


class Carro_Compra_Count_View(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        count = Carro_compra.objects.filter(usuario=request.user).count()
        return Response({'count': count},status=status.HTTP_200_OK)
    
    
class Carro_Compra_View(viewsets.ModelViewSet):
    serializer_class = Carro_compra_Serializer
    pagination_class = None
    permission_classes = [IsAuthenticated]
    

    def get_queryset(self):
        user=self.request.user
        queryset = Carro_compra.objects.filter(usuario=user).order_by("id_carro_compra")
        return queryset
    
    
    def create(self, request, *args, **kwargs):
        id_producto = int(request.data["producto"])
        cantidad_del_producto = int(request.data["cantidad_del_producto"])
        
        
        id_usuario = request.user.id 
        request.data["usuario"] = id_usuario 
        

        try: 
            query = Carro_compra.objects.filter(usuario=id_usuario)
            carro_element=query.get(producto=id_producto)
            carro_element.cantidad_del_producto += cantidad_del_producto
            data = {"cantidad_del_producto":carro_element.cantidad_del_producto}
            serializer = self.get_serializer(carro_element, data=data, partial=True)
            serializer.is_valid(raise_exception=True)  
            carro_element.save()         
            return Response(serializer.data)
          
        except ObjectDoesNotExist:
                        
            return super().create(request, *args, **kwargs)
        
    
class Whishlist_View(generics.ListCreateAPIView,generics.DestroyAPIView,viewsets.GenericViewSet):
    
    serializer_class = Whishlist_Serializer
    permission_classes = [IsAuthenticated]
    pagination_class = None
    

    def get_queryset(self):
        user=self.request.user
        queryset = Whishlist.objects.filter(usuario=user)
        return queryset
    
    def perform_destroy(self,instance):
        if instance.usuario == self.request.user:
            instance.delete()
        else:
            raise PermissionDenied("No tienes permiso para eliminar este comentario.")