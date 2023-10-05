"use strict";
exports.__esModule = true;
exports.loginRequest = exports.protectedResources = exports.msalConfig = exports.b2cPolicies = void 0;
var msal_browser_1 = require("@azure/msal-browser");
var environment_development_1 = require("src/environments/environment.development");
var isIE = window.navigator.userAgent.indexOf("MSIE ") > -1 || window.navigator.userAgent.indexOf("Trident/") > -1;
exports.b2cPolicies = {
    names: {
        signUpSignIn: "B2C_1_susi",
        editProfile: "B2C_1_edit"
    },
    authorities: {
        signUpSignIn: {
            authority: "https://recipesb2corganization.b2clogin.com/recipesb2corganization.onmicrosoft.com/B2C_1_susi"
        },
        editProfile: {
            authority: "https://recipesb2corganization.b2clogin.com/recipesb2corganization.onmicrosoft.com/B2C_1_edit"
        }
    },
    authorityDomain: "recipesb2corganization.b2clogin.com"
};
exports.msalConfig = {
    auth: {
        clientId: '8726258c-b79a-4914-8e1b-47980b7cfc90',
        authority: exports.b2cPolicies.authorities.signUpSignIn.authority,
        knownAuthorities: [exports.b2cPolicies.authorityDomain],
        redirectUri: '/'
    },
    cache: {
        cacheLocation: msal_browser_1.BrowserCacheLocation.LocalStorage,
        storeAuthStateInCookie: isIE
    },
    system: {
        loggerOptions: {
            loggerCallback: function (logLevel, message, containsPii) {
                console.log(message);
            },
            logLevel: msal_browser_1.LogLevel.Verbose,
            piiLoggingEnabled: false
        }
    }
};
exports.protectedResources = {
    culinarySharesApi: {
        endpoint: environment_development_1.environment.apiBaseUrl + "Users",
        scopes: ["https://recipesb2corganization.onmicrosoft.com/ec576dc8-cdb9-4151-a774-9a9be9495c02/User.Read.Write"]
    }
};
exports.loginRequest = {
    scopes: []
};
