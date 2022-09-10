import { ProductStock } from 'models/product-stock.model';
import { number, object, SchemaOf } from 'yup';

export const productStockSchema: SchemaOf<ProductStock> = object().shape({
  stock: number()
    .min(1, 'Se debe pedir almenos un producto')
    .required('Se requieren las unidades a pedir')
});
