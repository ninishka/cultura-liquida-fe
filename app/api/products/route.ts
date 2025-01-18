import { NextRequest, NextResponse } from 'next/server';
import { addProduct, getProduct, editProduct } from '@/app/actions/products';
import { ProductG, UpdateProductRequest } from '@/types/types';

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const products: ProductG[] = await getProduct();
    console.log('NextResponse ROUTE /products')
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error('GET Error fetching products:', error);

    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest): Promise<NextResponse> {
  try {
    const { updates } = await request.json();

    const updatedProducts = await Promise.all(
      updates.map(async ({ id, updatedData }) => {
        return await editProduct(id, updatedData);
      })
    );
  
    return NextResponse.json({ success: true, updatedProducts });
  } catch (error) {
    console.error('PUT Error updating product:', error);
    
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}
