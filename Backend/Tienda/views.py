from rest_framework import viewsets,generics
from .serializer import ProductSerializer
from rest_framework.pagination import LimitOffsetPagination
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from .filters import ProductFilter
from Tienda.models import Products


class ProductsIndex(generics.ListAPIView, viewsets.GenericViewSet):
    queryset = Products.objects.all()[:8]
    serializer_class = ProductSerializer
    pagination_class = None


class Shop(viewsets.ReadOnlyModelViewSet):
    queryset = Products.objects.all()
    serializer_class = ProductSerializer
    pagination_class = LimitOffsetPagination
    filter_backends = [DjangoFilterBackend,filters.OrderingFilter,]
    filterset_class = ProductFilter
    ordering_fields = ['precio']
   
   

# imgs=['https://t4.ftcdn.net/jpg/07/28/08/63/360_F_728086378_00IvjCok2GXYK59sUXKR1d0MqS0Lf6rX.jpg', 'https://t4.ftcdn.net/jpg/00/53/14/41/360_F_53144147_Zx2dgnSeefxIjOQ5cjD4PBdZF4m8M7sm.jpg', 'https://t3.ftcdn.net/jpg/07/87/86/48/360_F_787864833_YWOHUdNX9tIMZ6kONr7P4XrQSTJ6qC2V.jpg', 'https://t3.ftcdn.net/jpg/01/89/79/16/360_F_189791663_HfB3CYN2oi7E2uKG1cY5HRRMFfiVJ3cR.jpg', 'https://t4.ftcdn.net/jpg/03/20/39/81/360_F_320398182_1X1ebszxgKyeS6j291ywWYIw1dfRLETC.jpg', 'https://t3.ftcdn.net/jpg/02/17/92/56/360_F_217925639_0sJqNCRUDHasxPZxFMFCMvMhC5lgPmSG.jpg', 'https://t4.ftcdn.net/jpg/02/95/81/79/360_F_295817910_1Suf7vho9Z55q6PxjY27NRNZj0pdh6jZ.jpg', 'https://t3.ftcdn.net/jpg/02/63/71/90/360_F_263719015_spfvo8bL0nvauJmE7Ldj4z3cvtKFj2hS.jpg', 'https://t4.ftcdn.net/jpg/02/69/24/41/360_F_269244118_lm8dLQecoBemTtEbjWEzfIaHjN5GFIVq.jpg', 'https://t4.ftcdn.net/jpg/01/25/31/19/360_F_125311972_pKSvvUp8odP1B1rhQ3KCTaL1ky1vaM0G.jpg', 'https://t4.ftcdn.net/jpg/01/13/70/87/360_F_113708770_7mMhmc7RxXk7wAd7jdymyIQ8ojbRz7ex.jpg', 'https://t3.ftcdn.net/jpg/00/68/11/04/360_F_68110419_lGHCvMJvck8LqnSEcrb1wCBDLUdXVDC7.jpg', 'https://t4.ftcdn.net/jpg/08/01/37/45/360_F_801374534_MNYbPiqfiFYyFLQmxISn1jN6m7ROi09E.jpg', 'https://t3.ftcdn.net/jpg/01/43/78/38/360_F_143783868_yqCEhvKfZPtwVdIFB4sJ7rJBRw8tnq3c.jpg', 'https://t4.ftcdn.net/jpg/01/21/64/07/360_F_121640794_IVdmZnDe7bxdKOAFRUGDWb0kA84bfpho.jpg', 'https://t3.ftcdn.net/jpg/02/17/21/68/360_F_217216842_PZlZQ9diA2ot0wNrjP0yOOVdh5lu9a0P.jpg', 'https://t3.ftcdn.net/jpg/08/06/59/10/360_F_806591096_1aiFy3AUIB32TB5V6dLSkFTSWJhoVoqd.jpg', 'https://t3.ftcdn.net/jpg/00/96/95/70/360_F_96957081_unUc73Y46h0NLiRYB7mphAS0dtA1H8B1.jpg', 'https://t3.ftcdn.net/jpg/02/94/32/94/360_F_294329457_fPWcPTcj89vfEowMwztkjkBfxKVrmFFI.jpg', 'https://t4.ftcdn.net/jpg/07/37/34/93/360_F_737349364_7RfA1mryEdtpghHdtzC4owj6h1HUKgdO.jpg', 'https://t3.ftcdn.net/jpg/02/94/71/06/360_F_294710630_eskT9hpN8TvRv0r4uzTFzwa3S8JNov3I.jpg', 'https://t3.ftcdn.net/jpg/01/45/75/64/360_F_145756412_Zbt9XthLRN9aleaNjwns1EBSEuEX5k5U.jpg', 'https://t3.ftcdn.net/jpg/07/29/04/04/360_F_729040473_vshQlLGyiktrLgimgGE9nS6eW3IP5uqd.jpg', 'https://t4.ftcdn.net/jpg/01/91/26/45/360_F_191264566_TBWQBXS63caRi0O04HZmwwLXqzwbc3uw.jpg', 'https://t4.ftcdn.net/jpg/02/48/48/89/360_F_248488928_kv4oSjqcm8hOT5sYSiLlLyChVx1uGgor.jpg']

