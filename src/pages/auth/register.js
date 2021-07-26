import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


export default function Register() {
  const [data, setData] = useState({
    username: '',
    password: '',
    confirm_password: '',
    email: ''
  })
  const [pwdError, setpwdError] = useState("")
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
  const success = (text) =>
    toast.info(text, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: 0,
    });
  const onChange = (e) => {
    let d = { ...data, [e.target.name]: e.target.value };
    setData(d);
  }
  const navigate = useNavigate();
  const recaptchaRef = React.createRef();
  const grecaptchaObject = window.grecaptcha 
  const register = async () => {
    const recaptchaValue = recaptchaRef.current.getValue();
    if (data.confirm_password !== data.password || !isValidEmail(data.email) || !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(data.password) || recaptchaValue === "") {
      if (data.confirm_password !== data.password) error('Not Correct Confirm Password!')
      if (!isValidEmail(data.email)) error('Not Valid Email!')
      if( !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(data.password)) error('Input Validated Password')
      if(recaptchaValue === "") error("Complete the CAPTCH")
    }
    else {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/account/register`, {
        username: data.username,
        password: data.password,
        email: data.email
      }).then((res) => {
        success(res.data.title);
        navigate({
          pathname: '/log_in',
           
        });
      }).catch((err) => {
        error(err.response.data.errorMessage);
      });
    }
  }

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  const onChangeCaptcha = (value) => {
  }
  return (
    <div
      className="absolute w-full h-screen z-50 flex flex-col items-center justify-center bg-gray-500"
    >
      <div>
        <h2 className=' text-4xl text-white my-5'>Register</h2>
      </div>

      <div className="w-1/2 max-w-md">
        <input
          className={` w-full py-2 px-3 text-[#495057] border border-gray-400 rounded outline-none`}
          id="username"
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
          id="email"
          type="email"
          autoComplete="off"
          name="email"
          value={data.email}
          onChange={onChange}
          placeholder="Put Your Email Address"
          required
        />
        <br /><br />
        <div className='relative'>
          <input
            className={` w-full py-2 px-3 text-[#495057] border border-gray-400 rounded outline-none`}
            id="standard-basic"
            type="password"
            autoComplete="off"
            name="password"
            value={data.password}
            onChange={e => {
              let regExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
              if (!regExp.test(e.target.value)) {
                setpwdError("Minimum eight characters, at least one uppercase letter, one lowercase letter and one number:")
              }
              else setpwdError("")
              onChange(e)
            }
            }
            placeholder="Password"
            required
          />
          <span className='absolute w-full text-red-900 text-xs bottom-0'>{pwdError}</span>
        </div>
        <br /><br />
        <input
          className={` w-full py-2 px-3 text-[#495057] border border-gray-400 rounded outline-none`}
          id="standard-basic"
          type="password"
          autoComplete="off"
          name="confirm_password"
          value={data.confirm_password}
          onChange={onChange}
          placeholder="Confirm Password"
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
            onClick={register}
          >
            Register
          </button>

          <Link target="_parent" className="flex w-1/2 cursor-pointer py-1 px-6 text-sm rounded transition-all duration-100 text-white hover:bg-blue-500 bg-blue-400 text-center items-center" to="/login">
            Go to Login
          </Link>
          <ReCAPTCHA
            // size="invisible"
            ref={recaptchaRef}
            sitekey={process.env.REACT_APP_CAPTCHA_SITE_KEY}
            onChange={onChangeCaptcha}
            grecaptcha={grecaptchaObject}
          />
        </div>
      </div>
    </div>
  );
} 