import {
  addIngredient,
  constructorReducer,
  moveIngredient,
  removeIngredient
} from './constructorSlice';
import { TConstructorIngredient } from '../../utils/types';

const ingredient1: TConstructorIngredient = {
  _id: 'ingredient-1',
  id: 'local-1',
  name: 'Test Main 1',
  type: 'main',
  proteins: 10,
  fat: 11,
  carbohydrates: 12,
  calories: 100,
  price: 50,
  image: 'https://example.com/image-1.png',
  image_large: 'https://example.com/image-1-large.png',
  image_mobile: 'https://example.com/image-1-mobile.png'
};

const ingredient2: TConstructorIngredient = {
  ...ingredient1,
  _id: 'ingredient-2',
  id: 'local-2',
  name: 'Test Main 2'
};

const ingredient3: TConstructorIngredient = {
  ...ingredient1,
  _id: 'ingredient-3',
  id: 'local-3',
  name: 'Test Main 3'
};

describe('burgerConstructor reducer', () => {
  it('должен добавлять ингредиент в начинку', () => {
    const state = constructorReducer(undefined, addIngredient(ingredient1));

    expect(state.constructorItems.ingredients).toHaveLength(1);
    expect(state.constructorItems.ingredients[0]).toEqual(ingredient1);
  });

  it('должен удалять ингредиент из начинки по индексу', () => {
    const stateWithIngredients = {
      constructorItems: {
        bun: null,
        ingredients: [ingredient1, ingredient2]
      },
      orderRequest: false,
      orderModalData: null
    };

    const state = constructorReducer(stateWithIngredients, removeIngredient(0));

    expect(state.constructorItems.ingredients).toHaveLength(1);
    expect(state.constructorItems.ingredients[0]).toEqual(ingredient2);
  });

  it('должен менять порядок ингредиентов в начинке', () => {
    const stateWithIngredients = {
      constructorItems: {
        bun: null,
        ingredients: [ingredient1, ingredient2, ingredient3]
      },
      orderRequest: false,
      orderModalData: null
    };

    const state = constructorReducer(
      stateWithIngredients,
      moveIngredient({ fromIndex: 0, toIndex: 2 })
    );

    expect(state.constructorItems.ingredients.map((item) => item.id)).toEqual([
      ingredient2.id,
      ingredient3.id,
      ingredient1.id
    ]);
  });
});
