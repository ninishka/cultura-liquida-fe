import { createSlice } from '@reduxjs/toolkit'

interface ToggleState {
  showCart: boolean
  showMenu: boolean
}

const initialState: ToggleState = {
  showCart: false,
  showMenu: false,
}

const toggleSlice = createSlice({
  name: 'toggle',
  initialState,
  reducers: {
    toggleShowCart: (state, action) => {
      state.showCart = action.payload;
    },
    toggleShowMenu(state) {
      state.showMenu = !state.showMenu
    },
  },
})

export const { toggleShowCart, toggleShowMenu } = toggleSlice.actions
export default toggleSlice.reducer
