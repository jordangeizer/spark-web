import type { UseFormReturn } from 'react-hook-form';

export const formFieldError = <T>(form: UseFormReturn<T>, key: keyof T) => {
  const error = form.formState.errors[key];
  if (error) {
    return {
      message: error.message,
      tone: 'critical' as const,
    };
  }
};

export const fakeSubmit = async (data: unknown) => {
  console.log('Submit', data);
  await new Promise(resolve => setTimeout(resolve, 1000));
  if (Math.random() >= 0.5) {
    throw new Error(
      'This is an example of an error occurring on submit. Try submitting again.'
    );
  }
};
