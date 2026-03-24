import { TOrder } from '@utils-types';

export type BurgerConstructorUIProps = {
  constructorItems: any;
  orderRequest: boolean;
  price: number;
  orderModalData: Pick<TOrder, 'number'> | null;
  onOrderClick: () => void;
  closeOrderModal: () => void;
};
