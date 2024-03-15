export interface MaverickClientOptions {
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