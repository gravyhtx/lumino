// import Dashboard from "~/layouts/Dashboard";

// import Card from "~/components/Card";
// import BarGraph from "~/components/Dashboard/BarGraph";
// import QuickView from "~/components/Dashboard/QuickView";
// import RecentSales from "~/components/Dashboard/RecentSales";
// import Section from "~/components/_core/Section";

// import { classnames } from "~/utils/global";
// import styles from "./styles/index.module.css";

// const DashboardApp = () => {
//   return (
//     <Dashboard>
//       <Section>
//         <QuickView />
//         <br/>
//         <div className={classnames("grid grid-cols-1 lg:grid-cols-[7fr_3fr] gap-8", styles.containers)}>
//           <div className="w-full lg:col-span-1">
//             <Card text={{header: "Gross Sales"}}>
//               <BarGraph />
//             </Card>
//           </div>
//           <div className="w-full lg:col-span-1">
//             <Card text={{header: "Recent Transactions"}}>
//             <RecentSales />
//             </Card>
//           </div>
//         </div>
//     </Section>
//   </Dashboard>
//   )
// }
export * from './BarGraph';
export * from './QuickView';
export * from './RecentSales';
export * from './Cards';