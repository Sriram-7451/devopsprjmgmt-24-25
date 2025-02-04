import React, { useState } from 'react';
import { Button, Form, Input, notification } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import './login.css'

function Login() {

    const [loading, setLoading] = useState(false);
    
    const handleLogin = async (values) => {
        console.log("values",values)
        setLoading(true);

        try {
        const response = await axios.post('http://localhost:5000/login', {
            email: values.email,
            password: values.password,
        }, { withCredentials: true });

        // Show success notification
        notification.success({
            message: 'Login Successful',
            description: response.data.message,
            placement: 'topRight',
        });

        // Redirect to home page after successful login
        // window.location.reload();

        } catch (error) {
        console.error(error);

        // Show error notification
        notification.error({
            message: 'Login Failed',
            description: error.response?.data?.message || 'Something went wrong. Please try again.',
            placement: 'topRight',
        });
        } finally {
        setLoading(false);
        }
    };

    return (
        <div className="LoginFormContainer">
            <div style={{ height: "30vh" }}></div>
            <Form
                onFinish={handleLogin} 
            >
                <Form.Item
                    name="email"
                    layout="vertical"
                    label={<span style={{ fontSize: "20px" }}>Email</span>}
                    rules={[
                        { required: true, message: 'Please enter your email!' },
                        { type: 'email', message: 'Please enter a valid email!' },
                    ]}
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
                    label={<span style={{ fontSize: "20px" }}>Password</span>}
                    rules={[
                        { required: true, message: 'Please enter your password!' },
                    ]}
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
                    <Button color="default" variant="solid" style={{ width: "100%", height: "5vh" }} size="large" loading={loading} htmlType="submit">
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