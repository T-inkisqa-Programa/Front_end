import type { Racha } from '../domain/racha';

const racha: Racha = {
  current: 7,
  best: 12,
  totalDays: 45,
  days: [
    { id: 'd1', label: 'MAR', active: true },
    { id: 'd2', label: 'MIÉ', active: true },
    { id: 'd3', label: 'JUE', active: true },
    { id: 'd4', label: 'VIE', active: true },
    { id: 'd5', label: 'SÁB', active: true },
    { id: 'd6', label: 'DOM', active: true },
    { id: 'd7', label: 'LUN', active: true, isToday: true },
  ],
  message: '¡Sigue así! Has compartido algo cada día de la semana.',
};

export function getRacha(): Racha {
  return racha;
}