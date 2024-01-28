import { remark } from 'remark';
import html from 'remark-html';

//! //=======================\\ !//
//! || TEMPERATURE FUNCTIONS || !//
//! \\=======================// !//

export const toFahrenheit = (celsius: number) => celsius * 9 / 5 + 32;
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
export const canvasToDataUrl = ( canvasEl: HTMLCanvasElement ) => {
  const dataUrl = canvasEl.toDataURL();
  return dataUrl;
}

//* USE CANVAS DATA URL TO EXPORT AN IMAGE
export const canvasToImg = (
  el: HTMLCanvasElement,
  alt: string,
  classes: string,
  id: string,
) => {
  const dataUrl = el.toDataURL();
  const img = document.write(`<img src="${dataUrl}" className=${classes} alt=${alt} id=${id} />`);
  return img;
}

//* CONVERT MD TO HTML
export async function markdownToHtml(markdown: string) {
  const result = await remark().use(html).process(markdown)
  return result.toString()
}

//* GET REGEX INFORMATION
interface ExtendedRegExp extends RegExp {
  hasIndices: boolean;
}

export const getRegexData = (regex: ExtendedRegExp) => {
  const { lastIndex, dotAll, flags, global, hasIndices, ignoreCase, multiline, source, sticky, unicode } = regex;
  return { lastIndex, dotAll, flags, global, hasIndices, ignoreCase, multiline, source, sticky, unicode } 
}

//* GET NODE PROPERTIES
type NodeProperties = Record<string, string | null>;
type Accumulator = Record<string, string>
export const getNodeProperties = (node: NodeProperties): NodeProperties => {
  const showProperties = Object.entries(node)
    .filter(([_, value]) => value != null && value !== '')
    .reduce((acc: Accumulator, [key, value]) => {
      acc[key] = value!; // Non-null assertion used here
      return acc;
    }, {});

  return showProperties;
};