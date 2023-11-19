import { Link } from "react-router-dom";
import {  useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import {  getAllProduct } from "../../actions/product";
import { getAllCategory } from "../../actions/category";

const ProductItem = (item: any) => {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state: any) => state.products);
  const { categories } = useAppSelector((state: any) => state.categories);
  const [currenPages, setCurrenPages] = useState<any>(1);
  const [totalItems, setTotalItem] = useState(1);
  
  useEffect(() => {
    console.log("Error Memory Leak detected");
    // dispatch(getAllProduct());
    // setCurrenPages(products?.totalPages);
    // setTotalItem(products?.totalDocs);
    // dispatch(getAllCategory());
  }, []);

  const { _id, product_images, product_name, product_price, product_discount } =
    item?.item || {};

  return (
    <div className="flex flex-col max-h-[500px] h-full p-3 bg-white rounded-lg select-none movie-cart">
      <Link
        to={`/products/${_id}`}
        className="overflow-hidden rounded-md h-[250px]"
      >
        <img
          src={product_images}
          alt=""
          className="w-full hover:scale-105 h-full duration-300 transition-all  object-cover rounded-md mb-5"
        />
      </Link>
      <div className="flex flex-col flex-1 mt-4">
        <h5 className="mb-2 hover:text-secondary  duration-200 transition-all">
          <Link to={`/products/${_id}`}>{product_name}</Link>
        </h5>
        <div className="flex items-center justify-between mb-10 text-sm ">
          <span className="font-bold text-[#CD151C] text-[15px]">
            {product_price?.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </span>
        </div>
        <Link
          to={`/products/${_id}`}
          className="w-full py-2 text-white text-center duration-300 transition-all  rounded-lg cursor-pointer hover:text-primary bg-[#fcaf17] hover:bg-white hover:border border border-secondary mt-auto"
        >
          Xem chi tiết
        </Link>
      </div>
    </div>
  );
};

export default ProductItem;
