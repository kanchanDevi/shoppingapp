import {createSlice} from '@reduxjs/toolkit';
const initialState={
    item:[]
}
const cartSlice=createSlice({
    name:'cart',
    initialState,
    reducers:{
        addItem:(state, action)=>{
state.item.push(action.payload)
        }, 
        removeItem:(state, action)=>{
            state.item.pop(action.payload)
        },
        
    
            clearCart:(state)=>{
                state.item=[]
            }
        
    }

})
export const {addItem, removeItem, clearCart}=cartSlice.actions

export default cartSlice.reducer