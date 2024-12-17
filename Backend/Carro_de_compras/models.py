from django.db import models
from django.db.models import UniqueConstraint
from django.contrib.auth import get_user_model
from Tienda.models import Products

User = get_user_model()
# Create your models here.

class Carro_compra(models.Model):
    id_carro_compra=models.AutoField(primary_key=True,)

    usuario=models.ForeignKey(User,on_delete=models.CASCADE)
    producto=models.ForeignKey(Products, on_delete=models.CASCADE)

    cantidad_del_producto = models.PositiveIntegerField(default=1)
    
    class Meta:
        constraints = [
            UniqueConstraint(fields=['usuario', 'producto'], name='unique_usuario_producto_carro_compra'),
        ]
        
    def calc_precio_total(self):
        return self.cantidad_del_producto * self.producto.precio

    def __str__(self):
        return f'{self.producto}x{self.usuario}'
    
    
class Whishlist(models.Model):
    id_whishlist=models.AutoField(primary_key=True,)
    
    usuario=models.ForeignKey(User,on_delete=models.CASCADE)
    producto=models.ForeignKey(Products, on_delete=models.CASCADE)
    
    class Meta:
        constraints = [
            UniqueConstraint(fields=['usuario', 'producto'], name='unique_usuario_producto_whishlist'),
        ]

    def __str__(self):
        return f'{self.producto}x{self.usuario}'
    
    








