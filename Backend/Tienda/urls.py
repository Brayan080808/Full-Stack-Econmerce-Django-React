from django.urls import path
from Tienda import views


from django.urls import include, path
from rest_framework import routers
from rest_framework.documentation import include_docs_urls
from .views import Shop,ProductsIndex

router = routers.DefaultRouter()
router.register(r"shop", Shop, "shop")
router.register(r"index",ProductsIndex,"index")

urlpatterns = [
    path("api/", include(router.urls)),
    path('docs/shop/', include_docs_urls(title='Tasks API')),
   
]