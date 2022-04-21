import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const client_id = '1f7b3555880a5e2fb0a9';

const LoginWithGithub = () => {

    const location = useLocation();
    const urlParams = new URLSearchParams(location.search);
    const [code, setCode] = useState<any>(null);

    useEffect(() => {
        setCode(urlParams.get('code'));
    }, [])

    useEffect(() => {
        if (code) {
            axios.post(`http://127.0.0.1:8888/api/v1/auth/github/`, { code: code })
                .then((res) => {
                    localStorage.setItem('access_token', res.data.access_token);
                })
        }
    }, [code])

    return (<></>)
}

export default LoginWithGithub