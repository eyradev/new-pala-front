import { SearchVariables } from 'providers/search-provider/SearchProvider';
import { RecursivePartial } from 'util/commonTypes';

export type ProductSearchFilter = RecursivePartial<
  Omit<SearchVariables, 'key' | 'name'>
>;
