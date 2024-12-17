
from .models import Products

from django.contrib.postgres.search import TrigramSimilarity,SearchQuery, SearchRank, SearchVector, SearchHeadline
import django_filters
from django.contrib.postgres.search import SearchQuery, SearchRank,TrigramSimilarity
from django.db.models import F,Q


class ProductFilter(django_filters.FilterSet):
    advancedSearch = django_filters.CharFilter(method='search_filter')
    categoria_producto = django_filters.NumberFilter(lookup_expr='exact')
    precio__gte = django_filters.NumberFilter(field_name='precio', lookup_expr='gte')
    precio__lte = django_filters.NumberFilter(field_name='precio', lookup_expr='lte')
    

    
    def search_filter(self, queryset, name, value):
        query = SearchQuery(value, search_type='plain')
    
        # Anota el queryset con el rank y la similitud
        queryset = queryset.annotate(
            rank=SearchRank(F('search_vector'), query),
            similarity=TrigramSimilarity('name_producto', value)
        )
    
        # Filtra por el search_vector o por similitud
        queryset = queryset.filter(
            Q(search_vector=query) | Q(similarity__gt=0)
        ).order_by('-rank', '-similarity')

        
        return queryset


    class Meta:
        model = Products
        fields = ['categoria_producto', 'precio__gte', 'precio__lte','advancedSearch']
        