import Login from "../features/auth/components/Login";
import Navbar from "../features/navbar/Navbar";

function LoginPage() {
    return (
        <Navbar>
            <Login />
        </Navbar>
    );
}

export default LoginPage;