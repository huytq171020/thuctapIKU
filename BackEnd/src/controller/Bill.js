import Bill from "../model/Bill";
import Cart from "../model/Cart";

// GET ALL BILL
export const getAllBills = async (req, res) => {
  try {
    const bills = await Bill.find({})
      .populate("products.productId")
      .populate("userId");

    if (bills.length === 0) {
      return res.status(400).json({
        message: "Không có hóa đơn nào!",
      });
    }

    return res.status(200).json({
      message: "Lấy danh sách hóa đơn thành công!",
      bills,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// GET BILL BY USER
export const getBillByUser = async (req, res) => {
  const { userId } = req.params;
  console.log(userId);
  try {
    const bills = await Bill.find({ userId })
      .populate("products.productId")
      .populate("userId");
    if (bills.length === 0) {
      return res.status(400).json({
        message: "Không có hóa đơn nào!",
      });
    }

    return res.status(200).json({
      message: "Lấy danh sách hóa đơn thành công!",
      bills,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// CREATE BILL

// Random String
function randomString(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export const addBill = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const { bill_name, bill_address, bill_phone } = req.body;

    const carts = await Cart.find({ userId: userId, status: "Pending" });

    const products = [];

    const totalPrice = carts.reduce((a, cart) => {
      products.push({
        productId: cart.productId,
        quantity: cart.quantity,
        price: cart.price,
      });
      return a + cart.price * cart.quantity;
    }, 0);

    const result = await Bill.create({
      bill_code: randomString(10),
      userId: userId,
      bill_name: bill_name,
      bill_address: bill_address,
      bill_phone: bill_phone,
      totalPrice: totalPrice,
      products: products,
    });

    await Cart.updateMany(
      { userId: userId, status: "Pending" },
      { status: "Confirmed" }
    );

    return res.status(200).json({
      message: "thêm thành công ",
      bill: result,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
// GET ONE BILL
export const getOneBill = async (req, res) => {
  const { billId } = req.params;
  try {
    const bill = await Bill.findById(billId)
      .populate("products.productId")
      .populate("userId");

    if (!bill) {
      return res.status(400).json({
        message: "Không tìm thấy hóa đơn!",
      });
    }

    return res.status(200).json({
      message: "Lấy hóa đơn thành công!",
      bill,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE STATUS BILL
export const updateBill = async (req, res) => {
  const { billId, status } = req.body;
  try {
    // Tìm kiếm bill cần cập nhật
    const bill = await Bill.findByIdAndUpdate(
      { _id: billId },
      {
        status: status,
      },
      { new: true }
    );

    if (!bill) {
      return res.status(400).json({
        message: "Không tìm thấy hóa đơn!",
      });
    }

    res
      .status(200)
      .json({ message: "Hóa đơn đã được cập nhật thành công!", bill });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
