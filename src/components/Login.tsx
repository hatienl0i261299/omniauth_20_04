import { useEffect } from "react";
import { useMsal } from "@azure/msal-react";

const client_id = '1f7b3555880a5e2fb0a9';
const redirect_uri = 'http://127.0.0.1:3001/login';

const tenant_id_microsoft = 'f8cdef31-a31e-4b4a-93e4-5f571e91255a'
const client_id_microsoft = 'd6d460e0-82e1-4e1b-a9ae-aa9cfac0997f'
export function toQuery(params: any, delimiter = '&') {
    const keys = Object.keys(params);

    return keys.reduce((str, key, index) => {
        let query = `${str}${key}=${params[key]}`;

        if (index < (keys.length - 1)) {
            query += delimiter;
        }

        return query;
    }, '');
}

const popupCenter = ({url, title, w, h}: any) => {
    // Fixes dual-screen position                             Most browsers      Firefox
    const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
    const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;

    const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    const systemZoom = width / window.screen.availWidth;
    const left = (width - w) / 2 / systemZoom + dualScreenLeft
    const top = (height - h) / 2 / systemZoom + dualScreenTop
    const newWindow: any = window.open(url, title,
        `
      scrollbars=yes,
      width=${w / systemZoom}, 
      height=${h / systemZoom}, 
      top=${top}, 
      left=${left}
      `
    )

    if ((window as any).focus) newWindow.focus();
}

const Login = () => {

    const { instance, accounts } = useMsal();

    const loginRequest = {
        scopes: ["profile", "openid", "User.Read"]
    };

    const onCLickLoginWithGithub = () => {
        const search = toQuery({
            client_id: client_id,
            scope: 'user:email,repo,gist',
            redirect_uri: '',
        });
        // popupCenter({url: `https://github.com/login/oauth/authorize?${search}`, title: 'xtf', w: 900, h: 500});
        window.open(`https://github.com/login/oauth/authorize?${search}`, '_self')
    }

    return (
        <>
            <button
                onClick={() => {
                    onCLickLoginWithGithub();
                }}
            >
                <span>Login with GitHub</span>
            </button>
            <button onClick={() => {
                instance.loginPopup(loginRequest)
                    .then((res) => {
                        console.log(res, 123123);
                    });
            }}>
                <span>Login with microsoft</span>
            </button>
        </>
    )
}

export default Login;
