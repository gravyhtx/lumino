import type { ReactNode } from "react";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "~/components/ui/tabs";
import { classnames, titlecase } from "~/utils/global";
import InfoCard from "../Cards/InfoCard";
import { CardSvg } from "../Cards/CardSvg";
import styles from "./quickview.module.css";

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
  icon?: [ReactNode, ReactNode, ReactNode, ReactNode];
  margin?: string;
}

const QuickView: React.FC<InfoCardsProps> = ({timeframe, title, value, delta, margin}): JSX.Element => {
  title = title ?? ['Total Revenue', 'Subscriptions', 'Transaction Quantity', 'Next Payout'];
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

  console.log(CardSvg[0] as ReactNode)

  return(
    <div style={{width: "100%", padding: "0 20px", margin}}>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList style={{ backgroundColor: "#02041E", border: "1px solid rgba(255, 255, 255, .2)"}}>
          <TabsTrigger value="overview">
            Overview
          </TabsTrigger>
          <TabsTrigger value="analytics" disabled>
            Analytics
          </TabsTrigger>
          <TabsTrigger value="reports" disabled>
            Reports
          </TabsTrigger>
          <TabsTrigger value="notifications" disabled>
            Notifications
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className={classnames("grid gap-4 sm:grid-cols-2 md:grid-cols-4 poo", styles.cards)}>
            <InfoCard
              title={titleValue(title[0])}
              amount={amountValue(value[0])}
              timeSince={deltaValue(deltaObj.a.amount, deltaObj.a.time)}
              icon={CardSvg[0] as ReactNode} />
            <InfoCard
              title={titleValue(title[1])}
              amount={amountValue(value[1])}
              timeSince={deltaValue(deltaObj.b.amount, deltaObj.b.time)}
              icon={CardSvg[1] as ReactNode} />
            <InfoCard
              title={titleValue(title[2])}
              amount={amountValue(value[2])}
              timeSince={deltaValue(deltaObj.c.amount, deltaObj.c.time)}
              icon={CardSvg[2] as ReactNode} />
            <InfoCard
              title={titleValue(title[3])}
              amount={amountValue(value[3])}
              timeSince={deltaValue(deltaObj.d.amount, deltaObj.d.time)}
              icon={CardSvg[3] as ReactNode} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default QuickView;