from django.urls import include, path
from rest_framework import routers
from rest_framework.documentation import include_docs_urls
from .views import Carro_Compra_View,Carro_Compra_Count_View,Whishlist_View

router = routers.DefaultRouter()
router.register(r"carro_compra", Carro_Compra_View, "carro_compra")

routerWhishlist = routers.DefaultRouter()

routerWhishlist.register(r"", Whishlist_View, "whishlist")


urlpatterns = [
    path("shop/", include(router.urls)),
    
    # path('shop/carro_compra/docs/', include_docs_urls(title='Carro Api')),
    path('carrito/count/', Carro_Compra_Count_View.as_view(), name='carrito-count'),
    path("whishlist/", include(routerWhishlist.urls))
    
]