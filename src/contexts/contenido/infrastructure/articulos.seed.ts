import type { Article, ArticleBlock } from '../domain/article';

const article = (
  id: string,
  title: string,
  author: string,
  image: string,
  readTime: string,
  contentType: string,
  category: string,
  saved: boolean,
  authorPhoto: string,
  authorRole: string,
  audioMinutes: number,
  blocks: ArticleBlock[]
): Article => ({
  id,
  title,
  author,
  image,
  readTime,
  contentType,
  category,
  saved,
  authorPhoto,
  authorRole,
  audioMinutes,
  blocks,
});

const PHOTO_ANA = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80';
const PHOTO_SOFIA = 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80';
const PHOTO_MARIANA = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80';
const PHOTO_CAMILA = 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=200&q=80';
const PHOTO_LUCIA = 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=200&q=80';
const PHOTO_VALERIA = 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80';
const PHOTO_MARTINA = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80';
const PHOTO_DANIELA = 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?auto=format&fit=crop&w=200&q=80';

const IMG_YOGA = 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=900&q=80';
const IMG_PLANNER = 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=900&q=80';
const IMG_MEDITATION = 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=900&q=80';
const IMG_GRATITUDE = 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=900&q=80';
const IMG_SLEEP = 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=900&q=80';
const IMG_PLANT = 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=900&q=80';
const IMG_OFFICE = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80';
const IMG_SALAD = 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80';
const IMG_DIGITAL = 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80';
const IMG_COFFEE = 'https://images.unsplash.com/photo-1493836512294-502baa1986e2?auto=format&fit=crop&w=900&q=80';
const IMG_WOMAN = 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=900&q=80';
const IMG_FLOWERS = 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=900&q=80';
const IMG_SUNRISE = 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=900&q=80';
const IMG_NOTEBOOK = 'https://images.unsplash.com/photo-1489533119213-66a5cd877091?auto=format&fit=crop&w=900&q=80';
const IMG_DESK = 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=900&q=80';

