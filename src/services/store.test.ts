import { AnyAction } from '@reduxjs/toolkit';
import { rootReducer } from './store';
import { ingredientsReducer } from './slices/ingredientsSlice';
import { constructorReducer } from './slices/constructorSlice';
import { userReducer } from './slices/userSlice';
import { ordersReducer } from './slices/ordersSlice';
import { feedReducer } from './slices/feedSlice';

describe('rootReducer', () => {
  it('должен возвращать корректное начальное состояние для неизвестного экшена', () => {
    const unknownAction = { type: 'UNKNOWN_ACTION' } as AnyAction;
    const state = rootReducer(undefined, unknownAction);

    expect(state).toEqual({
      ingredients: ingredientsReducer(undefined, unknownAction),
      burgerConstructor: constructorReducer(undefined, unknownAction),
      user: userReducer(undefined, unknownAction),
      orders: ordersReducer(undefined, unknownAction),
      feed: feedReducer(undefined, unknownAction)
    });
  });
});
