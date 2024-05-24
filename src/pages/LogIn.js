import React from "react";
import { Button, Form, Input, message } from "antd";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import authService from "../services/authService";
import { MDBContainer, MDBRow, MDBCol, MDBRipple } from "mdb-react-ui-kit";
import "../css/LogIn.css";

export default function LogIn() {
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:9000/api/auth/login",
        values
      );
      const jwt = response.data.accessToken;
      localStorage.setItem("jwt", jwt);
      const config = {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      };
      const role = await axios.get(
        "http://localhost:9000/users/current-role",
        config
      );
      console.log(role.data);
      localStorage.setItem("role", authService.setRole(role.data));
      message.success("Uspjesno ste se ulogovali");
      navigate("/chat");
    } catch (error) {
      console.log(error);
      message.error("Niste se uspjesno ulogovali");
    }
  };

  const onFinish = async (values) => {
    try {
      await handleLogin(values);
    } catch (error) {
      message.error("Niste se uspjesno ulogovali");
    }
  };
  return (
    <MDBContainer className="my-5 gradient-form">
      <MDBRow>
        <MDBCol col="6" className="mb-5">
          <div className="d-flex flex-column ms-5">
            <div className="text-center">
              <img
                src="https://previews.123rf.com/images/maxfarruh/maxfarruh1701/maxfarruh170100016/69841427-secure-chat-vector-sign.jpg"
                style={{ width: "185px" }}
                alt="logo"
              />
              <h2 className="mt-1 mb-5 pb-1">SIGURAN CHAT</h2>
            </div>

            <p>Please login to your account</p>

            <Form
              name="normal_login"
              className="login-form col-md-12 text-center p-1"
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              <Form.Item
                style={{
                  width: "100%",
                }}
                name="username"
                rules={[
                  { required: true, message: "Please input your Username!" },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Username"
                />
              </Form.Item>
              <Form.Item
                style={{
                  width: "100%",
                }}
                name="password"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button  mb-4 w-100"
                  // onClick={onFinish}
                >
                  Log in
                </Button>
              </Form.Item>
            </Form>

            <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
              <p className="mb-0">Nemate nalog?</p>

              <Link className="btn btn-outline-danger my-2" to={"/register"}>
                Kreiraj nalog
              </Link>
            </div>
          </div>
        </MDBCol>

        <MDBCol col="6" className="mb-5">
          <MDBRipple rippleTag="a">
            <div className="d-flex flex-column  justify-content-center h-100 mb-4">
              <img
                src="https://securitytech.org/wp-content/uploads/2021/02/Secure-Encrypted-Messaging-App.jpg"
                className="img-fluid rounded"
                alt="example"
              />
            </div>
          </MDBRipple>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
