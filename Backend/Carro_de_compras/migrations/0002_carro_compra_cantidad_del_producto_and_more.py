# Generated by Django 4.2 on 2023-09-01 01:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Carro_de_compras', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='carro_compra',
            name='cantidad_del_producto',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='carro_compra',
            name='precio_total',
            field=models.IntegerField(default=0),
        ),
    ]
