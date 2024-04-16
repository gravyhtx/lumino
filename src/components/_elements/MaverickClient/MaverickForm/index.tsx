// ~/components/MaverickForm.tsx
import React from 'react';
// import { z } from 'zod';
// import ReactHookForm, { Checkbox, Input, RadioGroup, Submit } from '~/components/_core/ReactHookForm';
// import type { UseFormReturn } from 'react-hook-form';

// const schema = z.object({
//   firstName: z.string().min(2, 'First name must be at least 2 characters'),
//   lastName: z.string().min(2, 'Last name must be at least 2 characters'),
//   companyName: z.string().min(2, 'Company name must be at least 2 characters'),
//   productService: z.string().min(2, 'Product/Service must be at least 2 characters'),
//   email: z.string().email('Invalid email address'),
//   phone: z.string().min(10, 'Phone number must be at least 10 characters'),
//   website: z.string().min(4, 'Website must be at least 4 characters'),
//   currentlyProcessing: z.string(),
//   monthlyProcessingVolume: z.string().min(1, 'Monthly processing volume must be at least 1 character'),
//   agreeTerms: z.boolean(),
// });

// type FormData = z.infer<typeof schema>;

type FormProps = {
  submit: React.ReactNode;
  height?: string;
};

const MaverickForm: React.FC<FormProps> = ({ submit, height }) => {
  // const onSubmit = (data: FormData) => {
  //   // Handle form submission here
  //   console.log(data);
  // };

  return (<>
    <h3>Apply Now</h3>
    <br />
    {/* <ReactHookForm schema={schema} onSubmit={onSubmit}>
      {(form: UseFormReturn<FormData>) => (
        <>
          <Input name="firstName" label="First Name*" placeholder="First Name" form={form} />
          <Input name="lastName" label="Last Name*" placeholder="Last Name" form={form} />
          <Input name="companyName" label="Company Name*" placeholder="Company Name (DBA)" form={form} />
          <Input name="productService" label="Product/Service Sold" placeholder="Product/Service Sold" form={form} />
          <Input name="email" label="Email*" placeholder="Email" form={form} />
          <Input name="phone" label="Phone*" placeholder="Phone" form={form} />
          <Input name="website" label="Website*" placeholder="Website" form={form} />
          <RadioGroup
            name="currentlyProcessing"
            form={form}
            label="Currently Processing?"
            options={[
              { value: 'Yes', label: 'Yes' },
              { value: 'No', label: 'No' },
            ]}
          />
          <Input
            name="monthlyProcessingVolume"
            label="Monthly Processing Volume ($)*"
            placeholder="Monthly Processing Volume"
            form={form}
          />
          <Checkbox
            name="agreeTerms"
            form={form}
            label="I agree to terms & conditions provided by the company. By providing my phone number, I agree to receive text messages from the business."
          />
          { submit }
        </>
      )}
    </ReactHookForm> */}
    <iframe style={{height: height??'1000px', border: "none"}} src="https://lumino.isoquote.com/campaigns/06b885de-0b0f-4d8c-bc18-72b8c13f3749?embed=true" width="100%" height="600px" />
    {submit}
  </>);
};

export default MaverickForm;