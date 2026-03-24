import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '../../utils/types';
import { orderBurgerApi } from '@api';
import { RootState } from '../store';

type TConstructorItems = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
};

type TConstructorState = {
  constructorItems: TConstructorItems;
  orderRequest: boolean;
  orderModalData: TOrderModalData | null;
};

type TOrderModalData = Pick<TOrder, 'number'>;

const initialState: TConstructorState = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null
};

export const createOrder = createAsyncThunk<TOrderModalData, string[]>(
  'burgerConstructor/createOrder',
  async (ingredientIds: string[]) => {
    const response = await orderBurgerApi(ingredientIds);
    return response.order;
  }
);

const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    setBun(state, action: PayloadAction<TIngredient>) {
      state.constructorItems.bun = action.payload;
    },
    addIngredient(state, action: PayloadAction<TConstructorIngredient>) {
      state.constructorItems.ingredients.push(action.payload);
    },
    removeIngredient(state, action: PayloadAction<number>) {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (_, index) => index !== action.payload
        );
    },
    moveIngredient(
      state,
      action: PayloadAction<{ fromIndex: number; toIndex: number }>
    ) {
      const { fromIndex, toIndex } = action.payload;
      const ingredients = state.constructorItems.ingredients;

      if (
        fromIndex < 0 ||
        toIndex < 0 ||
        fromIndex >= ingredients.length ||
        toIndex >= ingredients.length ||
        fromIndex === toIndex
      ) {
        return;
      }

      const [movedIngredient] = ingredients.splice(fromIndex, 1);
      ingredients.splice(toIndex, 0, movedIngredient);
    },
    clearConstructor(state) {
      state.constructorItems = {
        bun: null,
        ingredients: []
      };
    },
    closeOrderModal(state) {
      state.orderModalData = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload;
      })
      .addCase(createOrder.rejected, (state) => {
        state.orderRequest = false;
      });
  }
});

export const {
  setBun,
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor,
  closeOrderModal
} = constructorSlice.actions;
export const constructorReducer = constructorSlice.reducer;

export const selectConstructorItems = (state: RootState) =>
  state.burgerConstructor.constructorItems;

export const selectOrderRequest = (state: RootState) =>
  state.burgerConstructor.orderRequest;

export const selectOrderModalData = (state: RootState) =>
  state.burgerConstructor.orderModalData;
