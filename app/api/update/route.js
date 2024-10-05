import { NextResponse } from 'next/server';
import postFn from '../post';

// // CORS middleware
// export async function middleware(request) {
//   const response = NextResponse.next();
  
//   response.headers.set(
//     'Access-Control-Allow-Origin',
//     '*'
//   );
//   response.headers.set(
//     'Access-Control-Allow-Methods',
//     'GET, POST, PUT, DELETE, OPTIONS'
//   );
//   response.headers.set(
//     'Access-Control-Allow-Headers',
//     'Content-Type, Authorization, Content-Length, X-Requested-With'
//   );

//   return response;
// }

// middleware.config = {
//   matcher: ['/api/:path*'],
// };


export async function GET(request) {
  return NextResponse.json({ message: 'Update endpoint' });
}



export async function POST(request) {
  console.log('Received POST request');
  const { id } = await request.nextUrl.searchParams;
  console.log('id', id)

  const { url, cartItems } = await request.json();

  console.log('Request body:', { url, cartItems });
  console.log('url', url)

  try {
    const result = await postFn({
      url: `${url}`,
      // url: `${url}/${id}`,
      data: {
        cartItems,
      }
    });
    console.log('result', result)

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to post preference' }, { status: 500 });
  }
}
