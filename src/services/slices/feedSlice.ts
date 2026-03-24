import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFeedsApi } from '@api';
import { TOrdersData } from '@utils-types';
import { RootState } from '../store';

type TFeedState = TOrdersData & {
  isLoading: boolean;
  error: string | null;
};

const initialState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: false,
  error: null
};

export const fetchFeeds = createAsyncThunk<
  TOrdersData,
  void,
  { rejectValue: string }
>('feed/fetchFeeds', async (_, { rejectWithValue }) => {
  try {
    const response = await getFeedsApi();

    return {
      orders: response.orders,
      total: response.total,
      totalToday: response.totalToday
    };
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    clearFeeds: (state) => {
      state.orders = [];
      state.total = 0;
      state.totalToday = 0;
      state.isLoading = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.isLoading = false;
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.error = action.payload ?? action.error.message ?? 'Unknown error';
        state.isLoading = false;
      });
  }
});

export const feedReducer = feedSlice.reducer;

export const selectFeedOrders = (state: RootState) => state.feed.orders;
export const selectFeedTotal = (state: RootState) => state.feed.total;
export const selectFeedTotalToday = (state: RootState) => state.feed.totalToday;
export const selectFeedLoading = (state: RootState) => state.feed.isLoading;
export const selectFeedError = (state: RootState) => state.feed.error;
