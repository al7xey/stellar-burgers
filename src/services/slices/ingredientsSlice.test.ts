import { fetchIngredients, ingredientsReducer } from './ingredientsSlice';
import { TIngredient } from '../../utils/types';

const mockIngredients: TIngredient[] = [
  {
    _id: 'ingredient-1',
    name: 'Test Bun',
    type: 'bun',
    proteins: 10,
    fat: 11,
    carbohydrates: 12,
    calories: 100,
    price: 50,
    image: 'https://example.com/image-1.png',
    image_large: 'https://example.com/image-1-large.png',
    image_mobile: 'https://example.com/image-1-mobile.png'
  }
];

describe('ingredients reducer', () => {
  it('должен устанавливать флаг загрузки в true при начале запроса', () => {
    const state = ingredientsReducer(
      undefined,
      fetchIngredients.pending('request-id', undefined)
    );

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('должен записывать ингредиенты и сбрасывать флаг загрузки при успешном запросе', () => {
    const loadingState = {
      ingredients: [],
      isLoading: true,
      error: null
    };

    const state = ingredientsReducer(
      loadingState,
      fetchIngredients.fulfilled(mockIngredients, 'request-id', undefined)
    );

    expect(state.ingredients).toEqual(mockIngredients);
    expect(state.isLoading).toBe(false);
  });

  it('должен записывать ошибку и сбрасывать флаг загрузки при ошибке запроса', () => {
    const loadingState = {
      ingredients: [],
      isLoading: true,
      error: null
    };

    const state = ingredientsReducer(
      loadingState,
      fetchIngredients.rejected(
        new Error('Request failed'),
        'request-id',
        undefined,
        'Request failed'
      )
    );

    expect(state.error).toBe('Request failed');
    expect(state.isLoading).toBe(false);
  });
});
