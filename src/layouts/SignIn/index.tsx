import { useState, type FC, type ReactNode } from "react";
import Login from "~/components/Login";
import Logo from "~/components/_elements/Logo";
import styles from './signin.module.css';

type SignInProps = {
  login: ReactNode;
  register: ReactNode;
}

type SignInState = "login" | "register";
type RegistrationType = "default" | "affiliate";


const SignIn: FC<SignInProps> = ({ login, register }) => {
  const [signInState, setSignInState] = useState<SignInState>("login");
  const [registrationType, setRegistrationType] = useState<RegistrationType>("default");
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.logo}><Logo /></div>
      </div>
      <div className={styles.container}>
        { signInState === "register" ? register : login }
      </div>
        { signInState === "login" ?? (<>
          <Login />
        </>) }
        { signInState === "register" ?? (<>
          {/* <Register type={registrationType} /> */}
        </>) }
      {/* SIGN IN STATE */}
    </div>
  );
}

