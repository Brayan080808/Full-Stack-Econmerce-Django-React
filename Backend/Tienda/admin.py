from django.contrib import admin
from Tienda.models import Categoria_producto,Proovedores,Products,Products
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth import get_user_model
# Register your models here.



    
class InfoProducts(admin.ModelAdmin):
    list_display=("id_producto","categoria_producto","proovedor","name_producto","descripcion","precio","cantidad_disponible","rating")
    search_fields=("name_producto",)
    list_filter=('precio',"name_producto")
    

class InfoCategoria_producto(admin.ModelAdmin):
    list_display=("id_categoria_producto","name_categoria")


class InfoProovedores(admin.ModelAdmin):
    list_display=("id_proveedores","name_proovedor","ubicacion")



# admin.site.register(Products,InfoProducts)
admin.site.register(Products,InfoProducts)
admin.site.register(Categoria_producto,InfoCategoria_producto)
admin.site.register(Proovedores,InfoProovedores)



