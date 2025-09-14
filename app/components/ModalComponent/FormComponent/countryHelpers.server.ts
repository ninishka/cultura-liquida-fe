export const getStates = async () => {
  const { State } = await import('country-state-city');
  return State.getStatesOfCountry('CO')?.map(({ name, isoCode }) => ({
    value: isoCode,
    label: name,
  }));
};

export const getCities = async (x?: string) => {
  const { City } = await import('country-state-city');
  return City.getCitiesOfState('CO', x)?.map(({ name }) => ({
    value: name,
    label: name,
  }));
}; 