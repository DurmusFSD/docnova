import React, { useEffect } from 'react';
import { Form, Input, Button, Card, Typography, message, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.auth);

  const [form] = Form.useForm();

  const onFinish = (values) => {
    dispatch(login(values));
  };

  useEffect(() => {
    if (user) {
      message.success('Giriş başarılı!');
      navigate('/invoices');
    }
  }, [user]);

  useEffect(() => {
    if (error) {
      message.error(error);
    }
  }, [error]);

  return (
    <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f5f5f5' }}>
      <Card title={<Title level={3}>Docnova Giriş</Title>} style={{ width: 400 }}>
        <Form
          form={form}
          name="loginForm"
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            email: 'devmelauser@yopmail.com',
            password: 'Work123???',
          }}
        >
          <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Lütfen email girin!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="password" label="Şifre" rules={[{ required: true, message: 'Lütfen şifre girin!' }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              {loading ? <Spin /> : 'Giriş Yap'}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
