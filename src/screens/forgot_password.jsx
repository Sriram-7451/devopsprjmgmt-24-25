import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";
import "./forgot_password.css"

function ForgotPassword() {
    return (
        <div className="ForgotPasswordFormContainer">
            <div style={{ height: "30vh" }}></div>
            <Form>
                <Form.Item
                    layout="vertical"
                    label={<span style={{ fontSize: "20px" }}>Enter your Email</span>}
                >
                    <Input
                        placeholder="Enter your Email"
                        size="large"
                    />
                </Form.Item>
                <div style={{ height: "40px" }} />
                <Form.Item
                    layout="vertical"
                    label={<span style={{ fontSize: "20px" }}>Enter New Password</span>}
                >
                    <Input.Password
                        size="large"
                    />
                </Form.Item>
                <div style={{ height: "40px" }} />
                <Form.Item
                    layout="vertical"
                    label={<span style={{ fontSize: "20px" }}>Confirm New Password</span>}
                >
                    <Input.Password
                        size="large"
                    />
                </Form.Item>
                <div style={{ height: "40px" }} />
                <Form.Item>
                    <Button color="default" variant="solid" style={{ width: "100%", height: "5vh" }} size="large">
                        Change password
                    </Button>
                </Form.Item>
                <div style={{ height: "5px" }} />
                <span style={{ fontSize: "20px" }}>
                    Remember your password? <Link to="/">Log In!</Link>
                </span>
            </Form>
        </div>
    )
}

export default ForgotPassword;