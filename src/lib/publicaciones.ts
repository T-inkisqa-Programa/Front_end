export type CommunityPost = {
  id: string;
  author: string;
  avatar: string;
  date: string;
  minutesAgo: number;
  tag: string;
  content: string;
  isQuote: boolean;
  likes: number;
  comments: number;
  saved: boolean;
  isMine: boolean;
};

export const posts: CommunityPost[] = [
  {
    id: '1',
    author: 'Valeria M.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
    date: 'Hace 2 horas',
    minutesAgo: 120,
    tag: 'Idea Compartida',
    content: 'Hoy en la escuela una compañera me dijo que le gustaría aprender más sobre cómo manejar el estrés antes de los exámenes. ¿A alguien más le pasa? Me encantaría que compartamos tips 💪',
    isQuote: false,
    likes: 24,
    comments: 7,
    saved: false,
    isMine: true,
  },
  {
    id: '2',
    author: 'Camila R.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80',
    date: 'Hace 1 día',
    minutesAgo: 1440,
    tag: '',
    content: '"No tienes que ser perfecta para ser increíble. Cada pequeño paso que das hacia tus sueños ya te hace más fuerte de lo que imaginas." ✨',
    isQuote: true,
    likes: 56,
    comments: 12,
    saved: true,
    isMine: false,
  },
  {
    id: '3',
    author: 'Sofía G.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
    date: 'Hace 3 días',
    minutesAgo: 4320,
    tag: 'Idea Compartida',
    content: 'Ayer me animé a hablar en la clase sobre mi proyecto de ciencia y recibí mucho apoyo. Si están dudando en alzar la voz, háganlo. Su opinión importa 💜',
    isQuote: false,
    likes: 42,
    comments: 9,
    saved: false,
    isMine: false,
  },
  {
    id: '4',
    author: 'Valeria M.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
    date: 'Hace 5 días',
    minutesAgo: 7200,
    tag: 'Pregunta',
    content: '¿Alguien ha probado técnicas de respiración para calmar los nervios? Estoy buscando nuevas herramientas para usarlas antes de hablar en público.',
    isQuote: false,
    likes: 9,
    comments: 3,
    saved: false,
    isMine: true,
  },
];
