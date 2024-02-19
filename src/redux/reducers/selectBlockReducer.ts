import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface SelectBlockState {
  selectedIndex: number | null;
}

const initialState: SelectBlockState = {
  selectedIndex: null,
};

const selectBlockSlice = createSlice({
  name: 'selectBlock',
  initialState,
  reducers: {
    selectBlock(state, action: PayloadAction<number | null>) {
      return {
        ...state,
        selectedIndex: action.payload,
      };
    },
  },
});

export const {
  selectBlock,
} = selectBlockSlice.actions;

export default selectBlockSlice.reducer;