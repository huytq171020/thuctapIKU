import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#36d8ff] text-white">
      <div className="px-5 footer page-container">
        <div className="grid grid-cols-4 py-10 gap-4">
          <div className="flex flex-col">
            <h3>SÀN SÁCH TRỰC TUYẾN QUỐC GIA BOOK365.VN</h3>
            <p className="block mb-10 text-sm">
            Trực thuộc: Bộ Thông tin và Truyền thông
Đơn vị vận hành: Vivi Education
            </p>
            <h3 className="mb-2">ĐĂNG KÝ NHẬN THÔNG TIN</h3>
            <div>
              <form className="flex items-center ">
                <input
                  className="block h-10 border duration-300 transition-all px-5 py-2 outline-none  hover:border-secondary hover:border rounded-s-lg"
                  type="text"
                  placeholder="Nhập email..."
                />
                <button
                  type="submit"
                  className="h-10 px-2 duration-300 transition-all text-sm transition-all bg-white rounded-r-lg text-secondary hover:bg-secondary hover:text-white"
                  aria-label="Justify"
                >
                  Đăng ký
                </button>
              </form>
            </div>
          </div>
          <div className="flex flex-col">
            <h5>NHỮNG KHU VỰC CHÍNH CỦA BOOK365</h5>
            <Link to="" className="hover:text-secondary duration-300 transition-all">Khu vực chung</Link>
            <Link to="" className="hover:text-secondary duration-300 transition-all">Sàn sách in</Link>
            <Link to="" className="hover:text-secondary duration-300 transition-all">Sàn sách Ebook</Link>
            <Link to="" className="hover:text-secondary duration-300 transition-all">Sàn giao dịch bản quyền</Link>
            <Link to="" className="hover:text-secondary duration-300 transition-all">Khu vực sự kiện</Link>
          </div>
          <div className="flex flex-col">
            <h5>Hỗ trợ</h5>
            <span className="text-[15px] ">Quy định mua hàng</span>
            <span className="text-[15px] ">Hướng dẫn thanh toán</span>
            <span className="text-[15px]">Phương thức vận chuyển</span>
            <span className="text-[15px]">Câu hỏi thường gặp</span>
            <span className="text-[15px]">Chính sách bảo mật</span>
          </div>
          <div className="flex flex-col">
            <h5>Quản lý tài khoản</h5>
            <span className="text-[15px]">Tạo tài khoản</span>
            <span className="text-[15px]">Đăng nhập</span>
            <span className="text-[15px]">
            Đăng ký giới thiệu sách
            </span>
            <span className="text-[15px]">
            Thay đổi thông tin tài khoản
            </span>
            <span className="text-[15px]">Hotline : 0247 300 1369</span>
            <span className="text-[15px]">Lượt truy cập: 6.892.340</span>
          </div>
          
        </div>
        <div className=" copyright">
          <hr />
          <h3 className="py-5 text-sm text-center text-white">
          Bản quyền thuộc về Sàn giao dịch sách trực tuyến Book365.vn. Tất cả tác quyền
          </h3>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
