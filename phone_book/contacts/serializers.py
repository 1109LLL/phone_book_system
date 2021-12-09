from rest_framework import serializers

from contacts.models import Person

class PersonSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Person
        fields = ('id', 'first_name','last_name', 'phone', 'email')

    # def to_representation(self, instance):
    #     row = super(PersonSerializer, self).to_representation(instance)
    #     return {row["id"]:row}