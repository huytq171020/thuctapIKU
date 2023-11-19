import { IBill } from "../interface/Bill";
import { instance } from "./instance";
//api
export const GetAllBill = () => {
  return instance.get(`/bills`)
}

export const AddBill = (bill: IBill) => {
  return instance.post("/bills", bill);
};

export const UpdateBill = (bill: IBill) => {
  return instance.put("/bills", bill);
};


export const DeleteBill = (_id: string) => {
  return instance.delete(`/bills/` + _id);
};

