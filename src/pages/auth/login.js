import axios from "axios";
import React from 'react';
import { useState } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

const Login = () => {
  const searchParams = new URLSearchParams(document.location.search)

  const [data, setData] = useState({
    username: '',
    password: ''
  })

  const onChange = (e) => {
    let t = { ...data, [e.target.name]: e.target.value };
    setData(t)
  }
  const navigate = useNavigate();
  // let token = localStorage.getItem('token');
  // if (token) {
  //   navigate({
  //     pathname: '/login'
  //   })
  // }
  const error = (text) =>
    toast.error(text, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: 0,
    });
  if ((searchParams.get('notAdmin') === "true")) error("You are not allowed from Admin to enter!")
  const recaptchaRef = React.createRef();
  const grecaptchaObject = window.grecaptcha
  const login = async () => {
    const recaptchaValue = recaptchaRef.current.getValue();
    if (recaptchaValue === "") error("Complete CAPTCH")
    else {
      const pwd = bcrypt.hashSync(data.password, salt);
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/account/login`, {
        username: data.username,
        password: pwd,
      }).then((res) => {
        localStorage.setItem('token', "");
        localStorage.setItem('user_id', "");
        localStorage.setItem('user_email', "");
        localStorage.setItem('user_username', "");
        localStorage.setItem('user_password', "");

        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user_id', res.data.id);
        localStorage.setItem('user_email', res.data?.email);
        localStorage.setItem('user_username', res.data.username);
        localStorage.setItem('user_password', res.data.password);
        navigate({
          pathname: '/category'
        })
      }).catch((err) => {
        if (err.response && err.response.data && err.response.data.errorMessage) {
          error(err.response.data.errorMessage);
        }
      });
    }
  }
  return (
    <div
      className="absolute w-full h-screen z-50 flex flex-col items-center justify-center bg-gray-500"
    >
      <div>
        <h2 className=' text-4xl text-white my-5'>Login</h2>
      </div>
      <div className="w-1/2 max-w-md">
        <input
          className={` w-full py-2 px-3 text-[#495057] border border-gray-400 rounded outline-none`}
          id="standard-basic"
          type="text"
          autoComplete="off"
          name="username"
          value={data.username}
          onChange={onChange}
          placeholder="User Name"
          required
        />
        <br /><br />
        <input
          className={` w-full py-2 px-3 text-[#495057] border border-gray-400 rounded outline-none`}
          id="standard-basic"
          type="password"
          autoComplete="off"
          name="password"
          value={data.password}
          onChange={onChange}
          placeholder="Password"
          required
        />
        <br /><br />
        <div className='flex flex-col space-y-3'>
          <button
            className="flex cursor-pointer py-3 px-6 text-sm rounded transition-all duration-100 text-white hover:bg-green-500 bg-green-400 text-center items-center"
            variant="contained"
            color="primary"
            size="small"
            disabled={data.username === '' && data.password === ''}
            onClick={login}
          >
            Login
          </button>
          <Link target="_parent" className="flex w-1/2 cursor-pointer py-1 px-6 text-sm rounded transition-all duration-100 text-white hover:bg-blue-500 bg-blue-400 text-center items-center" to="/register" >
            Go to Register
          </Link>
          <ReCAPTCHA
            // size="invisible"
            ref={recaptchaRef}
            sitekey={process.env.REACT_APP_CAPTCHA_SITE_KEY}
            onChange={() => { }}
            grecaptcha={grecaptchaObject}
          />
        </div>

      </div>
    </div>
  );
}

export default Login 