# Generated by Django 4.2 on 2024-01-15 16:28

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Tienda', '0002_historial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('Carro_de_compras', '0004_wishlist'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Wishlist',
            new_name='Whishlist',
        ),
    ]