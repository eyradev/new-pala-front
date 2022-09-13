/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Form, Formik } from 'formik';
import useSearch from 'hooks/useSearch';
import { useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Collapse,
  UncontrolledTooltip
} from 'reactstrap';
import { getMaxBetween, getMinBetween } from 'util/math';
import Categories from './categories/Categories';
import { ProductSearchFilter } from './common';

export default function SearchFilter() {
  const {
    priceLimits,
    sodiumLimits,
    calorieLimits,
    price,
    sodium,
    calories,
    showOffersOnly,
    selectedCategoryIds,
    selectedIllnessIds,
    selectedStoreIds
  } = useSearch();

  const initialVars: ProductSearchFilter = {
    price: {
      min: getMinBetween(
        priceLimits?.min ?? 0,
        priceLimits?.max ?? 0,
        price?.min ?? priceLimits?.min ?? 0
      ),
      max: getMaxBetween(
        priceLimits?.min ?? 0,
        priceLimits?.max ?? 0,
        price?.max ?? priceLimits?.max ?? 0
      )
    },
    calories: {
      min: getMinBetween(
        calorieLimits?.min ?? 0,
        calorieLimits?.max ?? 0,
        calories?.min ?? calorieLimits?.min ?? 0
      ),
      max: getMaxBetween(
        calorieLimits?.min ?? 0,
        calorieLimits?.max ?? 0,
        calories?.max ?? calorieLimits?.max ?? 0
      )
    },
    sodium: {
      min: getMinBetween(
        calorieLimits?.min ?? 0,
        calorieLimits?.max ?? 0,
        calories?.min ?? calorieLimits?.min ?? 0
      ),
      max: getMaxBetween(
        sodiumLimits?.min ?? 0,
        sodiumLimits?.max ?? 0,
        sodium?.max ?? sodiumLimits?.max ?? 0
      )
    },
    showOffersOnly,
    selectedCategoryIds,
    selectedIllnessIds,
    selectedStoreIds
  };

  const [collapses, setCollapses] = useState<number[]>([]);
  const changeCollapse = (collapse: number) => {
    if (collapses.includes(collapse)) {
      setCollapses(collapses.filter((prop) => prop !== collapse));
    } else {
      setCollapses([...collapses, collapse]);
    }
  };

  return (
    <Formik<ProductSearchFilter>
      initialValues={initialVars}
      enableReinitialize
      onSubmit={() => {
        console.log('pp');
      }}
    >
      <Form>
        <div className="collapse-panel">
          <CardBody>
            <Card className="card-refine card-plain">
              <CardTitle tag="h4">
                Refine{' '}
                <Button
                  className="btn-icon btn-neutral pull-right"
                  color="default"
                  id="resetButton"
                  // onClick={handleResetClick}
                >
                  <i className="arrows-1_refresh-69 now-ui-icons" />
                </Button>
                <UncontrolledTooltip delay={0} target="resetButton">
                  Limpiar Filtros
                </UncontrolledTooltip>
              </CardTitle>

              <CardHeader id="headingOne" role="tab">
                <h6 className="mb-0">
                  <a
                    className="text-info"
                    aria-expanded={collapses.includes(1)}
                    data-toggle="collapse"
                    data-parent="#accordion"
                    onClick={(e) => {
                      e.preventDefault();
                      changeCollapse(1);
                    }}
                  >
                    Precio & Ofertas{' '}
                    <i className="now-ui-icons arrows-1_minimal-down" />
                  </a>
                </h6>
              </CardHeader>
              <Collapse isOpen={collapses.includes(1)}>
                {/* <PriceSelector min={minPrice} max={maxPrice} /> */}
                categories
              </Collapse>
            </Card>
            <Card className="card-refine card-plain">
              <CardHeader id="headingTwo" role="tab">
                <h6>
                  <a
                    className="text-info"
                    aria-expanded={collapses.includes(2)}
                    data-toggle="collapse"
                    data-parent="#accordion"
                    onClick={(e) => {
                      e.preventDefault();
                      changeCollapse(2);
                    }}
                  >
                    Detalles de Producto{' '}
                    <i className="now-ui-icons arrows-1_minimal-down" />
                  </a>
                </h6>
              </CardHeader>
              <Collapse isOpen={collapses.includes(2)}>
                {/* <ProductDetails
                  maxCalories={maxCalories}
                  maxSodium={maxSodium}
                /> */}
                pepe
              </Collapse>
            </Card>
            <Card className="card-refine card-plain">
              <CardHeader id="headingTwo" role="tab">
                <h6>
                  <a
                    className="text-info"
                    aria-expanded={collapses.includes(3)}
                    data-toggle="collapse"
                    data-parent="#accordion"
                    onClick={(e) => {
                      e.preventDefault();
                      changeCollapse(3);
                    }}
                  >
                    Categoria{' '}
                    <i className="now-ui-icons arrows-1_minimal-down" />
                  </a>
                </h6>
              </CardHeader>
              <Collapse isOpen={collapses.includes(3)}>
                <Categories />
              </Collapse>
            </Card>
            <Card className="card-refine card-plain">
              <CardHeader id="headingTwo" role="tab">
                <h6>
                  <a
                    className="text-info"
                    aria-expanded={collapses.includes(4)}
                    data-toggle="collapse"
                    data-parent="#accordion"
                    onClick={(e) => {
                      e.preventDefault();
                      changeCollapse(4);
                    }}
                  >
                    Apto Para{' '}
                    <i className="now-ui-icons arrows-1_minimal-down" />
                  </a>
                </h6>
              </CardHeader>
              <Collapse isOpen={collapses.includes(4)}>
                {/* <Illnesses /> */}
                illnesses
              </Collapse>
            </Card>
            <Card className="card-refine card-plain">
              <CardHeader id="headingThree" role="tab">
                <h6>
                  <a
                    className="text-info"
                    aria-expanded={collapses.includes(5)}
                    data-toggle="collapse"
                    data-parent="#accordion"
                    onClick={(e) => {
                      e.preventDefault();
                      changeCollapse(5);
                    }}
                  >
                    Tienda <i className="now-ui-icons arrows-1_minimal-down" />
                  </a>
                </h6>
              </CardHeader>
              <Collapse isOpen={collapses.includes(5)}>
                {/* <Stores /> */}
                stores
              </Collapse>
            </Card>
          </CardBody>
          <Card
            className="card-refine card-plain"
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              marginTop: '-30px',
              marginLeft: '30px'
            }}
          >
            <Button type="submit" color="info" outline>
              Actualizar
            </Button>
          </Card>
        </div>
      </Form>
    </Formik>
  );
}
