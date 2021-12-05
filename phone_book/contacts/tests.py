from django.test import TestCase

from rest_framework.test import APITestCase
from contacts.models import Person

class PersonCreateTestCase(APITestCase):
    def test_create_person(self):
        initial_persons_counts = Person.objects.count()
        person_attrs = {
            'first_name': 'person_test',
            'last_name': 'person_test',
            'phone': 832495347,
            'email': 'test_email@gmail.com'
        }
        response = self.client.post('/api/v1/persons/new', person_attrs)

        # print out invalid fieldsif request fails
        if response.status_code != 201:
            print(response.data)
        
        # check test person has indeed been added successfully
        self.assertEqual(Person.objects.count(), initial_persons_counts + 1)
        # check attributes of test person are correct
        for attr, test_value in person_attrs.items():
            self.assertEqual(response.data[attr], test_value)

class PersonDeleteTestCase(APITestCase):
    def test_delete_person(self):
        # first add a new person to database
        person_attrs = {
            'first_name': 'delete_person_test',
            'last_name': 'delete_person_test',
            'phone': 111222333,
            'email': 'delete_test_email@gmail.com'
        }
        self.client.post('/api/v1/persons/new', person_attrs)

        # testing delete
        initial_persons_counts = Person.objects.count()
        id_to_delete = Person.objects.first().id
        self.client.delete('/api/v1/persons/{}/delete'.format(id_to_delete))
        
        self.assertEqual(Person.objects.count(), initial_persons_counts - 1)
        self.assertRaises(Person.DoesNotExist, Person.objects.get, id=id_to_delete)

class PersonListTestCase(APITestCase):
    def test_list_persons(self):
        initial_persons_counts = Person.objects.count()
        # add a new person to database
        person_attrs = {
            'first_name': 'list_person_test',
            'last_name': 'list_person_test',
            'phone': 123123123,
            'email': 'list_test_email@gmail.com'
        }
        self.client.post('/api/v1/persons/new', person_attrs)

        response = self.client.get('/api/v1/persons/')
        self.assertEqual(len(response.data), initial_persons_counts + 1)

class PersonUpdateTestCase(APITestCase):
    def test_update_person(self):
        # add a new person to database
        person_attrs = {
            'first_name': 'update_person_test',
            'last_name': 'update_person_test',
            'phone': 123123123,
            'email': 'update_test_email@gmail.com'
        }
        self.client.post('/api/v1/persons/new', person_attrs)

        person = Person.objects.first()
        updated_attrs = {
            'first_name': 'updated_first_name',
            'last_name': 'updated_last_name',
            'phone': 88888888,
            'email': 'new_email@gmail.com'
        }
        response = self.client.patch('/api/v1/persons/{}/update'.format(person.id), 
                                    updated_attrs, format='json')
        updated_person = Person.objects.get(id=person.id)

        self.assertEqual(updated_person.first_name, updated_attrs['first_name'])
        self.assertEqual(updated_person.last_name, updated_attrs['last_name'])
        self.assertEqual(updated_person.phone, updated_attrs['phone'])
        self.assertEqual(updated_person.email, updated_attrs['email'])
