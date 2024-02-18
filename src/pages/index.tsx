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


export default function Home () {
  return (
    <Dashboard>
      <Section>
        <QuickView />
        <br/>
        <div className={classnames("grid grid-cols-1 lg:grid-cols-2 gap-8", styles.containers)}>
          <div className="w-full">
            {/* <div style={{width: '100%'}}>
              <div style={{fontSize: "1.2rem", fontWeight: "600"}}>Recent Sales</div> */}
              {/* <div>You made 265 sales this month.</div> */}
            {/* </div> */}
            <Card text={{header: "Gross Sales"}}>
            <BarGraph />
            </Card>
          </div>
          <div className="w-full">
            {/* <div style={{width: '100%'}}>
              <div style={{fontSize: "1.2rem", fontWeight: "600"}}>Recent Sales</div> */}
              {/* <div>You made 265 sales this month.</div> */}
            {/* </div> */}
            <Card text={{header: "Recent Transactions"}}>
            <RecentSales />
            </Card>
          </div>
        </div>
        <div className={classnames("foo", "bar")}>
          <Login />
        </div>
      </Section>
    </Dashboard>
  );
}