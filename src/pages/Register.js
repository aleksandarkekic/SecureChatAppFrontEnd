import authService from "../services/authService";
import { Button, Form, Input, message } from "antd";
import { MDBContainer, MDBCol, MDBRipple, MDBRow } from "mdb-react-ui-kit";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import "../App.css";
export default function Register() {
  const navigate = useNavigate();
  const [user, addUser] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });
  const { firstName, lastName, username, password } = user;
  const onInputChange = (e) => {
    addUser({ ...user, [e.target.name]: e.target.value }); // nastavlja da dodaje nove objekte
    console.log(e.target.value);
  };
  const onFinish = async (e) => {
    for (const key in user) {
      if (user[key] === "") {
        message.error("Potrebno je popuniti sva polja", 5);
        return;
      }
    }
    authService.register(user).then((result) => {
      if (result.status === 200) {
        message.success("Uspjesno ste se registrovali.");
        navigate("/");
      } else {
        message.error("Doslo je do greske pri registraciji!");
      }
    });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <MDBContainer className="my-5 gradient-form">
      <MDBRow>
        <MDBCol col="6" className="mb-5">
          <Grid alignItems="center" justifyContent="center">
            <div className="container">
              <div className="rom ">
                <div className="col-md-12 offset-md-0 border rounder p-4 mt-2 shadow  ">
                  <h2 className="text-center m-4">KREIRAJ NALOG</h2>

                  <div className="card" style={{ backgroundColor: "#F5F5F5" }}>
                    <div className="card-header">
                      <Grid
                        container
                        spacing={0}
                        direction="column"
                        paddingRight={0}
                      >
                        <Form
                          name="basic"
                          labelCol={{
                            span: 7,
                          }}
                          wrapperCol={{
                            span: 12,
                          }}
                          initialValues={{
                            remember: true,
                          }}
                          labelAlign="center"
                          onFinish={(e) => onFinish(e)}
                          onFinishFailed={onFinishFailed}
                          autoComplete="off"
                          requiredMark={false}
                        >
                          <Form.Item
                            label="Ime: "
                            rules={[
                              {
                                required: true,
                                message: "Treba popuniti sva polja",
                              },
                            ]}
                          >
                            <Input
                              name="firstName"
                              value={firstName}
                              onChange={(e) => onInputChange(e)}
                            />
                          </Form.Item>
                          <Form.Item
                            label="Prezime: "
                            rules={[
                              {
                                required: true,
                                message: "Treba popuniti sva polja",
                              },
                            ]}
                          >
                            <Input
                              name="lastName"
                              value={lastName}
                              onChange={(e) => onInputChange(e)}
                            />
                          </Form.Item>

                          <Form.Item
                            label="Username: "
                            rules={[
                              {
                                required: true,
                                message: "Treba popuniti sva polja",
                              },
                            ]}
                          >
                            <Input
                              name="username"
                              value={username}
                              onChange={(e) => onInputChange(e)}
                            />
                          </Form.Item>

                          <Form.Item
                            label="Password: "
                            rules={[
                              {
                                required: true,
                                message: "Treba popuniti sva polja",
                              },
                            ]}
                          >
                            <Input
                              name="password"
                              type="password"
                              value={password}
                              onChange={(e) => onInputChange(e)}
                            />
                          </Form.Item>

                          <Form.Item>
                            <Button
                              type="primary"
                              className="btn btn-primary mb-4 w-100"
                              onClick={onFinish}
                            >
                              Registruj
                            </Button>
                          </Form.Item>
                        </Form>
                      </Grid>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Grid>
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
