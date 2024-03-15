import { useState, type FC, type ReactNode } from "react";
import Login from "~/components/Login";
import Logo from "~/components/_elements/Logo";
import styles from './signin.module.css';
import Section from "../_core/Section";

type SignInProps = {
  login: ReactNode;
  register: ReactNode;
}

type SignInState = "login" | "register";

const SignIn: FC<SignInProps> = ({ login, register }) => {
  const [signInState, setSignInState] = useState<SignInState>("login");
  const [toAffiliate, setToAffiliate] = useState<boolean>(false);
  const SwitchComponent = () => {
    const message = signInState === "register" ? "Already have an account?" : "Not a member yet?";
    const handleSwitch = (state: SignInState, affiliate?: boolean) => {
      setSignInState(state);
      setToAffiliate(affiliate ?? !toAffiliate);
    }
    return signInState === "register"
      ? <div className={styles.login}>
          <button onClick={() => handleSwitch("login")}></button>
        </div>
      : <div className={styles.register}>
          <button onClick={() => handleSwitch("register", )}></button>
          <button></button>
        </div>;
  }
  return (
    <Section>
      <div className={styles.container}>
        { signInState === "register" ? register : <Login /> }
      </div>
      <div className={styles.container}>
        { signInState === "login" ?? (<>
          <Login />
        </>) }
        { signInState === "register" ?? (<>
          {/* <Register type={registrationType} /> */}
        </>) }
      </div>
      {/* SIGN IN STATE */}
      <div className={styles.container}>
        {signInState === "login"
          ? <div className={styles.login}></div>
          : <div className={styles.register}></div> }
      </div>
    </Section>
  );
}

export default SignIn;