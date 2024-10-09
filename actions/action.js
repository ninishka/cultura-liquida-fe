'use server'

import Post from '@/models/Post'

const addPost = async post => {
    const title = post.get('title')
    const description = post.get('description')
    const ingredient = post.get('ingredient')
    const type = post.get('type')
    const price = post.get('price')
    const stock = post.get('stock')

    const newPost = new Post({ title, description, ingredient, type, price, stock })
    return newPost.save()
}

const getPosts = async () => {
    return Post.find()
}

export { addPost, getPosts }