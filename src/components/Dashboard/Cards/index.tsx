import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { titlecase } from "~/utils/global";
import InfoCard from "./InfoCard";

type Timeframes = 'hour' | 'day' | 'week' | 'month' | 'quarter' | 'year';
type Amount = `${'+'|'-'|''}${'$'|''}${string}${'%'|''}`;
type Delta = `${'+'|'-'}${string}${'%'|''}`;
type DeltaType = {
  amount: [Delta, Delta, Delta, Delta];
  time: [Timeframes, Timeframes, Timeframes, Timeframes];
}

type InfoCardsProps = {
  timeframe?: Timeframes | [Timeframes, Timeframes, Timeframes, Timeframes];
  title?: [string, string, string, string];
  value?: [Amount, Amount, Amount, Amount];
  delta?: DeltaType;
}

const InfoCards: React.FC<InfoCardsProps> = ({timeframe, title, value, delta}): JSX.Element => {

  // const  = timeframe ?? 'quarter';
  title = title ?? ['Total Revenue', 'Subscriptions', 'Sales', 'Active Now'];
  value = value ?? ['$45,231.89', '+2350', '+12,234', '+537'];
  const deltaObj = {
    a: {amount: delta?.amount[0] ?? '+20.1%', time: delta?.time[0] ?? 'month'},
    b: {amount: '+180.1%', time: 'month'},
    c: {amount: '+19%', time: 'month'},
    d: {amount: '+201', time: 'hour'}
  };
  
  const timeframes = {
    hour: 'since last hour',
    day: 'today',
    week: 'this week',
    month: 'this month',
    quarter: 'in the past 3 months',
    year: 'this year'
  };

  const titleValue = (title: string) => `${titlecase(title.trim())}`;
  const amountValue = (amount: string) => `${amount.trim()}`;
  const deltaValue = (amount: string, time:string) => `${amount as Delta} ${timeframes[time as Timeframes]}`;

  return (<>
    <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
      <InfoCard title={titleValue(title[0])} amount={amountValue(value[0])} timeSince={deltaValue(deltaObj.a.amount, deltaObj.a.time)} />
      <InfoCard title={titleValue(title[1])} amount={amountValue(value[1])} timeSince={deltaValue(deltaObj.b.amount, deltaObj.b.time)} />
      <InfoCard title={titleValue(title[2])} amount={amountValue(value[2])} timeSince={deltaValue(deltaObj.c.amount, deltaObj.c.time)} />
      <InfoCard title={titleValue(title[3])} amount={amountValue(value[3])} timeSince={deltaValue(deltaObj.d.amount, deltaObj.d.time)} />
      {/* <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            {titleValue(title[0])}
          </CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {amountValue(value[0] ?? '$45,231.89')}
          </div>
          <p className="text-xs text-muted-foreground">
            +20.1% from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            {titleValue(title[1] ?? 'Subscriptions')}
          </CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {amountValue(value[1] ?? '+2350')}
          </div>
          <p className="text-xs text-muted-foreground">
            +180.1% from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
          {titleValue(title[2] ?? 'Sales')}
          </CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <rect width="20" height="14" x="2" y="5" rx="2" />
            <path d="M2 10h20" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {amountValue(value[2] ?? '+12,234')}
          </div>
          <p className="text-xs text-muted-foreground">
            {deltaValue(delta[0].amount ?? '+19%',delta[0].time ?? 'month')}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            {titleValue(title[3] ?? 'Active Now')}
          </CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
          {amountValue(value[3] ?? '+537')}
          </div>
          <p className="text-xs text-muted-foreground">
            {deltaValue(delta[0].amount ?? '+201',delta[0].time ?? 'hour')}
          </p>
        </CardContent>
      </Card> */}
    </div>
</>)
}
export default InfoCards;