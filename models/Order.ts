import mongoose, { Model } from 'mongoose';

export interface IOrder {
  _id: string;
  userId: string;
  products: Array<Record<string, any>>;
  shippingCost: number;
  totalCost: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  form_data: Record<string, string>;
  mp_data?: Record<string, string>;
}

  // products: Array<{
  //   productId: string;
  //   title: string;
  //   ingredient: string;
  //   type: string;
  //   displayingType: string;
  //   quantity: number;
  //   price: number;
  //   id: string;
  //   idCart: string;
  //   size?: string;
  // }>;

const orderSchema = new mongoose.Schema<IOrder>({
  userId: { type: String, required: true },
  products: [
    {
      type: Map,
      of: mongoose.Schema.Types.Mixed,
      required: true,
    },
  ],
  // products: [
  //   {
  //     productId: { type: String, required: true },
  //     title: { type: String, required: true },
  //     ingredient: { type: String, required: true },
  //     type: { type: String, required: true },
  //     displayingType: { type: String, required: true },
  //     quantity: { type: Number, required: true },
  //     price: { type: Number, required: true },
  //     id: { type: String, required: true },
  //     idCart: { type: String, required: true },
  //     size: { type: String, required: false },
  //   },
  // ],
  shippingCost: { type: Number, required: true },
  totalCost: { type: Number, required: true },
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
