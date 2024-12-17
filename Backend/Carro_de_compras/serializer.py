from rest_framework import serializers
from .models import Carro_compra,Whishlist

class Carro_compra_Serializer(serializers.ModelSerializer):
    name_producto = serializers.CharField(source='producto.name_producto', read_only=True)
    precio = serializers.IntegerField(source='producto.precio', read_only=True)
    precio_total = serializers.SerializerMethodField(read_only=True)
    imagen = serializers.URLField(source='producto.imagen',read_only=True)

    def get_precio_total(self, obj):
        return obj.calc_precio_total()
    
    def validate(self, attrs):
        # Validar que un usuario no tenga más de 5 productos distintos
        if self.instance is None:  # Nuevo registro
            count = Carro_compra.objects.filter(usuario=attrs['usuario']).count()
            if count >= 15:
              
                raise serializers.ValidationError({'producto': 'Cantidad maxima alcanzada'})
        return attrs

    def validate_cantidad_del_producto(self, value):
        # Validar que la cantidad del producto no sea mayor a 20 o menor a 1
        if value > 20 or value < 1:
            
            raise serializers.ValidationError('La cantidad de producto no es valida')
        return value

    class Meta:
        model = Carro_compra
        fields = '__all__'
        
      
class Whishlist_Serializer(serializers.ModelSerializer):
    name_producto = serializers.CharField(source='producto.name_producto', read_only=True)
    precio = serializers.IntegerField(source='producto.precio', read_only=True)
    imagen = serializers.URLField(source='producto.imagen',read_only=True)
    
    
    def create(self, validated_data):
        request = self.context.get('request')
        validated_data['usuario'] = request.user
        return super().create(validated_data)
    
    def validate_usuario(self, value):
        request = self.context.get('request')
        if value != request.user:
            raise serializers.ValidationError("No tienes permiso para modificar este comentario.")
        return value
    
    def validate(self, attrs):
        request = self.context.get('request')
        # Validar que un usuario no tenga más de 5 productos distintos
        if self.instance is None:  # Nuevo registro
            count = Whishlist.objects.filter(usuario=request.user).count()
            if count >= 5:
                raise serializers.ValidationError({'producto': 'Cantidad maxima alcanzada'})
            
        # Validar que el producto no este ya en la whishlist del usuario
            if Whishlist.objects.filter(usuario=request.user,producto=attrs['producto']).exists():
                raise serializers.ValidationError({'producto': 'Ya esta el producto'})
                 
        return attrs


    
    class Meta:
        model = Whishlist
        fields = ['name_producto','precio','producto','id_whishlist','imagen']
        
        