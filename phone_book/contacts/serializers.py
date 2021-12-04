from rest_framework import serializers

from contacts.models import Person

class PersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = ('id', 'first_name','last_name', 'phone', 'email')