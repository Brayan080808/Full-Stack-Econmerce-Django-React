# Generated by Django 4.2 on 2024-08-27 23:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Autenticacion', '0008_alter_usuarios_email'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usuarios',
            name='imagen',
            field=models.URLField(default='https://i.pinimg.com/564x/a6/00/47/a60047d44b1777aa444af361bcf4efba.jpg'),
        ),
    ]
