import { useEffect, useState } from "react"
import { GetAllProducts } from "../../api/Product";
import { GetAllUsers } from "../../api/User";

const Dashboard = () => {
    const [user, setuser] = useState<number>(0);
    const [product, setProduct] = useState<number>(0);

    // Tính số lượng sản phẩm
    useEffect(() => {
        const fetProduct = async () => {
            try {
                const { data } = await GetAllProducts();
                const productLength = data.productResponse.docs.length
                setProduct(productLength)
            } catch (error) {
                console.log(error);
            }
        }
        fetProduct();
    }, [])

    // Tính số lượng tài khoản
    useEffect(() => {
        const fetProduct = async () => {
            try {
                const { data } = await GetAllUsers();
                setuser(data.totalUser)
            } catch (error) {
                console.log(error);
            }
        }
        fetProduct();
    }, [])
    return (
        <div>
            <h1 className="text-center text-[24px] mb-5 font-bold">Trang quản trị</h1>
            <div className="grid grid-cols-4 gap-4">
                <div className="bg-blue-900 py-8 rounded-md hover:shadow-lg  hover:shadow-gray-400 transition-all duration-200">
                    <div className="text-white text-center uppercase">Tổng sản phẩm</div>
                    <p className="text-white text-center">{product}</p>
                </div>
                <div className="bg-yellow-600 py-8 rounded-md hover:shadow-lg  hover:shadow-gray-400 transition-all duration-200">
                    <div className="text-white text-center uppercase">Số tài khoản</div>
                    <p className="text-white text-center">{user}</p>
                </div>
                <div className="bg-green-900 py-8 rounded-md hover:shadow-lg  hover:shadow-gray-400 transition-all duration-200">
                    <div className="text-white text-center uppercase">Tổng sản phẩm</div>
                    <p className="text-white text-center">1</p>
                </div>
                <div className="bg-red-900 py-8 rounded-md hover:shadow-lg  hover:shadow-gray-400 transition-all duration-200">
                    <div className="text-white text-center uppercase">Tổng sản phẩm</div>
                    <p className="text-white text-center">1</p>
                </div>
            </div>
            <div>
                <canvas id="myChart" />
            </div>
        </div>
    )
}

export default Dashboard