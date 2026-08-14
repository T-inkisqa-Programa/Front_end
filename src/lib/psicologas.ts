export type Psicologa = {
  id: string;
  name: string;
  specialty: string;
  approach: string;
  verified: boolean;
  photo: string;
  experienceYears: number;
  location: string;
  rating: number;
  about: string;
  specialties: string[];
  whatsapp: string;
};

export const psicologas: Psicologa[] = [
  {
    id: '1',
    name: 'María Fernanda López',
    specialty: 'Terapia Cognitivo-Conductual',
    approach: 'Terapia Cognitivo-Conductual (TCC)',
    verified: true,
    photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80',
    experienceYears: 8,
    location: 'Lima',
    rating: 4.9,
    about: 'Soy psicóloga clínica con 8 años de experiencia acompañando a mujeres en procesos de autoconocimiento y transformación personal. Formada en Terapia Cognitivo-Conductual, mi método combina técnicas basadas en evidencia con un espacio cálido y sin juicios. Creo en un proceso terapéutico estructurado, donde cada sesión tiene un objetivo claro y herramientas prácticas para tu día a día.',
    specialties: ['Ansiedad', 'Autoestima', 'Gestión del estrés', 'Empoderamiento'],
    whatsapp: '51987654321',
  },
  {
    id: '2',
    name: 'Ana Lucía Castillo',
    specialty: 'Psicología Humanista',
    approach: 'Psicología Humanista',
    verified: true,
    photo: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=400&q=80',
    experienceYears: 10,
    location: 'Cusco',
    rating: 5.0,
    about: 'Psicóloga humanista con más de 10 años de experiencia, especializada en el acompañamiento desde el enfoque centrado en la persona. Mi trabajo parte de la escucha profunda y la conexión genuina, integrando tus valores y cultura para que el cambio sea propio y sostenible. Acompaño procesos de duelo, autoestima, vínculos y crecimiento personal.',
    specialties: ['Autoestima', 'Empoderamiento', 'Crecimiento personal', 'Duelo'],
    whatsapp: '51984567890',
  },
  {
    id: '3',
    name: 'Valeria Mendoza Rivas',
    specialty: 'Terapia Familiar y de Pareja',
    approach: 'Enfoque Sistémico-Familiar',
    verified: true,
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    experienceYears: 12,
    location: 'Arequipa',
    rating: 4.8,
    about: 'Psicoterapeuta sistémica con 12 años de trayectoria trabajando con familias, parejas y redes de apoyo. Considero que los problemas no nacen ni se resuelven en soledad, por eso trabajo los vínculos y los patrones de comunicación. Mi metodología es participativa: juntas observamos, comprendemos y transformamos las dinámicas que generan malestar.',
    specialties: ['Terapia de pareja', 'Vínculos familiares', 'Comunicación asertiva', 'Ansiedad'],
    whatsapp: '51991234567',
  },
  {
    id: '4',
    name: 'Carolina Jiménez Vega',
    specialty: 'Psicología Infantil',
    approach: 'Psicología Infantil y Adolescente',
    verified: true,
    photo: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?auto=format&fit=crop&w=400&q=80',
    experienceYears: 6,
    location: 'Lima',
    rating: 4.9,
    about: 'Psicóloga especializada en infancia y adolescencia, con 6 años de experiencia. Acompaño a niñas, niños y adolescentes a gestionar sus emociones, fortalecer su autoestima y transitar los cambios con seguridad. Trabajo de la mano con las familias, ofreciendo un espacio lúdico y seguro donde cada persona pueda expresarse libremente.',
    specialties: ['Autoestima', 'Manejo emocional', 'Empoderamiento', 'Ansiedad'],
    whatsapp: '51999887766',
  },
];

export function getPsicologaById(id: string): Psicologa | undefined {
  return psicologas.find((p) => p.id === id);
}
