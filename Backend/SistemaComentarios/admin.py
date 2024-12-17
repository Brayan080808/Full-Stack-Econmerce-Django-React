from django.contrib import admin
from SistemaComentarios.models import Comentarios,Helpful
# Register your models here.

class InfoComentarios(admin.ModelAdmin):
    list_display=("id_comentario","producto","usuario","post","publicacion","rating")

class InfoHelpful(admin.ModelAdmin):
    list_display=("id_helpful","comentario","usuario")

admin.site.register(Comentarios,InfoComentarios)
admin.site.register(Helpful,InfoHelpful)
