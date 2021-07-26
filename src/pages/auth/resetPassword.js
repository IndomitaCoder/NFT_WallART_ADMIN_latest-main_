// import Parse from 'parse/dist/parse.min.js';
import axios from 'axios';
import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

// Your Parse initialization configuration goes here
// const PARSE_APPLICATION_ID = process.env.REACT_APP_PARSE_APPLICATION_ID;
// const PARSE_HOST_URL = process.env.REACT_APP_PARSE_HOST_URL;
// const PARSE_JAVASCRIPT_KEY = process.env.REACT_APP_PARSE_JAVASCRIPT_KEY;
// Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
// Parse.serverURL = PARSE_HOST_URL;



export const UserPasswordReset = () => {
  // State variables
  // const [email, setEmail] = useState('');
  const params = useParams();
  const [data, setData] = useState({
    password: '',
    confirm_password: '',
  })
  const onChange = (e) => {
    let d = { ...data, [e.target.name]: e.target.value };
    setData(d);
  }
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
    const recaptchaRef = React.createRef();
  const grecaptchaObject = window.grecaptcha 
  const navigate = useNavigate();
  const register = async () => {
    const recaptchaValue = recaptchaRef.current.getValue();
    if (!params?.token || params?.token === "" ||recaptchaValue === "") {
      if(!params?.token || params?.token === "") {
        error('Cannot Find Corrent Token! Click Reset Button again.')
      navigate({
        pathname: '/setting',
      });
    }
    if(recaptchaValue === "")  error('Complete the CAPTCHA.')
    }
    if (data.confirm_password !== data.password)  error('Not Correct Confirm Password!')
    else {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/account/reset-password/`, {
        password: data.password,
      }, {
        headers: {
          'token': params?.token
        }
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
  return (
    <div
      className="absolute w-full h-screen z-50 flex flex-col items-center justify-center bg-gray-500"
    >
      <div>
      <h2 className=' text-4xl text-white my-5'>Reset Password</h2>
      </div>
      <div className="w-1/2 max-w-md">
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
        <div className='flex space-x-3 justify-center mb-3'>
          <button
            className="flex cursor-pointer py-2 px-6 text-sm rounded transition-all duration-100 text-white hover:bg-green-500 bg-green-400 text-center items-center"
            variant="contained"
            color="primary"
            size="small"
            disabled={data.username === '' && data.password === ''}
            onClick={register}
          >
            Submit
          </button>

          <Link target="_parent" className="flex cursor-pointer py-2 px-6 text-sm rounded transition-all duration-100 text-white hover:bg-red-500 bg-red-400 text-center items-center" to="/login">
            Cancel
          </Link>
        </div>
        <ReCAPTCHA
            // size="invisible"
            ref={recaptchaRef}
            sitekey={process.env.REACT_APP_CAPTCHA_SITE_KEY}
            onChange={() => {}}
            grecaptcha={grecaptchaObject}
          />
      </div>

    </div>
  );
}; 