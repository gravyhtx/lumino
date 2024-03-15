import React from "react";
import Card from "../Card";
import { Submit } from "../_core/ReactHookForm";
import styles from "./login.module.css";
import { Input } from "../ui/input";

type LoginProps = {
  onclick?: () => void;
}

const Login: React.FC<LoginProps> = ({ onclick }) => {
  return (
    <Card className={styles.card} text={{header: "Login"}}>
      <div className={styles.inputs}>
        <Input type="text" placeholder="Username" />
        <Input type="password" placeholder="Password" />
      </div>
      <Submit text="Submit" onClick={onclick} />
    </Card>
  );
};

export default Login;