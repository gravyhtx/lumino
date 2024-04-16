declare global {
  interface Window {
    MaverickClient: new (options: MaverickClientOptions) => void;
    webroot?: string;
  }

  interface MaverickClientOptions {
    target: HTMLElement;
    url?: string;
    options: {
      id: string;
      agentId: string;
      referral: string;
      title: string;
      theme: 'dark' | 'light';
      label: string;
    };
  }
}

// Ensure this file is a module by exporting an empty object
export {};