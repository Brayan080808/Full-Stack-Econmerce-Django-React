from rest_framework import serializers
from .models import Products
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken
from Carro_de_compras.models import Whishlist
from django.core.exceptions import ObjectDoesNotExist

class ProductSerializer(serializers.ModelSerializer):
    id_whishlist = serializers.SerializerMethodField(read_only=True,allow_null=True)
   
    
    def get_id_whishlist(self, obj):
        try:
            auth = JWTAuthentication()
            request = self.context.get('request')
            user,token_type = auth.authenticate(request)  
            instance = Whishlist.objects.get(usuario=request.user,producto=obj.id_producto)
            
            return instance.id_whishlist
        
        except ObjectDoesNotExist:
            return None
        
        except:
            return None
    
    class Meta:
        model = Products
        fields = ('id_whishlist','id_producto','name_producto','descripcion','precio','rating','imagen')


