import { Col, Row ,Button, Checkbox, Form, Input } from 'antd';
import React from 'react';
import myAxios from '../service/myAxios';
import {useNavigate} from "react-router-dom";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import Charts from './charts';

const Login = () => {
  const navigate = useNavigate();
  
  const onFinish = (values) => {
    // myAxios.post('111.33.172.61:9090/trainee/login',
    myAxios.post('api/trainee/login',
                {username:values.username,
                    password:values.password,
                    token:''
                }
                )
                .then((response)=>{
                  if(response.code === "600"){
                    alert("用户名或密码错误！")
                  }
                  else{
                    localStorage.setItem("loginToken", response.data.token);
                    localStorage.setItem("username",values.username);

                    navigate('/chooseType');
                  }
                                  });

  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };


  return (
    <Row style={{marginTop:"12rem"}}>
        <Col span={4}/>

        <Col span={16}>
            <Form
                name="normal_login"
                // className="login-form"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                >
                <Row>
                    <Col span={2}/>
                    <Col span={20}>
                        <Form.Item
                            name="username"
                            rules={[
                            {
                                required: true,
                                message: '请输入用户名!',
                            },
                            ]}
                            labelCol={{span:12}}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" size="large" span={8}/>
                        </Form.Item>
                    </Col>
                    <Col span={2}/>
                </Row>
            
                <Row>
                    <Col span={2}/>
                    <Col span={20}>
                        <Form.Item
                            name="password"
                            rules={[
                            {
                                required: true,
                                message: '请输入密码!',
                            },
                            ]}
                        >
                            <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="密码" size="large"/>
                        </Form.Item>
                    </Col>
                    <Col span={2}/>
                </Row>
            
                <Row>
                    <Col span={2}/>
                    <Col span={20}>
                        <Form.Item>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>记住我</Checkbox>
                            </Form.Item>
                        </Form.Item>
                    </Col>
                    <Col span={2}/>
                </Row>

                <Row>
                    <Col span={2}/>
                    <Col span={20}>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button" size="large">
                            登录
                            </Button>
                        </Form.Item>
                    </Col>
                    <Col span={2}/>
                </Row>

                <Row>
                    <Charts/>
                </Row>
            </Form>
        </Col>

        <Col span={4}/>
      </Row>
  );
};

export default Login;
