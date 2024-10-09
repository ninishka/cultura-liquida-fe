import { NextResponse } from 'next/server';
import { addProduct, getPosts, editPost } from '@/actions/action';

export async function GET(request) {
    try {
        const product = await getPosts();
        return NextResponse.json(product, { status: 200 });
    } catch (error) {
        console.error('Error fetching product:', error);
        return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
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
    const updatedProduct = await editPost(id, updatedData);
    return NextResponse.json(updatedProduct);
}


// export async function PUT(request) {
//     try {
//         const { id, updatedData } = await request.json();
//         const updatedPost = await editPost(id, updatedData);
//         return NextResponse.json(updatedPost, { status: 200 });
//     } catch (error) {
//         console.error('Error updating post:', error);
//         return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
//     }
// }