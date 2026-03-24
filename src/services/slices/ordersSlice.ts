import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { TOrder } from '@utils-types';
import { getOrdersApi } from '@api';

type TOrdersState = {
  orders: TOrder[];
  isLoading: boolean;
  error: string | null;
};

const initialState: TOrdersState = {
  orders: [],
  isLoading: false,
  error: null
};

export const fetchOrders = createAsyncThunk<
  TOrder[],
  void,
  { rejectValue: string }
>('orders/fetchOrders', async (_, { rejectWithValue }) => {
  try {
    return await getOrdersApi();
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearOrders: (state) => {
      state.orders = [];
      state.isLoading = false;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.error = action.payload ?? action.error.message ?? 'Unknown error';
        state.isLoading = false;
      });
  }
});

export const { clearOrders, setLoading, setError } = ordersSlice.actions;

export const selectOrders = (state: RootState) => state.orders.orders;
export const selectOrdersLoading = (state: RootState) => state.orders.isLoading;
export const selectOrdersError = (state: RootState) => state.orders.error;

export const ordersReducer = ordersSlice.reducer;
