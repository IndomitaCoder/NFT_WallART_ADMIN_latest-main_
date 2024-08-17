import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
// import Ripple from "react-waves-effect/lib";
import { Button, ImageUploadButton } from "../../components/Input";

const NewCategoryModal = ({ onClose }) => {
  const [newUser, setNewUser] = useState({
    name: "",
    description: "",
    image: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", newUser.image);
    formData.append("description", newUser.description);
    formData.append("name", newUser.name);

    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/category/`, formData)
      .then((res) => {
        if (res.status === 201) {
          success("Saved Successfully!");
          onClose();
        }
      })
      .catch((err) => {
        error(err.response.data.message);
        console.log(err);
      });
  };

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    setNewUser({ ...newUser, image: e.target.files[0] });
  };

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

  return (
    <div className=" fixed top-0 left-0 z-50 w-full h-full overflow-x-hidden overflow-y-auto bg-opacity-70 bg-slate-600">
      <div className=" relative w-auto h-full">
        <div className=" sm:min-h-[calc(100% - 3.5rem)] sm:max-w-lg w-full -translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2">
          <div className="flex flex-col w-full bg-white rounded-lg">
            <div className="flex items-center justify-between p-4 w-full">
              <div className=" text-gray-500 text-lg font-semibold">
                Add New Category
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
                    Category Name
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
                    value={newUser.name}
                    onChange={handleChange}
                  />
                </div>

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
                    value={newUser.description}
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
                    image={newUser.image}
                    handleChange={handleImage}
                  />
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

export default NewCategoryModal;
