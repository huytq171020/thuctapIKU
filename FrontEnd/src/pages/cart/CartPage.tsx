import { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { deleteCartItem, getCartByUser } from "../../actions/cart";
const CartPage = () => {
  const [totalCart, setTotalCart] = useState(0);
  const dispatch = useAppDispatch();
  const { carts } = useAppSelector((item: any) => item.carts);
  const dataCarts = Array.isArray(carts) ? carts : [];
  // return;
  const total_cart = dataCarts?.reduce((sum: any, item: any) => {
    return sum + item?.price * item?.quantity;
  }, 0);
  // Parse the user object from localStorage
  const userStr = localStorage.getItem("users");
  const user = userStr ? JSON.parse(userStr) : null;

  // Destructure _id safely using optional chaining
  const { _id } = user?.user || {};
  useEffect(() => {
    if (_id) {
      setTotalCart(total_cart);
      dispatch(getCartByUser(_id)).catch((error) => {
        toast.error(error.message);
      });
    }
  }, [dispatch, _id, total_cart]);
  const removeCartItem = async (id: string) => {
    await dispatch(deleteCartItem(id));
  };
  return (
    <div className="bg-gray-[#e7e7e7]">
      {dataCarts.length > 0 ? (
        <div className="max-w-[1240px] mx-auto w-full mt-5">
          <div className="border border-yellow-300 bg-yellow-[#fffefb] px-4 py-2 flex items-center space-x-2">
            <i className="fa-solid fa-truck-fast text-[#167972]"></i>
            <h1>
              Nhấn vào mục Mã giảm giá ở cuối trang để hưởng miễn phí vận chuyển
              bạn nhé!
            </h1>
          </div>
          <table className="w-full my-3 mb-6">
            <thead className="bg-white border-b">
              <tr className="flex items-center font-bold">
                <td className="py-3 w-[600px] pl-7">Sản phẩm</td>
                <td className="w-[150px] text-center">Đơn giá</td>
                <td className="w-[150px] text-center">Số lượng</td>
                <td className="w-[150px] text-center">Số tiền</td>
                <td className="w-[190px] text-center">Thao tác</td>
              </tr>
            </thead>
            <tbody className="bg-white px-5 shadow-lg">
              {dataCarts?.map((item: any, index: number) => {
                return (
                  <tr
                    key={`${index}-${item?._id}`}
                    className="flex items-center border border-b-blue-100 mb-2"
                  >
                    <td className="py-3 w-[600px] flex px-7 space-x-5">
                      <div className="max-w-[100px]">
                        <img src={item?.product_image} alt="" />
                      </div>
                      <div className="flex flex-col gap-y-5">
                        <a href="">
                          <h1>{item?.product_name}</h1>
                        </a>
                        <div className="flex">
                          <p className="text-blue-500 font-medium">
                            {item?.color} / {item?.size}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="w-[150px] text-center text-red-500 font-bold">
                      <p>{item?.price} đ</p>
                    </td>
                    <td className="w-[150px] flex text-center">
                      <div>
                        <button
                          // onClick={}
                          className="w-10 h-10 text-[#7A7A9D] text-xl border border-gray-300 rounded-s"
                        >
                          -
                        </button>
                        <input
                          type="text"
                          value={item?.quantity}
                          name="quantity"
                          onChange={(e) => e.target.value}
                          id=""
                          className="inline-block  w-10 h-10 text-center border border-t-gray-300  text-[#7A7A9D] text-xl "
                        />

                        <button
                          // onClick={}
                          className="w-10 h-10 border border-gray-300 rounded-r text-[#7A7A9D] text-xl"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="w-[150px] text-center text-red-500 font-bold">
                      {item?.price * item?.quantity} đ
                    </td>
                    <td className="w-[190px] text-center">
                      <button onClick={() => removeCartItem(item?._id)}>
                        <i className="fa-solid fa-trash text-[#f00a0a]"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="bg-white px-5 flex items-center justify-between mb-6 py-3">
            <button className="bg-red-600 text-white rounded-sm px-10 py-2 hover:bg-red-700 transition-all">
              Xóa tất cả
            </button>
            <div className="checkout flex space-x-5 items-center">
              <div className="flex space-x-2">
                Tổng thanh toán: (<p>{dataCarts?.length || 0} sản phẩm</p>)
                <span className="text-red-600 font-medium">
                  {totalCart || 0}k
                </span>
              </div>
              <button className="bg-red-600 text-white rounded-sm px-10 py-2 hover:bg-red-700 transition-all">
                Mua hàng
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-2 text-center text-red-500 bg-slate-50">
          Giỏ hàng trống
        </div>
      )}
    </div>
  );
};

export default CartPage;