export const autocuidadoArticles: Article[] = [
  article(
    'ac-1',
    'Rituales de autocuidado para empezar el día con energía',
    'Ana Torres',
    IMG_YOGA,
    '8 min',
    'Artículo',
    'Rutinas',
    false,
    PHOTO_ANA,
    'Terapeuta y escritora',
    8,
    [
      { type: 'paragraph', text: 'Cómo empiezas tu mañana marca el tono de todo tu día. Crear pequeños rituales de autocuidado no requiere horas extra, solo intención y constancia para recibir cada jornada con más calma y energía.' },
      { type: 'heading', text: 'Tu primer ritual: no mires el teléfono' },
      { type: 'paragraph', text: 'Dedica los primeros diez minutos tras despertar a ti misma. Respira profundo, estira el cuerpo y agradece antes de sumergirte en notificaciones. Ese breve silencio te pertenece y cambia la manera en que afrontas el resto del día.' },
      { type: 'image', uri: IMG_YOGA },
      { type: 'quote', text: 'No tienes que hacer las cosas perfectas: solo tienes que hacerlas con cariño hacia ti.' },
      { type: 'paragraph', text: 'Suma uno o dos rituales que realmente disfrutes: una taza de té, un paseo corto o tres páginas de tu libro favorito. La clave está en repetirlos hasta convertirlos en parte de tu identidad.' },
    ]
  ),
  article(
    'ac-2',
    'Cómo construir una rutina de autocuidado sostenible',
    'Sofía Gutiérrez',
    IMG_PLANNER,
    '9 min',
    'Guía',
    'Hábitos',
    true,
    PHOTO_SOFIA,
    'Coach de hábitos',
    9,
    [
      { type: 'paragraph', text: 'Las rutinas fracasan cuando intentamos cambiar todo de golpe. Una rutina de autocuidado sostenible se construye con pasos mínimos, realistas y adaptados a tu vida real, no a la vida ideal que vemos en redes.' },
      { type: 'heading', text: 'Empieza con hábitos de dos minutos' },
      { type: 'paragraph', text: 'Elige una acción tan pequeña que no puedas evitar hacerla: dos minutos de respiración, hidratarte al despertar o estirar el cuello. Una vez instalada, el hábito se vuelve el ancla sobre la que sumas nuevas prácticas.' },
      { type: 'image', uri: IMG_PLANNER },
      { type: 'quote', text: 'El autocuidado no es un lujo que te das cuando te sobra tiempo: es la base que te permite tener tiempo.' },
      { type: 'paragraph', text: 'Revisa tu rutina cada semana y celebra los días en que la cumpliste. La constancia vence a la perfección, y cada pequeño avance alimenta tu motivación.' },
    ]
  ),
  article(
    'ac-3',
    'Mindfulness para principiantes: guía paso a paso',
    'Mariana López',
    IMG_MEDITATION,
    '10 min',
    'Práctica',
    'Meditación',
    false,
    PHOTO_MARIANA,
    'Especialista en mindfulness',
    10,
    [
      { type: 'paragraph', text: 'Mindfulness es prestar atención al momento presente sin juzgarlo. No se trata de vaciar la mente, sino de notar lo que hay en ella y dejar que los pensamientos pasen como nubes en el cielo.' },
      { type: 'heading', text: 'Tres minutos para empezar' },
      { type: 'paragraph', text: 'Siéntate cómoda, cierra los ojos y lleva tu atención a la respiración. Cuando la mente se distraiga, cosa normal, regresa con suavidad al aire que entra y sale. Repite esto durante tres minutos y sentirás la diferencia.' },
      { type: 'image', uri: IMG_MEDITATION },
      { type: 'quote', text: 'No puedes detener las olas, pero puedes aprender a surfearlas. Eso es el mindfulness.' },
      { type: 'paragraph', text: 'Practica a la misma hora cada día, aunque sea un minuto. Con el tiempo, esa pausa se convierte en tu refugio para manejar el estrés y conectar contigo.' },
    ]
  ),
  article(
    'ac-4',
    'El poder de la gratitud en tu desarrollo personal',
    'Camila Torres',
    IMG_GRATITUDE,
    '7 min',
    'Artículo',
    'Bienestar',
    false,
    PHOTO_CAMILA,
    'Psicóloga y escritora',
    7,
    [
      { type: 'paragraph', text: 'Agradecer no significa ignorar lo difícil, sino entrenar la mirada para reconocer lo valioso que ya existe en tu vida. Este cambio de enfoque tiene efectos reales en tu ánimo y tu bienestar.' },
      { type: 'heading', text: 'Un diario de gratitud simple' },
      { type: 'paragraph', text: 'Cada noche anota tres cosas por las que estás agradecida. Pueden ser enormes o diminutas: una conversación, una comida rica, el sol de la tarde. Lo importante es sentirlas de verdad al escribirlas.' },
      { type: 'image', uri: IMG_GRATITUDE },
      { type: 'quote', text: 'La gratitud convierte lo que tenemos en suficiente.' },
      { type: 'paragraph', text: 'Con el tiempo notarás que tu atención busca más razones para agradecer, y ese hábito te devuelve la alegría incluso en los días grises.' },
    ]
  ),
  article(
    'ac-5',
    'Duerme mejor con estos hábitos nocturnos de relajación',
    'Lucía Fernández',
    IMG_SLEEP,
    '6 min',
    'Guía',
    'Sueño',
    false,
    PHOTO_LUCIA,
    'Experta en bienestar',
    6,
    [
      { type: 'paragraph', text: 'El descanso es la forma más poderosa de autocuidado que existe. Un buen sueño mejora tu ánimo, tu memoria y tu capacidad para tomar decisiones al día siguiente.' },
      { type: 'heading', text: 'Prepara tu cuerpo para dormir' },
      { type: 'paragraph', text: 'Apaga las pantallas al menos treinta minutos antes de acostarte, baja la luz de la habitación y prueba una rutina corta de relajación: respiración profunda o un té sin cafeína.' },
      { type: 'image', uri: IMG_SLEEP },
      { type: 'quote', text: 'El descanso no es una recompensa por acabar todo: es el espacio que te permite empezar.' },
      { type: 'paragraph', text: 'Acuéstate y despiértate a la misma hora, incluso los fines de semana. Tu reloj interno te lo agradecerá con noches más profundas y reparadoras.' },
    ]
  ),
  article(
    'ac-6',
    'Pon límites sanos y cuida tu energía emocional',
    'Valeria Ríos',
    IMG_PLANT,
    '9 min',
    'Artículo',
    'Límites',
    false,
    PHOTO_VALERIA,
    'Psicóloga clínica',
    9,
    [
      { type: 'paragraph', text: 'Decir que sí a todo no te hace más buena persona, te hace más agotada. Los límites sanos protegen tu energía y definen la forma en que permites que te traten los demás.' },
      { type: 'heading', text: 'Un «no» amable también es un «sí» a ti' },
      { type: 'paragraph', text: 'Aprende a responder con calma: «no puedo ahora mismo» o «necesito tiempo para pensarlo». No necesitas justificar cada negativa; tus razones son válidas por el simple hecho de ser tuyas.' },
      { type: 'image', uri: IMG_PLANT },
      { type: 'quote', text: 'Tus límites no excluyen a nadie: solo muestran dónde termina tu responsabilidad y empieza la de los demás.' },
      { type: 'paragraph', text: 'Al principio puede sentirse incómodo, pero cada vez que honras un límite, envías el mensaje más importante: que tu bienestar importa.' },
    ]
  ),
];

