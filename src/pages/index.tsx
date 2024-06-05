/* eslint-disable @typescript-eslint/no-unsafe-call */
import Dashboard from "~/layouts/Dashboard";
import { useEffect, useState } from "react";
import Card from "~/components/card";
import { BarGraph, QuickView, RecentSales } from "~/components/dashboard";
import Login from "~/components/_elements/Login";
import Section from "~/components/_core/Section";
import AffiliateForm from "~/components/_elements/MaverickClient/AffiliateForm";
import MaverickForm from "~/components/_elements/MaverickClient/MaverickForm";
import { Submit } from "~/components/_core/ReactHookForm";
// import { getBoardingApplications, getCustomerVault, getGHLAuth, getPayments, viewBoardingApplication } from "~/utils/API";
import { getBoardingApplications, getCustomerVault, getPayments, viewBoardingApplication } from "~/utils/API";
// UTILS
import { classnames } from "~/utils/global";
import type { BoardingApplicationsResponse } from "~/types/_maverick";
import styles from "./styles/index.module.css";
import { signIn } from "next-auth/react";

export default function Home () {
  const [step, setStep] = useState<[number,number]>([0,0]);
  const [boardingApplications, setBoardingApplications] = useState<BoardingApplicationsResponse | null>(null);
  const [viewApp, setViewApp] = useState<unknown>(null);
  const [payments, setPayments] = useState<unknown>(null);
  const [customerVault, setCustomerVault] = useState<unknown>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  // const [ghlAuth, setGHLAuth] = useState<unknown>(null);

  const handleSignIn = async () => {
    try {
      await signIn('appauth', { callbackUrl: '/api/auth/callback/appauth' });
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        // const ghlAuthURL: unknown = await getGHLAuth();
        // console.log(ghlAuthURL);
        // setGHLAuth(ghlAuthURL);
        const boardingAppsData: unknown = await getBoardingApplications();
        setBoardingApplications(boardingAppsData as BoardingApplicationsResponse);
        const viewData: unknown = await viewBoardingApplication('5879');
        setViewApp(viewData);
        const paymentsData: unknown = await getPayments();
        setPayments(paymentsData);
        const customerVaultData: unknown = await getCustomerVault();
        setCustomerVault(customerVaultData);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData().catch((error) => {
      console.error('Error fetching data:', error);
    });
  }, []);
  
  // console.log(ghlAuth);
  console.log(boardingApplications);
  console.log(viewApp);
  console.log(payments);
  console.log(customerVault);
  console.log(error);
  console.log(loading);
  
  const Continue = () => <Submit text="Continue" onClick={() => setStep([2,0])} />;

  const subscriptions: number = Number(boardingApplications?._meta?.totalCount) ?? 0;
  const quickViewData: [string, string, string, string] = ['$45,231.89', `+${subscriptions}`??'--', '+12,234', '+537'];
  return (
    <Dashboard loggedIn={step[0] === 2} logout={() => setStep([0,0])}>
      <Section>
        {step[0] === 2 && <>
        <div className={styles.quickView}>
          <QuickView value={quickViewData} margin={"0 1rem"} />
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
        </div>}
        {step[0] === 1 &&
          <>
            {step[1] === 0 && <Card style={{padding: '30px 60px', width: '600px'}}><MaverickForm submit={<Continue />} /></Card>}
            {step[1] === 1 && <Card style={{padding: '30px 60px', width: '600px'}}><AffiliateForm submit={<Continue />} /></Card>}
          </>}
        {step[0] === 0 && <>
          <div style={{padding: '20px', fontSize: '1rem'}}>
            <div style={{fontWeight: 'bold'}} onClick={() => setStep([1,0])}>New to Lumino?</div>
            <div style={{fontWeight: 'normal'}} onClick={() => setStep([1,1])}>Become a Lumino partner</div>
          </div>
        </>}
        {step[0] === 1 && <>
          <div style={{padding: '20px', fontSize: '1rem', marginBottom: '50px'}}>
            <h4 onClick={() => setStep([0,0])} style={{fontWeight: 'bold'}}>Already a Member?</h4>
          </div>
        </>}
        <button onClick={handleSignIn}>Sign In with GoHighLevel</button>
      </Section>
    </Dashboard>
  );
}