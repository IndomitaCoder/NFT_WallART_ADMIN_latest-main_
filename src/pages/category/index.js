import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { confirmAlert } from 'react-confirm-alert';

import NewCategoryModal from "./NewCategoryModal";
import { Button } from "../../components/Input";
import { useCategory } from "../../hooks/useCategory";
import { TailSpin } from "react-loading-icons";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import LoadingPage from "../loading";

const Category = () => {
  const [newCategoryModal, setNewCategoryModal] = useState(false);
  const { data, isLoading } = useCategory();
  const navigate = useNavigate();
  const [isAdmin, setAdmin] = useState(false)
  useEffect(() => {
    getUserRole();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
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
  const getUserRole = async () => {
    let token = localStorage.getItem('token');
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
    else  navigate({
      pathname: '/log_in',
           
    })
  }
  if (!isAdmin) return <LoadingPage/>
  
  
  
  const notify = (text) => toast.info(text, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: 0,
  });
  if (isLoading)
    return (
      <div
        style={{
          padding: "calc(70px + 20px) calc(30px / 2) 60px calc(30px / 2)",
        }}
        className="w-full flex flex-col"
      >
        <div className="absolute w-full h-full z-10 opacity-50 bg-gray-500 top-0 left-0 flex justify-center items-center">
          <TailSpin width={50} height="10rem" />
        </div>
      </div>
    );
  return (
    <div
      style={{
        padding: "calc(70px + 20px) calc(30px / 2) 60px calc(30px / 2)",
      }}
      className="w-full flex flex-col"
    >
      {newCategoryModal && (
        <NewCategoryModal
          onClose={() => {
            setNewCategoryModal(false);
          }}
        />
      )}
      <div className="w-full p-3 flex items-center justify-between">
        <span className=" font-semibold text-lg" style={{ color: "#495057" }}>
          Category
        </span>
        <div>
          <span style={{ color: "#495057" }}>SiteName </span>
          <span style={{ color: "#74788d" }}>/ Category</span>
        </div>
      </div>
      <div className="p-5 flex flex-col">
        <div className="flex justify-between mb-7">
          {/* green button */}
          <Button
            onClickHandle = {setNewCategoryModal}
            color = 'green'
            icon = 'plus'
            size = 'md'
            rounded = 'sm'
            text = 'New Category'
          />
          {/* search bar */}
          <div className="flex text-gray-700 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 mr-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
            <input
              className=" text-gray-700 w-full font-normal text-base focus:outline-none"
              placeholder="Search..."
            />
          </div>
        </div>
        {/* category table */}
        <div>
          <table className="w-full table text-left">
            <thead>
              <tr>
                <th style={{ width: "50px" }}>
                  <div className="flex items-center text-base">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      id="contacusercheck"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="contacusercheck"
                    ></label>
                  </div>
                </th>
                <th>Category Name</th>
                <th>Description</th>
                <th>Image</th>
                <th style={{ width: "200px" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.data.map((item) => {
                return (
                  <tr key={item._id}>
                    <td>
                      <div className="flex items-center text-base">
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          id="contacusercheck"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="contacusercheck"
                        ></label>
                      </div>
                    </td>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>
                      <div className=" w-16 h-16 border border-gray-400">
                        {item.image !== "" && item.image && (
                          <img
                            src={`${process.env.REACT_APP_BACKEND_URL}/images/${item.image}`}
                            alt=""
                            className="w-full h-full object-contain"
                          />
                        )}
                      </div>
                    </td>
                    <td>
                      <div
                        className=" text-red-500 px-2 cursor-pointer"
                        onClick={async () => {
                          confirmAlert({
                            title: 'Confirm to submit',
                            message: 'Are you sure to Delete This Category?',
                            buttons: [
                              {
                                label: 'Yes',
                                onClick: async () => {
                                  await axios
                                    .delete(
                                      `${process.env.REACT_APP_BACKEND_URL}/api/category/${item._id}`
                                    )
                                    .then((res) => {
                                      if (res.status === 200) notify("Deleted Successfully!");//window.location.reload();
                                    })
                                    .catch((err) => {
                                      console.log(err);
                                    });
                                }
                              },
                              {
                                label: 'No',
                                onClick: () => {}
                              }
                            ]
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
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Category;