export const equilibrioArticles: Article[] = [
  article(
    'eq-1',
    'Cómo lograr el balance entre trabajo y vida personal',
    'Martina Sánchez',
    IMG_OFFICE,
    '9 min',
    'Artículo',
    'Trabajo-Vida',
    false,
    PHOTO_MARTINA,
    'Coach de productividad',
    9,
    [
      { type: 'paragraph', text: 'El equilibrio entre trabajo y vida personal no se trata de dividir el tiempo en partes iguales, sino de sentir que ni tu carrera ni tu bienestar sacrifican al otro. Es un límite que se cuida cada día.' },
      { type: 'heading', text: 'Define tu hora de «desconexión laboral»' },
      { type: 'paragraph', text: 'Elige un horario en el que cierras el correo y las notificaciones, y respétalo como un compromiso contigo. Comunica tu disponibilidad con claridad y practica soltar las urgencias que pueden esperar hasta mañana.' },
      { type: 'image', uri: IMG_OFFICE },
      { type: 'quote', text: 'No buscamos la mitad del tiempo para cada cosa, sino la paz de saber que el tiempo dedicado vale la pena.' },
      { type: 'paragraph', text: 'Agenda también el descanso y los planes personales como citas innegociables. Lo que no se agenda, no se hace.' },
    ]
  ),
  article(
    'eq-2',
    'Meditación breve para reconectar con tu día',
    'Mariana López',
    IMG_MEDITATION,
    '5 min',
    'Práctica',
    'Meditación',
    true,
    PHOTO_MARIANA,
    'Especialista en mindfulness',
    5,
    [
      { type: 'paragraph', text: 'Un día intenso no tiene por qué llevarse tu calma. Con una meditación breve puedes resetear tu mente y volver a tu rutina con claridad y serenidad.' },
      { type: 'heading', text: 'La pausa de los cinco minutos' },
      { type: 'paragraph', text: 'Encuentra un lugar tranquilo, cierra los ojos y respira contando hasta cuatro al inhalar y hasta seis al exhalar. Deja que cada espiración suelte la tensión acumulada.' },
      { type: 'image', uri: IMG_MEDITATION },
      { type: 'quote', text: 'Entre el estímulo y la respuesta hay un espacio, y en ese espacio está tu poder de elegir.' },
      { type: 'paragraph', text: 'Haz esta pausa antes de una reunión importante o al llegar a casa. Cinco minutos de silencio pueden cambiar el resto de tu jornada.' },
    ]
  ),
  article(
    'eq-3',
    'Nutrición consciente: alimenta tu cuerpo y tu mente',
    'Daniela Paz',
    IMG_SALAD,
    '8 min',
    'Artículo',
    'Nutrición',
    false,
    PHOTO_DANIELA,
    'Nutricionista holística',
    8,
    [
      { type: 'paragraph', text: 'Comer conscientemente es prestar atención plena a lo que llevas a tu plato: de dónde viene, cómo lo preparas y cómo te sientes mientras lo disfrutas.' },
      { type: 'heading', text: 'Come con todos los sentidos' },
      { type: 'paragraph', text: 'Aleja el teléfono de la mesa, mastica despacio y percibe los colores, aromas y texturas. Comer con atención te ayuda a reconocer tu saciedad y a disfrutar más con menos.' },
      { type: 'image', uri: IMG_SALAD },
      { type: 'quote', text: 'La comida no es solo combustible: también es celebración, memoria y manera de cuidarte.' },
      { type: 'paragraph', text: 'No se trata de prohibir, sino de incluir más alimentos reales y de sentir el placer de nutrir tu cuerpo a diario.' },
    ]
  ),
  article(
    'eq-4',
    'Desconexión digital: recupera tu atención y tu calma',
    'Sofía Gutiérrez',
    IMG_DIGITAL,
    '7 min',
    'Guía',
    'Desconexión',
    false,
    PHOTO_SOFIA,
    'Coach de hábitos',
    7,
    [
      { type: 'paragraph', text: 'El teléfono cabe en tu bolsillo, pero a veces ocupa toda tu mente. La desconexión digital es un acto de higiene mental que devuelve espacio a tu atención y a tus relaciones.' },
      { type: 'heading', text: 'Crea zonas libres de pantalla' },
      { type: 'paragraph', text: 'Define momentos y lugares sin notificaciones: la mesa, la habitación o la primera hora de la mañana. Desactiva alertas y convierte esas zonas en territorios de calma.' },
      { type: 'image', uri: IMG_DIGITAL },
      { type: 'quote', text: 'Tu atención es el regalo más valioso que puedes dar: elige bien a quién y a qué se lo entregas.' },
      { type: 'paragraph', text: 'Empieza por una hora al día y ve aumentando. Pronto notarás que el mundo sigue girando y que tú, además, estás más presente en él.' },
    ]
  ),
  article(
    'eq-5',
    'Organiza tu día sin agobios ni listas infinitas',
    'Lucía Fernández',
    IMG_PLANNER,
    '6 min',
    'Guía',
    'Organización',
    false,
    PHOTO_LUCIA,
    'Experta en bienestar',
    6,
    [
      { type: 'paragraph', text: 'Las listas interminables generan más ansiedad que orden. Organizar bien tu día no significa hacer más, sino priorizar mejor y dejar espacio para lo que de verdad importa.' },
      { type: 'heading', text: 'La regla de las tres tareas' },
      { type: 'paragraph', text: 'Cada mañana elige las tres tareas que, si se completan, harán que el día valga la pena. Anótalas en la parte superior de tu lista y empieza por la más difícil.' },
      { type: 'image', uri: IMG_PLANNER },
      { type: 'quote', text: 'Menos tareas, más intención: un día organizado se siente tranquilo, no saturado.' },
      { type: 'paragraph', text: 'Deja bloques de descanso entre tareas y celebra cada avance. Tu día no se mide por lo que queda, sino por lo que lograste.' },
    ]
  ),
  article(
    'eq-6',
    'Rituales de la mañana para una vida más armoniosa',
    'Camila Torres',
    IMG_COFFEE,
    '8 min',
    'Artículo',
    'Hábitos',
    false,
    PHOTO_CAMILA,
    'Psicóloga y escritora',
    8,
    [
      { type: 'paragraph', text: 'Una mañana serena predispone a un día en armonía. Los rituales matutinos no necesitan ser largos; necesitan ser tuyos y repetirse con cariño.' },
      { type: 'heading', text: 'Diseña tu propia mañana' },
      { type: 'paragraph', text: 'Elige un ancla: agua con limón, estiramientos, una página de lectura o escribir tus intenciones del día. Combínalos en el orden que te haga sentir bien y protégelos como citas sagradas.' },
      { type: 'image', uri: IMG_COFFEE },
      { type: 'quote', text: 'La forma en que empiezas tu día es la forma en que empiezas tu vida.' },
      { type: 'paragraph', text: 'Cuando una mañana no sale como planeaste, no la descartes: retómalo en el siguiente momento libre. La armonía se construye con flexibilidad.' },
    ]
  ),
];

