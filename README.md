## phototify
#### Environment setup

Install pipenv
```
brew install pipenv
```
From the git project directory
Initialize a Python 3 virtual environment, run
````
pipenv --three
````
```
pipenv shell 
```
Install all dependencies for the project (from pipfile):
```
pipenv install

or 

pipenv run pip install --verbose --trusted-host=pypi.python.org --trusted-host=pypi.org --trusted-host=files.pythonhosted.org -r requirement.txt
```

setup S3 buckets environment viriable by
Modify bash_profile and add 
```
export AWS_ACCESS_KEY_ID="s3 account id" 
export AWS_SECRET_ACCESS_KEY="s3 account key" 
export AWS_STORAGE_BUCKET_NAME="s3 bucket name" 
```




#### Run the app

```
cd phototify
python manage.py makemigrations (not needed for running the app)
python manage.py migrate
```

Create admin account
```
python manage.py createsuperuser
```

```
python manage.py runserver

```


