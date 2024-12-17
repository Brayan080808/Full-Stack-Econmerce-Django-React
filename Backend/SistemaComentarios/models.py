from django.db import models
from Tienda.models import Products
from django.contrib.auth import get_user_model
from django.db.models import UniqueConstraint

User=get_user_model()

class Comentarios(models.Model):
    
    id_comentario=models.AutoField(primary_key=True)

    producto=models.ForeignKey(Products, on_delete=models.CASCADE,)
    usuario=models.ForeignKey(User, on_delete=models.CASCADE,)
    
    
    title=models.CharField(max_length=50,default='Un producto muy interesante')
    post=models.TextField(max_length=360, default='Hello I love this product')
    
    publicacion = models.DateTimeField(auto_now_add=True) 
    rating = models.DecimalField(max_digits=2, decimal_places=1, default=5)
    
    def get_date(self):
        return self.publicacion.date()  

    def __str__(self):
        return self.post
    
    
class Helpful(models.Model):
    id_helpful = models.AutoField(primary_key=True)

    usuario = models.ForeignKey(User, on_delete=models.CASCADE,)
    comentario = models.ForeignKey(Comentarios, on_delete=models.CASCADE,)
    
    class Meta:
        constraints = [
            UniqueConstraint(fields=['usuario', 'comentario'], name='unique_usuario_comentario_helpful'),
        ]
