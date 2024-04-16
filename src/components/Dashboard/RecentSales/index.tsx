import { Avatar } from "@radix-ui/react-avatar"
import { classnames } from "~/utils/global";
import styles from "./recents.module.css";

export const RecentSales = () => {
  return (<div style={{padding: '20px', width: "100%"}}>
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar className="h-9 w-[20%]">
          <p className="font-sm leading-none">02/07/24</p>
          <p className="text-muted-foreground">
            1:03:12 PM
          </p>
        </Avatar>
        <div className="ml-4 space-y-1 text-left w-[60%]">
          <p className={classnames("text-sm font-medium leading-none", styles.name)}>Olivia Martin</p>
          <p className={classnames("text-sm text-muted-foreground", styles.email)}>
            olivia.martin@email.com
          </p>
        </div>
        <div className="ml-auto font-medium w-[20%]">+$1,999.00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-[20%]">
          <p className="font-sm leading-none">02/07/24</p>
          <p className="text-muted-foreground">
            1:03:12 PM
          </p>
        </Avatar>
        <div className="ml-4 space-y-1 text-left w-[60%]">
          <p className={classnames("text-sm font-medium leading-none", styles.name)}>Olivia Martin</p>
          <p className={classnames("text-sm text-muted-foreground", styles.email)}>
            olivia.martin@email.com
          </p>
        </div>
        <div className="ml-auto font-medium w-[20%]">+$1,999.00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-[20%]">
          <p className="font-sm leading-none">02/07/24</p>
          <p className="text-muted-foreground">
            1:03:12 PM
          </p>
        </Avatar>
        <div className="ml-4 space-y-1 text-left w-[60%]">
          <p className={classnames("text-sm font-medium leading-none", styles.name)}>Olivia Martin</p>
          <p className={classnames("text-sm text-muted-foreground", styles.email)}>
            olivia.martin@email.com
          </p>
        </div>
        <div className="ml-auto font-medium w-[20%]">+$1,999.00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-[20%]">
          <p className="font-sm leading-none">02/07/24</p>
          <p className="text-muted-foreground">
            1:03:12 PM
          </p>
        </Avatar>
        <div className="ml-4 space-y-1 text-left w-[60%]">
          <p className={classnames("text-sm font-medium leading-none", styles.name)}>Olivia Martin</p>
          <p className={classnames("text-sm text-muted-foreground", styles.email)}>
            olivia.martin@email.com
          </p>
        </div>
        <div className="ml-auto font-medium w-[20%]">+$1,999.00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-[20%]">
          <p className="font-sm leading-none">02/07/24</p>
          <p className="text-muted-foreground">
            1:03:12 PM
          </p>
        </Avatar>
        <div className="ml-4 space-y-1 text-left w-[60%]">
          <p className={classnames("text-sm font-medium leading-none", styles.name)}>Olivia Martin</p>
          <p className={classnames("text-sm text-muted-foreground", styles.email)}>
            olivia.martin@email.com
          </p>
        </div>
        <div className="ml-auto font-medium w-[20%]">+$1,999.00</div>
      </div>
    </div>
  </div>)
}