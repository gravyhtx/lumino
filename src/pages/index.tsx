import Card from "~/components/Card";
import BarGraph from "~/components/Dashboard/BarGraph";
import QuickView from "~/components/Dashboard/QuickView";
import RecentSales from "~/components/Dashboard/RecentSales";
import Login from "~/components/Login";
import Section from "~/components/_core/Section";
import Dashboard from "~/layouts/Dashboard";
import { classnames } from "~/utils/global";

export default function Home () {
  console.log(Number('100%'))
  return (
    <Dashboard>
      <Section>
        <QuickView />
        <Card>
        <BarGraph />
        </Card>
        <Card>
        <RecentSales />
        </Card>
        <div className={classnames("foo", "bar")}>
          <Login />
        </div>
      </Section>
    </Dashboard>
  );
}