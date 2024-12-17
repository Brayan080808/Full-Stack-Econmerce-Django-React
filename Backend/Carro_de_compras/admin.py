from django.contrib import admin

# Register your models here.

from Carro_de_compras.models import Carro_compra,Whishlist


class InfoCarro_compra(admin.ModelAdmin):
    list_display=("id_carro_compra","usuario","producto","cantidad_del_producto")

class InfoWhishlist(admin.ModelAdmin):
    list_display=('id_whishlist','usuario','producto')


admin.site.register(Carro_compra,InfoCarro_compra)
admin.site.register(Whishlist,InfoWhishlist)


