// ~/components/_core/ReactHookForm/index.tsx
import React from 'react';
import type { ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import type { UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';
import { Form } from '~/components/ui/form';

interface FormProps<T extends z.ZodTypeAny> {
  schema: T;
  children: (form: UseFormReturn<z.infer<T>>) => ReactNode;
  onSubmit: (data: z.infer<T>) => void;
}

/**
 * A reusable form component that handles form state and validation using react-hook-form and zod.
 * @param {Object} props - The component props.
 * @param {z.ZodTypeAny} props.schema - The Zod schema for form validation.
 * @param {ReactNode} props.children - The child elements to be rendered inside the form.
 * @param {SubmitHandler<z.infer<T>>} props.onSubmit - The callback function to handle form submission.
 * @returns {JSX.Element} - The rendered Form component.
 */
const ReactHookForm = <T extends z.ZodTypeAny>({
  schema,
  children,
  onSubmit,
}: FormProps<T>) => {
  const form = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
  });

  return (
    <Form {...form}>
      <form style={{width: '100%'}} onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {children(form)}
      </form>
    </Form>
  );
};

export * from './Input';
export * from './Submit';
export * from './Checkbox';
export * from './RadioGroup';
export default ReactHookForm;