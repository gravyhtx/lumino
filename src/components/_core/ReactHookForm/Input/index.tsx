// ~/components/_core/ReactHookForm/Input/index.tsx
import React from 'react';
import type { UseFormReturn, FieldPath } from 'react-hook-form';
import type { z } from 'zod';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { Input as ShadcnInput } from '~/components/ui/input';

interface InputProps<T extends z.ZodTypeAny> {
  name: FieldPath<z.infer<T>>;
  form: UseFormReturn<z.infer<T>>;
  label?: string;
  description?: string;
  placeholder?: string;
  properties?: React.InputHTMLAttributes<HTMLInputElement>;
}

export const Input = <T extends z.ZodTypeAny>({
  name,
  form,
  label,
  description,
  placeholder,
  properties
}: InputProps<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem style={{textAlign: 'left'}}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <ShadcnInput placeholder={placeholder??""} {...properties} {...field} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};