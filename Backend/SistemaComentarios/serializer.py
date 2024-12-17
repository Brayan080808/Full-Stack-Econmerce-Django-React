from rest_framework import serializers
from .models import Comentarios,Helpful
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.core.exceptions import ObjectDoesNotExist



class ComentariosMutationSerializer(serializers.ModelSerializer):
    
    def create(self, validated_data):
        request = self.context.get('request')
        validated_data['usuario'] = request.user
        return super().create(validated_data)
    
    def validate_usuario(self, value):
        request = self.context.get('request')
        if value != request.user:
            raise serializers.ValidationError("No tienes permiso para modificar este comentario.")
        return value
    
    def validate_post(self,value):
        if len(value) > 360:
            raise serializers.ValidationError("Comentario demasiado largo")
        return value
    
    def validate_title(self,value):
        if len(value) > 60:
            raise serializers.ValidationError("Titulo demasiado largo")
        return value
    
    
    class Meta:
        model = Comentarios
        fields = ['post','producto','rating','title']
        
        
        
class ComentariosSerializer(serializers.ModelSerializer):
    
    username = serializers.CharField(source='usuario.username', read_only=True)
    imagen = serializers.URLField(source='usuario.imagen', read_only=True)
    date = serializers.SerializerMethodField(read_only=True) 
    helpful_count = serializers.SerializerMethodField(read_only=True)
    helpful_to_user = serializers.SerializerMethodField(read_only = True)
    

    def get_helpful_count(self,obj):
        return Helpful.objects.filter(comentario=obj.id_comentario).count()
        

    def get_helpful_to_user(self,obj):
        try:
            auth = JWTAuthentication()
            request = self.context.get('request')
            user,token_type = auth.authenticate(request)    
            instance = Helpful.objects.filter(usuario=request.user,comentario=obj.id_comentario)[:1].values('id_helpful')
            return instance[0]['id_helpful']
        
        except:
            return None

    def get_date(self, obj):
        return obj.get_date()
    
    class Meta:
        model = Comentarios
        fields = ['id_comentario','post','username','imagen','date','rating','title','helpful_count','helpful_to_user']
        
        
        
class HelpfulSerializer(serializers.ModelSerializer):
    usuario = serializers.CharField(read_only=True)
    
    
    def create(self,validated_data):
        request = self.context.get('request')
        validated_data['usuario'] = request.user
        return super().create(validated_data)
    
    class Meta:
        model = Helpful
        fields = ['id_helpful','comentario','usuario']

    