export const autoestimaArticles: Article[] = [
  article(
    'ae-1',
    'Ejercicios para fortalecer tu amor propio cada día',
    'Valeria Ríos',
    IMG_WOMAN,
    '8 min',
    'Ejercicios',
    'Amor propio',
    false,
    PHOTO_VALERIA,
    'Psicóloga clínica',
    8,
    [
      { type: 'paragraph', text: 'El amor propio se entrena como un músculo: con práctica diaria y constancia. Estos ejercicios sencillos te ayudan a transformar tu diálogo interno y a tratarte con la misma ternura que ofreces a quienes quieres.' },
      { type: 'heading', text: 'Carta de amiga para ti' },
      { type: 'paragraph', text: 'Escribe una nota como si viniera de tu mejor amiga, hablándote de tus cualidades y de lo mucho que vales. Guárdala y léela cuando sientas que tu voz interna se vuelve severa.' },
      { type: 'image', uri: IMG_WOMAN },
      { type: 'quote', text: 'Trátate como tratarías a alguien a quien amas profundamente, porque ese alguien eres tú.' },
      { type: 'paragraph', text: 'Añade un registro diario de tres logros, por pequeños que sean. Ver tu progreso escrito refuerza la confianza en ti misma.' },
    ]
  ),
  article(
    'ae-2',
    'Meditación guiada para reconectar con tu valor',
    'Mariana López',
    IMG_YOGA,
    '10 min',
    'Meditaciones',
    'Confianza',
    true,
    PHOTO_MARIANA,
    'Especialista en mindfulness',
    10,
    [
      { type: 'paragraph', text: 'Tu valor no depende de tu apariencia, tus logros ni la opinión ajena. Esta meditación guiada te acompaña a recordarlo desde el centro de tu ser.' },
      { type: 'heading', text: 'El abrazo de tu voz amable' },
      { type: 'paragraph', text: 'Siéntate en silencio y coloca una mano sobre el corazón. Al respirar, repite en voz baja: «soy suficiente, soy valiosa, merezco amor». Deja que cada palabra se asiente en tu pecho.' },
      { type: 'image', uri: IMG_YOGA },
      { type: 'quote', text: 'No tienes que ganarte tu propio amor: ya lo mereces, exactamente como eres.' },
      { type: 'paragraph', text: 'Practícala al despertar o antes de dormir. Con la repetición, esa afirmación deja de ser una frase y se vuelve una certeza.' },
    ]
  ),
  article(
    'ae-3',
    '5 afirmaciones diarias para brillar desde dentro',
    'Sofía Gutiérrez',
    IMG_FLOWERS,
    '6 min',
    'Lecturas',
    'Autoestima',
    false,
    PHOTO_SOFIA,
    'Coach de hábitos',
    6,
    [
      { type: 'paragraph', text: 'Las afirmaciones son frases que repites hasta transformar tu manera de verte. Con intención y constancia, siembran una nueva historia sobre quién eres.' },
      { type: 'heading', text: 'Tus cinco frases del día' },
      { type: 'paragraph', text: 'Elige afirmaciones que resuenen contigo, como «confío en mis decisiones», «merezco amor y respeto» o «soy más fuerte de lo que creo». Repítelas frente al espejo cada mañana.' },
      { type: 'image', uri: IMG_FLOWERS },
      { type: 'quote', text: 'Lo que te dices a ti misma se convierte en la historia que vives.' },
      { type: 'paragraph', text: 'Combinadas con gratitud, estas frases te ayudan a brillar desde dentro, sin esperar la validación de nadie.' },
    ]
  ),
  article(
    'ae-4',
    'Cómo dejar de compararte con las demás personas',
    'Camila Torres',
    IMG_SUNRISE,
    '9 min',
    'Lecturas',
    'Confianza',
    false,
    PHOTO_CAMILA,
    'Psicóloga y escritora',
    9,
    [
      { type: 'paragraph', text: 'Compararte con las demás es un robo silencioso de tu alegría: siempre verás fragmentos de sus vidas y nunca el proceso completo detrás de ellas. Recuperar tu mirada es un acto de libertad.' },
      { type: 'heading', text: 'Compara tu hoy con tu ayer' },
      { type: 'paragraph', text: 'Cambia la pregunta «¿qué tiene que yo no?» por «¿en qué he crecido este año?». Tu única competencia real eres tú de hace un año, no la versión editada de la vida de otra persona.' },
      { type: 'image', uri: IMG_SUNRISE },
      { type: 'quote', text: 'Tu camino es único porque tu historia, tus sueños y tus tiempos también lo son.' },
      { type: 'paragraph', text: 'Cuando aparezca la envidia, úsala como brújula: señala lo que anhelas. Luego vuelve la mirada a tu propio sendero y camina a tu ritmo.' },
    ]
  ),
  article(
    'ae-5',
    'El ejercicio del espejo: háblate con cariño',
    'Ana Torres',
    IMG_NOTEBOOK,
    '7 min',
    'Ejercicios',
    'Amor propio',
    false,
    PHOTO_ANA,
    'Terapeuta y escritora',
    7,
    [
      { type: 'paragraph', text: 'Mirarte al espejo puede resultar incómodo al principio, pero es uno de los ejercicios más poderosos para reconciliarte con tu imagen y tu historia.' },
      { type: 'heading', text: 'Tres minutos frente a ti' },
      { type: 'paragraph', text: 'Busca tu reflejo, respira y sonríete. Nombra en voz alta tres cualidades que te gustan de ti y agradece a tu cuerpo todo lo que hace por ti cada día, sin juzgar su forma.' },
      { type: 'image', uri: IMG_NOTEBOOK },
      { type: 'quote', text: 'El espejo no refleja tus errores: refleja la mirada amorosa que aprendes a dedicarte.' },
      { type: 'paragraph', text: 'Con la práctica, ese encuentro frente al espejo se convierte en un ritual de cariño y aceptación que transforma tu relación contigo.' },
    ]
  ),
  article(
    'ae-6',
    'Meditación del abrazo interno para tu sanación',
    'Lucía Fernández',
    IMG_SUNRISE,
    '8 min',
    'Meditaciones',
    'Bienestar',
    false,
    PHOTO_LUCIA,
    'Experta en bienestar',
    8,
    [
      { type: 'paragraph', text: 'A veces la parte de ti que más necesita cuidado es la que más escondes. La meditación del abrazo interno te invita a ofrecerte la contención que anhelas.' },
      { type: 'heading', text: 'Sostenerte en silencio' },
      { type: 'paragraph', text: 'Cierra los ojos, cruza los brazos y abrázate suavemente. Respira lento y repite: «estoy aquí para ti, no estás sola». Permite que esa promesa penetre en tu cuerpo.' },
      { type: 'image', uri: IMG_SUNRISE },
      { type: 'quote', text: 'La sanación comienza cuando aprendes a darte el abrazo que esperabas recibir de fuera.' },
      { type: 'paragraph', text: 'Hazlo cada vez que sientas tristeza o miedo. Tu propio abrazo siempre está disponible y nunca llega tarde.' },
    ]
  ),
  article(
    'ae-7',
    'Acepta tus imperfecciones: una guía práctica',
    'Daniela Paz',
    IMG_NOTEBOOK,
    '8 min',
    'Ejercicios',
    'Aceptación',
    false,
    PHOTO_DANIELA,
    'Nutricionista holística',
    8,
    [
      { type: 'paragraph', text: 'La perfección no existe: es una meta inventada que te aleja de ti. Aceptar tus imperfecciones no es rendirte, es liberarte del peso de una exigencia imposible.' },
      { type: 'heading', text: 'Nombra lo que te juzgas' },
      { type: 'paragraph', text: 'Escribe aquello de ti que sueles criticar y obsérvalo con compasión. Pregúntate: ¿este rasgo me hace menos valiosa? Casi siempre, la respuesta te sorprende.' },
      { type: 'image', uri: IMG_NOTEBOOK },
      { type: 'quote', text: 'Tus grietas no te rompen: son los surcos por donde entra la luz.' },
      { type: 'paragraph', text: 'Convierte tus imperfecciones en parte de tu historia, no en un veredicto. Al abrazarlas, recuperas la energía que gastabas en esconderlas.' },
    ]
  ),
  article(
    'ae-8',
    'Lectura inspiradora: la confianza se construye',
    'Martina Sánchez',
    IMG_DESK,
    '7 min',
    'Lecturas',
    'Confianza',
    false,
    PHOTO_MARTINA,
    'Coach de productividad',
    7,
    [
      { type: 'paragraph', text: 'La confianza no es un don con el que naces: se construye con acciones pequeñas y valientes que te demuestran que puedes. Cada paso que das, por mínimo que sea, la alimenta.' },
      { type: 'heading', text: 'Confía antes de sentirte lista' },
      { type: 'paragraph', text: 'No esperes a estar segura para actuar; actúa y la seguridad llegará después. Empieza por compromisos contigo que siempre cumplas: honrarte a ti misma es el cimiento de toda confianza.' },
      { type: 'image', uri: IMG_DESK },
      { type: 'quote', text: 'La confianza se acumula en cada promesa que te cumples a ti misma.' },
      { type: 'paragraph', text: 'Reconoce tus avances y aprende de los tropiezos sin castigarte. Quien camina a su propio ritmo, llega más lejos.' },
    ]
  ),
];

export const articles: Article[] = [
  ...autocuidadoArticles,
  ...equilibrioArticles,
  ...autoestimaArticles,
];

export function getArticleById(id: string): Article | undefined {
  return articles.find((a) => a.id === id);
}
