import Card from "~/components/Card";
import BarGraph from "~/components/Dashboard/BarGraph";
import QuickView from "~/components/Dashboard/QuickView";
import RecentSales from "~/components/Dashboard/RecentSales";
import Login from "~/components/Login";
import Section from "~/components/_core/Section";
import Dashboard from "~/layouts/Dashboard";
import { classnames } from "~/utils/global";
import styles from "./styles/index.module.css";
import { LogoSvg } from "~/components/_elements/Logo/LogoSvg";
import MaverickForm from "~/components/MaverickClient/MaverickForm";
import { Submit } from "~/components/_core/ReactHookForm";
import { useState } from "react";
import type { APIErrorResponse, Documents } from "~/schema";
import AffiliateForm from "~/components/MaverickClient/AffiliateForm";

export default function Home () {
  const Continue = () => <Submit text="Continue" onClick={() => setStep([2,0])} />;
  const [step, setStep] = useState<[number,number]>([0,0]);
  // const fetchBoardingAppDocuments = async (applicationId: string): Promise<Documents> => {
  //   const response = await fetch(`/api/boarding-applications/${applicationId}/documents`);
  
  //   if (!response.ok) {
  //     const errorData = await response.json() as APIErrorResponse;
  //     throw new Error(errorData.message);
  //   }
  
  //   const documents = await response.json() as Documents;
  //   return documents;
  // };
  // console.log(fetchBoardingAppDocuments('5828'))
  return (
    <Dashboard loggedIn={step[0] === 2} logout={() => setStep([0,0])}>
      <Section>
        {step[0] === 2 && <>
        <div className={styles.quickView}>
          <QuickView margin={"0 1rem"} />
        </div>
        <div className={classnames("grid grid-cols-1 lg:grid-cols-[7fr_3fr] gap-8", styles.containers)}>
          <div className="w-full lg:col-span-1">
            <Card text={{header: "Gross Sales"}}>
            <BarGraph />
            </Card>
          </div>
          <div className="w-full lg:col-span-1">
            <Card text={{header: "Recent Transactions"}}>
            <RecentSales />
            </Card>
          </div>
        </div></>}
        {step[0] === 0 && <div className={classnames("auth")}>
          <Login onclick={() => setStep([2,0])} />
          {/* <div style={{padding: '20px'}}>
            <h4 style={{fontWeight: 'bold'}}>Already a Member?</h4>
            <div onClick={() => setStep([1,0])}>Register</div>
            <div onClick={() => setStep([1,1])}>Register</div>
          </div> */}
        </div>}
        {step[0] === 1 &&
          <>
            {step[1] === 0 && <Card style={{padding: '30px 60px', width: '600px'}}><MaverickForm submit={<Continue />} /></Card>}
            {step[1] === 1 && <Card style={{padding: '30px 60px', width: '600px'}}><AffiliateForm submit={<Continue />} /></Card>}
          </>}
        {step[0] === 0 && <>
          <div style={{padding: '20px', fontSize: '1rem'}}>
            {/* <h4 style={{fontWeight: 'bold'}}>Not a Lumino Merchant?</h4> */}
            <div style={{fontWeight: 'bold'}} onClick={() => setStep([1,0])}>New to Lumino?</div>
            <div style={{fontWeight: ''}} onClick={() => setStep([1,1])}>Become a Lumino partner</div>
          </div>
        </>}
        {step[0] === 1 && <>
          <div style={{padding: '20px', fontSize: '1rem', marginBottom: '50px'}}>
            <h4 onClick={() => setStep([0,0])} style={{fontWeight: 'bold'}}>Already a Member?</h4>
            {/* <div onClick={() => setStep([0,0])}>Login</div> */}
          </div>
        </>}
      </Section>
    </Dashboard>
  );
}