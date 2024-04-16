// import { forwardRef } from "react";
// import type { ReactNode } from "react";
// import Icon from "~/components/_core/Icon";
// import type { IconName } from "~/components/_core/Icon";
// import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"

// type InfoCardProps = {
//   title: string;
//   amount: string;
//   timeSince: string;
//   icon?: ReactNode;
// }

// type InfoCardPropsWithIconName = {
//   title: string;
//   amount: string;
//   timeSince: string;
//   icon: IconName;
// }

// export const InfoCard: React.ForwardRefExoticComponent<InfoCardProps | InfoCardPropsWithIconName> = forwardRef<HTMLDivElement, InfoCardProps | InfoCardPropsWithIconName>(({
//   title,
//   amount,
//   timeSince,
//   icon
// }, ref) => {
//   const svgEl =         
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//     strokeWidth="2"
//     className="h-4 w-4 text-muted-foreground"
//   >
//     <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
//   </svg>;

//   const cardIcon = typeof icon === 'string' ? <Icon name={icon as IconName} size={20} color="currentColor" /> : icon;

//   return(
//     <Card ref={ref} aria-label={title} style={{ backgroundColor: "#02041E", border: "1px solid rgba(255, 255, 255, .2)"}}>
//       <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//         <CardTitle className="text-sm font-medium">
//           {title}
//         </CardTitle>
//         {cardIcon ?? svgEl}
//       </CardHeader>
//       <CardContent>
//         <div className="text-2xl font-bold" style={{ color: "white"}}>
//           {amount}
//         </div>
//         <p className="text-xs text-muted-foreground">
//           {timeSince}
//         </p>
//       </CardContent>
//     </Card>
//   )
// });

export * from './InfoCard';
export * from './CardSvg';