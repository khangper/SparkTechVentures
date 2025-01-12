import React, { useState } from "react";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ImageUp, ChevronDown } from "lucide-react";

export const LessorPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const steps = ["Basic", "Media", "Price", "Publish"];
  const [description, setDescription] = useState("");

  const handleDescriptionChange = (value) => {
    setDescription(value);
  };

  const handleSubmit = () => {
    const productData = {
      name: "Tên sản phẩm",
      category: "Danh mục",
      brand: "Thương hiệu",
      description: description,
      price: "Giá tiền",
      currency: "USD",
    };

    console.log("Submitting product data:", productData);

    alert("Product submitted successfully!");
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 1:
        return (
          <>
            <label
              htmlFor="Name"
              className="block text-sm/6 font-medium text-gray-900 mt-8"
            >
              Name
            </label>
            <div className="mt-1 w-[1423px]">
              <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-yellow-500 p-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Name"
                  className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                />
              </div>
            </div>

            <label
              htmlFor="category"
              className="block text-sm/6 font-medium text-gray-900 mt-20"
            >
              Category
            </label>
            <div className="mt-1 w-[1423px]">
              <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-yellow-500 p-2">
                <input
                  id="category"
                  name="category"
                  type="text"
                  placeholder="Category"
                  className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                />
              </div>
            </div>

            <label
              htmlFor="brand"
              className="block text-sm/6 font-medium text-gray-900 mt-20"
            >
              Brand
            </label>
            <div className="mt-1 w-[1423px]">
              <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-yellow-500 p-2">
                <input
                  id="brand"
                  name="brand"
                  type="text"
                  placeholder="Brand"
                  className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                />
              </div>
            </div>

            <label
              htmlFor="description"
              className="block text-sm/6 font-medium text-gray-900 mt-20"
            >
              Description
            </label>
            <div className="">
              <ReactQuill
                value={description}
                onChange={handleDescriptionChange}
                theme="snow"
                className=" bg-white"
              />
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div className="border-2 border-yellow-500 rounded-lg mt-20 p-5">
              <label
                htmlFor="Media"
                className="block text-sm font-medium text-gray-900 "
              >
                Media
              </label>

              <div
                className="bg-white cursor-pointer"
                onClick={() => document.getElementById("fileInput").click()}
              >
                <div className="flex flex-col items-center justify-center p-10 space-y-4">
                  <input
                    id="fileInput"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => console.log(e.target.files[0])}
                  />

                  <div className="text-6xl text-gray-500  hover:text-gray-700">
                    <ImageUp />
                  </div>
                  <span
                    className="text-lg font-medium text-gray-700 cursor-pointer hover:text-gray-900"
                    onClick={() => document.getElementById("fileInput").click()}
                  >
                    Upload Image
                  </span>
                </div>
              </div>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <div className="bg-white rounded-lg  mt-20 p-20">
              <label
                htmlFor="price"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Price
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-yellow-600 p-1">
                  <div className="shrink-0 select-none text-lg text-gray-500 sm:text-base">
                    $
                  </div>
                  <input
                    id="price"
                    name="price"
                    type="text"
                    placeholder="0.00"
                    className="block min-w-0 grow py-1.5 pl-1 pr-3 text-lg text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-base"
                  />
                  <div className="grid shrink-0 grid-cols-1 focus-within:relative">
                    <select
                      id="currency"
                      name="currency"
                      aria-label="Currency"
                      className="col-start-1 row-start-1 w-full appearance-none rounded-md py-2 pl-3 pr-7 text-lg text-gray-500 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-base"
                    >
                      <option>USD</option>
                    </select>
                    <ChevronDown
                      aria-hidden="true"
                      className="pointer-events-none col-start-1 row-start-1 mr-2 size-6 self-center justify-self-end text-gray-500 sm:size-5"
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      case 4:
        return (
          <>
            <div className="bg-white rounded-lg mt-20 p-20">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Review and Publish
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">Name:</p>
                  <p className="text-base text-gray-900"></p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-600">Category:</p>
                  <p className="text-base text-gray-900"></p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-600">Brand:</p>
                  <p className="text-base text-gray-900"></p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Description:
                  </p>
                  <div className="text-base text-gray-900">
                    <div dangerouslySetInnerHTML={{ __html: description }} />
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-600">Price:</p>
                  <p className="text-base text-gray-900"></p>
                </div>
              </div>

              <div className="mt-10">
                <button
                  onClick={handleSubmit}
                  className="w-full px-4 py-2 rounded-md bg-gray-300 text-white hover:bg-gray-500"
                >
                  Submit
                </button>
              </div>
            </div>
          </>
        );

      default:
        return <p>Unknown step</p>;
    }
  };

  return (
    <div className="bg-slate-100 min-h-screen flex flex-col items-center">
      <div className="w-3/4 pt-20">
        <div className="p-4 bg-white rounded-xl">
          <ProgressBar
            steps={steps}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
        </div>

        <div className="">{renderStepContent(currentStep)}</div>

        <div className="flex justify-between mt-6 mb-8">
          <button
            onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 1))}
            disabled={currentStep === 1}
            className={`px-4 py-2 rounded-md ${
              currentStep === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-yellow-500 text-white hover:bg-yellow-600"
            }`}
          >
            Previous
          </button>
          <button
            onClick={() =>
              currentStep === steps.length
                ? handleSubmit()
                : setCurrentStep((prev) => Math.min(prev + 1, steps.length))
            }
            className={`px-4 py-2 rounded-md ${
              currentStep === steps.length
                ? "bg-green-500 text-white hover:bg-green-600"
                : "bg-yellow-500 text-white hover:bg-yellow-600"
            }`}
          >
            {currentStep === steps.length ? "Submit" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};