# queryset = Products.objects.all()
# x = 0
# for i in queryset:
      
#     i.imagen = imgs[x]
#     print(imgs[x])
#     i.save()
#     x+=1
#     if x == len(imgs):
#         x = 0 



        
# productos_data=[
#     ("Cereza", "Las cerezas son pequeñas frutas rojas que ofrecen un sabor dulce o ácido, según la variedad. Ricas en antioxidantes, son ideales para combatir la inflamación y mejorar la salud cardiovascular. Puedes disfrutarlas frescas, en mermeladas o como ingrediente en postres irresistibles."),
    
#     ("Grosella", "La grosella es una fruta pequeña y ácida, llena de vitamina C y antioxidantes. Su sabor único la convierte en un ingrediente perfecto para jaleas y salsas. Además, su alto contenido en fibra ayuda a la digestión, convirtiéndola en una opción saludable para tu dieta."),
    
#     ("Nuez", "Las nueces son frutos secos altamente nutritivos, ricos en grasas saludables, proteínas y antioxidantes. Su consumo regular puede mejorar la salud del corazón y contribuir al bienestar cognitivo. Perfectas para snacks o como ingrediente en ensaladas y postres, son un superalimento que no debe faltar en tu cocina."),
    
#     ("Castaña", "Las castañas son frutos secos que destacan por su sabor dulce y textura suave. Ricas en carbohidratos complejos, son una excelente fuente de energía. Puedes disfrutar de las castañas asadas como un delicioso snack o incorporarlas en platos festivos para añadir un toque gourmet."),
    
#     ("Pera", "La pera es una fruta jugosa y dulce, ideal para comer fresca o en postres. Su textura suave y su sabor delicado la hacen perfecta para ensaladas o tartas. Además, las peras son ricas en fibra, lo que las convierte en una opción ideal para una dieta equilibrada."),
    
#     ("Kiwi", "El kiwi es una fruta exótica, cargada de vitamina C y antioxidantes. Su sabor agridulce y su textura suave lo convierten en un ingrediente versátil para ensaladas, batidos y postres. Además, su alto contenido en fibra ayuda a mejorar la digestión."),
    
#     ("Papaya", "La papaya es una fruta tropical, rica en papaína, que ayuda a la digestión y al bienestar intestinal. Su sabor dulce y su textura jugosa la hacen perfecta para smoothies y ensaladas. Además, es rica en vitaminas A y C, lo que la convierte en un aliado para la salud de la piel."),
    
#     ("Melón", "El melón es una fruta refrescante y dulce, ideal para disfrutar en días calurosos. Su alto contenido de agua lo hace perfecto para mantenerte hidratado. Además, es bajo en calorías y rico en vitaminas, lo que lo convierte en un snack saludable y delicioso durante el verano."),
    
#     ("Fresa", "La fresa es una pequeña joya roja, llena de sabor y nutrientes. Rica en antioxidantes, mejora la salud del corazón y potencia el sistema inmunológico. Puedes disfrutar de las fresas frescas, en batidos, o como parte de un delicioso postre. ¡Su sabor dulce te conquistará!"),
    
#     ("Durazno", "El durazno es una fruta suave y dulce, perfecta para comer fresca o en deliciosos postres. Su jugo y aroma son irresistibles, y su contenido de vitaminas A y C lo convierte en una opción nutritiva. Ideal para disfrutar en ensaladas o como complemento en tartas."),
    
#     ("Mango", "El mango, conocido como el 'rey de las frutas', es dulce y jugoso. Rico en vitaminas A y C, su sabor tropical lo hace perfecto para smoothies, salsas y postres. Además, el mango contiene antioxidantes que ayudan a mejorar la salud general del cuerpo."),
    
#     ("Limón", "El limón es una fruta cítrica, conocida por su acidez y frescura. Es un ingrediente clave en la cocina, ideal para aderezos, marinados y bebidas refrescantes. Su alto contenido de vitamina C potencia el sistema inmunológico y puede ayudar a la digestión."),
    
