import mongoose, { Model } from 'mongoose';

export interface IOrder {
  _id: string;
  userId: string;
  products: Array<{
    productId: string;
    quantity: number;
  }>;
  totalPrice: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  form_data: Record<string, string>;
  mp_data?: Record<string, string>;
}

const orderSchema = new mongoose.Schema<IOrder>({
  userId: { type: String, required: true },
  products: [
    {
      productId: { type: String, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  form_data: {
    type: Map,
    of: String,
    required: true,
  },
  mp_data: {
    type: Map,
    of: String,
    required: false,
  },
});

const Order: Model<IOrder> = mongoose.models.Order || mongoose.model<IOrder>('Order', orderSchema);

export default Order;
