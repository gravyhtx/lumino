import React, { useEffect, useRef } from 'react';
import type { MaverickClientOptions } from '../types';

declare global {
  interface Window {
    MaverickClient: new (options: MaverickClientOptions) => void;
    webroot?: string;
  }
}

const MaverickClientForm: React.FC = () => {
  const maverickRef = useRef<HTMLDivElement>(null); // Create a ref for the div

  useEffect(() => {
    const loadMaverickClient = () => {
      if (maverickRef.current) {
        new window.MaverickClient({
          target: maverickRef.current,
          options: {
            id: '1014',
            agentId: '143310',
            referral: '699',
            title: '',
            theme: 'dark',
            label: 'true',
          },
        });
      }
    };
  
    if (typeof window.MaverickClient === 'undefined') {
      window.webroot = "https://dashboard.maverickpayments.com";
      const script = document.createElement('script');
      script.async = true;
      script.src = `${window.webroot}/js/campaign/client.js?v=${Date.now()}`;
      document.head.appendChild(script);
  
      // Use 'load' event listener for script loading
      script.onload = () => {
        loadMaverickClient();
      };
    } else {
      loadMaverickClient();
    }
  }, []);
  

  return <div ref={maverickRef}></div>; // Apply the ref to the div
};

export default MaverickClientForm;
