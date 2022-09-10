import { ProductReview } from 'models/product-review.model';
import { number, object, SchemaOf, string } from 'yup';

export const productReviewSchema: SchemaOf<ProductReview> = object().shape({
  comment: string().required('Debes dejar tu opinion'),
  score: number()
    .integer('El puntaje debe ser un numero entero')
    .min(0, 'El puntaje no debe ser menor a cero')
    .max(5, 'El puntaje no debe ser mayor que 5')
    .required('Debes dejar tu puntuación')
});
