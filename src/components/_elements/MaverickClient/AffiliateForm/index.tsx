// ~/components/MaverickForm.tsx
import React from 'react';
// import { z } from 'zod';
// import ReactHookForm, { Input, Submit } from '~/components/_core/ReactHookForm';
// import type { UseFormReturn } from 'react-hook-form';

// const schema = z.object({
//   fullName: z.string().min(2, 'Full name must be at least 2 characters'),
//   companyName: z.string().min(2, 'Company name must be at least 2 characters'),
//   productService: z.string().min(2, 'Product/Service must be at least 2 characters'),
//   email: z.string().email('Invalid email address'),
//   telephone: z.string().min(10, 'Telephone number must be at least 10 characters'),
// });

// type FormData = z.infer<typeof schema>;

type FormProps = {
  submit: React.ReactNode;
  height?: string;
};

const AffiliateForm: React.FC<FormProps> = ({ submit, height }) => {
  // const onSubmit = (data: FormData) => {
  //   // Handle form submission here
  //   console.log(data);
  // };

  return (<>
    <h3>Affiliate Application</h3>
    <br />
    {/* <ReactHookForm schema={schema} onSubmit={onSubmit}>
      {(form: UseFormReturn<FormData>) => (
        <>
          <Input name="fullName" label="Full Name" placeholder="Enter your full name" form={form} />
          <Input name="companyName" label="Company Name" placeholder="Enter your company name" form={form} />
          <Input name="productService" label="Product/Service Sold" placeholder="Enter the product/service sold" form={form} />
          <Input name="email" label="E-mail" placeholder="Enter your email address" form={form} />
          <Input name="telephone" label="Telephone Number" placeholder="Enter your telephone number" form={form} />
          { submit }
        </>
      )}
    </ReactHookForm> */}
    <iframe style={{height: height??'1000px', border: "none"}} src="https://lumino.isoquote.com/campaigns/06b885de-0b0f-4d8c-bc18-72b8c13f3749?embed=true" width="100%" height="600px" />
    {submit}
  </>);
};

export default AffiliateForm;