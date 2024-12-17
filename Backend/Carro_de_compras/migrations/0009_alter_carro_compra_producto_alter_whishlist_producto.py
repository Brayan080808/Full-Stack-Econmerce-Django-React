# Generated by Django 4.2 on 2024-08-15 22:54

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Tienda', '0006_products_remove_historial_producto_and_more'),
        ('Carro_de_compras', '0008_alter_carro_compra_cantidad_del_producto'),
    ]

    operations = [
        migrations.AlterField(
            model_name='carro_compra',
            name='producto',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Tienda.products'),
        ),
        migrations.AlterField(
            model_name='whishlist',
            name='producto',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Tienda.products'),
        ),
    ]
