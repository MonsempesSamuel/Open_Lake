# Generated by Django 3.2.7 on 2021-10-17 13:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('openlake_core', '0002_alter_data_latgps'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='data',
            name='latgps',
        ),
    ]
