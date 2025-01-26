
import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";
import './login.css'

function Login() {
    return (
        <div className="LoginFormContainer">
            <div style={{ height: "30vh" }}></div>
            <Form>
                <Form.Item
                    layout="vertical"
                    label={<span style={{ fontSize: "20px" }}>Email</span>}
                >
                    <Input
                        placeholder="Enter your Email"
                        size="large"
                    />
                </Form.Item>
                <div style={{ height: "40px" }} />
                <Form.Item
                    layout="vertical"
                    label={<span style={{ fontSize: "20px" }}>Password</span>}
                >
                    <Input.Password
                        placeholder="Enter your Password"
                        size="large"
                    />
                </Form.Item>
                <div style={{ height: "20px" }} />
                <span style={{ fontSize: "20px" }}><Link to={"/forgotPassword"}>Forgot Password?</Link></span>
                <div style={{ height: "40px" }} />
                <Form.Item>
                    <Button color="default" variant="solid" style={{ width: "100%", height: "5vh" }} size="large">
                        Log in
                    </Button>
                </Form.Item>
                <div style={{ height: "5px" }} />
                <span style={{ fontSize: "20px" }}>
                    Don’t have an account? <Link to="/userRegister">Register now!</Link>
                </span>
            </Form>
        </div>
    )
}

export default Login;