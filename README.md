# phone_book_system - Back-end
This is a phone book system developed using Django. A RESTful API is constructed using Django's REST Framework. 

User can view existing contacts in the phone book and perform add, delete and update operations by interacting with the API.

# Mannual
### Install packages:
This project requires Django, and its REST framwork packages which can be installed using pip:
> $ pip install Django
>
> $ pip install djangorestframework

### Run application:
1. Go into project directory (same level as the manage.py file):
    > $ cd phone_book
1. Apply database migrations
    > $ python3 manage.py migrate
1. Start Django application server:
    > $ python3 manage.py runserver

### Interacting with API:
Django's REST Framework provides API interfaces that user can directly interact with, which is a convenient alternative to using <code>curl</code> methods.
- VIEW list of contacts in the current phone book:
    > Open browser and type in: http://127.0.0.1:8000/api/v1/persons/
- ADD new person to contact:
    > Open browser and type in: http://127.0.0.1:8000/api/v1/persons/new
- UPDATE an existing contact by matching to the 'id' field.
    > Open browser and type in: http://127.0.0.1:8000/api/v1/persons/\<int:id>/update
    >
    > For example, update person which has <code>id</code> = 1.
    > Open browser and type in: http://127.0.0.1:8000/api/v1/persons/1/update
- DELETE an existing contact by matching to the 'id' field.
    > Open browser and type in: http://127.0.0.1:8000/api/v1/persons/\<int:id>/delete
    >
    > For example, delete person which has <code>id</code> = 1.
    > Open browser and type in: http://127.0.0.1:8000/api/v1/persons/1/delete

# Testing:
### API tests
Test cases for APIs are located in the <code>/phone_book/contacts/tests.py</code> file. The unit tests are written using Django's REST framework's testing cases.
> $ cd phone_book
>
> $ python3 manage.py test

### Coverage test
Use <code>Coverage.py</code> to check code coverage of the project. 
[Documentation](https://coverage.readthedocs.io/en/6.2/)
1. Install tool:
    > $ pip install coverage
1. Unit tests for the API may also be run with coverage:
    > cd phone_book
    >
    > coverage run manage.py test
1. Generate table report:
    > $ coverage report -m
1. For a nicer presentation, use coverage html to get annotated HTML listings detailing missed lines:
    > $ coverage html
    >
    > This command generates a <code>htmlcov</code> folder. Then open <code>htmlcov/index.html</code> in a browser to see the results.

# UI - Front-end
The front end is built using the React Javascript library, which consumes the Django API to gain access to the phone book.

# Mannual
### Install packages:
This requires the following package: <code>npm</code>, <code>node</code>.

To install using Homebrew:
> $ brew install npm
>
> $ brew install node
Verify the packages have been install successfully:
> $ npm -v
>
> $ node -v

### Notes:
- <code>npx</code> is the package runner used by npm to execute packages in place of a global install.
- This front-end web starts off by using <code>create-react-app</code>, which is an excellent tool for beginners that allows you to create and run React project very quickly.
    > Run the following command to install the tool:
    >
    > $ npm i create-react-app