import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Switch } from "@headlessui/react";
import { TailSpin } from 'react-loading-icons'
import { confirmAlert } from "react-confirm-alert";
// import Parse from 'parse/dist/parse.min.js';
import emailjs from 'emailjs-com'

import { useSetting } from "../../hooks/useSetting";
import { useAccounts } from "../../hooks/useAccounts";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Input";
import LoadingPage from "../loading";



const Setting = () => {
  const settings = useSetting();
  const accounts = useAccounts();
  const [loading, setloading] = useState(false);
  const [switchStatus, setSwitch] = useState(settings?.data?.data?.is_payment_test)
  const [info, setInfo] = useState({
    is_banner_default: false,
    banner: "",
    twitter: "",
    facebook: "",
    instagram: "",
    linkedin: "",
    discord: ""
  })
  useEffect(() => {
    setSwitch(settings?.data?.data?.is_payment_test)
    setInfo({ ...settings?.data?.data, banner: `${process.env.REACT_APP_BACKEND_URL}/images/banner/${settings?.data?.data.banner}` });
  }, [settings?.data?.data?.is_payment_test, settings?.data?.data])
  const navigate = useNavigate();

  const [isAdmin, setAdmin] = useState(false)
  useEffect(() => {
    getUserRole();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const formRef = useRef(null);
  let email = localStorage.getItem("user_email");
  let username = localStorage.getItem("user_username");
  const error = (text) =>
    toast.error(text, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
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
  const doRequestPasswordReset = function (e) {
    e.preventDefault();
    // Note that this value come from state variables linked to your text input
    emailjs.sendForm(process.env.REACT_APP_SERVICE_ID, process.env.REACT_APP_TEMPLATE_ID, formRef.current, process.env.REACT_APP_USER_ID)
      .then((result) => {
        success('Check your Mail!')
      }, (error) => {
        console.log(error.text);
      });
  };

  const handleImage = async (e) => {
    const formData = new FormData();
    formData.append('banner', e.target.files[0]);
    if (!loading) {
      setloading(true)
      await axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/api/setting/banner`, formData).then((res) => {
          setloading(false)
          setInfo({ ...info, banner: `${process.env.REACT_APP_BACKEND_URL}/images/banner/${settings?.data?.data.banner}` });
        })
        .catch((err) => {
          setloading(false)
        })
    }
  };

  const imgButton = useRef(null);
  const token = localStorage.getItem('token');
  const getUserRole = async () => {

    if (!token) {
      navigate({
        pathname: '/log_in',
           
      })
    }
    let result = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/account/getRole/`, {
      headers: {
        'token': token
      }
    }).catch((err) => {
      error(err.response?.data?.errorMessage);
      navigate({
        pathname: '/log_in',
           
      })
    });
    if (result?.data?.role === 0 || result?.data?.role === 1) setAdmin(true);
    else navigate({
      pathname: '/log_in',
           
    })
  }

  if (!isAdmin) return <LoadingPage />


  if (settings.isLoading)
    return (
      <div
        style={{
          padding: "calc(70px + 20px) calc(30px / 2) 60px calc(30px / 2)",
        }}
        className="w-screen h-full flex flex-col"
      >
        <div className="absolute w-screen h-screen z-10 opacity-50 bg-gray-500 top-0 left-0 flex justify-center items-center">
          <TailSpin width={50} height="10rem" />
        </div>
      </div>
    );
  const notify = (text) =>
    toast.info(text, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: 0,
    });

  const updateRole = async (username, role) => {
    let token = localStorage.getItem('token');
    await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/account/setRole/`,
      {
        'username': username,
        'role': role
      }, {
      headers: {
        'token': token
      }
    })
      .then((res) => {
        if (res.status === 200)
          notify("Updated Successfully!"); //window.location.reload();
      })
      .catch((err) => {
        error(err.response?.data?.errorMessage);
      });
  }


  return (
    <div
      style={{
        padding: "calc(70px + 20px) calc(30px / 2) 60px calc(30px / 2)",
      }}
      className="w-full h-screen flex flex-col overflow-y-auto"
    >
      {loading ? <div className="absolute w-full h-full z-10 opacity-50 bg-gray-500 top-0 left-0 flex justify-center items-center">
        <TailSpin width={50} height='10rem' />
      </div> : null}
      <div className="w-full p-3 flex items-center justify-between">
        <span className=" font-semibold text-lg" style={{ color: "#495057" }}>
          Setting
        </span>
        <div>
          <span style={{ color: "#495057" }}>SiteName </span>
          <span style={{ color: "#74788d" }}>/ Setting</span>
        </div>
      </div>
      <div className="p-5 flex flex-col items-center space-y-5">
        <div className="w-full text-gray-700 p-5 border rounded border-gray-500 flex flex-col space-y-5">
          <span className=" text-4xl">Payment Mode</span>
          <div className="flex items-center space-x-2 text-gray-700 w-2/3 mx-auto justify-center">
            <span>Live Payment Mode</span>
            <Switch
              checked={switchStatus}
              defaultChecked={settings?.data?.data?.is_payment_test}
              onChange={async (v) => {
                if (!loading) {
                  setloading(true)
                  await axios
                    .post(`${process.env.REACT_APP_BACKEND_URL}/api/setting/`, {
                      is_payment_test: v
                    }).then((res) => {
                      setloading(false)
                      setSwitch(res?.data?.is_payment_test)
                    })
                    .catch((err) => {
                      setloading(false)
                    })
                }
              }}
              className={`${switchStatus ? "bg-teal-700" : "bg-sky-700"}
          relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <span className="sr-only">Use setting</span>
              <span
                aria-hidden="true"
                className={`${switchStatus ? "translate-x-9" : "translate-x-0"}
            pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
              />
            </Switch>
            <span>Test Payment Mode</span>
          </div>
        </div>
        <div 
          className=" p-2 bg-blue-400 text-white rounded-md cursor-pointer hover:bg-blue-500"
          onClick={async () => {
            await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/setting/download-emails/`, {
              headers: {
                'token': token
              }
            }).then(res => {
              if (res.status === 201) {
                const fileName = "Joined_Emails_list";
                const json = JSON.stringify(res.data, null, 2);
                const blob = new Blob([json], { type: "application/json" });
                const href = URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = href;
                link.download = fileName +"_"+ new Date().toTimeString() + ".txt";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(href);
              }
            })
              .catch((err) => {
                console.log(err.response?.data?.errorMessage);
              });
          }}>Download Joined Email Addresses</div>
        <div className="flex flex-col items-start justify-center space-y-2 text-gray-700 p-5 border rounded border-gray-500 w-full">
          <span className=" text-4xl">Accounts</span>
          {
            accounts.data?.data?.map((d, i) => {
              return (<div className="flex text-lg font-bold items-center space-x-3 justify-start w-full" key={i}>
                <div className="flex-1">User Name: <span className=" font-medium">{d?.username}</span></div>
                <div className="flex-1">Role: <span className=" font-medium">{d?.role === 0 ? ('Super Admin') : (d?.role === 1 ? 'Admin' : 'Guest')}</span></div>
                <button
                  className="flex cursor-pointer py-2 px-6 text-sm rounded transition-all duration-100 text-white hover:bg-purple-500 bg-purple-400 text-center items-center"
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => updateRole(d?.username, 2)}
                >
                  set as Guest
                </button>
                <button
                  className="flex cursor-pointer py-2 px-6 text-sm rounded transition-all duration-100 text-white hover:bg-purple-500 bg-purple-400 text-center items-center"
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => updateRole(d?.username, 1)}
                >
                  set as Admin
                </button>
                <button
                  className="flex cursor-pointer py-2 px-6 text-sm rounded transition-all duration-100 text-white hover:bg-purple-500 bg-purple-400 text-center items-center"
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => updateRole(d?.username, 0)}
                >
                  set as Super Admin
                </button>
                <div
                  className=" text-red-500 px-2 cursor-pointer"
                  onClick={async () => {
                    confirmAlert({
                      title: "Confirm to submit",
                      message: "Are you sure to Delete This Account?",
                      buttons: [
                        {
                          label: "Yes",
                          onClick: async () => {
                            let token = localStorage.getItem('token');
                            await axios
                              .post(
                                `${process.env.REACT_APP_BACKEND_URL}/api/account/delete/`, {
                                username: d?.username
                              },
                                {
                                  headers: {
                                    'token': token
                                  }
                                }
                              )
                              .then((res) => {
                                if (res.status === 200)
                                  notify("Deleted Successfully!"); //window.location.reload();
                              })
                              .catch((err) => {
                                console.log(err);
                              });
                          },
                        },
                        {
                          label: "No",
                          onClick: () => { },
                        },
                      ],
                    });
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </div>
              </div>)
            })
          }
          <div className="flex justify-center items-center w-full">
            <form className="flex flex-col items-center w-full" ref={formRef} onSubmit={doRequestPasswordReset}>
              <input defaultValue={email} hidden name="to_email" />
              <input defaultValue={username} hidden name="username" />
              <input defaultValue={token} hidden name="token" />
              <input defaultValue={process.env.REACT_APP_RESET_URL} hidden name="link" />
              <input className="flex cursor-pointer py-2 px-6 text-sm rounded transition-all duration-100 text-white hover:bg-blue-500 bg-blue-400 text-center items-center"
                type='submit'
                value="Reset Your Password"
              />
            </form>

          </div>
        </div>
        <div className="w-full text-gray-700 p-5 border rounded border-gray-500 flex flex-col space-y-5">
          <span className=" text-4xl">Social Links</span>
          <div className="flex flex-col items-center text-gray-700 w-2/3 mx-auto space-y-2">
            <div className="flex items-center w-full space-x-1">
              <span className=" w-1/3">Twitter URL:&nbsp;</span>
              <input
                className="w-full py-2 px-3 text-[#495057] border border-gray-400 rounded outline-none"
                type="text"
                placeholder="twitter url"
                name="name"
                value={info?.twitter}
                onChange={(e) => {
                  setInfo({ ...info, twitter: e.target.value })
                }}
              />
              <input
                className="flex cursor-pointer py-2 px-6 text-sm rounded transition-all duration-100 text-white hover:bg-green-500 bg-green-400 text-center items-center"
                type="button" value="Save"
                onClick={async () => {
                  if (!loading) {
                    setloading(true)
                    await axios
                      .post(`${process.env.REACT_APP_BACKEND_URL}/api/setting/`, {
                        twitter: info.twitter
                      }).then((res) => {
                        setloading(false)
                        setInfo(res?.data)
                      })
                      .catch((err) => {
                        setloading(false)
                      })
                  }
                }}
              />
            </div>
            <div className="flex items-center w-full space-x-1">
              <span className=" w-1/3">Facebook URL:&nbsp;</span>
              <input
                className="w-full py-2 px-3 text-[#495057] border border-gray-400 rounded outline-none"
                type="text"
                placeholder="facebook url"
                name="name"
                value={info?.facebook}
                onChange={(e) => {
                  setInfo({ ...info, facebook: e.target.value })
                }}
              />
              <input
                className="flex cursor-pointer py-2 px-6 text-sm rounded transition-all duration-100 text-white hover:bg-green-500 bg-green-400 text-center items-center"
                type="button" value="Save"
                onClick={async () => {
                  if (!loading) {
                    setloading(true)
                    await axios
                      .post(`${process.env.REACT_APP_BACKEND_URL}/api/setting/`, {
                        facebook: info.facebook
                      }).then((res) => {
                        setloading(false)
                        setInfo(res?.data)
                      })
                      .catch((err) => {
                        setloading(false)
                      })
                  }
                }}
              />
            </div>
            <div className="flex items-center w-full space-x-1">
              <span className=" w-1/3">Instagram URL:&nbsp;</span>
              <input
                className="w-full py-2 px-3 text-[#495057] border border-gray-400 rounded outline-none"
                type="text"
                placeholder="instagram url"
                name="name"
                value={info?.instagram}
                onChange={(e) => {
                  setInfo({ ...info, instagram: e.target.value })
                }}
              />
              <input
                className="flex cursor-pointer py-2 px-6 text-sm rounded transition-all duration-100 text-white hover:bg-green-500 bg-green-400 text-center items-center"
                type="button" value="Save"
                onClick={async () => {
                  if (!loading) {
                    setloading(true)
                    await axios
                      .post(`${process.env.REACT_APP_BACKEND_URL}/api/setting/`, {
                        instagram: info.instagram
                      }).then((res) => {
                        setloading(false)
                        setInfo(res?.data)
                      })
                      .catch((err) => {
                        setloading(false)
                      })
                  }
                }}
              />
            </div>
            <div className="flex items-center w-full space-x-1">
              <span className=" w-1/3">Linkedin URL:&nbsp;</span>
              <input
                className="w-full py-2 px-3 text-[#495057] border border-gray-400 rounded outline-none"
                type="text"
                placeholder="linkedin url"
                name="name"
                value={info?.linkedin}
                onChange={(e) => {
                  setInfo({ ...info, linkedin: e.target.value })
                }}
              />
              <input
                className="flex cursor-pointer py-2 px-6 text-sm rounded transition-all duration-100 text-white hover:bg-green-500 bg-green-400 text-center items-center"
                type="button" value="Save"
                onClick={async () => {
                  if (!loading) {
                    setloading(true)
                    await axios
                      .post(`${process.env.REACT_APP_BACKEND_URL}/api/setting/`, {
                        linkedin: info.linkedin
                      }).then((res) => {
                        setloading(false)
                        setInfo(res?.data)
                      })
                      .catch((err) => {
                        setloading(false)
                      })
                  }
                }}
              />
            </div>
            <div className="flex items-center w-full space-x-1">
              <span className=" w-1/3">Discord URL:&nbsp;</span>
              <input
                className="w-full py-2 px-3 text-[#495057] border border-gray-400 rounded outline-none"
                type="text"
                placeholder="discord url"
                name="name"
                value={info?.discord}
                onChange={(e) => {
                  setInfo({ ...info, discord: e.target.value })
                }}
              />
              <input
                className="flex cursor-pointer py-2 px-6 text-sm rounded transition-all duration-100 text-white hover:bg-green-500 bg-green-400 text-center items-center"
                type="button" value="Save"
                onClick={async () => {
                  if (!loading) {
                    setloading(true)
                    await axios
                      .post(`${process.env.REACT_APP_BACKEND_URL}/api/setting/`, {
                        discord: info.discord
                      }).then((res) => {
                        setloading(false)
                        setInfo(res?.data)
                      })
                      .catch((err) => {
                        setloading(false)
                      })
                  }
                }}
              />
            </div>
          </div>
        </div>
        <div className="w-full text-gray-700 p-5 border rounded border-gray-500 flex flex-col space-y-5">
          <span className=" text-4xl">Banner</span>
          <div className="flex items-center text-gray-700 w-full mx-auto justify-center flex-wrap">

            <input
              className=" hidden"
              type="file"
              accept=".png, .jpg, .jpeg"
              name="image"
              onChange={handleImage}
              ref={imgButton}
            />
            <div className="flex flex-col flex-1 space-y-2 items-center w-full justify-center">
              <div className="relative w-32 h-32 bg-gray-300 px-2 py-2 border border-gray-400 rounded-lg flex justify-center flex-col">
                <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                  <Button
                    onClickHandle={() => {
                      imgButton.current.click();
                    }}
                    color="blue"
                    size="sm"
                    rounded="sm"
                    text={`Change Image`}
                  />
                  <img src={info.banner} alt="" className=" h-20" />
                </div>
              </div>
            </div>
            <span>Uploaded Image</span>
            <Switch
              checked={info.is_banner_default}
              defaultChecked={settings?.data?.data?.is_banner_default}
              onChange={async (v) => {
                if (!loading) {
                  setloading(true)
                  await axios
                    .post(`${process.env.REACT_APP_BACKEND_URL}/api/setting/`, {
                      is_banner_default: v
                    }).then((res) => {
                      setloading(false)
                      setInfo({ ...info, is_banner_default: res?.data?.is_banner_default })
                    })
                    .catch((err) => {
                      setloading(false)
                    })
                }
              }}
              className={`${info.is_banner_default ? "bg-teal-700" : "bg-sky-700"}
          relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <span className="sr-only">Use setting</span>
              <span
                aria-hidden="true"
                className={`${info.is_banner_default ? "translate-x-9" : "translate-x-0"}
            pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
              />
            </Switch>
            <span>Default Image</span>
            <img src={`${process.env.PUBLIC_URL}/assets/images/img1 1.png`} alt="" className=" h-20" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
