import React, { useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import axios from "axios";

import { useItem } from "../../hooks/useItem";
import { Button } from "../../components/Input";

import NewItemModal from "./NewItemModal";
import CategoryItem from "./CategoryItem";
import { toast } from "react-toastify";
import { TailSpin } from "react-loading-icons";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import LoadingPage from "../loading";
import { useMemo } from "react";
import RoundedButtonSM from "../../components/Input/RoundedButton_sm";

const Item = () => {
  const [newItemModal, setNewItemModal] = useState(false);
  const { data, isLoading } = useItem();
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
  const getPager = useMemo(() => {
    let totalItems = data?.data.length;
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
    let a = pageSize * (selectedPage + 1) > data?.data.length ? data?.data.length % pageSize : pageSize;
    let arr = [];
    for (let index = 0; index < a; index++)
      arr.push(data?.data[selectedPage * pageSize + index]);
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
  }, [data?.data, selectedPage])
  if (!isAdmin) return <LoadingPage />
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
      {newItemModal && (
        <NewItemModal
          onClose={() => {
            setNewItemModal(false);
          }}
        />
      )}
      <div className="w-full p-3 flex items-center justify-between">
        <span className=" font-semibold text-lg" style={{ color: "#495057" }}>
          Item
        </span>
        <div>
          <span style={{ color: "#495057" }}>SiteName </span>
          <span style={{ color: "#74788d" }}>/ Item</span>
        </div>
      </div>
      <div className="p-5 flex flex-col">
        <div className="flex justify-between mb-7">
          {/* green button */}
          <Button
            onClickHandle={setNewItemModal}
            color="green"
            icon="plus"
            size="md"
            rounded="sm"
            text="New Item"
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
                <th>Item Name</th>
                <th>Category</th>
                <th>Description</th>
                <th>Size</th>
                <th>Image</th>
                <th>Price</th>
                <th>Bulk Price</th>
                <th>Other</th>
                <th style={{ width: "200px" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.data ? getPager.selectedItems.map((item) => {
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
                    <td>
                      <CategoryItem id={item.category_id} />
                    </td>
                    <td>{item.description}</td>
                    <td>{item.width}cm/{item.height}cm</td>
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
                      {item.price}{" "}
                      {item.priceType === "usd"
                        ? "$"
                        : item.priceType === "eth"
                          ? "Eth"
                          : ""}{" "}
                    </td>
                    <td>
                      {item.isBulk ? (
                        <div>
                          {
                            item?.bulk_pricing?.map((v, i) => (
                              <div className="flex flex-col" key={i}>
                                <div><span>{v.quantity}</span> / <span>{v.discount} %</span></div>
                              </div>
                            ))
                          }
                        </div>) : <></>
                      }
                    </td>
                    <td>
                      <div className="relative flex flex-col w-full h-full space-y-1 justify-center items-start">
                        {item.isPopular ? (
                          <span className=" text-center px-1 rounded-md bg-pink-400 text-white">
                            Popular
                          </span>
                        ) : null}
                        {!item.soldOut ? (
                          <span className=" text-center px-1 rounded-md bg-green-400 text-white">
                            On Sale
                          </span>
                        ) : (
                          <span className=" text-center px-1 rounded-md bg-purple-400 text-white">
                            Sold Out
                          </span>
                        )}
                        {item.isColor && (
                          <div className="flex space-x-1 items-start">
                            <span>Color:</span>
                            <div className="flex space-x-1">
                              {item.color.map(c => <span key={c}
                                className={`bg-${c} bg-${c}-500 p-3 rounded-full border border-gray-600`}
                              ></span>)}
                            </div>

                          </div>
                        )}
                      </div>
                    </td>
                    <td>
                      <div
                        className=" text-red-500 px-2 cursor-pointer"
                        onClick={async () => {
                          confirmAlert({
                            title: "Confirm to submit",
                            message: "Are you sure to Delete This Item?",
                            buttons: [
                              {
                                label: "Yes",
                                onClick: async () => {
                                  await axios
                                    .delete(
                                      `${process.env.REACT_APP_BACKEND_URL}/api/item/${item._id}`
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
                    </td>
                  </tr>
                );
              }) : null}
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

export default Item;
