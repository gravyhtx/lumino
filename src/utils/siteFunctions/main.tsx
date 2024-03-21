import { remark } from 'remark';
import html from 'remark-html';
// import { wordCount } from '../validation/checks';
import { WORDS_LIST } from '~/constants';
import Image from 'next/image';

//! //=======================\\ !//
//! || TEMPERATURE FUNCTIONS || !//
//! \\=======================// !//

/**
 * Converts a temperature from Celsius to Fahrenheit.
 * @param {number} celsius - The temperature in Celsius.
 * @returns {number} - The converted temperature in Fahrenheit.
 * @example
 * const tempInFahrenheit = toFahrenheit(30); // 86
 */
export const toFahrenheit = (celsius: number) => celsius * 9 / 5 + 32;
/**
 * Converts a temperature from Fahrenheit to Celsius.
 * @param {number} fahrenheit - The temperature in Fahrenheit.
 * @returns {number} - The converted temperature in Celsius.
 * @example
 * const tempInCelsius = toCelsius(86); // 30
 */
export const toCelsius = (fahrenheit: number) => (fahrenheit - 32) * 5 / 9;


//! //====================\\ !//
//! || SERVER SIDE CHECKS || !//
//! \\====================// !//


// USE JTW AUTH
// export const authCheck = () => {
//   const token = Auth.loggedIn();
//   const authorized = token ? true : false;
//   return authorized;
// };


//! //====================\\ !//
//! || CLIENT SIDE CHECKS || !//
//! \\====================// !//

//* CHECK IF DEVICE IS MOBILE
/**
 * Checks if the device is a mobile device based on the user agent or screen size.
 * @param {boolean} [checkScreenSize=false] - Optional flag to check screen size for mobile device identification.
 * @returns {boolean} - True if the device is a mobile device, false otherwise.
 * @example
 * const mobileDevice = isMobile(); // True or false based on the user agent.
 * const mobileByScreenSize = isMobile(true); // Additionally checks screen size.
 */
export const isMobile = (checkScreenSize = false) => {
  if ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  || (checkScreenSize === true && window.matchMedia("only screen and (max-width: 760px)").matches) ) {
    return true;
  } else {
    return false;
  }
}

//* ENABLE FULLSCREEN MODE
/**
 * Enables fullscreen mode for the current document.
 * Tries the standard method first and falls back to vendor-prefixed methods for older browsers.
 * Catches and logs any errors encountered during the process.
 * 
 * @async
 * @example
 * // To enable full-screen mode:
 * fullScreen();
 */
interface FullscreenHTMLElement extends HTMLElement {
  mozRequestFullScreen?: () => Promise<void>;
  webkitRequestFullscreen?: () => Promise<void>;
  msRequestFullscreen?: () => Promise<void>;
}
export const fullScreen = async () => {
  const el = document.documentElement as FullscreenHTMLElement;

  if (el.requestFullscreen) {
    try {
      await el.requestFullscreen();
    } catch (error) {
      console.error("Error attempting to enable full-screen mode:", error);
    }
    return;
  }

  const RFSmethods = [
    'mozRequestFullScreen',
    'webkitRequestFullscreen',
    'msRequestFullscreen'
  ] as const;

  for (const RFSmethod of RFSmethods) {
    if (el[RFSmethod]) {
      try {
        await el[RFSmethod]?.();
      } catch (error) {
        console.error("Error attempting to enable full-screen mode:", error);
      }
      return;
    }
  }
};

//* EXIT FULLSCREEN MODE
interface FullscreenDocument extends Document {
  mozCancelFullScreen?: () => Promise<void>;
  webkitExitFullscreen?: () => Promise<void>;
  msExitFullscreen?: () => Promise<void>;
}
/**
 * Exits fullscreen mode for the current document.
 * Tries the standard method first and falls back to vendor-prefixed methods for older browsers.
 * Catches and logs any errors encountered during the process.
 * 
 * @async
 * @example
 * // To exit full-screen mode:
 * exitScreen();
 */
