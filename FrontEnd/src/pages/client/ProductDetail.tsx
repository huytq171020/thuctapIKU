import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Tabs, Input, Button, Form, Rate } from "antd";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { v4 } from "uuid";

// import { addToCart } from "../../api/Cart";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { getProductById } from "../../actions/product";
import { getCommentByProduct, postComment } from "../../actions/comment";
import ProductItem from "../../components/product/ProductItem";
import { addToCart } from "../../actions/cart";

const { TextArea } = Input;
const { TabPane } = Tabs;

const ProductDetail = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { id } = useParams<{ id: string | any }>();
  // const { register, handleSubmit, reset } = useForm();
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.products);
  const { comments } = useAppSelector((state) => state.comments);

  const { product } = products;

  useEffect(() => {
    dispatch(getProductById(id));
    dispatch(getCommentByProduct(id) as any);
  }, [dispatch, id]);

  // Input
  const [count, setCount] = useState(1);
  
  const handleIncrement = () => {
    setCount((count) => count + 1);
  };

  const handleDecrement = () => {
    if (count <= 0) return;
    setCount((count) => count - 1);
  };
  // // Phần đánh giá
  const [activeTab, setActiveTab] = useState("description");
  const handleTabChange = (key: any) => {
    setActiveTab(key);
  };
  const userStr: any = localStorage.getItem("users");
  const user = userStr ? JSON.parse(userStr) : null;

  const onReviewSubmit = async (values: any) => {
    if (userStr !== null) {
      const { _id } = user?.user || {};
      const commentData = {
        userId: _id,
        productId: id,
        rating: values.rating,
        review: values.review,
      };
      dispatch(postComment(commentData));
    } else {
      alert("Bạn phải đăng nhập mới được bình luận");
    }
  };

  const { _id } = user?.user || {};
  
  const onAddToCart = async () => {
    const cartPro = {
      quantity: count,
      userId: _id,
      productId: id,
    };
    try {
      await dispatch(addToCart(cartPro));
      navigate("/cart");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <main className="product-detail">
      <div className="page-container px-5">
        <ul className="flex mt-8 mb-3">
          <li className="text-sm font-medium hover:text-secondary">
            <Link to="/">Trang chủ</Link>
          </li>
          <li className="mx-2">/</li>
        </ul>
      </div>
      {product && (
        <div>
          <form className="page-container px-5">
            <div className="grid grid-cols-2 gap-x-5">
              <div className="col-span-1 h-[550px] overflow-hidden">
                <img
                  className="w-full h-full cursor-pointer object-cover object-top rounded-md"
                  src={product.product_images}
                  alt=""
                />
              </div>
              <div className="col-span-1">
                <div className="flex flex-col">
                  <h3 className="text-[##17191C] text-[24px] font-bold pt-1">
                    {product.product_name}
                  </h3>
                  <h3 className="text-[#00afef] text-[24px] font-bold pt-1">
                    <span className="text-[#17191C]">Tác giả:</span>{" "}
                    {product.product_author}
                  </h3>
                  <div className="flex space-x-3 items-center mb-3">
                    <span className="text-yellow-400">
                      {product.average_score} sao
                    </span>
                    <span className="text-gray-500 text-[15px]">1k đã bán</span>
                    <span className="text-gray-500 text-[15px]">
                      1k bình luận
                    </span>
                  </div>

                  <div className="flex items-center space-x-3 ">
                    <span className="text-red-400 text-xl font-semibold mb-3">
                      <span>Giá ưu đãi: </span>
                      {product.product_discount}đ
                    </span>
                  </div>
                  <del className="text-gray-500 text-xl font-semibold mb-3">
                    <span>Giá gốc: </span>
                    {product.product_price}đ
                  </del>
                  <div>
                    <p className="mb-[20px]">
                      Vận chuyển: Giảm 30% phí vận chuyển bởi Nhất Tín Express
                      (NTX)
                    </p>
                  </div>
                  <div>
                    <p className="mb-[20px]">
                      Còn trong kho: {product.product_quantity}
                    </p>
                  </div>
                  <div className="action-addCart mb-8">
                    <div className="grid grid-cols-3">
                      <div className="col-span-1 flex items-center text-center cursor-pointer">
                        <p
                          onClick={handleDecrement}
                          className="w-10 h-10 text-[#7A7A9D] text-xl border border-gray-300 rounded-s"
                        >
                          -
                        </p>
                        <input
                          type="text"
                          value={count}
                          name="quantity"
                          onChange={(e) => e.target.value}
                          id=""
                          className="inline-block  w-10 h-10 text-center border border-t-gray-300  text-[#7A7A9D] text-xl "
                        />

                        <p
                          onClick={handleIncrement}
                          className="w-10 h-10 border border-gray-300 rounded-r text-[#7A7A9D] text-xl"
                        >
                          +
                        </p>
                      </div>
                      <div className="col-span-2">
                        <Link
                          to=""
                          onClick={() => onAddToCart()}
                          className="w-full transition-all flex items-center justify-center duration-300 h-10 bg-secondary inline-block text-white text-sm font-medium rounded-md hover:text-yellow-600 hover:bg-yellow-200"
                        >
                          Thêm vào giỏ hàng
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="ship mb-8">
                    <div className="grid grid-cols-2 gap-y-4">
                      <div className="col-span-1">
                        <div className="flex flex-col items-center justify-center">
                          <div className="w-10 h-10 mb-2">
                            <img
                              className="w-full h-full block"
                              src="https://bizweb.dktcdn.net/100/438/408/themes/913235/assets/ic_payment_freeship.svg?1689440468558"
                              alt=""
                            />
                          </div>
                          <p className="text-center text-sm text-[#17191C]">
                            Miễn phí vận chuyển <br></br> với mọi đơn hàng từ
                            498k
                          </p>
                        </div>
                      </div>
                      <div className="col-span-1">
                        <div className="flex flex-col items-center justify-center">
                          <div className="w-10 h-10 mb-2">
                            <img
                              className="w-full h-full block"
                              src="https://bizweb.dktcdn.net/100/438/408/themes/913235/assets/ic_payment_freechange.svg?1689440468558"
                              alt=""
                            />
                          </div>
                          <p className="text-center text-sm text-[#17191C]">
                            Miễn phí đổi trả tại 230+ <br></br> cửa hàng trong
                            15 ngày
                          </p>
                        </div>
                      </div>
                      <div className="col-span-1">
                        <div className="flex flex-col items-center justify-center">
                          <div className="w-10 h-10 mb-2">
                            <img
                              className="w-full h-full block"
                              src="https://bizweb.dktcdn.net/100/438/408/themes/913235/assets/empty-wallet-tick.svg?1689440468558"
                              alt=""
                            />
                          </div>
                          <p className="text-center text-sm text-[#17191C]">
                            Đa dạng phương thức
                            <br /> thanh toán
                            <br />
                            (VNPay, Momo, COD)
                          </p>
                        </div>
                      </div>
                      <div className="col-span-1">
                        <div className="flex flex-col items-center justify-center">
                          <div className="w-10 h-10 mb-2">
                            <img
                              className="w-full h-full block"
                              src="https://bizweb.dktcdn.net/100/438/408/themes/913235/assets/ic_payment_fastship.svg?1689440468558"
                              alt=""
                            />
                          </div>
                          <p className="text-center text-sm text-[#17191C]">
                            Vận chuyển siêu tốc <br /> từ 1 đến 3 ngày
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <div className="page-container px-5">
            <Tabs activeKey={activeTab} onChange={handleTabChange}>
              <TabPane tab="MÔ TẢ" key="description">
                <div className="tab-content" id="descriptionContent">
                  <div className="product-box">
                    <div className="product-title">
                      <h3 className="text-xl text-red font-medium">
                        Chi tiết sản phẩm
                      </h3>
                    </div>
                    <div className="product-content">
                      <p>{product.product_description_sort}</p>
                    </div>
                  </div>
                </div>
              </TabPane>
              <TabPane tab="ĐÁNH GIÁ" key="evaluate">
                <div className="tab-content mb-5" id="evaluateContent">
                  {comments?.comment?.length > 0 ? (
                    <ul className="grid grid-cols-1">
                      {comments?.comment?.map((item: any, index: string) => {
                        return (
                          <li key={index} className="col-span-1 mb-5">
                            <div className="flex gap-x-5">
                              <div className="h-10 w-10">
                                <img
                                  className="w-full h-full object-cover rounded-full"
                                  src={item?.user_avatar}
                                  alt=""
                                />
                              </div>
                              <div>
                                <h1 className="font-medium">
                                  {item?.user_fullName}
                                </h1>
                                <div className="flex items-center">
                                  <span className="text-red-500 font-semibold mr-2">
                                    <Form.Item colon={false}>
                                      <Rate value={item?.rating} disabled />
                                    </Form.Item>
                                  </span>
                                  <span>
                                    {item?.createdAt
                                      ?.slice(0, 10)
                                      ?.split("-")
                                      ?.reverse()
                                      ?.join("-")}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <p className="font-thin italic">{item?.review}</p>
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <p className="text-red-500 text-center text-xl">
                      Chưa có đánh giá nào
                    </p>
                  )}
                  <div className="evaluate-box">
                    <Form
                      form={form}
                      name="wrap"
                      labelAlign="left"
                      labelWrap
                      wrapperCol={{ flex: 1 }}
                      colon={false}
                      onFinish={onReviewSubmit}
                    >
                      <div className="form-title">
                        <h1 className="text-xl">
                          Mời bạn để lại nhận xét cho sản phẩm này!
                        </h1>
                      </div>

                      <Form.Item name="rating" label="rating" initialValue={1}>
                        <Rate />
                      </Form.Item>
                      <Form.Item
                        name="review"
                        label="Nhận xét của bạn"
                        rules={[
                          {
                            required: true,
                            message: "Không được bỏ trống bình luận",
                          },
                        ]}
                      >
                        <TextArea
                          showCount
                          maxLength={100}
                          style={{ height: 120, resize: "none" }}
                          placeholder="Hãy bình luận sản phẩm này"
                        />
                      </Form.Item>

                      <Form.Item label=" ">
                        <Button
                          type="primary"
                          className="bg-blue-500"
                          htmlType="submit"
                        >
                          Đánh giá
                        </Button>
                      </Form.Item>
                    </Form>
                  </div>
                </div>
              </TabPane>
            </Tabs>
          </div>
        </div>
      )}
      <div className="similar_product page-container px-5 my-10">
        <h4 className="text-xl font-bold">Sản phẩm tương tự</h4>
        <div className="grid grid-cols-5">
          <div className="col-span-5">
            <Swiper
              key={Math.random()}
              breakpoints={{
                // when window width is >= 640px
                350: {
                  slidesPerView: 2,
                  slidesPerGroup: 2,
                },
                768: {
                  slidesPerView: 4,
                  slidesPerGroup: 4,
                },
                // when window width is >= 768px
                1023: {
                  slidesPerView: 5,
                  slidesPerGroup: 5,
                },
              }}
              spaceBetween={10}
              slidesPerGroup={5}
              // loop={true}
              // loopfillgroupwithblank="true"
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Pagination, Navigation]}
              className="category_list"
            >
              {Array(20).fill(0).map((item, index) => (
                <SwiperSlide key={index}>
                  {/* <ProductItem ></ProductItem> */}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetail;
