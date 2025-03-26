import React, { useState, useEffect, useRef } from "react";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ImageUp, ChevronDown, Plus, Minus, Upload, X } from "lucide-react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../Context/api";
import { set } from "date-fns";

const fuelOptions = [
  { label: "PETROL", value: 0 },
  { label: "DIESEL", value: 1 },
  { label: "ELECTRIC", value: 2 },
  { label: "HYBRID", value: 3 },
  { label: "GAS", value: 4 },
];

export default function LessorEdit() {
  const [currentStep, setCurrentStep] = useState(1);
  const steps = ["Cơ bản", "Ảnh", "Giá", "Xuất bản"];

  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState([]);
  const [categories, setCategories] = useState([]);
  const [store, setStore] = useState([]);
  const [stories, setStories] = useState([]);
  const [brand, setBrand] = useState("");
  const [brands, setBrands] = useState([]);
  const [dimensions, setDimensions] = useState("");
  const [stock, setStock] = useState(0);
  const [weight, setWeight] = useState(0);
  const [fuel, setFuel] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [productId, setProductId] = useState(null);
  const [image, setImage] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);

  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);
  const location = useLocation();
  const productFromState = location.state?.product || {};
  // console.log(productFromState);

  useEffect(() => {
    const fetchImageView = async () => {
      try {
        const response = await api.get(
          `productimage/by-product/${productFromState.id}`
        );
        setImage(response.data.data);
        console.log(response.data.data);
      } catch (error) {}
    };
    fetchImageView();
  }, [productFromState]);

  useEffect(() => {
    if (productFromState) {
      setName(productFromState.name || "");
      setDescription(productFromState.description || "");
      setPrice(productFromState.price || "");
      setCategory(productFromState.categoryId || "");
      setBrand(productFromState.brandId || "");
      setStock(productFromState.stock || 0);
      setWeight(productFromState.weight || 0);
      setFuel(productFromState.fuelType || 0);
      setDimensions(productFromState.dimensions || "");
      setImagePreview(productFromState.defaultImage || "");
    }
  }, [productFromState]);

  const handleFileChangeMultiple = (e) => {
    if (!e.target.files) return;

    const filesArray = Array.from(e.target.files);
    console.log(filesArray);

    setImages((prevImages) => [...prevImages, ...filesArray]);
    console.log(images);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file);

    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();

    if (e.dataTransfer.files) {
      const filesArray = Array.from(e.dataTransfer.files).map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));

      setImages((prevImages) => [...prevImages, ...filesArray]);
    }
  };

  // Ngăn chặn hành vi mặc định của trình duyệt khi kéo thả
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Xóa một ảnh đã tải lên
  const removeImage = (index) => {
    setImages((prevImages) => {
      // Giải phóng URL để tránh rò rỉ bộ nhớ
      URL.revokeObjectURL(prevImages[index].preview);
      return prevImages.filter((_, i) => i !== index);
    });
  };

  // Mở hộp thoại chọn file
  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

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
  };

  const handleCategory = (id) => {
    ``;
    setCategory(id);
  };

  const handleBrand = (id) => {
    setBrand(id);
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat.id === Number(categoryId));
    return category?.name || "Unknown";
  };

  const getBrandName = (brandId) => {
    const brand = brands.find((cat) => cat.id === Number(brandId));
    return brand?.name;
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("category");
        setCategories(response.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchBrand = async () => {
      try {
        const response = await api.get("brand");
        setBrands(response.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchBrand();
  }, []);

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const response = await api.get("store");
        setStories(response.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchStore();
  }, []);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("categoryId", category);
    formData.append("brandId", brand);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("file", image); // Thumbnail image
    formData.append("price", parseFloat(price) || 0);
    formData.append("stock", stock);
    formData.append("weight", weight);
    formData.append("dimensions", dimensions);
    formData.append("fuelType", fuel);

    try {
      const response = await api.put("product", formData);

      if (response.status === 201 || response.status === 200) {
        const createdProductId = response.data.data.id;
        setProductId(createdProductId);
        toast.success("Product created successfully! 🎉");
        console.log(createdProductId);

        await uploadImages(createdProductId);

        setTimeout(() => {
          navigate("/lessor");
        }, 1500);
      } else {
        throw new Error("Product creation failed");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to create product. Try again!"
      );
      console.error("Error creating product:", error);
    }
  };

  const uploadImages = async (productId) => {
    if (!productId) {
      toast.error("Product ID không tồn tại. Hãy tạo sản phẩm trước!");
      return;
    }

    if (images.length === 0) {
      toast.error("Vui lòng chọn ảnh trước khi tải lên.");
      return;
    }

    const formData = new FormData();
    images.forEach((file) => formData.append("files", file)); // ✅ Append file đúng cách
    formData.append("productId", productId);

    try {
      const response = await api.put(
        `productimage/upload-multiple?productId=${productId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 200) {
        toast.success("Ảnh đã được tải lên thành công!");
      } else {
        toast.error("Tải ảnh thất bại.");
      }
    } catch (error) {
      toast.error("Lỗi khi tải ảnh.");
      console.error("Upload error:", error);
    }
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
              Tên sản phẩm
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
              Loại
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
              Thương hiệu
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
                    Chọn thương hiệu
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
              Mô tả
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
                    Số lượng
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
                    Cân nặng (kg)
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
                    Loại nhiên liệu
                  </label>
                  <select
                    id="fuel"
                    name="fuel"
                    value={fuel}
                    onChange={(e) => handleFuel(e.target.value)}
                    className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                  >
                    <option value="" disabled>
                      Chọn loại nhiên liệu
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
                    Kích thước
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
            <div className="border-2 border-yellow-500 rounded-lg mt-20 p-5 ">
              <label
                htmlFor="Media"
                className="block text-sm font-medium text-gray-900 "
              >
                Ảnh Thumbnail
              </label>

              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-6 text-center cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                onClick={() => document.getElementById("fileInput").click()}
              >
                <div className="flex flex-col items-center justify-center p-10 space-y-4">
                  <input
                    id="fileInput"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />

                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center p-10 space-y-4">
                      <div className="text-6xl text-gray-500 hover:text-gray-700">
                        <ImageUp />
                      </div>
                      <span className="text-lg font-medium text-gray-700 cursor-pointer hover:text-gray-900">
                        Upload ảnh
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="w-full max-w-3xl mx-auto p-6">
              {/* Vùng kéo thả */}
              <div className="border-2 border-yellow-500 rounded-lg mt-20 p-5">
                <h2 className="text-sm font-bold mb-6 text-gray-800">
                  Tải lên nhiều ảnh
                </h2>
                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-6 text-center cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                  onClick={openFileDialog}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                >
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChangeMultiple}
                    ref={fileInputRef}
                  />

                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-lg font-medium text-gray-700">
                    Kéo và thả hình ảnh vào đây
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    hoặc nhấp để chọn ảnh từ thiết bị của bạn
                  </p>
                </div>
              </div>

              {(image.length > 0 || images.length > 0) && (
                <div className="mb-6">
                 
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-2">
                    {/* Hiển thị ảnh từ API */}
                    {image.map((img, index) => (
                      <div key={`api-${img.id}`} className="relative group">
                        <div className="aspect-square rounded-lg overflow-hidden border border-gray-200">
                          <img
                            src={img.imageUrl}
                            alt={`Product Image ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    ))}

                    {/* Hiển thị ảnh do người dùng tải lên */}
                    {images.map((img, index) => (
                      <div key={`uploaded-${index}`} className="relative group">
                        <div className="aspect-square rounded-lg overflow-hidden border border-gray-200">
                          <img
                            src={URL.createObjectURL(img)}
                            alt={`Uploaded Image ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <button
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          aria-label="Xóa ảnh"
                        >
                          <X size={16} />
                        </button>
                        <p className="text-xs mt-1 truncate">{img.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
                Giá
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-yellow-600 p-1">
                  <div className="shrink-0 select-none text-lg text-gray-500 sm:text-base">
                    VND
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
                      <option>VND</option>
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
                Đánh giá và xuất bản
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Sản phẩm: {name}
                  </p>
                  <p className="text-base text-gray-900"></p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Loại:{getCategoryName(category)}
                  </p>
                  <p className="text-base text-gray-900"></p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Thương hiệu: {getBrandName(brand)}
                  </p>
                  <p className="text-base text-gray-900"></p>
                </div>

                <div className="flex space-x-1">
                  <p className="text-sm font-medium text-gray-600">
                    Mô tả: {description.replace(/<\/?[^>]+(>|$)/g, "")}
                  </p>
                  <div className="text-sm text-gray-900"></div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Giá (VND): {price}
                  </p>
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
            Trước
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
            {currentStep === steps.length ? "Chỉnh sửa" : "Tiếp theo"}
          </button>
        </div>
      </div>
    </div>
  );
}
