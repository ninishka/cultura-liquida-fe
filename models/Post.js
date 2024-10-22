import mongoose from 'mongoose'
console.log('mongoose')
console.log('process.env.MONGODB_URI', process.env.MONGODB_URI)

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    ingredient: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    size: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
})

export default mongoose.models.Post || mongoose.model('Post', postSchema)

