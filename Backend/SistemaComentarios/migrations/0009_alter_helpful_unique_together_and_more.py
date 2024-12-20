# Generated by Django 4.2 on 2024-08-25 22:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('SistemaComentarios', '0008_alter_comentarios_post_alter_helpful_unique_together'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='helpful',
            unique_together=set(),
        ),
        migrations.AddConstraint(
            model_name='helpful',
            constraint=models.UniqueConstraint(fields=('usuario', 'comentario'), name='unique_usuario_comentario'),
        ),
    ]
