import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const LoginWithGithub = () => {

    const location = useLocation();
    const [code, setCode] = useState<any>(null);

    useEffect(() => {
        const code = new URLSearchParams(location.search).get('code');
        if (code) {
            setCode(code);
        }
    }, [])

    useEffect(() => {
        if (code) {
            axios.post('http://127.0.0.1:8888/api/v1/auth/github', {
                code: code
            }).then((res: any) => {
                localStorage.setItem('access_token', res.data.access_token);
            })
        }
    }, [code])

    return (
        <div>{code}</div>
    )
}

export default LoginWithGithub;