import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { confirmAlert } from 'react-confirm-alert';

// import { Button } from "../../components/Input";
import { useCustomer } from "../../hooks/useCustomer";
import { TailSpin } from "react-loading-icons";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import LoadingPage from "../loading";
import { useMemo } from "react";
import RoundedButtonSM from "../../components/Input/RoundedButton_sm";

const Customer = () => {
  const { data, isLoading } = useCustomer();
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
    else navigate({
      pathname: '/log_in',
           
    })
  }
  const [selectedPage, selectPage] = useState(0);
  const [searchText, setsearchText] = useState("")
  const getPager = useMemo(() => {
    if (data?.data) {
      let arrayOfData = [];
      if (searchText === "") arrayOfData = data?.data;
      else data?.data?.forEach(element => {
        let flag = false;
        if (element.wallet_address && element.wallet_address.includes(searchText)) flag = true;
        if (element.bio && element.bio.includes(searchText)) flag = true;
        if (element.name && element.name.includes(searchText)) flag = true;
        if (flag) arrayOfData.push(element)
      });
      let totalItems = arrayOfData.length;
      let currentPage = selectedPage;
      let pageSize = 6;
      // default to first page
      currentPage = currentPage || 1;
      // default page size is 10
      pageSize = pageSize || 10
      // calculate total pages
      let totalPages = Math.ceil(totalItems / pageSize);
      let startPage, endPage;
      if (totalPages <= 10) {
        // less than 10 total pages so show all
        startPage = 1;
        endPage = totalPages;
      } else {
        // more than 10 total pages so calculate start and end pages
        if (currentPage <= 6) { startPage = 1; endPage = 10; } else if (currentPage + 4 >= totalPages) {
          startPage = totalPages - 9;
          endPage = totalPages;
        } else {
          startPage = currentPage - 5;
          endPage = currentPage + 4;
        }
      }
      // calculate start and end item indexes
      // let startIndex = (currentPage - 1) * pageSize;
      // let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
      // create an array of pages to ng-repeat in the pager control
      let pages = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);
      // return an object with all pager properties required by the view
      let a = pageSize * (selectedPage + 1) > arrayOfData.length ? arrayOfData.length % pageSize : pageSize;
      let arr = [];
      for (let index = 0; index < a; index++)
        arr.push(arrayOfData[selectedPage * pageSize + index]);
      return {
        // totalItems: totalItems,
        // currentPage: currentPage,
        // pageSize: pageSize,
        // totalPages: totalPages,
        // startPage: startPage,
        // endPage: endPage,
        // startIndex: startIndex,
        // endIndex: endIndex,
        selectedItems: arr,
        pages: pages
      };
    }
    else return {
      // totalItems: totalItems,
      // currentPage: currentPage,
      // pageSize: pageSize,
      // totalPages: totalPages,
      // startPage: startPage,
      // endPage: endPage,
      // startIndex: startIndex,
      // endIndex: endIndex,
      selectedItems: [],
      pages: []
    }

  }, [data?.data, selectedPage, searchText])
  if (!isAdmin) return <LoadingPage />
  const dispSearchText = (text) => {
    if(!text) return<></>
    if(text.indexOf(searchText) === -1) return<span>{text}</span>
    else return <span>
      {text.slice(0, text.indexOf(searchText))}
      <span className=" bg-yellow-400">{text.slice(text.indexOf(searchText), text.indexOf(searchText)+searchText.length)}</span>
      {text.slice(text.indexOf(searchText)+searchText.length)}
    </span>
  }
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
      <div className="w-full p-3 flex items-center justify-between">
        <span className=" font-semibold text-lg" style={{ color: "#495057" }}>
          Customer
        </span>
        <div>
          <span style={{ color: "#495057" }}>SiteName </span>
          <span style={{ color: "#74788d" }}>/ Customer</span>
        </div>
      </div>
      <div className="p-5 flex flex-col">
        <div className="flex justify-between mb-7">
          {/* green button */}
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
              onChange={(e) => {
                setsearchText(e.target.value)
              }}
            />
          </div>
        </div>
        {/* customer table */}
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
                <th>Customer Name</th>
                <th>Wallet Address</th>
                <th>Bio</th>
                <th>Avatar</th>
                <th style={{ width: "200px" }}>Date Joined</th>
              </tr>
            </thead>
            <tbody>
              {getPager.selectedItems.map((item) => {
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
                    <td>{dispSearchText(item?.name)}</td>
                    <td>{dispSearchText(item?.wallet_address)}</td>
                    <td>
                      <div>{dispSearchText(item?.bio)}</div>
                    </td>
                    <td>
                      <div className=" w-16 h-16 border border-gray-400">
                        {item?.avatar !== "" && (
                          <img
                            src={`${item.avatar ? process.env.REACT_APP_BACKEND_URL + '/images/avatars/' + item.avatar : process.env.PUBLIC_URL + '/assets/images/user.png'}`}
                            alt=""
                            className="w-full h-full object-contain"
                          />
                        )}
                      </div>
                    </td>
                    <td>{item?.date_joined}</td>
                    <td>
                      <div
                        className=" text-red-500 px-2 cursor-pointer"
                        onClick={async () => {
                          confirmAlert({
                            title: 'Confirm to submit',
                            message: 'Are you sure to Delete This Customer?',
                            buttons: [
                              {
                                label: 'Yes',
                                onClick: async () => {
                                  await axios
                                    .delete(
                                      `${process.env.REACT_APP_BACKEND_URL}/api/customer/${item._id}`
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
                                onClick: () => { }
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
          <div className="flex min-w-[500px] justify-center space-x-1 my-3 items-center flex-wrap text-sm">
            {selectedPage !== 0 && getPager?.pages.length > 0 ? <div
              className=" text-[#000] mx-3 cursor-pointer"
              onClick={() => {
                selectPage(selectedPage - 1);
              }}
            >
              Prev
            </div> : null}
            {getPager?.pages.map((p, i) => (
              <RoundedButtonSM
                key={i}
                text={p}
                active={selectedPage === p - 1}
                onButtonClick={() => {
                  selectPage(p - 1);
                }}
              />
            ))}
            {selectedPage !== getPager?.pages.length - 1 && getPager?.pages.length > 0 ?
              <div
                className=" text-[#000] mx-3 cursor-pointer text-sm"
                onClick={() => { selectPage(selectedPage + 1); }}
              >
                Next
              </div> : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customer;
