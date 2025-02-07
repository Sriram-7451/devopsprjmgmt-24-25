import { Button, Form, Input, notification } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./forgot_password.css"

function ForgotPassword() {

    const navigateToPage = useNavigate()

    const handleForgot = async (values) => {
        console.log("values",values)

        try {
        const response = await axios.post(`http://localhost:${process.env.REACT_APP_ENV_PORT}/forgotpassword`, {
            email: values.email,
            password: values.password,
            cpassword: values.cpassword
        }, { withCredentials: true });

        // Show success notification
        notification.success({
            message: 'Password Changed Successfully',
            description: response.data.message,
            placement: 'topRight',
        });

        // Redirect to home page after successful login
        navigateToPage("/login")

        } catch (error) {
        console.error(error);

        // Show error notification
        notification.error({
            message: 'Password Change Failed',
            description: error.response?.data?.message || 'Something went wrong. Please try again.',
            placement: 'topRight',
        });
        } finally {
        // setLoading(false);
        }
    }

    return (
        <div className="ForgotPasswordFormContainer">
            <div style={{ height: "30vh" }}></div>
            <Form
                onFinish={handleForgot}
            >
                <Form.Item
                    name="email"
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
                    name="password"
                    layout="vertical"
                    label={<span style={{ fontSize: "20px" }}>Enter New Password</span>}
                >
                    <Input.Password
                        size="large"
                    />
                </Form.Item>
                <div style={{ height: "40px" }} />
                <Form.Item
                    name="cpassword"
                    layout="vertical"
                    label={<span style={{ fontSize: "20px" }}>Confirm New Password</span>}
                >
                    <Input.Password
                        size="large"
                    />
                </Form.Item>
                <div style={{ height: "40px" }} />
                <Form.Item>
                    <Button color="default" variant="solid" style={{ width: "100%", height: "5vh" }} size="large" htmlType="submit">
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