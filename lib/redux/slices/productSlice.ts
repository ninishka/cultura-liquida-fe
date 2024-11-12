import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface LayoutData {
    description: string;
    ingredient: string;
    price: number;
    stock: number;
    title: string;
    type: string;
    url: string;
    __v: number;
    size?: string;
    _id?: string;
}

interface ProductState {
  layoutData: LayoutData[] 
}

const initialState: ProductState = {
  layoutData: [],
}

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setLayoutData(state, action: PayloadAction<any[]>) {
      state.layoutData = action.payload
    },
  },
})

export const { setLayoutData } = productSlice.actions
export default productSlice.reducer
