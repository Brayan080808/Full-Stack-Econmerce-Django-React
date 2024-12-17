from django.core.exceptions import PermissionDenied
from .models import Helpful,Comentarios as ComentarioModel
from .serializer import ComentariosSerializer,ComentariosMutationSerializer,HelpfulSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import GenericViewSet
from rest_framework.generics import DestroyAPIView, CreateAPIView, ListAPIView
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Sum, Count, Avg, F, FloatField
from django.db.models.functions import Cast, Round
        
class ComentariosMutation(DestroyAPIView,CreateAPIView,GenericViewSet):

    serializer_class = ComentariosMutationSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = LimitOffsetPagination
    
    def get_queryset(self):
        self.queryset = ComentarioModel.objects.filter(usuario=self.request.user)
        return self.queryset
    
    def perform_destroy(self,instance):
        if instance.usuario == self.request.user:
            instance.delete()
        else:
            raise PermissionDenied("No tienes permiso para eliminar este comentario.")
    

class Comentarios(ListAPIView,GenericViewSet):
    serializer_class = ComentariosSerializer
    pagination_class = LimitOffsetPagination
    
    
    def get_queryset(self):
        id_producto = self.kwargs['id_producto']
        
        return ComentarioModel.objects.filter(producto=id_producto)
    
    
    def list(self, request, *args, **kwargs):
        
        querysetFilter = self.filter_queryset(self.get_queryset())

        
        ratingAvg = querysetFilter.aggregate(
        rating=Round(Avg('rating'), 1)  # Redondear a 2 decimales
)
        
        
        queryset = querysetFilter.order_by("-publicacion")
        page = self.paginate_queryset(queryset)
        
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            response = self.get_paginated_response(serializer.data)
            response.data['ratingAvg'] = ratingAvg['rating']
            
            distribution_rating = (
                querysetFilter
                .values('rating')
                .annotate(
                porcentaje= Round(Cast(Count('rating') * 100.0 / response.data['count'], FloatField()),1)
            )
            ).order_by('-rating')
            
            response.data['distribution_rating'] = distribution_rating
            return response

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
        
        
        
        
class Helpful(CreateAPIView,DestroyAPIView,GenericViewSet):
    serializer_class = HelpfulSerializer
    permission_classes = [IsAuthenticated]
    queryset = Helpful.objects.all()
    

        


    
