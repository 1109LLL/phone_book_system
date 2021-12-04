from rest_framework.exceptions import ValidationError
from rest_framework.generics import ListAPIView, CreateAPIView

from contacts.serializers import PersonSerializer
from contacts.models import Person

class PersonList(ListAPIView):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer

class PersonCreation(CreateAPIView):
    serializer_class = PersonSerializer
    
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)