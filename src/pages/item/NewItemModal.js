import axios from "axios";
import React, { useRef, useState } from "react";
import { toast } from "react-toastify";

// import Ripple from "react-waves-effect/lib";
import {
  Button,
  CheckBox,
  ImageUploadButton,
  SelectBox,
} from "../../components/Input";
import ColorSelectBox from "./ColorSelectBox";
import PriceSelectBox from "./PriceSelectBox";

const NewItemModal = ({ onClose }) => {
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    image: "",
    category_id: "",
    priceType: "",
    price: 0,
    bulk_pricing: [],
    // bulk_quantity: 0,
    // bulk_price: 0,
    isColor: false,
    color: [],
    width: 0,
    height: 0,
    isPopular: false,
    // onSale: false,
    soldOut: false,
  });
  const imgButton = useRef(null);
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
    const handleSubmit = (e) => {
      e.preventDefault();
      if (
        newItem.name === "" ||
        newItem.description === "" ||
        // newItem.image === "" ||
        newItem.width === 0 ||
        newItem.height === 0
      )
        error("Fill Out All Required Values!");
      const formData = new FormData();
      Object.keys(newItem).forEach((v) => {
        if(v!=='isColor' && v!=='height' && v!=='width'&& v!=='bulk_pricing'&& v!=='color')
        formData.append(v, newItem[v]);
      });
      formData.append('width', Number(newItem.width));
      formData.append('height', Number(newItem.height));
      formData.append('bulk_pricing', JSON.stringify(newItem.bulk_pricing));
      formData.append('color', JSON.stringify(newItem.color));
      let isColor = false;
      if(!(newItem.color.length === 0) && newItem.isColor) isColor = true
      formData.append("isColor", isColor);
      formData.append("isBulk", !(newItem.bulk_pricing.length === 0));
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/api/item/`, formData)
        .then((res) => {
          if (res.status === 201) {
            success("Saved Successfully!");
            onClose();
            // console.log(res)
          }
        })
        .catch((err) => {
          error(err.response.data.message);
          console.log(err);
        });
    };

  const handleChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    setNewItem({ ...newItem, image: e.target.files[0] });
  };
  return (
    <div className=" fixed top-0 left-0 z-50 w-full h-full overflow-x-hidden overflow-y-auto bg-opacity-70 bg-slate-600">
      <div className=" relative w-auto h-full">
        <div className=" sm:min-h-[calc(100% - 3.5rem)] sm:max-w-lg w-full -translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2">
          <div className="flex flex-col w-full bg-white rounded-lg">
            <div className="flex items-center justify-between p-4 w-full">
              <div className=" text-gray-500 text-lg font-semibold">
                Add New Item
              </div>
              <span
                className=" text-gray-500 cursor-pointer hover:text-gray-700"
                onClick={onClose}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </span>
            </div>
            <div className=" h-96 overflow-y-auto">
              <form
                onSubmit={handleSubmit}
                encType="multipart/form-data"
                className="flex flex-col p-4 space-y-3"
              >
                <div className="flex flex-col space-y-2">
                  <span className=" text-gray-500 text-lg">
                    Select Category
                  </span>
                  <SelectBox
                    url="/api/category/"
                    query="category-list"
                    name="category"
                    onChangeHandle={(v) => {
                      
                      if (v !== undefined && v !== newItem.category_id) {
                        setNewItem({ ...newItem, category_id: v });
                      }
                        
                    }}
                    isIncludedImage
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <span className=" text-gray-500 text-lg">
                    Item Name
                    <span className=" text-red-800 text-base align-text-top">
                      {" "}
                      *
                    </span>
                  </span>
                  <input
                    className="w-full py-2 px-3 text-[#495057] border border-gray-400 rounded outline-none"
                    type="text"
                    placeholder="name"
                    name="name"
                    value={newItem.name}
                    onChange={handleChange}
                  />
                </div>
                <input
                  className=" hidden"
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  name="image"
                  onChange={handleImage}
                  ref={imgButton}
                />
                <div className="flex-1 flex flex-col">
                  <span className=" text-gray-500 text-lg">
                    Description
                    <span className=" text-red-800 text-base align-text-top">
                      {" "}
                      *
                    </span>
                  </span>
                  <textarea
                    className="w-full py-2 px-3 text-[#495057] border border-gray-400 rounded outline-none"
                    name="description"
                    value={newItem.description}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex-1 flex flex-col">
                  <span className=" text-gray-500 text-lg">
                    Image
                    <span className=" text-red-800 text-base align-text-top">
                      {" "}
                      *
                    </span>
                  </span>
                  <ImageUploadButton
                    image={newItem.image}
                    handleChange={handleImage}
                  />
                </div>
                <div className="flex-1 flex flex-col">
                  <span className=" text-gray-500 text-lg">
                    Price
                    <span className=" text-red-800 text-base align-text-top">
                      {" "}
                      *
                    </span>
                  </span>
                  <div className="w-3/4 mx-auto">
                    <PriceSelectBox
                      onChangeHandle={(v) => {
                        setNewItem({ ...newItem, priceType: v });
                      }}
                      onPriceChangeHandle={(v) => {
                        setNewItem({ ...newItem, price: v });
                      }}
                    />
                  </div>
                </div>
                <div className="flex-1 flex flex-col">
                  <span className=" text-gray-500 text-lg">
                    Size
                    <span className=" text-red-800 text-base align-text-top">
                      {" "}
                      *
                    </span>
                  </span>
                  <div className="w-4/5 mx-auto flex items-center space-x-2 justify-between">
                    <div className="flex items-center space-x-1">
                      <span className=" text-gray-500 text-base">Width:</span>
                      <input
                        className={` w-full py-2 px-3 text-[#495057] border border-gray-400 rounded outline-none`}
                        type="number"
                        placeholder="Width"
                        name="width"
                        // value={newItem.width}
                        onChange={(v) => {setNewItem({ ...newItem, width: Number(v.target.value) });}}
                      />
                      <span className=" text-gray-500 text-base">cm</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className=" text-gray-500 text-base">Height:</span>
                      <input
                        className={` w-full py-2 px-3 text-[#495057] border border-gray-400 rounded outline-none`}
                        type="number"
                        placeholder="Height"
                        name="height"
                        // value={newItem.height}
                        onChange={(v) => {setNewItem({ ...newItem, height: v.target.value });}}
                      />
                      <span className=" text-gray-500 text-base">cm</span>
                    </div>
                  </div>
                </div>
                <div className="flex-1 flex flex-col">
                  <span className=" text-gray-500 text-lg">Bulk Pricing</span>
                  <div className="w-4/5 mx-auto flex items-center space-x-2 justify-between">
                    <div className="h-full flex flex-col space-y-1 w-full">
                      {newItem.bulk_pricing.map((bulk, index) => {
                        return (
                          <div className="flex space-x-1 items-center" key={index}>
                            <div className="flex items-center justify-center space-x-1">
                              <span className=" text-gray-500 text-base">
                                Quantity:
                              </span>
                              <input
                                className={` w-full py-2 px-3 text-[#495057] border border-gray-400 rounded outline-none`}
                                type="number"
                                placeholder=""
                                name="bulk_quantity"
                                value={bulk.quantity}
                                onChange={(e) => {
                                  let arr = newItem.bulk_pricing;
                                  arr[index].quantity = e.target.value
                                  setNewItem({ ...newItem, bulk_pricing: arr });
                                }}
                              />
                            </div>
                            <div className="flex items-center space-x-1">
                              <span className=" text-gray-500 text-base">
                                Discount:
                              </span>
                              <input
                                className={` w-full py-2 px-3 text-[#495057] border border-gray-400 rounded outline-none`}
                                type="number"
                                placeholder="%"
                                name="bulk_discount"
                                value={bulk.discount}
                                onChange={(e) => {
                                  let arr = newItem.bulk_pricing;
                                  arr[index].discount = e.target.value
                                  setNewItem({ ...newItem, bulk_pricing: arr });
                                }}
                              />
                            </div>
                            <span className=" px-2 border text-center border-red-500 rounded-lg text-red-500 hover:border-red-700 hover:text-red-700 cursor-pointer"
                              onClick={() => {
                                let arr = [];
                                newItem.bulk_pricing.forEach((v,i) => {
                                  if(i !== index) arr.push(v)
                                })
                                setNewItem({ ...newItem, bulk_pricing: arr });
                              }}
                            >
                              -
                            </span>
                          </div>
                        );
                      })}
                      <span className=" px-10 border text-center mx-auto border-green-500 rounded-lg text-green-500 hover:border-green-700 hover:text-green-700 cursor-pointer"
                        onClick={() => {
                          let arr = newItem.bulk_pricing;
                          arr.push({quantity:0, discount:0})
                          setNewItem({ ...newItem, bulk_pricing: arr });
                        }}
                      >
                        +
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex-1 flex flex-col">
                  <span className=" text-gray-500 text-lg">Color</span>
                  <div className="w-full flex justify-center">
                    <ColorSelectBox
                      isColorHandle={(v) => {
                        setNewItem({ ...newItem, isColor: v });
                      }}
                      onChangeHandle={(v) => {
                        // console.log(v)
                        setNewItem({ ...newItem, color: v });
                      }}
                    />
                  </div>
                </div>
                <div className="flex-1 flex flex-col">
                  <div className="w-full flex justify-evenly my-4">
                    <CheckBox
                      name="isPopular"
                      title="Is Popular"
                      onCheckHandle={(v) => {
                        setNewItem({ ...newItem, isPopular: v });
                      }}
                      dvalue={false}
                    />
                    {/* <CheckBox
                      name="onSale"
                      title="On Sale"
                      onCheckHandle={(v) => {
                        setNewItem({ ...newItem, onSale: v });
                      }}
                      dvalue={false}
                    /> */}
                    <CheckBox
                      name="soldOut"
                      title="Sold Out"
                      onCheckHandle={(v) => {
                        setNewItem({ ...newItem, soldOut: v });
                      }}
                      dvalue={false}
                    />
                  </div>
                </div>
                <div className=" flex justify-between w-full">
                  <Button
                    onClickHandle={onClose}
                    color="red"
                    size="long"
                    rounded="sm"
                    text="Cancel"
                  />
                  {/* <Ripple> */}
                    <input
                      className="flex cursor-pointer py-2 px-6 text-sm rounded transition-all duration-100 text-white hover:bg-green-500 bg-green-400 text-center items-center"
                      type="submit"
                      // style={{'backgroundColor': '#34c38f'}}
                    />
                  {/* </Ripple> */}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewItemModal;
