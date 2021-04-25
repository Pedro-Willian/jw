export enum Periodo {
  MADRUGADA = 'MADRUGADA',
  MANHA = 'MANHA',
  TARDE = 'TARDE',
  NOITE = 'NOITE',
}

export const periodoOptions = [
  { value: Periodo.MADRUGADA, label: 'Madrugada' },
  { value: Periodo.MANHA, label: 'Manhã' },
  { value: Periodo.TARDE, label: 'Tarde' },
  { value: Periodo.NOITE, label: 'Noite' },
];
