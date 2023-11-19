import { useEffect } from "react";
import { IBill } from "../../../interface/Bill";
import { useAppDispatch, useAppSelector } from "../../../store/hook";
import { getAllBill, updateBill } from "../../../actions/bill";
import { Select } from "antd";
// import { toast } from 'react-toastify';
const Bill = () => {
  const dispatch = useAppDispatch();
  const { bills } = useAppSelector((state: any) => state.bill);

  useEffect(() => {
    dispatch(getAllBill());
  }, []);

  const handleChange = (value: string, billId: any) => {
    dispatch(updateBill({ billId, status: value }))
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-6">
      <h1 className="text-center font-bold text-[24px]">DANH SÁCH ĐƠN HÀNG</h1>
      <table className=" w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr className="text-center">
            <th scope="col" className="px-6 py-3 w-[30px]">
              Id
            </th>
            <th scope="col" className="px-6 py-3">
              Tên người nhận
            </th>
            <th scope="col" className="px-6 py-3">
              Mã đơn hàng
            </th>
            <th scope="col" className="px-6 py-3">
              đơn hàng
            </th>
            <th scope="col" className="px-6 py-3">
              thành tiền
            </th>
            <th scope="col" className="px-6 py-3">
              Địa chỉ
            </th>
            <th scope="col" className="px-6 py-3">
              Trạng thái
            </th>
            <th scope="col" className="px-6 py-3">
              Hành động
            </th>
          </tr>
        </thead>
        <tbody className="text-center">
          {bills?.map((bill: IBill, index: any) => {
            return (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
              >
                <td className="px-6 py-4">{index + 1}</td>
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {bill.bill_name}
                </td>
                <td className="px-6 py-4 w-[200px] text-center">
                  {bill.bill_address}
                </td>
                <td className="px-6 py-4">{bill.bill_phone}</td>
                <td className="px-6 py-4">{bill.createdAt}</td>
                <td className="px-6 py-4">{bill.bill_quantity}</td>
                <td>
                  <Select
                    defaultValue={bill.status}
                    onChange={(value) => handleChange(value, bill._id)}
                    options={[
                      {
                        value: "Pending",
                        label: "Pending",
                      },
                      {
                        value: "Confirmed",
                        label: "Confirmed",
                      },
                      {
                        value: "Rejected",
                        label: "Rejected",
                      },
                      {
                        value: "Delivering",
                        label: "Delivering",
                      },
                      {
                        value: "Delivered",
                        label: "Delivered",
                      },
                    ]}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Bill;
