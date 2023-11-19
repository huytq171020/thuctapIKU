export interface IBill {
    _id?: string;
    bill_name: string,
    bill_price: string,
    bill_quantity: number,
    bill_address: string,
    bill_phone: string,
    createdAt?: string,
    status:String,
}