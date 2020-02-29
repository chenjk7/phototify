## phototify
#### Environment setup
Install pipenv
```
brew install pipenv
```
Initialize a Python 3 virtual environment, run
````
pipenv --three.
````

Install all dependencies for the project (from pipfile):
```
pipenv install
```

```
pipenv shell 
```


#### Run the app

```
cd phototify
python manage.py makemigrations (may not needed)
python manage.py migrate
```

Create admin account
```
python manage.py createsuperuser
```

```
python manage.py runserver

```

