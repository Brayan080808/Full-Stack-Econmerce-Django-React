from django.urls import include, path
from rest_framework import routers
from rest_framework.documentation import include_docs_urls
from .views import Comentarios,ComentariosMutation,Helpful

router = routers.DefaultRouter()
router.register(r'',Comentarios, "comentarios")

routerMutation = routers.DefaultRouter()
routerMutation.register(r'actions',ComentariosMutation, "comentarios")

routerHelpful = routers.DefaultRouter()
routerHelpful.register(r'',Helpful,"help")

urlpatterns = [
    path("comentarios/<int:id_producto>/", include(router.urls)),
    path("comentarios/",include(routerMutation.urls)),
    path("helpful/",include(routerHelpful.urls))
]