export const exitScreen = async () => {
  const doc = document as FullscreenDocument;

  if (doc.exitFullscreen) {
    try {
      await doc.exitFullscreen();
    } catch (error) {
      console.error("Error attempting to exit full-screen mode:", error);
    }
    return;
  }

  const exitMethods = [
    'mozCancelFullScreen',
    'webkitExitFullscreen',
    'msExitFullscreen'
  ] as const;

  for (const exitMethod of exitMethods) {
    if (doc[exitMethod]) {
      try {
        await doc[exitMethod]?.();
      } catch (error) {
        console.error("Error attempting to exit full-screen mode:", error);
      }
      return;
    }
  }
};


//* PREVENT WINDOW FROM CLOSING
/**
 * Prevents the browser window from closing, optionally displaying an alert with a custom message.
 * When the function is triggered by the window's 'beforeunload' event, a confirmation dialog is shown.
 * If 'asAlert' is true, it will display an alert with the provided message.
 * 
 * @param {string} message - The custom message to display in the confirmation dialog or alert.
 * @param {boolean} [asAlert=false] - If true, an alert box is displayed instead of the default browser confirmation dialog.
 * @example
 * // To block the window from closing and show a custom message:
 * blockCloseWindow('Are you sure you want to leave this page?');
 */
export const blockCloseWindow = (message: string, asAlert = false) => {
  const text = message || 'Are you sure you want to leave this page?';
  const alertMessage = alert(text)
  window.onbeforeunload = function(){
    if (asAlert) {
      alertMessage;
      return;
    }
    return text;
  }
};

//! //=============\\ !//
//! || RETURN DATA || !//
//! \\=============// !//

/**
 * Returns a blank 1x1 pixel, transparent Data PNG.
 */
export const blankPixel = () => {
  //? Returns an empty 1x1 px Data PNG
  const url = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={url} />
}


/////////////////
// HANDLE DATA //
/////////////////

//* GET DATA URL FROM CANVAS
/**
 * Takes a canvas element and returns its data URL.
 * @param {HTMLCanvasElement} canvasEl - The canvas element to get the data URL of.
 * @returns {string} The canvas element's data URL.
 * @example
 * const canvas = document.querySelector('canvas');
 * const dataUrl = canvasToDataUrl(canvas);
 * console.log(dataUrl); // Outputs a data URL like "data:image/png;base64,iVBO...ggg=="
 */
export const canvasToDataUrl = ( canvasEl: HTMLCanvasElement ): string => {
  const dataUrl = canvasEl.toDataURL();
  return dataUrl;
}

//* USE CANVAS DATA URL TO EXPORT AN IMAGE
type CanvasToImgProps = {
  el: HTMLCanvasElement;
  alt: string;
  classes: string;
  id?: string;
  loading?: 'lazy' | 'eager';
  width?: number;
  height?: number;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  useNextImage?: boolean;
};
/**
 * Converts a canvas element to an image element.
 * 
 * @param {HTMLCanvasElement} el - The canvas element to convert.
 * @param {string} alt - The alt text for the image.
 * @param {string} classes - The class(es) to assign to the image.
 * @param {string} [id] - An optional ID for the image.
 * @param {string} [loading] - The loading attribute for the image.
 * @returns {JSX.Element} - The created image element as a JSX element.
 *
 * @example
 * const MyComponent = () => {
 *   const canvasRef = useRef(null);
 *   const [imageSrc, setImageSrc] = useState('');
 * 
 *   useEffect(() => {
 *     const canvas = canvasRef.current;
 *     // Draw something on the canvas here
 *     setImageSrc(canvas.toDataURL());
 *   }, []);
 * 
 *   return (
 *     <div>
 *       <canvas ref={canvasRef}></canvas>
 *       {imageSrc && <img src={imageSrc} alt="A beautiful scene" className="my-image-class" id="myImageId" />}
 *     </div>
 *   );
 * };
 */
