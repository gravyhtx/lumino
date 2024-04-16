import { useEffect, useState } from "react";
import styles from "../animated-text.module.css";

type TypewriterProps = {
  text?: string;
  blinkingCursor?: boolean;
  ms?: number;
};

const Typewriter = ({ text: initialText = "", blinkingCursor = false, ms = 25, ...props }: TypewriterProps) => {
  const [text, setText] = useState<string>(initialText);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setText(initialText.slice(0, text.length + 1));
    }, ms);

    return () => clearTimeout(timeout);
  }, [initialText, text]);

  const blinkingCursorClass = initialText.length === text.length ? styles.typing : "";

  return () => (
    <span className={blinkingCursor ? blinkingCursorClass : ""} {...props}>
      {text}
    </span>
  );
};

export default Typewriter;
