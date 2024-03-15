// ~/components/_core/ReactHookForm/Submit/index.tsx
import React from 'react';
import { Button } from '~/components/ui/button';

interface SubmitProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

export const Submit = ({ text, ...buttonProps }: SubmitProps) => {
  return <Button type="submit" {...buttonProps}>{text}</Button>;
};