export const canvasToImg = ({
  el,
  alt,
  classes,
  id,
  loading = 'lazy',
  width,
  height,
  objectFit,
  useNextImage = false,
}: CanvasToImgProps): JSX.Element => {
  const dataUrl = el.toDataURL();
  
  return useNextImage ?
    // Using Next.js Image component
    <Image 
      src={dataUrl} 
      alt={alt} 
      className={classes} 
      id={id} 
      width={width} 
      height={height} 
      layout="responsive"
      objectFit={objectFit}
    />
    :
    // Using standard img tag
    // eslint-disable-next-line @next/next/no-img-element
    <img 
      src={dataUrl} 
      className={classes} 
      alt={alt} 
      id={id} 
      loading={loading} 
      width={width} 
      height={height}
      style={{ objectFit }}
    />
};

//* CONVERT MD TO HTML
/**
 * Takes a string of markdown and returns a string of HTML.
 * @param {string} markdown - The markdown to convert to HTML.
 * @returns {string} The converted HTML.
 * @example
 * const markdown = '# This is a heading';
 * const html = markdownToHtml(markdown); // Returns "<h1>This is a heading</h1>"
 */
export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark().use(html).process(markdown)
  return result.toString()
}

//* GET REGEX INFORMATION
interface ExtendedRegExp extends RegExp {
  hasIndices: boolean; // Include new 'hasIndices' property in case it does not exist on 'RegExp' yet.
}
/**
 * Takes a regular expression and returns the same regular expression object.
 * This can be useful if you want to pass around regex objects with extended properties or methods.
 * @param {ExtendedRegExp} regex - The regular expression to return.
 * @returns {ExtendedRegExp} The same regular expression object.
 * @example
 * const regex = /test/gi;
 * const sameRegex = getRegexData(regex);
 * console.log(sameRegex); // Outputs the same regex object: /test/gi
 */
export const getRegexData = (regex: ExtendedRegExp): ExtendedRegExp => {
  return regex;
}

//* GET NODE PROPERTIES
// type NodeProperties = Record<string, string | null>;
// type Accumulator = Record<string, string>
/**
 * Takes a node and returns an object containing its properties.
 * @param {NodeProperties} node - The node to get the properties of.
 * @returns {NodeProperties} An object containing the node's properties.
 * 
 * @example
 * //* To get the properties of a node:
 * const node = document.querySelector('div');
 * const nodeProperties = getNodeProperties(node);
 * console.log(nodeProperties); // Outputs an object like { id: "myDiv", class: "myClass", style: "color: red;" }
 */
// export const getNodeProperties = (node: NodeProperties): NodeProperties => {
//   const showProperties = Object.entries(node)
//     .filter(([_, value]) => value != null && value !== '')
//     .reduce((acc: Accumulator, [key, value]) => {
//       acc[key] = value!; // Non-null assertion used here
//       return acc;
//     }, {});

//   return showProperties;
// };

//* GENERATE RANDOM WORDS FROM WORDS_LIST
/**
 * Generates a string of random words from the WORDS_LIST.
 * 
 * @param {number} wordCount - The number of random words to generate. Defaults to 1.
 * @returns {string[]} An array of randomly selected words.
 * 
 * @example
 * //* Generating an array of a single random word
 * console.log(randomWord()); // Outputs a word: ["like"]
 * 
 * @example
 * //* Generating an array of 5 random words
 * console.log(randomWord(5)); // Outputs a string of words: ["just", "weapon", "like", "weary", "like"]
 * 
 * @example
 * //* Generating a string of random words
 * console.log(randomWord(5).join(' ')); // Outputs a string of words: "just weapon like weary like"
 */
export const randomWord = (wordCount?: number): string[] => {
  return Array.from({ length: wordCount ?? 1 }, () => 
    WORDS_LIST[Math.floor(Math.random() * WORDS_LIST.length)]
  ) as string[];
};