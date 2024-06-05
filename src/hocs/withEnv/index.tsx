import type { ComponentType } from 'react';

interface WithEnvCheckProps {
  devOnly?: boolean;
  prodOnly?: boolean;
  envCheck?: {
    variable: string;
    contains?: string;
  };
  runtimeCondition?: boolean | (() => boolean);
}

const withEnv = <P extends object>(Component: ComponentType<P>) => 
  (props: P & WithEnvCheckProps) => {
    const { devOnly, prodOnly, envCheck, runtimeCondition } = props;
    const environment = process.env.NODE_ENV;

    // Check for devOnly and prodOnly flags
    if (devOnly && environment !== 'development') return null;
    if (prodOnly && environment !== 'production') return null;

    // Handle environment variable check
    if (envCheck) {
      const envValue = process.env[envCheck.variable];
      const containsCheck = envCheck.contains ? envValue?.includes(envCheck.contains) : true;

      if (envValue === undefined || !containsCheck) return null;
    }

    // Evaluate runtime condition
    const isRuntimeConditionMet = typeof runtimeCondition === 'function' ? runtimeCondition() : runtimeCondition;

    if (runtimeCondition !== undefined && !isRuntimeConditionMet) return null;

    // Render the component if none of the conditions above apply
    return <Component {...props} />;
};

export default withEnv;


//! HOW TO USE 'WITH ENV' CHECK

//* BUILD 'WITH ENV' COMPONENT
//? STEP 01 - Import 'withEnv'
//   import withEnv from './withEnv';
//? STEP 02 - Build your component
//   const EnvComponent = (props) => {
//     return <div>Hello {props}! This is the 'withEnv' component.</div>;
//   };
//? STEP 03 - Wrap Component using 'withEnv' to give access to 'props'
//   export default withEnv(EnvComponent);


//* DEVELOPMENT ONLY COMPONENT
// import EnvComponent from './EnvComponent';
//
// const App = () => (
//   <>
//     <EnvComponent devOnly={true} props={"World"} />
//     {/* Other components */}
//   </>
// );


//* PRODUCTION ONLY COMPONENT WITH CUSTOM CONDITIONS
// import EnvComponent from './EnvComponent';
//
// const App = (props) => {
//   const { userExists } = props;
//   return (
//     <>
//       <EnvComponent
//         prodOnly={true}
//         custom={{ env: 'CUSTOM_ENV_VAR', contains: 'value', runtimeCondition: userExists }}
//         props={"Darkness, My Old Friend"} />
//       {/* Other components */}
//     </>
//   )
// };


//* CUSTOM ENVIRONMENT VARIABLE CHECK
// import EnvComponent from './EnvComponent';
//
// const App = () => (
//   <>
//     <EnvComponent custom={{ env: 'FEATURE_FLAG', contains: 'enabled' }} props={"Goodbye"} />
//     {/* Other components */}
//   </>
// );