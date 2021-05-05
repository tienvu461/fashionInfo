import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// (1) Define a type for the slice state
interface CounterState {
  value: number;
}

// (2) Define the initial state using that type
const initialState: CounterState = {
  value: 0,
};

// (3) create slice
const counterSlice = createSlice({
  name: 'COUNTER_REDUCER',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

const { actions, reducer } = counterSlice; // (4) each slice always return 2 objs: actions and reducer
const { increment, decrement } = actions;
export { increment, decrement };

export default reducer;
