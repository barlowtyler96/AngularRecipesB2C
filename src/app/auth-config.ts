import { LogLevel, Configuration, BrowserCacheLocation } from '@azure/msal-browser';
import { environment } from 'src/environments/environment.development';
const isIE = window.navigator.userAgent.indexOf("MSIE ") > -1 || window.navigator.userAgent.indexOf("Trident/") > -1;
 
export const b2cPolicies = {
     names: {
         signUpSignIn: "B2C_1_susi",
         editProfile: "B2C_1_edit"
     },
     authorities: {
         signUpSignIn: {
             authority: "https://recipesb2corganization.b2clogin.com/recipesb2corganization.onmicrosoft.com/B2C_1_susi",
         },
         editProfile: {
             authority: "https://recipesb2corganization.b2clogin.com/recipesb2corganization.onmicrosoft.com/B2C_1_edit"
         }
     },
     authorityDomain: "recipesb2corganization.b2clogin.com"
 };
 
 
export const msalConfig: Configuration = {
     auth: {
         clientId: '8726258c-b79a-4914-8e1b-47980b7cfc90',
         authority: b2cPolicies.authorities.signUpSignIn.authority,
         knownAuthorities: [b2cPolicies.authorityDomain],
         redirectUri: '/', 
     },
     cache: {
         cacheLocation: BrowserCacheLocation.LocalStorage,
         storeAuthStateInCookie: isIE, 
     },
     system: {
         loggerOptions: {
            loggerCallback: (logLevel, message, containsPii) => {
                console.log(message);
             },
             logLevel: LogLevel.Verbose,
             piiLoggingEnabled: false
         }
     }
 }

export const protectedResources = {
  culinarySharesApi: {
    endpoint: `${environment.apiBaseUrl}/Users`,
    scopes: ["https://recipesb2corganization.onmicrosoft.com/ec576dc8-cdb9-4151-a774-9a9be9495c02/User.Read.Write"],
  },
}
export const loginRequest = {
  scopes: []
};