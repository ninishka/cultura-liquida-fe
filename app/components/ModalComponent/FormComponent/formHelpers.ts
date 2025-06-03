import { Country, State, City } from 'country-state-city';

export const states = State.getStatesOfCountry('CO')?.map(({name, isoCode}) => ({
    value: isoCode,
    label: name
  }))

export const cities = (x?: string) => City.getCitiesOfState('CO', x)?.map(({name}) => ({
value: name,
label: name
}));

export const nameSurnameValidator = [
  {
    required: true,
    message: 'Este campo es obligatorio',
  },
  {
    validator: (rule, value) => { 
      const letterAndSpaceRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñüÜ'’´\- ]+$/;
      
      if (!letterAndSpaceRegex.test(value)) {
        return Promise.reject(
          new Error('Solo se permiten letras y espacios.')
        );
      }
      
      return Promise.resolve();
    },
  },
]

export const IdNumberValidator = [
  {
    required: true,
    message: 'Por favor, ingrese un número de identificación.',
  },
  {
    validator: (rule, value) => {
    const numberRegex = /^\d*$/;

      if (!numberRegex.test(value)) {
        return Promise.reject(
          new Error('Solo se permiten números enteros sin decimales.')
        );
      }

      return Promise.resolve();
    },
  }
]

export const phoneNumberValidator = [
  {
    required: true,
    message: 'Por favor, ingrese un número de teléfono.',
  },
  {
    validator: (rule, value) => {
      const cleanedValue = value.replace(/\s+/g, '') // remove spaces
      .replace(/[+\-]/g, '') // remove all + and -

      if (!/^\d*$/.test(cleanedValue)) {
        return Promise.reject(
          new Error('Solo se permiten números enteros sin decimales.')
        );
      }

      if (cleanedValue.length < 10 || cleanedValue.length > 12) {
        console.log('if')
        // valid variands: 
        // 3107217798
        // 03107217798
        // +573107217798
        // + 573107217798
        // + 57 310 7217 798
        // + 57-310-7217-798
        return Promise.reject(
          new Error('El número de identificación debe tener entre 10 y 12 caracteres.')
        );
      }

      return Promise.resolve();
    },
  }
]

export const termsAndCondidtionsValidator = [
    {
      validator: (_, value) => {
        if (!value) {
          return Promise.reject('Debes aceptar los términos y condiciones');
        }
        return Promise.resolve();
      },
    },
  ]
