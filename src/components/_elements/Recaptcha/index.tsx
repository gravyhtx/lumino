// ~/components/_elements/Recaptcha.tsx

import React, { useEffect, useRef, useState } from "react";
import { Button } from "~/components/ui/button";
import ReCAPTCHA from "react-google-recaptcha";

interface RecaptchaProps {
  /**
   * Callback function to be called when the reCAPTCHA verification is successful.
   * @param token The reCAPTCHA token.
   */
  onVerify: (token: string | null) => void;
  text: string;
}

/**
 * A reCAPTCHA component that handles user verification.
 * @param {Function} props.onVerify - The callback function to be called when the reCAPTCHA verification is successful.
 * @param {string} props.text - The text to display on the button.
 * @returns {JSX.Element} The rendered Recaptcha component.
 */
const Recaptcha: React.FC<RecaptchaProps> = ({ onVerify, text }) => {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (token) {
      onVerify(token);
    }
  }, [token, onVerify]);

  const handleRecaptchaChange = (token: string | null) => {
    setToken(token);
  };

  const handleSubmit = () => {
    recaptchaRef.current?.execute();
  };

  return (
    <div>
      <ReCAPTCHA
        ref={recaptchaRef}
        size="invisible"
        sitekey={process.env.RECAPTCHA_SITE_KEY ?? ""}
        onChange={handleRecaptchaChange}
      />
      <Button onClick={handleSubmit}>{text??"Verify reCAPTCHA"}</Button>
    </div>
  );
};

export default Recaptcha;