#     ("Aguacate", "El aguacate es una fruta cremosa y rica en grasas saludables. Perfecto para untar en tostadas, hacer guacamole o añadir a ensaladas, su textura suave y su sabor sutil lo convierten en un favorito en la cocina saludable. Además, es rico en fibra y potasio."),
    
#     ("Brócoli", "El brócoli es una verdura rica en vitaminas, minerales y antioxidantes. Ayuda a fortalecer el sistema inmunológico y es excelente para la salud digestiva. Puedes disfrutarlo al vapor, en ensaladas o como parte de un delicioso salteado. Su versatilidad lo convierte en un básico en la dieta."),
    
#     ("Zanahoria", "La zanahoria es una verdura crujiente, rica en beta-caroteno, que se convierte en vitamina A en el cuerpo. Es ideal para la salud ocular y se puede disfrutar fresca, en jugos o cocida. Su dulzura natural la convierte en un snack perfecto para niños y adultos."),
    
#     ("Espinaca", "La espinaca es una hoja verde rica en hierro y vitaminas. Su sabor suave y su versatilidad la hacen ideal para ensaladas, smoothies o como guarnición. Además, es baja en calorías y rica en antioxidantes, lo que la convierte en un superalimento para una alimentación saludable."),
    
#     ("Pimiento", "El pimiento es una verdura colorida y crujiente, rica en vitamina C y antioxidantes. Su sabor dulce y su frescura lo hacen perfecto para ensaladas, salsas y guisos. Además, contiene propiedades antiinflamatorias que ayudan a mejorar la salud general."),
    
#     ("Coliflor", "La coliflor es una verdura versátil y baja en calorías. Su textura y sabor neutro la convierten en un excelente sustituto de carbohidratos en platos como el arroz o el puré. Rica en fibra y nutrientes, es ideal para una dieta equilibrada."),
    
#     ("Berenjena", "La berenjena es una verdura morada, rica en antioxidantes y con un sabor único. Ideal para asar, rellenar o hacer salsas, su textura esponjosa la convierte en un ingrediente perfecto para platos vegetarianos. Además, es baja en calorías y rica en nutrientes."),
    
#     ("Calabaza", "La calabaza es una verdura dulce, rica en fibra y vitamina A. Su sabor suave la hace perfecta para sopas, guisos y postres. Además, su versatilidad en la cocina permite disfrutarla de múltiples formas, desde asada hasta en purés."),
    
#     ("Guisante", "El guisante es una legumbre pequeña y dulce, rica en proteínas y fibra. Ideal para añadir a ensaladas, sopas o como guarnición, su sabor fresco y textura crujiente lo convierten en un favorito en la cocina. Además, es bajo en calorías y nutritivo."),
    
#     ("Cebolla", "La cebolla es una verdura aromática, esencial en la cocina. Su sabor fuerte y dulce al cocinarla realza cualquier platillo. Rica en antioxidantes, ayuda a combatir enfermedades y es excelente para dar sabor a salsas y guisos."),
    
#     ("Ajo", "El ajo es un bulbo conocido por su potente sabor y sus propiedades medicinales. Se utiliza en una amplia variedad de platos, desde salsas hasta guisos. Además, su consumo regular puede mejorar la salud cardiovascular y fortalecer el sistema inmunológico."),
    
#     ("Repollo", "El repollo es una verdura crucífera, rica en fibra y nutrientes. Ideal para ensaladas, fermentados como el chucrut o guisos, su sabor suave y crujiente lo convierten en un básico en la dieta. Además, es bajo en calorías y muy nutritivo."),
    
#     ("Rábano", "El rábano es una raíz picante y refrescante, perfecta para añadir un toque crujiente a ensaladas. Rico en vitamina C y antioxidantes, su consumo regular puede ayudar en la digestión y mejorar la salud de la piel."),
    
#     ("Apio", "El apio es un vegetal crujiente, bajo en calorías y rico en fibra. Perfecto para snacks, en ensaladas o sopas, su frescura y textura lo hacen ideal para una alimentación ligera. Además, es hidratante y aporta importantes nutrientes."),
    
#     ("Nabo", "El nabo es una raíz comestible, rica en nutrientes y versátil en la cocina. Puedes disfrutarlo asado, en purés o en ensaladas. Su sabor suave y ligeramente picante lo convierte en un ingrediente interesante para diversas recetas."),
    
