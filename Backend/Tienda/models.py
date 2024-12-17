from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.postgres.indexes import GinIndex
from django.contrib.postgres.search import SearchVectorField, SearchVector, TrigramSimilarity
# Create your models here.



User=get_user_model()

class Categoria_producto(models.Model):
    id_categoria_producto=models.AutoField(primary_key=True)
    name_categoria=models.CharField(max_length=30)

    def __str__(self):
        return f'{self.name_categoria}'

class Proovedores(models.Model):
    id_proveedores=models.AutoField(primary_key=True)
    name_proovedor=models.CharField(max_length=30)
    ubicacion=models.CharField(max_length=30)

    def __str__(self):
        return f'{self.name_proovedor}'



class Products(models.Model):
    id_producto=models.AutoField(primary_key=True)

    
    categoria_producto=models.ForeignKey(Categoria_producto,on_delete=models.CASCADE)
    proovedor=models.ForeignKey(Proovedores,on_delete=models.CASCADE)

    name_producto=models.CharField(max_length=30)
    descripcion=models.TextField(max_length=255, default='Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi, beatae. Nobis adipisci sint assumenda? Culpa beatae, fugiat et, eos, blanditiis eligendi sint odit pariatur soluta dolor delectus nam iure iusto.')
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    rating = models.DecimalField(max_digits=2, decimal_places=1, default=0)
    cantidad_disponible=models.IntegerField()
    
    imagen = models.URLField(null=True,blank=True)
    search_vector = SearchVectorField(null=True)

    class Meta:
        indexes = [
            GinIndex(fields=['search_vector']),
            GinIndex(name='idx_products_trigram', opclasses=['gin_trgm_ops'], fields=['name_producto']),
        ]

    def save(self, *args, **kwargs):
        # Actualiza el campo search_vector antes de guardar
        super().save(*args, **kwargs)
        self.search_vector = (
            SearchVector('name_producto', weight='A') +
            SearchVector('descripcion', weight='B')
        )
        super().save(update_fields=['search_vector'])
        
    def __str__(self):
        return self.name_producto


    



