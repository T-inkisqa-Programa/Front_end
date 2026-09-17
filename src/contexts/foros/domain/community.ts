export type Community = {
  id: string;
  name: string;
  description: string;
  image: string;
  category?: string;
  privacy?: 'publica' | 'privada';
  isUserCreated?: boolean;
};
