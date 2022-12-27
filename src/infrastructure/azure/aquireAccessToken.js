import { useEffect } from "react";
import { InteractionRequiredAuthError } from "@azure/msal-browser";
import { useMsal, useAccount } from "@azure/msal-react";
import { protectedResources } from "./azureB2cConfig";

import { setApiAuthToken } from "../services/network/networkApiConfig";

export const aquireAccessToken = (onTokenAquiredCallBack) => {

    const { instance, accounts, inProgress } = useMsal();
    const account = useAccount(accounts[0] || {});

    function accessTokenAquireHandler(accessToken) {
        setApiAuthToken(accessToken);
        onTokenAquiredCallBack();
    }

    useEffect(() => {
        if (account && inProgress === "none") {
            instance.acquireTokenSilent({
                scopes: protectedResources.api.scopes,
                account: account
            }).then((response) => {

                accessTokenAquireHandler(response.accessToken);

            }).catch((error) => {
                // in case if silent token acquisition fails, fallback to an interactive method
                if (error instanceof InteractionRequiredAuthError) {
                    if (account && inProgress === "none") {
                        instance.acquireTokenPopup({
                            scopes: protectedResources.api.scopes,
                        }).then((response) => {

                            accessTokenAquireHandler(response.accessToken);

                        }).catch(error => console.log(error));
                    }
                }
            });
        }

    }, [account, inProgress, instance]);
}