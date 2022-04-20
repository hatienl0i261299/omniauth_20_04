import { MsalProvider } from '@azure/msal-react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { PublicClientApplication } from "@azure/msal-browser";
import { LogLevel } from "@azure/msal-browser";

const msalConfig = {
    auth: {
        clientId: "d6d460e0-82e1-4e1b-a9ae-aa9cfac0997f",
        authority: "https://login.microsoftonline.com/common",
        redirectUri: "http://localhost:3000/"
    },
    cache: {
        cacheLocation: "localStorage", // This configures where your cache will be stored
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    },
    system: {
        loggerOptions: {
            loggerCallback: (level: any, message: any, containsPii: any) => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        return;
                    case LogLevel.Info:
                        console.info(message);
                        return;
                    case LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case LogLevel.Warning:
                        console.warn(message);
                        return;
                }
            }
        }
    }
};

const msalInstance = new PublicClientApplication(msalConfig);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <MsalProvider instance={msalInstance}>
            <App/>
        </MsalProvider>
    </React.StrictMode>
)
