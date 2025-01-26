import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";
import "./user_register.css"

function UserRegister(){
return(
    <div className="UserRegisterFormContainer">
    <div style={{ height: "30vh" }}></div>
    <Form>
    <Form.Item
            layout="vertical"
            label={<span style={{ fontSize: "20px" }}>Username</span>}
        >
            <Input
                placeholder="Enter your Username"
                size="large"
            />
        </Form.Item>
        <div style={{ height: "40px" }} />
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
        <div style={{ height: "40px" }} />
        <Form.Item>
            <Button color="default" variant="solid" style={{ width: "100%", height: "5vh" }} size="large">
                Register
            </Button>
        </Form.Item>
        <div style={{ height: "5px" }} />
        <span style={{ fontSize: "20px" }}>Already have an account? <Link to={"/"}>Log In!</Link></span>
    </Form>
</div>
)
}

export default UserRegister;