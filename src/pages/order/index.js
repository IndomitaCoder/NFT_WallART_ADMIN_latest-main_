import React, { useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import axios from "axios";
import { Country, State } from "country-state-city";

// import { Button } from "../../components/Input";

import { toast } from "react-toastify";
import { useOrder } from "../../hooks/useOrder";
// import { useOrderStatus } from "../../hooks/useOrderStatus";
import ItemComponent from "./Item";
import StatusComponent from "./Status";
import OrderStatusChangeModal from "./OrderStatusChangeModal";
import CategoryItem from "./CategoryItem";
import { TailSpin } from "react-loading-icons";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import LoadingPage from "../loading";
import { useMemo } from "react";
import RoundedButtonSM from "../../components/Input/RoundedButton_sm";

const Order = () => {
  const { data, isLoading } = useOrder();
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
  const [statusDropDown, setStatusDropDown] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [statusId, setStatusId] = useState("");
  const navigate = useNavigate();
  const dispSearchText = (text) => {
    if (!text) return <></>
    if (text.indexOf(searchText) === -1) return <span>{text}</span>
    else return <span>
      {text.slice(0, text.indexOf(searchText))}
      <span className=" bg-yellow-400">{text.slice(text.indexOf(searchText), text.indexOf(searchText) + searchText.length)}</span>
      {text.slice(text.indexOf(searchText) + searchText.length)}
    </span>
  }
  const [isAdmin, setAdmin] = useState(false)
  useEffect(() => {
    getUserRole();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [selectedPage, selectPage] = useState(0);
  const [searchText, setsearchText] = useState("")
  const getPager = useMemo(() => {
    if (data?.data) {
      let arrayOfData = [];
      const array_data = data?.data.slice(0).reverse();
      if (searchText === "") arrayOfData = array_data;
      else array_data?.forEach((element, i) => {
        let flag = false;
        if (element.name_for_printing && element.name_for_printing.includes(searchText)) flag = true;
        if (element.nft_description && element.nft_description.includes(searchText)) flag = true;
        if (element.nft_contractAddress && element.nft_contractAddress.includes(searchText)) flag = true;
        if (element.nft_tokenId && element.nft_tokenId.includes(searchText)) flag = true;
        if (element.nft_symbol && element.nft_symbol.includes(searchText)) flag = true;
        if (element.nft_totalSupply && element.nft_totalSupply.includes(searchText)) flag = true;
        if (element.contact_first_name && element.contact_first_name.includes(searchText)) flag = true;
        if (element.contact_last_name && element.contact_last_name.includes(searchText)) flag = true;
        if (Country.getCountryByCode(element.delivery_country).name && Country.getCountryByCode(element.delivery_country).name.includes(searchText)) flag = true;
        if (State.getStateByCodeAndCountry(element.delivery_state, element.delivery_country).name && State.getStateByCodeAndCountry(element.delivery_state, element.delivery_country).name.includes(searchText)) flag = true;
        if (element.delivery_city && element.delivery_city.includes(searchText)) flag = true;
        if (element.delivery_address && element.delivery_address.includes(searchText)) flag = true;
        if (Country.getCountryByCode(element.payment_country).name && Country.getCountryByCode(element.payment_country).name.includes(searchText)) flag = true;
        if (State.getStateByCodeAndCountry(element.payment_state, element.payment_country).name && State.getStateByCodeAndCountry(element.payment_state, element.payment_country).name.includes(searchText)) flag = true;
        if (element.payment_city && element.payment_city.includes(searchText)) flag = true;
        if (element.payment_address && element.payment_address.includes(searchText)) flag = true;
        if (element.delivery_apt_suite_No && element.delivery_apt_suite_No.includes(searchText)) flag = true;
        if (element.total_price_usd && (element.total_price_usd+"$").toString().includes(searchText)) flag = true;
        if(element.multi_id && element.multi_id.toString().includes(searchText)) flag = true;
        if(element.id && (element.id+10000).toString().includes(searchText)) flag = true;
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
      selectedItems: [],
      pages: []
    }
  }, [data?.data, selectedPage, searchText])

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
  if (!isAdmin) return <LoadingPage />



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
  let colors = ['purple-500', 'gray-500', 'black', 'yellow-500', 'blue-500', 'pink-500', 'green-500'];

  return (
    <div
      style={{
        padding: "calc(70px + 20px) calc(30px / 2) 60px calc(30px / 2)",
      }}
      className="w-full flex flex-col bg-"
    >
      {statusDropDown && (
        <OrderStatusChangeModal
          _id={orderId}
          status={statusId}
          onClose={() => {
            setStatusDropDown(false);
          }}
        />
      )}
      <div className="w-full p-3 flex items-center justify-between">
        <span className=" font-semibold text-lg" style={{ color: "#495057" }}>
          Order
        </span>
        <div>
          <span style={{ color: "#495057" }}>SiteName </span>
          <span style={{ color: "#74788d" }}>/ Order</span>
        </div>
      </div>
      <div className="p-5 flex flex-col">
        <div className="flex justify-between mb-7">
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
                <th className="flex flex-col"><span>Multiple_Order_id</span><span>Order ID</span></th>
                <th>Category</th>
                <th>Price</th>
                <th>Image Location for Location</th>
                <th>NFT Image</th>
                <th>NFT Info</th>
                <th>Billing Info</th>
                <th>Date</th>
                {/* <th>Email</th> */}
                <th>Size</th>
                <th>Color</th>
                <th>Quantity</th>
                <th>Payment Status</th>
                <th>Method of Payment</th>
                <th></th>
                <th style={{ width: "200px" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {getPager.selectedItems.map((item, i) => {
                // item?.transaction_hash
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
                    <td className=" w-fit "><span className="">multi: <span className={` px-2 text-white bg-${colors[item?.multi_id % 7]}`}>{dispSearchText(item?.multi_id.toString())}</span></span><br /><span>{dispSearchText((item?.id + 10000).toString())}</span></td>
                    <td>
                      <CategoryItem id={item?.item_info?.category_id} />
                    </td>
                    <td>
                      <span>{dispSearchText(item?.total_price_usd + "$")}</span>
                    </td>
                    <td className="">
                      <a
                        href={item?.image_for_printing}
                        target="_blank"
                        className=" underline w-40 flex text-ellipsis overflow-hidden whitespace-nowrap"
                        rel="noreferrer"
                      >
                        {item?.image_for_printing}
                      </a>
                    </td>
                    <td>
                      <div className=" w-16 h-16 border border-gray-400">
                        {
                          <img
                            src={item?.image_for_printing}
                            alt=""
                            className="w-full h-full object-contain"
                          />
                        }
                      </div>
                    </td>
                    <td>
                      <div className="flex flex-col bg-gray-600 h-32 overflow-y-auto text-white p-1">
                        <span className=" font-bold">Name: <span className=" text-sm italic font-normal">{dispSearchText(item?.name_for_printing)}</span></span>
                        <span className=" font-bold">Description: <span className=" text-sm italic font-normal">{dispSearchText(item?.nft_description)}</span></span>
                        <span className=" font-bold">Contract Address: <span className=" text-sm italic font-normal">{dispSearchText(item?.nft_contractAddress)}</span></span>
                        <span className=" font-bold">Token Id: <span className=" text-sm italic font-normal">{dispSearchText(item?.nft_tokenId)}</span></span>
                        <span className=" font-bold">Symbol: <span className=" text-sm italic font-normal">{dispSearchText(item?.nft_symbol)}</span></span>
                        <span className=" font-bold">Total Supply: <span className=" text-sm italic font-normal">{dispSearchText(item?.nft_totalSupply)}</span></span>
                      </div>

                    </td>
                    <td className="flex flex-col font-bold h-36 overflow-y-auto w-96">
                      <span className="flex flex-col bg-gray-600 text-white p-1">
                        <span>
                          Contact Name: <span className="font-normal italic text-end">{dispSearchText(item.contact_first_name + "   " + item.contact_last_name)}</span>
                        </span>
                        <span>
                          Delivery Country: <span className="font-normal italic text-end">{dispSearchText(Country.getCountryByCode(item.delivery_country).name)}</span>
                        </span>
                        <span>
                          Delivery State: <span className="font-normal italic text-end">{dispSearchText(State.getStateByCodeAndCountry(item.delivery_state, item.delivery_country).name)}</span>
                        </span>
                        <span>
                          Delivery City: <span className="font-normal italic text-end">{dispSearchText(item.delivery_city)}</span>
                        </span>
                        <span>
                          Delivery Address: <span className="font-normal italic text-end">{dispSearchText(item.delivery_address)}{" "}
                            {item.delivery_apt_suite_No}</span>
                        </span>
                        <hr />
                        <span>
                          Payment Country: <span className="font-normal italic text-end">{dispSearchText(Country.getCountryByCode(item.payment_country).name)}</span>
                        </span>
                        <span>
                          Payment State: <span className="font-normal italic text-end">{dispSearchText(State.getStateByCodeAndCountry(item.payment_state, item.payment_country).name)}</span>
                        </span>
                        <span>
                          Payment City: <span className="font-normal italic text-end">{dispSearchText(item.payment_city)}</span>
                        </span>
                        <span>
                          Payment Address: <span className="font-normal italic text-end">{dispSearchText(item.payment_address)}{" "}
                            {dispSearchText(item.delivery_apt_suite_No)}</span>
                        </span>
                      </span>
                    </td>
                    <td>
                      {new Date(
                        "" +
                        item.order_statuses[item.order_statuses.length - 1]
                          .ordered_time
                      ).toLocaleString()}
                    </td>
                    {/* <td>{item.contact_email}</td> */}
                    <td>
                      <ItemComponent id={item.item_id} />
                    </td>
                    <td>
                      {item?.item_info.isColor && (
                        <div className="flex space-x-1 items-start">
                          <span>Color:</span>
                          <div className="flex space-x-1">
                            {item?.item_info.color.map(c => <span key={c}
                              className={`bg-${c} bg-${c}-500 p-3 rounded-full border border-gray-600`}
                            ></span>)}
                          </div>
                        </div>
                      )}
                    </td>
                    <td className=" mx-auto">{item.quantity}</td>
                    <td>
                      <StatusComponent
                        id={
                          item.order_statuses[item.order_statuses.length - 1]
                            .order_status_id
                        }
                      />
                    </td>
                    <td>
                      {item.payment_type === "visa" && (
                        <div>
                          <img
                            src={`${process.env.REACT_APP_BACKEND_URL}/images/order_status/visa.svg`}
                            alt=""
                            className="w-12 h-12 bg-gray-500 rounded-sm flex justify-center items-center object-contain"
                          />
                          <a
                            href={item?.transaction_hash}
                            className=" underline"
                            target="_blank"
                            rel="noreferrer"
                          >
                            show transaction
                          </a>
                        </div>
                      )}
                      {item.payment_type === "crypto" && (
                        <div>
                          <img
                            src={`${process.env.REACT_APP_BACKEND_URL}/images/order_status/MetaMask_Fox.svg`}
                            alt=""
                            className="w-12 h-12 bg-gray-500 rounded-sm flex justify-center items-center object-contain"
                          />
                          <a
                            href={item?.transaction_hash}
                            className=" underline"
                            target="_blank"
                            rel="noreferrer"
                          >
                            show transaction
                          </a>
                        </div>
                      )}
                      {item.payment_type === "mastercard" && (
                        <div>
                          <img
                            src={`${process.env.REACT_APP_BACKEND_URL}/images/order_status/Mastercard-Logo.wine.svg`}
                            alt=""
                            className="w-12 h-12 bg-gray-500 rounded-sm flex justify-center items-center object-contain"
                          />
                          <a
                            href={item?.transaction_hash}
                            className=" underline"
                            target="_blank"
                            rel="noreferrer"
                          >
                            show transaction
                          </a>
                        </div>
                      )}
                      {item.payment_type === "paypal" && (
                        <img
                          src={`${process.env.REACT_APP_BACKEND_URL}/images/order_status/pp_fc_hl.svg`}
                          alt=""
                          className="w-12 h-12 bg-gray-500 rounded-sm flex justify-center items-center object-contain"
                        />
                      )}
                    </td>
                    <td>
                      <div
                        className="p-1 rounded-md inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-400"
                        onClick={async () => {
                          await setOrderId(item._id);
                          await setStatusId(
                            item.order_statuses[item.order_statuses.length - 1]
                              .order_status_id
                          );
                          await setStatusDropDown(!statusDropDown);
                        }}
                      >
                        Change Status
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

export default Order;
