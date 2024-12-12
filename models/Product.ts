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
  totalStock: number,
  reservedStock: number,
  availableStock: number,
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
  reservedStock: { type: Number, default: 0 },
  availableStock: { type: Number, required: true },
});

const Product: Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>('Product', productSchema);
// Singleton ?

export default Product;



// import mongoose from 'mongoose'
// // console.log('model', process.env.MONGODB_URI)

// const postSchema = new mongoose.Schema({
//     title: {
//         type: String,
//         required: true,
//     },
//     description: {
//         type: String,
//         required: true,
//     },
//     ingredient: {
//         type: String,
//         required: true,
//     },
//     type: {
//         type: String,
//         required: true,
//     },
//     size: {
//         type: String,
//     },
//     price: {
//         type: Number,
//         required: true,
//     },
//     stock: {
//         type: Number,
//         required: true,
//     },
// })

// export default mongoose.models.Post || mongoose.model('Post', postSchema)

