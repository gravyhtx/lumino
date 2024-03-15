// ~/components/_core/ReactHookForm/Checkbox.tsx
import React from 'react';
import type { UseFormReturn, Path } from 'react-hook-form';
import type { z } from 'zod';
import { Checkbox as ShadcnCheckbox } from '~/components/ui/checkbox';

interface CheckboxProps<T extends z.ZodTypeAny> {
  name: Path<z.infer<T>>;
  form: UseFormReturn<z.infer<T>>;
  label: string;
}

export const Checkbox = <T extends z.ZodTypeAny>({
  name,
  form,
  label,
}: CheckboxProps<T>) => {
  return (
    <div style={{ textAlign: 'left', margin: '1rem 0' }}>
      <ShadcnCheckbox {...form.register(name)}>{label}</ShadcnCheckbox>
    </div>
  );
};