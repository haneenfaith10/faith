import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { BsCloudUpload } from "react-icons/bs";
import { ImageToBase64 } from "../Utility/ImageToBase64";

const Newproduct = () => {
  const [data, setData] = useState({
    name: "",
    category: "",
    image: "",
    price: "",
    description: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const uploadImage = async (e) => {
    const data = await ImageToBase64(e.target.files[0]);

    setData((preve) => {
      return {
        ...preve,
        image: data,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, image, category, price } = data;

    if (name && image && category && price) {
      const fetchData = await fetch(
        `${process.env.REACT_APP_SERVER_DOMIN}/uploadProduct`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const fetchRes = await fetchData.json();
      toast(fetchRes.message);

      setData(() => {
        return {
          name: "",
          category: "",
          image: "",
          price: "",
          description: "",
        };
      });
    } else {
      toast("Enter required Fields");
    }
  };
  return (
    <div className="p-4">
      <form
        className="m-auto w-full max-w-md shadow flex flex-col p-5 bg-slate-900 rounded py-6"
        onSubmit={handleSubmit}
      >
        <label htmlFor="name" className="text-slate-300">
          Name
        </label>
        <input
          type={"text"}
          name="name"
          className="bg-slate-200 p-1 my-1"
          onChange={handleOnChange}
          value={data.name}
        />

        <label htmlFor="category" className="text-slate-300">
          category
        </label>
        <select
          className="bg-slate-200 p-1 my-1"
          id="category"
          name="category"
          onChange={handleOnChange}
          value={data.category}
        >
          <option value={"other"}>select category</option>
          <option value={"fruits"}>Fruits</option>
          <option value={"vegetable"}>Vegetables</option>
          <option value={"icecreams"}>Icecreams</option>
          <option value={"dosa"}>Dosa</option>
          <option value={"pizza"}>Pizza</option>
          <option value={"rice"}>Rice</option>
          <option value={"cake"}>Cake</option>
          <option value={"biriyani"}>Biriyani</option>
          <option value={"burger"}>Burgers</option>
          <option value={"chicken"}>Chicken items</option>
          <option value={"noodles"}>Noodles</option>
          <option value={"paneer"}>Paneer</option>
          <option value={"pasta"}>Pasta</option>
          <option value={"sandwich"}>Sandwich</option>
          <option value={"arabic dishes"}>Arabic Dishes</option>
        </select>

        <label htmlFor="image" className="text-slate-300">
          image
          <div className="h-40 w-full bg-slate-300 rounded flex items-center justify-center cursor-pointer">
            {data.image ? (
              <img src={data.image} className="h-full" />
            ) : (
              <span className="text-5xl text-slate-800">
                <BsCloudUpload />
              </span>
            )}

            <input
              type={"file"}
              accept="image/*"
              id="image"
              onChange={uploadImage}
              className="hidden"
            />
          </div>
        </label>

        <label htmlFor="price" className="my-1 text-slate-300">
          price
        </label>
        <input
          type={"text"}
          className="bg-slate-200 p-1 my-1"
          name="price"
          onChange={handleOnChange}
          value={data.price}
        />

        <label htmlFor="description" className="text-slate-300">
          Description
        </label>
        <textarea
          rows={2}
          value={data.description}
          className="bg-slate-200 p-1 my-1 resize-none"
          name="description"
          onChange={handleOnChange}
        ></textarea>

        <button className="bg-green-300 hover:bg-green-400 text-slate-900 text-lg font-medium my-2 drop-shadow">
          Save
        </button>
      </form>
    </div>
  );
};

export default Newproduct;
