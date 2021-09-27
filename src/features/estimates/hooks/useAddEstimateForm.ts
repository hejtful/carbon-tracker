import React, { useState } from 'react';

import {
  AddEstimatePayload,
  Country,
  ElectricityUnit,
} from '../estimatesTypes';
import { countries } from '../constants';

interface Values {
  location: string;
  usage: string;
  unit: ElectricityUnit | '';
}

interface Errors {
  location?: string;
  usage?: string;
  unit?: string;
}

const initialFormValues: Values = {
  location: '',
  usage: '',
  unit: '',
};

export const errorsMessages = {
  locationRequired: 'Location field is required.',
  usageRequired: 'Electricity usage field is required.',
  usageMoreThanZero: 'Electricity usage must be more than 0.',
  unitRequired: 'Unit field is required.',
};

export const useAddEstimateForm = () => {
  const [values, setValues] = useState(initialFormValues);
  const [errors, setErrors] = useState<Errors>({});

  const validate = (fieldValues: Partial<Values> = values) => {
    let temp: Errors = { ...errors };

    if ('location' in fieldValues) {
      temp.location = fieldValues.location
        ? ''
        : errorsMessages.locationRequired;
    }

    if ('usage' in fieldValues) {
      temp.usage = fieldValues.usage ? '' : errorsMessages.usageRequired;
      if (fieldValues.usage) {
        temp.usage =
          Number(fieldValues.usage) > 0 ? '' : errorsMessages.usageMoreThanZero;
      }
    }

    if ('unit' in fieldValues) {
      temp.unit = fieldValues.unit ? '' : 'Unit field is required.';
    }

    setErrors({
      ...temp,
    });
  };

  const handleInput = (
    event:
      | React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
      | React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    if (!name) return;
    setValues({
      ...values,
      [name]: value,
    });
    validate({ [name]: value });
  };

  const handleSubmit =
    (onSubmit: (payload: AddEstimatePayload) => void) =>
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (isFormValid()) {
        const { location, usage, unit } = values;
        const countryCode = (
          countries.find((country) => country.label === location) as Country
        ).code;

        onSubmit({
          type: 'electricity',
          electricity_unit: unit as ElectricityUnit,
          electricity_value: Number(usage),
          country: countryCode,
        });
      }
    };

  const isFormValid = (fieldValues = values): boolean | '' => {
    const isValid =
      fieldValues.location &&
      fieldValues.usage &&
      fieldValues.unit &&
      Object.values(errors).every((x) => x === '');

    return isValid;
  };

  return {
    handleInput,
    handleSubmit,
    isFormValid,
    errors,
  };
};
