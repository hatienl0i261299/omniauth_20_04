import './App.css'
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import LoginWithGithub from "./components/LoginWithGithub";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/users/auth/github/callback/" element={<LoginWithGithub/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
