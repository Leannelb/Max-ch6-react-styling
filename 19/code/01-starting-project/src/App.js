import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

function App() {
  const showCart = useSelector(state => state.ui.cartIsVisable);
  const cart = useSelector((state) => state.cart);
  const [movies, setMovies] = useState([]);

  // useEffect(() => {
  //   fetch('https://swapi.dev/api/',
  //     {
  //       method: 'GET',
  //     }
  //     )}, [cart]);

  function fetchMoviesHandler() {
    fetch('https://swapi.dev/api/films')
      .then(response => {
        console.log('response ', response);
        return response.json();
      })
      .then((data) => {
        const transformedMovies = data.results.map(movieData => {
          return {
            id: movieData.episode_id,
            title: movieData.title,
            openingText: movieData.opening_crawl,
            releaseDate: movieData.release_date
          };
        });
        setMovies(data.results)
      }
      );
  }


  return (
    <Layout>
      {showCart && <Cart />}
      <button onClick={fetchMoviesHandler}>Click Me!</button>
      <Products />
    </Layout>
  );
}

export default App;
