import type { Testimonio } from '../domain/testimonio';

export const testimonios: Testimonio[] = [
  {
    id: 't1',
    age: 24,
    time: 'Hace 2 horas',
    title: 'Empecé a priorizarme y todo cambió',
    text: 'Durante años cuidé a todos menos a mí. Siempre fui la primera en escuchar, la que resolvía, la que estaba para los demás aunque yo estuviera cayéndome. Hoy puedo decir que poner límites no me hizo mala persona, me hizo libre.\n\nAprendí que decir «no» a tiempo es un sí a mi paz. Dejé de responder mensajes que me agotaban, empecé a reservar tiempo solo para mí y poco a poco la ansiedad bajó. No fue un cambio de la noche a la mañana, pero cada pequeña decisión sumó.\n\nGracias a esta comunidad por darme el valor de empezar. Si estás leyendo esto y te sientes agotada de dar sin recibir, quiero que sepas: tú también puedes elegirte.',
    likes: 24,
    saved: false,
    mood: { label: 'Feliz', emoji: '😊', color: '#F59E0B' },
    comments: [
      {
        id: 'c1',
        age: 28,
        time: 'Hace 1 hora',
        text: 'Gracias por compartir esto, me dio fuerzas hoy.',
      },
      {
        id: 'c2',
        age: 35,
        time: 'Hace 2 horas',
        text: 'Me identifiqué muchísimo con tu historia. Poner límites también es amor propio.',
      },
      {
        id: 'c3',
        age: 22,
        time: 'Hace 3 horas',
        text: 'Elegirte a ti también es valentía. Gracias por recordármelo.',
      },
    ],
  },
  {
    id: 't2',
    age: 31,
    time: 'Hace 5 horas',
    title: 'Superando el miedo a decir que no',
    text: 'Siempre temí decepcionar a los demás. Un «sí» por obligación me costó años de cansancio, culpa y de perder de vista lo que yo quería.\n\nEmpecé a practicar frases sencillas: «no puedo comprometerme ahora», «necesito espacio para decidir», «hoy no». Al principio me temblaba la voz, pero cada vez fue más fácil. Aprendí que un «no» dicho con amor protege mi energía y también mis relaciones.\n\nLa gente que realmente me quiere entendió. La que no, se fue, y ese vacío lo llené con personas que respetan mis límites. Si estás en esa etapa, confía: se puede.',
    likes: 31,
    saved: true,
    mood: { label: 'Fuerte', emoji: '💪', color: '#8B5CF6' },
    comments: [
      {
        id: 'c1',
        age: 26,
        time: 'Hace 3 horas',
        text: '«El no es un sí a mí misma». Me llevo esa frase conmigo.',
      },
      {
        id: 'c2',
        age: 40,
        time: 'Hace 4 horas',
        text: 'Necesitaba leer esto hoy. Gracias por tu valentía.',
      },
    ],
  },
  {
    id: 't3',
    age: 19,
    time: 'Hace 1 día',
    title: 'Mi primera vez pidiendo ayuda',
    text: 'Pensé que pedir ayuda era señal de debilidad. Que tenía que resolverlo sola, que mis problemas no eran «suficientes» para molestar a nadie.\n\nUn día no pude más y le conté a mi mamá cómo me sentía. Lloré y hablé sin filtros. Luego busqué a una terapeuta. Fue todo lo contrario a lo que imaginaba: fue mi acto más valiente.\n\nHablar con mi familia y con una profesional cambió mi vida por completo. Ahora sé que pedir ayuda es un acto de fuerza, no de debilidad. Si tienes miedo de hablar, no estás sola: el primer paso es el más difícil y también el más liberador.',
    likes: 45,
    saved: false,
    mood: { label: 'Ansiosa', emoji: '😟', color: '#EF4444' },
    comments: [
      {
        id: 'c1',
        age: 18,
        time: 'Hace 8 horas',
        text: 'Gracias, justo necesitaba leer que pedir ayuda no es débil.',
      },
      {
        id: 'c2',
        age: 30,
        time: 'Hace 10 horas',
        text: 'Qué valiente, compartir esto a los 19. Admiro tu fuerza.',
      },
      {
        id: 'c3',
        age: 25,
        time: 'Hace 12 horas',
        text: 'Pedir ayuda me salvó la vida. Me alegra mucho que lo hayas hecho.',
      },
    ],
  },
  {
    id: 't4',
    age: 27,
    time: 'Hace 2 días',
    title: 'Aprender a querer mi cuerpo',
    text: 'Durante mucho tiempo mi cuerpo fue mi enemigo. Lo comparaba, lo criticaba, le pedía ser diferente. Cada espejo era un juicio.\n\nNo fue de la noche a la mañana, pero cada día elijo hablarme con cariño frente al espejo. Dejé de hacer dieta por castigo y empecé a moverme por placer. Vestirme se volvió un ritual de autocuidado y no una batalla.\n\nMi cuerpo no es mi enemigo: es mi hogar, y lo estoy cuidando. La autoestima se construye con pequeñas decisiones diarias, y hoy decido amarme como soy.',
    likes: 18,
    saved: false,
    mood: { label: 'Feliz', emoji: '😊', color: '#F59E0B' },
    comments: [
      {
        id: 'c1',
        age: 29,
        time: 'Hace 1 día',
        text: '«Es mi hogar y lo estoy cuidando». Me hizo llorar de la manera más bonita.',
      },
      {
        id: 'c2',
        age: 23,
        time: 'Hace 1 día',
        text: 'Estoy en esa etapa, gracias por dar esperanza.',
      },
    ],
  },
];

export function getTestimonioById(id: string): Testimonio | undefined {
  return testimonios.find((t) => t.id === id);
}
