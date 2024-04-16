export type Verification = {
  cvv?: string;
  address?: string;
};

export type Card = {
  bin?: number;
  name?: string;
  number?: number;
  exp: string;
  verification?: Verification;
  networkTransactionId?: string;
};

export type Contact = {
  name?: string;
  phone?: string;
  email?: string;
};

export type Location = {
  city?: string;
  state?: string;
  country?: string;
  zip?: string;
};

export type IPInfo = {
  isAnonymous?: string;
  isAnonymousVpn?: string;
  isPublicProxy?: string;
  isHostingProvider?: string;
  isTorExitNode?: string;
};

export type IP = {
  address?: string;
  isp?: string;
  type?: string;
  location?: Location;
  info?: IPInfo;
};

export type Status = {
  status?: string;
  reason?: string;
};

export type Batch = {
  id?: number;
  number?: number;
  batchedOn?: string;
};

export type PaymentItem = {
  id: number;
  amount: string;
  origin?: string;
  type?: string;
  level?: number;
  authCode?: string;
  parent?: { id?: number };
  terminal?: { id: number };
  threeds?: { id?: number };
  card?: Card;
  contact?: Contact | null;
  externalId?: unknown;
  isRecurring?: string;
  split?: unknown;
  refunded?: boolean;
  captured?: boolean;
  history?: unknown[];
  order?: unknown;
  feeTransaction?: unknown;
  batch?: Batch;
  ip?: IP;
  status?: Status;
  updatedOn: string;
  createdOn: string;
};

export type PaymentsResponseLinks = {
  self?: { href: string };
  first?: { href: string };
  last?: { href: string };
  next?: { href: string };
};

export type PaymentsResponse = {
  items: PaymentItem[];
  _links: PaymentsResponseLinks;
};
