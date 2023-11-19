
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { IBill } from "../../interface/Bill";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { addBill, getAllBill } from "../../actions/bill";
import { useNavigate } from "react-router-dom";

const ProductAdd = () => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm<IBill>();
  const navigate = useNavigate()
  const onSubmit = async (bill: IBill) => {
     try {
      await dispatch(addBill(bill)).unwrap();
      navigate('/cart')
     } catch (error:any) {
      console.log(error.respones.data.message);     
     }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit as any)} >
      <div className="relative overflow-x-auto sm:rounded-lg mb-5 mt-[50px]">
        <div className="w-full text-sm text-left text-gray-500 dark:text-gray-400 grid grid-cols-2 gap-5">
          <div>
            <label htmlFor="bill_name" className="font-bold text-19">
              Tên người nhận
            </label>{" "}
            <br />
            <input
              type="text"
              {...register("bill_name", { required: "Tên sản phẩm không được bỏ Trống", minLength: { value: 5, message: "Tối thiểu 5 kí tự" } })}
              id="product_name"
              className="shadow-md w-full px-3 py-4 rounded-md mt-2 focus:border-b border-b focus:border-blue-400 focus:duration-150 outline-none hover:shadow text-16"
            />
            <div className="text-red-500">{errors.bill_name && errors.bill_name.message}</div>
          </div>
          <div>
            <label htmlFor="bill_address" className="font-bold text-19">
              Địa chỉ người nhận 
            </label>{" "}
            <br />
            <input
              type="text"
              {...register("bill_address", { required: "Images Không được bỏ trống" })}
              className="shadow-md w-full px-3 py-4 rounded-md mt-2 focus:border-b border-b focus:border-blue-400 focus:duration-150 outline-none hover:shadow text-16"
            />
            <div className="text-red-500">{errors.bill_address?.message}</div>
          </div>
          <div>
            <label htmlFor=" bill_phone" className="font-bold text-19">
              Số điện thoại người nhận
            </label>{" "}
            <br />
            <input
              type="number"
              {...register("bill_phone", { required: "Giá không được bỏ trống " })}
              className="shadow-md w-full px-3 py-4 rounded-md mt-2 focus:border-b border-b focus:border-blue-400 focus:duration-150 outline-none hover:shadow text-16"
            />
            <div className="text-red-500">{errors. bill_phone?.message}</div>
          </div>
        </div>
      </div>
      <div className="mb-4">
        <button
          type="submit"
          className="bg-green-600 px-10 py-2 duration-200 hover:bg-green-700 cursor-pointer rounded-md text-white"
        >
          Đặt hàng
        </button>
      </div>
    </form>
  );
};

export default ProductAdd;
