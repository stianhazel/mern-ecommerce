import React, { useEffect, useState } from 'react';
import ProductList from '../../products/components/ProductList';

import { useHttp } from '../../shared/hooks/useHttp';

import image from '../../home/pages/iphone12.jpeg';
import image2 from '../../home/pages/chainsaw.jpg';
import image3 from '../../home/pages/shoe.jpg';
import image4 from '../../home/pages/beer.jpg';
import LoadingSpinner from '../../shared/components/UI/LoadingSpinner';

const Home = props => {
  const PRODUCTS = [
    {
      id: '1',
      brand: 'Apple Inc.',
      name: 'iPhone 13 SE, 256GB',
      image: image,
      price: '£599.00',
      stock: 0,
      reviews: 968,
      rating: 4.5
    },
    {
      id: '2',
      brand: 'RYOBI',
      name: 'RYOBI Chainsaw Ultra X',
      image: image2,
      price: '£149.99',
      stock: 32,
      reviews: 342,
      rating: 4.5
    },
    {
      id: '3',
      brand: 'Birkenstock',
      name: 'Birkenstock Arizona Birko Flor Navy Sandals',
      image: image3,
      price: '£52.17',
      stock: 12,
      reviews: 29,
      rating: 5
    },
    {
      id: '4',
      brand: 'Paulaner',
      name: 'Paulaner Hefe-Weizen Natural Wheat Beer, 500 ml',
      image: image4,
      price: '£2.60',
      stock: 832,
      reviews: 179,
      rating: 5
    },
  ];

  const [isLoading, error, sendRequest] = useHttp();
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await sendRequest(
          '/api/products',
          'GET'
        );
        setProducts(res.products);
      } catch (err) {}
    }
    getProducts();
  }, [sendRequest]);

  return (
    <>
      {isLoading && <div className="flex justify-center"><LoadingSpinner /></div>}
      {!isLoading && !products && <h2>No products found</h2>}
      {!isLoading && products && <ProductList products={products} />}
    </>
  );
}

export default Home;