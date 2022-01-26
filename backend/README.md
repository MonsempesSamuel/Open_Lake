# Django REST framework 


## Run django in development environnement

Install PostgreSQL and create 'openlake' user:
```bash
create user openlake with encrypted password 'openlake';
alter user openlake CREATEDB ; # Django models tests need createdb permission
create database openlake;
alter database openlake owner to openlake ;
```

Create python3 virtual environnement and install requirements:
```bash
python3.8 -m venv venv
source ./venv/bin/activate
pip install -r requirements.txt
```

Run Django server:

*NB: This command is useful for development purpose. It automatically reload after file edit and generate prettified traceback. For production purpose, please refer to {TODO} [deployment guide]()*

```bash
python3.8 manage.py runserver 
```

Optional: Create a super user to access admin interface:

```bash
python3.8 manage.py createsuperuser --username openlake_admin
```



