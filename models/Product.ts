import mongoose, { Document, Model } from 'mongoose';

export interface IProduct { // extends Document
  _id: string;
  title: string;
  description: string;
  ingredient: string;
  type: string;
  displayingType: string;
  size?: string;
  price: number;
  totalStock: number;
  availableStock: number;
  slug: string;
}

const productSchema = new mongoose.Schema<IProduct>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  ingredient: { type: String, required: true },
  type: { type: String, required: true },
  displayingType: { type: String, required: true },
  size: { type: String },
  price: { type: Number, required: true },
  totalStock: { type: Number, required: true },
  availableStock: { type: Number, required: true },
  slug: { type: String, required: true },
});

const Product: Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>('Product', productSchema);

export default Product;


