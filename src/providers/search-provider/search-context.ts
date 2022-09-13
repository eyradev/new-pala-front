/* eslint-disable no-unused-vars */
import { SearchProductsQueryVariables } from 'generated/graphql';
import { Limited } from 'util/commonTypes';

export interface SearchContextProps {
  key: string;
  name: string;
  showOffersOnly: boolean;
  selectedCategoryIds: string[];
  selectedIllnessIds: string[];
  selectedStoreIds: string[];
  price: Limited<number>;
  calories: Limited<number>;
  sodium: Limited<number>;
  priceLimits: Limited<number>;
  calorieLimits: Limited<number>;
  sodiumLimits: Limited<number>;
  getProductsQueryBase: () => Pick<
    SearchProductsQueryVariables,
    'input' | 'search'
  >;
}
