// import connectToDatabase from '@/lib/db';
import Post from '@/models/Post';
import { NextResponse } from 'next/server';
import { addProduct, getProduct, editProduct } from '@/app/actions/action';
const connectToDatabase = require('@/lib/db');

// export async function GET(request) {
//     try {
//         const product = await getProduct();
//         return NextResponse.json(product, { status: 200 });
//     } catch (error) {
//         console.error('Error fetching product:', error);
//         return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
//     }
// }

export async function GET(request) {
  try {
    // Даже если подключение к базе данных выполнено в instrumentation.js, 
    // каждый API роут или серверный компонент в Next.js может быть изолирован, и они могут выполняться в разных потоках. 
    // Поэтому для надежности и во избежание проблем с запросами (например, с буферизацией), 
    // вызов подключения к базе данных должен быть в каждом месте, где оно требуется.   
    
    await connectToDatabase();
    console.log('Database connected successfully in GET');

    const products = await Post.find();
    console.log('Products fetched:', products);

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

// export async function POST(request) {
//     const product = await request.json();
//     const newProduct = await addProduct(product);
//     return NextResponse.json(newProduct);
// }

// export async function POST(request) {
//     try {
//         const product = await request.json()
//         const newProduct = await addPost(product)
//         return NextResponse.json(newProduct, { status: 201 })
//     } catch (error) {
//         console.error('Error creating product:', error);
//         return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
//     }
// }

export async function PUT(request) {
    const { id, updatedData } = await request.json();
    console.log('id', id)
    const updatedProduct = await editProduct(id, updatedData);
    return NextResponse.json(updatedProduct);
}


// export async function PUT(request) {
//     try {
//         const { id, updatedData } = await request.json();
//         const updatedPost = await editProduct(id, updatedData);
//         return NextResponse.json(updatedPost, { status: 200 });
//     } catch (error) {
//         console.error('Error updating post:', error);
//         return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
//     }
// }