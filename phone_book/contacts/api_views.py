from django.db.models.query import QuerySet
from rest_framework.generics import ListAPIView, CreateAPIView, DestroyAPIView, RetrieveUpdateAPIView
from rest_framework.viewsets import ModelViewSet, ReadOnlyModelViewSet

from contacts.serializers import PersonSerializer
from contacts.models import Person

class PersonList(ListAPIView):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer

class PersonCreation(CreateAPIView):
    serializer_class = PersonSerializer
    
    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        return response

class PersonDestroy(DestroyAPIView):
    queryset = Person.objects.all()
    lookup_field = 'id'
    
    def delete(request, *args, **kwargs):
        response = super().delete(request, *args, **kwargs)
        return response

class PersonRetrieveUpdate(RetrieveUpdateAPIView):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer
    lookup_field = 'id'
