// 105.000
export const formatPrice = (sum: number, spec: string = '.') => {
  // TODO false payment case
  let parts = sum?.toString().split(spec);
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, spec);
  return parts.join(spec);
}

export const formatDate = (dateString: string, lang: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };
  return new Date(dateString).toLocaleDateString(lang, options);
};
