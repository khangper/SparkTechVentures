import React, { useState, useEffect } from "react";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ImageUp, ChevronDown, Plus, Minus } from "lucide-react";
import axios from "axios";
import { useParams } from "react-router-dom";

const fuelOptions = [
  { label: "Gasoline", value: 1 },
  { label: "Diesel", value: 2 },
  { label: "Natural Gas", value: 3 },
  { label: "Propane", value: 4 },
];

export default function LessorEdit() {
  const [currentStep, setCurrentStep] = useState(1);
  const steps = ["Basic", "Media", "Price", "Publish"];
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState([]);
  const [categories, setCategories] = useState([]);

  const [stories, setStories] = useState([]);
  const [brand, setBrand] = useState("");
  const [brands, setBrands] = useState([]);
  const [dimensions, setDimensions] = useState("");

  const [stock, setStock] = useState(0);
  const [weight, setWeight] = useState(0);
  const [fuel, setFuel] = useState(0);
  const { id } = useParams();

  const handleDescriptionChange = (value) => {
    setDescription(value);
  };

  const handleChange = (setter, action) => {
    setter((prev) =>
      action === "increase" ? prev + 1 : Math.max(prev - 1, 0)
    );
  };

  const handleFuel = (value) => {
    setFuel(value);
    console.log(value);
  };

  const handleCategory = (id) => {
    setCategory(id);
    console.log(id);
  };

  const handleStore = (id) => {
    setStore(id);
    console.log(id);
  };

  const handleBrand = (id) => {
    setBrand(id);
    console.log(id);
  };
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5083/api/category");
        setCategories(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchBrand = async () => {
      try {
        const response = await axios.get("http://localhost:5083/api/brand");
        setBrands(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchBrand();
  }, []);

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const response = await axios.get("http://localhost:5083/api/store");
        setStories(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchStore();
  }, []);

  const editProduct = async (productData) => {
    const API_URL = `http://localhost:5083/api/product/${id}`;
    const token = localStorage.getItem("accessToken");

    try {
      const response = await axios.put(API_URL, productData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Product added successfully!");
    } catch (error) {
      console.error("Error adding product:", error.response?.data || error);
      alert("Failed to add product. Please check authentication.");
    }
  };

  const handleSubmit = async () => {
    const productData = {
      categoryId: category,
      brandId: brand,
      name: name,
      description: description,
      defaultImage: "https://example.com/default-image.jpg",
      price: parseFloat(price) || 0,
      stock: stock,
      weight: weight,
      dimensions: dimensions,
      fuelType: fuel,
    };

    await editProduct(productData);
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
            <div className="mt-1 w-[100%]">
              <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-yellow-500 p-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
            <div className="mt-1 w-[100%]">
              <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-yellow-500 p-2">
                <select
                  id="category"
                  name="category"
                  value={category}
                  onChange={(e) => handleCategory(e.target.value)}
                  className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <label
              htmlFor="brand"
              className="block text-sm/6 font-medium text-gray-900 mt-20"
            >
              Brand
            </label>
            <div className="mt-1 w-[100%]">
              <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-yellow-500 p-2">
                <select
                  id="brand"
                  name="brand"
                  value={brand}
                  onChange={(e) => handleBrand(e.target.value)}
                  className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                >
                  <option value="" disabled>
                    Select a store
                  </option>
                  {brands.map((br) => (
                    <option key={br.id} value={br.id}>
                      {br.name}
                    </option>
                  ))}
                </select>
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

            <div className=" mt-20 p-5  border-5 border-white rounded-lg">
              <div className="flex flex-col gap-10 items-center ">
                <div className="w-full">
                  <label
                    htmlFor="stock"
                    className="block text-sm/6 font-medium text-gray-900 "
                  >
                    Stock
                  </label>
                  <div className="flex items-center gap-5 justify-center">
                    <button
                      className="flex items-center justify-center w-10 h-10 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full shadow-md transition-all duration-200 ease-in-out focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
                      onClick={() => handleChange(setStock, "decrease")}
                    >
                      <Minus className="w-6 h-6" />
                    </button>
                    <div className="w-[50%] flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-yellow-500 p-2">
                      <input
                        id="stock"
                        name="stock"
                        type="text"
                        value={stock}
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          const numericValue = inputValue.replace(
                            /[^0-9]/g,
                            ""
                          );
                          console.log(numericValue, "i7777");

                          setStock(
                            numericValue === "" ? "" : Number(numericValue)
                          );
                        }}
                        placeholder="Stock"
                        className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                      />
                    </div>
                    <button
                      className="flex items-center justify-center w-10 h-10 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full shadow-md transition-all duration-200 ease-in-out focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
                      onClick={() => handleChange(setStock, "increase")}
                    >
                      <Plus className="w-6 h-6" />
                    </button>
                  </div>
                </div>

                <div className="w-full">
                  <label
                    htmlFor="weight"
                    className="block text-sm/6 font-medium text-gray-900 "
                  >
                    Weight
                  </label>
                  <div className="flex items-center gap-5 justify-center">
                    <button
                      className="flex items-center justify-center w-10 h-10 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full shadow-md transition-all duration-200 ease-in-out focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
                      onClick={() => handleChange(setWeight, "decrease")}
                    >
                      <Minus className="w-6 h-6" />
                    </button>

                    <div className="w-[50%] flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-yellow-500 p-2">
                      <input
                        id="weight"
                        name="weight"
                        type="text"
                        value={weight}
                        onChange={(e) => setWeight(Number(e.target.value)) || 0}
                        placeholder="Weight"
                        className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                      />
                    </div>
                    <button
                      className="flex items-center justify-center w-10 h-10 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full shadow-md transition-all duration-200 ease-in-out focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
                      onClick={() => handleChange(setWeight, "increase")}
                    >
                      <Plus className="w-6 h-6" />
                    </button>
                  </div>
                </div>

                <div className="w-full">
                  <label
                    htmlFor="fuel"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Fuel
                  </label>
                  <select
                    id="fuel"
                    name="fuel"
                    value={fuel}
                    onChange={(e) => handleFuel(e.target.value)}
                    className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                  >
                    <option value="" disabled>
                      Select Fuel Type
                    </option>
                    {fuelOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-full">
                  <label
                    htmlFor="dimensions"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Dimensions
                  </label>
                  <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-yellow-500 p-2">
                    <input
                      id="dimensions"
                      name="dimensions"
                      type="text"
                      placeholder="Dimensions"
                      value={dimensions}
                      onChange={(e) => setDimensions(e.target.value)}
                      className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                    />
                  </div>
                </div>
              </div>
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
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
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
                  <p className="text-sm font-medium text-gray-600">
                    Name: {name}
                  </p>
                  <p className="text-base text-gray-900"></p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Category:{" "}
                  </p>
                  <p className="text-base text-gray-900"></p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-600">Brand: </p>
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
}
