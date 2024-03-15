// ~/components/_core/ReactHookForm/RadioGroup.tsx
import React from 'react';
import type { UseFormReturn, FieldPath } from 'react-hook-form';
import type { z } from 'zod';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { RadioGroup as ShadcnRadioGroup, RadioGroupItem } from '~/components/ui/radio-group';

interface RadioGroupProps<T extends z.ZodTypeAny> {
  name: FieldPath<z.infer<T>>;
  form: UseFormReturn<z.infer<T>>;
  label: string;
  options: { value: string; label: string }[];
}

export const RadioGroup = <T extends z.ZodTypeAny>({
  name,
  form,
  label,
  options,
}: RadioGroupProps<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <ShadcnRadioGroup {...field}>
              {options.map(option => (
                <RadioGroupItem key={option.value} value={option.value}>{option.label}</RadioGroupItem>
              ))}
            </ShadcnRadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};