import { NextResponse } from 'next/server';
import { addProduct, getProduct, editProduct } from '@/app/actions/action';

export async function GET(request) {
  try {
    const products = await getProduct();
    console.log('NextResponse ROUTE /products')
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error('GET Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function PUT(request) {
    const { id, updatedData } = await request.json();
    const updatedProduct = await editProduct(id, updatedData);
    return NextResponse.json(updatedProduct);
}


// REV 5
// export const dynamic = 'force-dynamic';


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


// export async function GET(request) {
//     try {
//         const product = await getProduct();
//         return NextResponse.json(product, { status: 200 });
//     } catch (error) {
//         console.error('Error fetching product:', error);
//         return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
//     }
// }

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



// Даже если подключение к базе данных выполнено в instrumentation.js, 
// каждый API роут или серверный компонент в Next.js может быть изолирован, и они могут выполняться в разных потоках. 
// Поэтому для надежности и во избежание проблем с запросами (например, с буферизацией), 
// вызов подключения к базе данных должен быть в каждом месте, где оно требуется.   
// export async function GET(request) {
//   // const headers = new Headers();
//   // headers.set('Access-Control-Allow-Origin', '*'); // Разрешить запросы с любых доменов

// try {
//   // await connectToDatabase(); 
//   const products = await getProduct();
//   // console.log('Products fetched:', products);

//   console.log('NextResponse', products)
//   // return NextResponse.json(products, { status: 200 });
//   return NextResponse.json(products, {
//     status: 200,
//     // REV 4
//     // headers: { 'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=20' }, 
//   });
// } catch (error) {
//   console.error('GET Error fetching products:', error);
//   return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
// }
// }


// export async function PUT(request) {
//   const { id, updatedData } = await request.json();
//   //console.log('updatedData', updatedData)
//   //console.log('id PUT', id)
//   const updatedProduct = await editProduct(id, updatedData);
  
//   // revalidatePath('/', 'layout')

//   // REV 10 working, but what for
//   // try {
//   //   await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/revalidate`, {
//   //     method: 'POST'
//   //   });
//   // } catch (error) {
//   //   console.error('Error reval:', error);
//   // }

//   // need to create app/api/revalidate.js
//   // export default async function handler(req, res) {
//   //   try {
//   //     await res.revalidate('/');
//   //     return res.json({ revalidated: true });
//   //   } catch (err) {
//   //     return res.status(500).send('Error revalidating');
//   //   }
//   // }

//   return NextResponse.json(updatedProduct);
// }