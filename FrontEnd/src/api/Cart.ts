import { instance } from "./instance";

export const AddToCart = (cart: any) => {
  return instance.post("/cart/addToCart", cart);
};
export const DeleteCartItem = (_id: any) => {
  return instance.delete(`/cart/${_id}`);
};
export const GetALlCart = () => {
  return instance.get("/cart");
};
export const GetCartByUser = (_id: any) => {
  return instance.get(`/cart/${_id}/getCartByUser`);
};
