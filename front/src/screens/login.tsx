import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import { login } from 'services/auth';
import wave from 'assets/wave.png';
import phone from 'assets/phone.svg';
import { useDispatch } from 'react-redux';
import { userChange } from 'store/user/user.action';
import styled from 'styled-components';
import { getTokenName } from 'utils/get-token-name';

export type LoginData = {
  id: string;
  password: string;
  pin: number;
};

const StyledLogin = styled.div`
  overflow: hidden;

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type='number'] {
    -moz-appearance: textfield;
  }
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus textarea:-webkit-autofill,
  textarea:-webkit-autofill:hover textarea:-webkit-autofill:focus,
  select:-webkit-autofill,
  select:-webkit-autofill:hover,
  select:-webkit-autofill:focus {
    box-shadow: 0 0 0px 1000px #ffffff inset !important;
  }

  .wave {
    position: fixed;
    bottom: 0;
    left: 0;
    height: 100%;
    z-index: -1;
  }

  .container {
    width: 100vw;
    height: 100vh;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 7rem;
    padding: 0 2rem;
  }

  .img {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    img {
      width: 500px;
    }
  }

  .login-content {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    text-align: center;

    .form {
      width: 360px;
    }

    h2 {
      margin: 15px 0;
      color: #333;
      text-transform: uppercase;
      font-size: 2.9rem;
    }

    .botao {
      width: 100%;
    }
  }

  @media screen and (max-width: 1050px) {
    .container {
      grid-gap: 5rem;
    }
  }

  @media screen and (max-width: 1000px) {
    .form {
      width: 290px;
    }

    .login-content h2 {
      font-size: 2.4rem;
      margin: 8px 0;
    }

    .img img {
      width: 400px;
    }
  }

  @media screen and (max-width: 900px) {
    .container {
      grid-template-columns: 1fr;
    }

    .img {
      display: none;
    }

    .wave {
      display: none;
    }

    .login-content {
      justify-content: center;
    }
  }
`;

export const Login = () => {
  const dispatch = useDispatch();
  const [loginFail, setLoginFail] = useState(false);

  const onFinish = async (values: LoginData) => {
    try {
      const { accessToken, publicador } = await login(values);
      localStorage.setItem(getTokenName(), accessToken);
      dispatch(userChange(publicador));
    } catch (error) {
      setLoginFail(true);
    }
  };

  return (
    <StyledLogin>
      <img className="wave" src={wave} alt="" />
      <div className="container">
        <div className="img">
          <img src={phone} alt="" />
        </div>
        <div className="login-content">
          <Form
            className="form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <h2 className="title">Welcome</h2>
            <Form.Item
              name="id"
              rules={[{ required: true, message: 'Preencha o ID' }]}
            >
              <Input placeholder="Congregação ID" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Preencha a senha' }]}
            >
              <Input.Password placeholder="Senha" />
            </Form.Item>

            <Form.Item
              name="pin"
              rules={[{ required: true, message: 'Preencha o PIN' }]}
            >
              <Input type="number" placeholder="PIN pessoal" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="botao">
                Entrar
              </Button>
            </Form.Item>
            {loginFail && 'Não foi possível entrar, verifique seus dados!'}
          </Form>
        </div>
      </div>
    </StyledLogin>
  );
};
