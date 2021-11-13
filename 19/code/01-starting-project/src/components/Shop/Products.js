import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY_PRODUCTS = [
  {
    id: 'p1',
    price: 6,
    title: 'My Book',
    description: 'My favorite book'
  },
  {
    id: 'p2',
    price: 6,
    title: 'Second Best Book',
    description: 'My second favorite book'
  },
  {
    id: 'p3',
    price: 6,
    title: 'Book no 3',
    description: 'My favorite third book'
  },
]

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map((product) =>
          <ProductItem
            title={product.title}
            price={product.price}
            description={product.description}
            key={product.id}
          />
        )}

      </ul>
    </section>
  );
};

export default Products;
