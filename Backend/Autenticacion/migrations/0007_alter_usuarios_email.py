# Generated by Django 4.2 on 2024-08-10 23:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Autenticacion', '0006_rename_verify_email_usuarios_email_verified'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usuarios',
            name='email',
            field=models.EmailField(blank=True, max_length=254, verbose_name='email address'),
        ),
    ]
