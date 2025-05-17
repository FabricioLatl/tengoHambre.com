import { Restaurant } from '@/types';

// Generate realistic mock data for restaurants in Lima
export const mockRestaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Maido',
    cuisine: 'Nikkei',
    description: 'Reconocido restaurante de fusión peruano-japonesa con menú de degustación y vista a la cocina abierta.',
    address: 'Calle San Martín 399, Miraflores',
    neighborhood: 'Miraflores',
    coordinates: {
      latitude: -12.1219,
      longitude: -77.0309
    },
    rating: 4.9,
    reviewCount: 524,
    priceRange: '$$$',
    priceDescription: 'De S/.200 a S/.400 por persona',
    hours: '12:30 PM - 3:30 PM, 7:00 PM - 11:00 PM',
    phone: '+51 1 4462512',
    website: 'https://www.maido.pe',
    isOpenNow: true,
    isPremiumPartner: true,
    hasDiscount: true,
    discountPercent: 25,
    coverImage: 'https://images.pexels.com/photos/6270541/pexels-photo-6270541.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    photos: [
      'https://images.pexels.com/photos/6270541/pexels-photo-6270541.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/8880332/pexels-photo-8880332.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/3297801/pexels-photo-3297801.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/3535383/pexels-photo-3535383.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'
    ],
    reviews: [
      {
        id: 'r1',
        userId: 'u1',
        userName: 'María García',
        userPhoto: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        rating: 5,
        comment: 'Una experiencia gastronómica increíble. El menú de degustación es una obra maestra, especialmente el nigiri de paiche. El servicio impecable.',
        date: '2023-10-15T18:30:00Z'
      },
      {
        id: 'r2',
        userId: 'u2',
        userName: 'Carlos Rodríguez',
        rating: 4.5,
        comment: 'Gran fusión de sabores peruanos y japoneses. Los postres son excepcionales. Un poco caro pero vale la pena para ocasiones especiales.',
        date: '2023-09-28T20:15:00Z'
      }
    ],
    menu: [
      {
        id: 'm1',
        name: 'Menú Degustación Nikkei',
        description: 'Experiencia de 13 tiempos que recorre la diversidad del Perú',
        price: 389,
        category: 'Menú Degustación',
        isPopular: true
      },
      {
        id: 'm2',
        name: 'Tiradito de Atún',
        description: 'Láminas finas de atún, leche de tigre de ají amarillo y chalaca',
        price: 65,
        category: 'Entradas'
      },
      {
        id: 'm3',
        name: 'Nigiri Sushi Paiche',
        description: 'Arroz de sushi, paiche amazónico y salsa de miso',
        price: 45,
        category: 'Sushi',
        isPopular: true
      }
    ]
  },
  {
    id: '2',
    name: 'Central',
    cuisine: 'Peruana Contemporánea',
    description: 'Experiencia gastronómica que explora los diversos ecosistemas y alturas del Perú.',
    address: 'Av. Pedro de Osma 301, Barranco',
    neighborhood: 'Barranco',
    coordinates: {
      latitude: -12.1367,
      longitude: -77.0236
    },
    rating: 4.8,
    reviewCount: 478,
    priceRange: '$$$$',
    priceDescription: 'Desde S/.450 por persona',
    hours: '1:00 PM - 3:30 PM, 7:00 PM - 10:30 PM',
    phone: '+51 1 2428515',
    website: 'https://www.centralrestaurante.com.pe',
    isOpenNow: true,
    isPremiumPartner: true,
    hasDiscount: false,
    discountPercent: 0,
    coverImage: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    photos: [
      'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/370984/pexels-photo-370984.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/299347/pexels-photo-299347.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'
    ],
    reviews: [
      {
        id: 'r3',
        userId: 'u3',
        userName: 'Ana López',
        userPhoto: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        rating: 5,
        comment: 'Una experiencia única. Cada plato cuenta una historia de los ecosistemas del Perú. El servicio y la explicación de cada plato son extraordinarios.',
        date: '2023-10-05T19:45:00Z'
      }
    ],
    menu: [
      {
        id: 'm4',
        name: 'Menú Alturas Mater',
        description: 'Recorrido por 16 ecosistemas peruanos desde el fondo del mar hasta la alta cordillera',
        price: 698,
        category: 'Menú Degustación',
        isPopular: true
      },
      {
        id: 'm5',
        name: 'Menú Mundo Mater',
        description: 'Experiencia de 14 platos explorando la biodiversidad peruana',
        price: 598,
        category: 'Menú Degustación'
      }
    ]
  },
  {
    id: '3',
    name: 'El Chinito',
    cuisine: 'Sanguches',
    description: 'Clásica sanguchería limeña con más de 60 años de tradición. Famosos por su chicharrón y tamal.',
    address: 'Jirón Zepita 588, Lima Centro',
    neighborhood: 'Centro de Lima',
    coordinates: {
      latitude: -12.0541,
      longitude: -77.0323
    },
    rating: 4.6,
    reviewCount: 1245,
    priceRange: '$',
    priceDescription: 'Menos de S/.40 por persona',
    hours: '7:00 AM - 6:00 PM',
    phone: '+51 1 4280408',
    isOpenNow: true,
    isPremiumPartner: false,
    hasDiscount: true,
    discountPercent: 30,
    coverImage: 'https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    photos: [
      'https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/4040422/pexels-photo-4040422.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'
    ],
    reviews: [
      {
        id: 'r4',
        userId: 'u4',
        userName: 'Jorge Mendoza',
        rating: 5,
        comment: 'El mejor chicharrón de Lima, sin dudas. El pan crujiente y la carne perfectamente cocida. Imperdible si quieres probar un verdadero sánguche limeño.',
        date: '2023-09-18T10:20:00Z'
      },
      {
        id: 'r5',
        userId: 'u5',
        userName: 'Daniela Torres',
        userPhoto: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        rating: 4,
        comment: 'Muy rico pero a veces hay mucha cola. Vale la pena esperar. El tamal también es excelente.',
        date: '2023-08-25T08:15:00Z'
      }
    ],
    menu: [
      {
        id: 'm6',
        name: 'Sánguche de Chicharrón',
        description: 'Pan francés, chicharrón, camote frito y sarsa criolla',
        price: 18,
        category: 'Sánguches',
        isPopular: true
      },
      {
        id: 'm7',
        name: 'Tamal con Panes',
        description: 'Tamal peruano acompañado de dos panes francés',
        price: 15,
        category: 'Desayunos',
        isPopular: true
      },
      {
        id: 'm8',
        name: 'Sánguche Mixto',
        description: 'Jamón, queso y mantequilla en pan francés',
        price: 8,
        category: 'Sánguches'
      }
    ]
  },
  {
    id: '4',
    name: 'La Picantería',
    cuisine: 'Comida Regional',
    description: 'Restaurante que homenajea las picanterías tradicionales del Perú con platos para compartir.',
    address: 'Calle Santa Rosa 388, Surquillo',
    neighborhood: 'Surquillo',
    coordinates: {
      latitude: -12.1189,
      longitude: -77.0287
    },
    rating: 4.7,
    reviewCount: 856,
    priceRange: '$$',
    priceDescription: 'De S/.80 a S/.150 por persona',
    hours: '12:00 PM - 5:00 PM',
    phone: '+51 1 2415957',
    isOpenNow: true,
    isPremiumPartner: true,
    hasDiscount: true,
    discountPercent: 25,
    coverImage: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    photos: [
      'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/5718062/pexels-photo-5718062.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'
    ],
    reviews: [
      {
        id: 'r6',
        userId: 'u6',
        userName: 'Roberto Sánchez',
        rating: 5,
        comment: 'Increíble comida regional peruana. El cebiche de mero y el arroz con mariscos son espectaculares. Ambiente auténtico y acogedor.',
        date: '2023-10-12T14:30:00Z'
      }
    ],
    menu: [
      {
        id: 'm9',
        name: 'Cebiche de Mero',
        description: 'Mero fresco marinado en leche de tigre, camote y choclo',
        price: 65,
        category: 'Cebiches',
        isPopular: true
      },
      {
        id: 'm10',
        name: 'Arroz con Mariscos',
        description: 'Arroz meloso con variedad de mariscos y aderezo norteño',
        price: 85,
        category: 'Arroces'
      },
      {
        id: 'm11',
        name: 'Chicharrón de Pulpo',
        description: 'Pulpo frito con yuca y sarsa criolla',
        price: 58,
        category: 'Entradas',
        isPopular: true
      }
    ]
  },
  {
    id: '5',
    name: 'Isolina',
    cuisine: 'Tradicional',
    description: 'Taberna de comida tradicional limeña con recetas de antaño y porciones generosas para compartir.',
    address: 'Av. San Martín 101, Barranco',
    neighborhood: 'Barranco',
    coordinates: {
      latitude: -12.1389,
      longitude: -77.0218
    },
    rating: 4.5,
    reviewCount: 762,
    priceRange: '$$',
    priceDescription: 'De S/.70 a S/.130 por persona',
    hours: '12:00 PM - 5:00 PM, 7:00 PM - 11:00 PM',
    phone: '+51 1 2475075',
    isOpenNow: false,
    isPremiumPartner: true,
    hasDiscount: false,
    discountPercent: 0,
    coverImage: 'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    photos: [
      'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/5718069/pexels-photo-5718069.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/15467177/pexels-photo-15467177.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'
    ],
    reviews: [
      {
        id: 'r7',
        userId: 'u7',
        userName: 'Lucía Morales',
        userPhoto: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        rating: 5,
        comment: 'La comida peruana en su máxima expresión. El ají de gallina y los anticuchos me recordaron a la cocina de mi abuela. Las porciones son enormes.',
        date: '2023-09-30T20:10:00Z'
      },
      {
        id: 'r8',
        userId: 'u8',
        userName: 'Fernando Gutiérrez',
        rating: 4,
        comment: 'Muy buena comida casera peruana. El ambiente es acogedor aunque algo ruidoso. El cau cau es excelente.',
        date: '2023-09-10T13:45:00Z'
      }
    ],
    menu: [
      {
        id: 'm12',
        name: 'Cau Cau',
        description: 'Guiso de mondongo con papas y palillo',
        price: 48,
        category: 'Guisos'
      },
      {
        id: 'm13',
        name: 'Ají de Gallina',
        description: 'Gallina deshilachada en salsa cremosa de ají amarillo, servida con arroz y papas',
        price: 45,
        category: 'Platos Tradicionales',
        isPopular: true
      },
      {
        id: 'm14',
        name: 'Anticuchos de Corazón',
        description: 'Brochetas de corazón de res marinadas y a la parrilla, con papas y choclo',
        price: 42,
        category: 'Parrilla',
        isPopular: true
      }
    ]
  },
  {
    id: '6',
    name: 'Osso',
    cuisine: 'Carnes',
    description: 'Carnicería y restaurante especializado en carnes maduradas y cortes especiales.',
    address: 'Calle Tahiti 175, La Molina',
    neighborhood: 'La Molina',
    coordinates: {
      latitude: -12.0849,
      longitude: -76.9364
    },
    rating: 4.8,
    reviewCount: 689,
    priceRange: '$$$',
    priceDescription: 'De S/.150 a S/.250 por persona',
    hours: '12:30 PM - 4:00 PM, 7:30 PM - 11:00 PM',
    phone: '+51 1 3529915',
    isOpenNow: true,
    isPremiumPartner: true,
    hasDiscount: true,
    discountPercent: 20,
    coverImage: 'https://images.pexels.com/photos/1307658/pexels-photo-1307658.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    photos: [
      'https://images.pexels.com/photos/1307658/pexels-photo-1307658.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/323682/pexels-photo-323682.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/8280028/pexels-photo-8280028.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'
    ],
    reviews: [
      {
        id: 'r9',
        userId: 'u9',
        userName: 'Javier Méndez',
        rating: 5,
        comment: 'La mejor parrilla de Lima sin dudas. El tomahawk es espectacular y el ambiente es genial. Precios elevados pero vale cada centavo.',
        date: '2023-10-08T21:15:00Z'
      }
    ],
    menu: [
      {
        id: 'm15',
        name: 'Tomahawk 1kg',
        description: 'Corte de costilla de res con hueso madurado por 27 días',
        price: 280,
        category: 'Cortes Especiales',
        isPopular: true
      },
      {
        id: 'm16',
        name: 'Hamburguesa Osso',
        description: 'Blend de carnes, queso cheddar, tocino y cebolla caramelizada',
        price: 56,
        category: 'Hamburguesas',
        isPopular: true
      },
      {
        id: 'm17',
        name: 'Chuleta de Cerdo',
        description: 'Chuleta de cerdo a la parrilla con puré de manzana',
        price: 78,
        category: 'Cerdo'
      }
    ]
  },
  {
    id: '7',
    name: 'La Lucha Sanguchería',
    cuisine: 'Sanguches',
    description: 'Popular sanguchería con diversas opciones de sánguches peruanos y muy buenas papas fritas.',
    address: 'Pasaje Marcelino Champagnat 139, Miraflores',
    neighborhood: 'Miraflores',
    coordinates: {
      latitude: -12.1245,
      longitude: -77.0294
    },
    rating: 4.6,
    reviewCount: 1523,
    priceRange: '$',
    priceDescription: 'Menos de S/.40 por persona',
    hours: '9:00 AM - 12:00 AM',
    phone: '+51 1 2414205',
    isOpenNow: true,
    isPremiumPartner: false,
    hasDiscount: true,
    discountPercent: 30,
    coverImage: 'https://images.pexels.com/photos/2282532/pexels-photo-2282532.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    photos: [
      'https://images.pexels.com/photos/2282532/pexels-photo-2282532.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/1049626/pexels-photo-1049626.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/4676640/pexels-photo-4676640.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'
    ],
    reviews: [
      {
        id: 'r10',
        userId: 'u10',
        userName: 'Pilar Guzmán',
        userPhoto: 'https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        rating: 4,
        comment: 'Los sánguches son muy buenos, especialmente el de chicharrón. Las papas fritas son las mejores de Lima. Siempre hay cola pero vale la pena.',
        date: '2023-09-22T13:30:00Z'
      }
    ],
    menu: [
      {
        id: 'm18',
        name: 'Sánguche de Chicharrón',
        description: 'Chicharrón de cerdo, camote frito y sarsa criolla en pan francés',
        price: 22,
        category: 'Sánguches',
        isPopular: true
      },
      {
        id: 'm19',
        name: 'Sánguche de Pavo',
        description: 'Pavo horneado, jamón, queso y salsa de mostaza y miel en pan ciabatta',
        price: 24,
        category: 'Sánguches',
        isPopular: true
      },
      {
        id: 'm20',
        name: 'Papas Fritas',
        description: 'Papas fritas crocantes con salsas de la casa',
        price: 15,
        category: 'Complementos'
      }
    ]
  },
  {
    id: '8',
    name: 'Astrid & Gastón',
    cuisine: 'Peruana Contemporánea',
    description: 'Restaurante emblemático de Gastón Acurio que representa la evolución de la cocina peruana.',
    address: 'Av. Paz Soldán 290, San Isidro',
    neighborhood: 'San Isidro',
    coordinates: {
      latitude: -12.0997,
      longitude: -77.0325
    },
    rating: 4.7,
    reviewCount: 712,
    priceRange: '$$$$',
    priceDescription: 'Desde S/.350 por persona',
    hours: '1:00 PM - 3:00 PM, 7:30 PM - 10:30 PM',
    phone: '+51 1 4422777',
    website: 'https://www.astridygaston.com',
    isOpenNow: false,
    isPremiumPartner: true,
    hasDiscount: false,
    discountPercent: 0,
    coverImage: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    photos: [
      'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/9315/healthy-italian-pumpkin-fennel.jpg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/6273480/pexels-photo-6273480.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'
    ],
    reviews: [
      {
        id: 'r11',
        userId: 'u11',
        userName: 'Martín Torres',
        rating: 5,
        comment: 'Experiencia gastronómica de primer nivel. El menú degustación es un viaje por el Perú. El servicio es impecable y el ambiente elegante pero acogedor.',
        date: '2023-10-01T20:45:00Z'
      }
    ],
    menu: [
      {
        id: 'm21',
        name: 'Menú Degustación',
        description: 'Experiencia de 12 tiempos que recorre la diversidad de la cocina peruana',
        price: 498,
        category: 'Menú Degustación',
        isPopular: true
      },
      {
        id: 'm22',
        name: 'Cebiche Clásico',
        description: 'Pescado fresco del día en leche de tigre clásica con camote y choclo',
        price: 75,
        category: 'Entradas'
      },
      {
        id: 'm23',
        name: 'Lomo Saltado',
        description: 'Versión contemporánea del clásico lomo saltado con papas nativas',
        price: 85,
        category: 'Platos Principales',
        isPopular: true
      }
    ]
  },
  {
    id: '9',
    name: 'Grimanesa Vargas',
    cuisine: 'Anticuchos',
    description: 'El mejor anticucho de Lima de la mano de Grimanesa Vargas, con más de 45 años de experiencia.',
    address: 'Calle Ignacio Merino 466, Miraflores',
    neighborhood: 'Miraflores',
    coordinates: {
      latitude: -12.1199,
      longitude: -77.0341
    },
    rating: 4.7,
    reviewCount: 983,
    priceRange: '$',
    priceDescription: 'Menos de S/.45 por persona',
    hours: '6:00 PM - 11:30 PM',
    phone: '+51 1 4458048',
    isOpenNow: true,
    isPremiumPartner: false,
    hasDiscount: true,
    discountPercent: 30,
    coverImage: 'https://images.pexels.com/photos/5175634/pexels-photo-5175634.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    photos: [
      'https://images.pexels.com/photos/5175634/pexels-photo-5175634.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/769289/pexels-photo-769289.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/3535373/pexels-photo-3535373.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'
    ],
    reviews: [
      {
        id: 'r12',
        userId: 'u12',
        userName: 'Diego Castro',
        rating: 5,
        comment: 'Los mejores anticuchos que he probado en mi vida. La salsa es perfecta y la textura de la carne es incomparable. No te lo puedes perder si visitas Lima.',
        date: '2023-09-15T21:30:00Z'
      }
    ],
    menu: [
      {
        id: 'm24',
        name: 'Anticuchos de Corazón',
        description: 'Clásicos anticuchos de corazón de res marinados y a la parrilla',
        price: 38,
        category: 'Anticuchos',
        isPopular: true
      },
      {
        id: 'm25',
        name: 'Mollejitas',
        description: 'Mollejas de res a la parrilla con papas y choclo',
        price: 35,
        category: 'Anticuchos'
      },
      {
        id: 'm26',
        name: 'Rachi',
        description: 'Pancita de res a la parrilla con papas doradas y salsa picante',
        price: 32,
        category: 'Anticuchos',
        isPopular: true
      }
    ]
  },
  {
    id: '10',
    name: 'Siete Sopas',
    cuisine: 'Sopas',
    description: 'Restaurante especializado en sopas y caldos peruanos tradicionales abierto las 24 horas.',
    address: 'Av. Arequipa 2394, Lince',
    neighborhood: 'Lince',
    coordinates: {
      latitude: -12.0897,
      longitude: -77.0336
    },
    rating: 4.5,
    reviewCount: 1122,
    priceRange: '$',
    priceDescription: 'Menos de S/.35 por persona',
    hours: 'Abierto 24 horas',
    phone: '+51 1 4721378',
    isOpenNow: true,
    isPremiumPartner: false,
    hasDiscount: false,
    discountPercent: 0,
    coverImage: 'https://images.pexels.com/photos/8845461/pexels-photo-8845461.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    photos: [
      'https://images.pexels.com/photos/8845461/pexels-photo-8845461.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/13789185/pexels-photo-13789185.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/8952778/pexels-photo-8952778.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'
    ],
    reviews: [
      {
        id: 'r13',
        userId: 'u13',
        userName: 'Carla Reyes',
        userPhoto: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        rating: 4,
        comment: 'Excelente lugar para una sopa reconfortante a cualquier hora. La sopa criolla es increíble y las porciones son muy generosas. Recomendado para después de una noche de fiesta.',
        date: '2023-09-05T03:15:00Z'
      }
    ],
    menu: [
      {
        id: 'm27',
        name: 'Caldo de Gallina',
        description: 'Caldo de gallina con fideos, huevo, papas y verduras',
        price: 25,
        category: 'Sopas',
        isPopular: true
      },
      {
        id: 'm28',
        name: 'Sopa Criolla',
        description: 'Sopa con fideos, carne de res, leche y huevo',
        price: 22,
        category: 'Sopas',
        isPopular: true
      },
      {
        id: 'm29',
        name: 'Chilcano de Pescado',
        description: 'Caldo de pescado con yuca, culantro y limón',
        price: 24,
        category: 'Sopas'
      }
    ]
  }
];