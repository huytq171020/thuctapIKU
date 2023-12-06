import express from "express";

import { authorization } from "../middleware/Authorization.js";
import { authenticate } from "../middleware/Authenticate.js";
import {
  addBill,
  getAllBills,
  getBillByUser,
  getOneBill,
  updateBill,
} from "../controller/Bill.js";
const router = express.Router();
router.get("/bills", authenticate, authorization, getAllBills);
router.post("/bills", authenticate, addBill);
router.put("/bills", authenticate, authorization, updateBill);
router.get("/bills/user/:userId", authenticate, getBillByUser);
router.get("/bills/:billId", authenticate, getOneBill);
router.put("/bills/:billId", authenticate, authorization, updateBill);
export default router;
