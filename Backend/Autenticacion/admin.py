from django.contrib import admin
from django.contrib.auth import get_user_model
# Register your models here.

Usuarios=get_user_model()

class InfoUsuarios(admin.ModelAdmin):
    list_display=('id',"username",'first_name','last_name','is_staff','is_active','email_verified',"email",'password','date_joined',"imagen")
     
    

admin.site.register(Usuarios,InfoUsuarios)