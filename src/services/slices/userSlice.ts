import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginUserApi, getUserApi, registerUserApi } from '@api';
import { TUser } from '@utils-types';
import { RootState } from '../store';
import { deleteCookie, setCookie } from '../../utils/cookie';

type TUserState = {
  user: TUser | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: TUserState = {
  user: null,
  isLoading: false,
  error: null
};

export const loginUserThunk = createAsyncThunk<
  TUser,
  { email: string; password: string },
  { rejectValue: string }
>('user/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await loginUserApi(credentials);

    localStorage.setItem('refreshToken', response.refreshToken);
    setCookie('accessToken', response.accessToken);

    return response.user;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const getUserThunk = createAsyncThunk<
  TUser,
  void,
  { rejectValue: string }
>('user/getUser', async (_, { rejectWithValue }) => {
  try {
    const response = await getUserApi();
    return response.user;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const registerUserThunk = createAsyncThunk<
  TUser,
  { email: string; password: string; name: string },
  { rejectValue: string }
>('user/register', async (userData, { rejectWithValue }) => {
  try {
    const response = await registerUserApi(userData);
    return response.user;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    initializeUser: (state, action: PayloadAction<TUser | null>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      localStorage.removeItem('refreshToken');
      deleteCookie('accessToken');

      state.user = null;
      state.isLoading = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.error =
          action.payload ?? action.error.message ?? 'Failed to login';
        state.isLoading = false;
      })
      .addCase(getUserThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(getUserThunk.rejected, (state, action) => {
        state.error =
          action.payload ?? action.error.message ?? 'Failed to fetch user';
        state.isLoading = false;
      });
  }
});

export const { initializeUser, logout } = userSlice.actions;
export const selectUser = (state: RootState) => state.user.user;
export const selectIsLoading = (state: RootState) => state.user.isLoading;
export const selectError = (state: RootState) => state.user.error;

export const userReducer = userSlice.reducer;