#     ("Remolacha", "La remolacha es una raíz dulce y vibrante, rica en antioxidantes y nitratos, que pueden mejorar el rendimiento deportivo. Ideal para ensaladas, jugos o asada, su sabor terroso añade profundidad a cualquier plato."),
    
#     ("Lechuga", "La lechuga es una hoja verde fresca y crujiente, ideal para ensaladas. Su variedad de tipos, desde la romana hasta la iceberg, permite crear platos coloridos y nutritivos. Además, es baja en calorías y rica en agua, perfecta para mantenerte hidratado."),
    
#     ("Pepino", "El pepino es una verdura refrescante, rica en agua y baja en calorías. Ideal para ensaladas, salsas o como snack, su textura crujiente y su sabor suave lo convierten en un favorito del verano. Además, es hidratante y nutritivo."),
    
#     ("Perejil", "El perejil es una hierba aromática rica en vitaminas y minerales. Se utiliza como condimento en una variedad de platos y su frescura realza el sabor de las comidas. Además, tiene propiedades antiinflamatorias y antioxidantes, lo que lo convierte en un aliado para la salud."),
    
#     ("Albahaca", "La albahaca es una hierba aromática, perfecta para salsas, ensaladas y platos italianos. Su aroma intenso y sabor fresco la convierten en un ingrediente esencial en la cocina mediterránea. Además, tiene propiedades antiinflamatorias y antioxidantes."),
    
#     ("Cilantro", "El cilantro es una hierba fresca, utilizada en muchas cocinas del mundo. Su sabor distintivo añade frescura a salsas, guisos y ensaladas. Además, se le atribuyen propiedades digestivas y antioxidantes, convirtiéndolo en un ingrediente saludable."),
    
#     ("Menta", "La menta es una hierba aromática refrescante, ideal para infusiones, postres y cócteles. Su sabor fresco y su aroma penetrante la hacen perfecta para añadir un toque especial a tus recetas. Además, tiene propiedades digestivas que ayudan a aliviar malestares."),
    
#     ("Tomate", "El tomate es una fruta roja y jugosa, rica en licopeno y antioxidantes. Su versatilidad lo convierte en un ingrediente esencial en salsas, ensaladas y guisos. Además, su sabor dulce y ácido realza cualquier platillo, haciendo del tomate un favorito en la cocina."),
    
#     ("Patata", "La patata es un tubérculo rico en carbohidratos, ideal para múltiples recetas. Desde purés hasta papas fritas, su versatilidad la convierte en un alimento básico en muchas culturas. Además, es rica en potasio y nutrientes esenciales."),
    
#     ("Batata", "La batata es un tubérculo dulce, rica en nutrientes y fibra. Su sabor naturalmente dulce la hace perfecta para asar, en purés o como ingrediente en postres. Además, es rica en antioxidantes, lo que ayuda a mejorar la salud general."),
    
#     ("Frambuesa", "La frambuesa es una fruta pequeña y roja, cargada de antioxidantes y vitamina C. Su sabor dulce y ligeramente ácido la convierte en un ingrediente ideal para postres, mermeladas y smoothies. Además, es baja en calorías y rica en fibra, promoviendo una buena digestión."),
    
#     ("Mora", "La mora es una fruta oscura y jugosa, rica en vitaminas y antioxidantes. Su sabor dulce y profundo la hace perfecta para postres, salsas o simplemente disfrutarla fresca. Además, tiene propiedades antiinflamatorias que ayudan a la salud general."),
    
#     ("Coco", "El coco es una fruta tropical, rica en grasas saludables y nutrientes. Su pulpa es versátil y se puede utilizar en batidos, postres o como ingrediente en platos salados. Además, el agua de coco es refrescante e hidratante, ideal para el verano."),
    
#     ("Hinojo", "El hinojo es una planta con un bulbo comestible, conocido por su sabor dulce y anizado. Se puede utilizar en ensaladas, asados o como un aromático en sopas. Además, tiene propiedades digestivas y es rico en antioxidantes, beneficiando la salud general.")
# ]
# # Crear productos en la base de datos
# for i, (nombre, descripcion) in enumerate(productos_data):
#     categoria = (i % 4) + 1  # Categorías del 1 al 4
#     proveedor1 = random.randint(1, 2)  # Proveedores 1 o 2
#     Products.objects.create(
#         categoria_producto=Categoria_producto.objects.get(pk=categoria),
#         proovedor=Proovedores.objects.get(pk=proveedor1),
#         name_producto=nombre,
#         descripcion=descripcion,
#         precio=round(1.50 + (i * 0.5), 2),  # Precios crecientes
#         cantidad_disponible=random.randint(1, 100),
#     )
    

    
