'use server'

import Post from '@/models/Post'

const addProduct = async post => {
    const title = post.get('title')
    const description = post.get('description')
    const ingredient = post.get('ingredient')
    const type = post.get('type')
    const size = post.get('size')
    const price = post.get('price')
    const stock = post.get('stock')

    const newProduct = new Post({ title, description, ingredient, type, size, price, stock })
    return newProduct.save()
}

const getProduct = async () => {
    return Post.find()
}

// const deletePost = async id => {
//     return Post.findByIdAndDelete(id)
// }

const editProduct = async (id, updatedData) => {
    return Post.findByIdAndUpdate(id, updatedData, { new: true })
}

export { addProduct, getProduct, editProduct }