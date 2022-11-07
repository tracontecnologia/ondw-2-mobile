function toBRL(value: number) {
  return Intl.NumberFormat('pt-br', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

export const NumberHelper = {
  toBRL,
};
