import { useEffect, useState } from "react";
import { useMsal } from "@azure/msal-react";

const client_id_github = '1f7b3555880a5e2fb0a9';
const client_id_google = "332906430383-hjq87ehuah3q2o9hcdspfhbfkgr1d47g"
const CLIENT_ID_LINKEDIN = "86gz013leovtk9"
const tenant_id_microsoft = 'f8cdef31-a31e-4b4a-93e4-5f571e91255a'
const client_id_microsoft = 'd6d460e0-82e1-4e1b-a9ae-aa9cfac0997f'

const client_id_amazon = 'amzn1.application-oa2-client.33c4a0ba9d884a04877c72153404eb1e';

declare var gapi: any;
declare var FB: any;
declare var amazon: any;

const Login = () => {
    const {instance, accounts} = useMsal();

    const loginRequest = {
        scopes: ["profile", "openid", "User.Read"]
    };

    const objectToQueryString = (obj: any) => {
        let str = [];
        for (const p in obj)
            if (obj.hasOwnProperty(p)) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            }
        return str.join("&");
    }
    const [googleAuth, setGoogleAuth] = useState<any>(null)

    useEffect(() => {
        let googleAuth: any;
        if (gapi) {
            gapi.load('client:auth2', async () => {
                await gapi.client.init({scope: 'profile', client_id: client_id_google});
                googleAuth = gapi.auth2.getAuthInstance();
                setGoogleAuth(googleAuth);
            });
        }

        if (amazon) {
            amazon.Login.setClientId(client_id_amazon);
        }
    }, []);


    return (
        <div>
            <button onClick={() => {
                const search = objectToQueryString({
                    client_id: client_id_github,
                    scope: 'user',
                    redirect_uri: '',
                });
                window.open(`https://github.com/login/oauth/authorize?${search}`, '_self');
            }}>Login with github
            </button>

            <button onClick={async () => {
                const googleUser = await googleAuth.signIn(); // wait for the user to authorize through the modal
                const info = googleUser.getAuthResponse();
                console.log(info);
            }}>Login with google
            </button>

            <button onClick={() => {
                FB.login((response: any) => {
                    console.log(response);
                }, {scope: 'public_profile,email'});
            }}>
                Login with facebook
            </button>

            {/*<button onClick={() => {*/}
            {/*    const search = objectToQueryString({*/}
            {/*        client_id: CLIENT_ID_LINKEDIN,*/}
            {/*        scope: 'scope=r_liteprofile%20r_emailaddress%20w_member_social',*/}
            {/*        redirect_uri: '/login'*/}
            {/*    })*/}
            {/*    window.open(`https://www.linkedin.com/oauth/v2/authorization?${search}`, '_self');*/}
            {/*}}>*/}
            {/*    Login with linkedin*/}
            {/*</button>*/}

            <button onClick={() => {
                instance.loginPopup(loginRequest)
                    .then((res: any) => {
                        console.log(res, 123123);
                    });
            }}>
                <span>Login with microsoft</span>
            </button>

            <button onClick={() => {

                const options = {
                    scope: 'profile',
                }
                amazon.Login.authorize(options, (res: any) => {
                    console.log(res);
                });
            }}>
                Login with amazon
            </button>

            <button onClick={() => {
                const params = objectToQueryString({
                    response_type: 'token',
                    client_id: '46dfcd72d5d240128de05d60d4f2f0c5',
                    scope: [
                        "forms:read",
                        "forms:write",
                        "login:avatar",
                        "login:birthday",
                        "login:email",
                        "login:info",
                        "vendors:model-bid.read",
                        "vendors:model-bid.write",
                        "vendors:model-edit.params",
                        "vendors:model-edit.requests",
                        "cloud_api.data:user_data",
                        "cloud_api.data:app_data",
                        "passport:scim-api.all"
                    ].join(' ')
                });
                window.open(`https://oauth.yandex.com/authorize?${params}`, '_self');
            }}>
                Login with yandex
            </button>

            <div id="fb-root"/>
        </div>
    )
}

export default Login