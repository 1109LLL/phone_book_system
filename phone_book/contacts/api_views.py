from rest_framework.generics import ListAPIView

from contacts.serializers import PersonSerializer
from contacts.models import Person

class PersonList(ListAPIView):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer