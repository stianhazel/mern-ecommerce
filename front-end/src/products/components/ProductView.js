import React, { useState, useRef, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';

import Splitter from '../../shared/components/UI/Splitter';
import Card from '../../shared/components/UI/Card';

import AddToCart from './AddToCart';
import ReviewList from './ReviewList';
import ProductViewSection from './ProductViewSection';
import ProductViewReview from './ProductViewReview';
import ProductViewDelete from './ProductViewDelete';
import ProductViewEdit from './ProductViewEdit';

import { AuthContext } from '../../shared/context/auth-context';

import image4 from '../../home/pages/beer.jpg';
import paypal from '@iconify-icons/logos/paypal';
import visa from '@iconify-icons/cib/cc-visa';
import mastercard from '@iconify-icons/grommet-icons/mastercard';
import applePay from '@iconify-icons/logos/apple-pay';
import { Icon } from '@iconify/react';
import { TruckIcon } from '@heroicons/react/solid';
import { CashIcon } from '@heroicons/react/solid';
import Modal from '../../shared/components/UI/Modal';

const general = {
  "desc": <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.<br /><br />Deserunt at id accusantium neque quo, quam maiores eius molestias cumque laboriosam corrupti eos nisi fugiat quia. Laudantium sapiente eos commodi cupiditate. Sint libero iure quia modi, commodi ratione tempore quod aliquid distinctio ipsam. Ad autem repudiandae asperiores non facere, odit inventore adipisci, velit saepe voluptatibus cum!<br /><br /> Hic autem vitae suscipit reprehenderit reiciendis. Rerum, magnam commodi porro error dignissimos nam quos explicabo aliquid ipsam asperiores voluptatum exercitationem magni eos dolor sed.</p>,

  "delivery": <p>Delivers to the United Kingdom.</p>,

  "policy": <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt at id accusantium neque quo, quam maiores eius molestias cumque laboriosam corrupti eos nisi fugiat quia. Laudantium sapiente eos commodi cupiditate. Sint libero iure quia modi, commodi ratione tempore quod aliquid distinctio ipsam. Ad autem repudiandae asperiores non facere, odit inventore adipisci</p>
}

const ProductView = props => {
  const auth = useContext(AuthContext);

  const { name, image, brand, price, stock, reviews, rating } = props.product;
  
  const paginationRef = useRef(null);
  const reviewsRef = useRef(null);
  const writeReviewRef = useRef(null);
  
  let date = new Date();
  date.setDate(date.getDate() + 3);
  date = date.toDateString().split(' ');
  date.pop();
  date = date.join(' ');
  
  let _stock;
  if (stock > 0) {
    _stock = <p className="text-green-600">{`${stock} in stock`}</p>
  } else {
    _stock = <p className="text-red-600">Out of stock</p>
  }

  // paginations
  const [currentPageValues, setCurrentPageValues] = useState(reviews);

  const onPageInit = p => {
    setCurrentPageValues(p);
  }

  const onPageChange = p => {
    setCurrentPageValues(p);
    reviewsRef.current.style.height = window.getComputedStyle(reviewsRef.current, null).getPropertyValue('height');
    writeReviewRef.current.scrollIntoView({behavior: 'smooth'});
  }

  const id = useParams().productId;

  // todo: SIMPLIFY INTO COMPONENTS
  // * editProduct + form

  return (
    <div className="grid md:grid-cols-3 px-1 gap-2">
      {/* PRODUCT */}
      <Card className="p-6 py-5 md:col-span-2 md:row-span-1" style={{maxWidth: '32rem'}}>
        <Link to={'/'} className="text-xs block text-left text-gray-700 hover:text-blue-600">{brand}</Link>
        <h2 className="text-left text-gray-800 pr-5">
          {name}
        </h2>
        <div className="text-yellow-600 text-xs text-left mt-1">
          <span className="">{rating} / 5</span> <Link to={`#reviews`}><span className="text-black hover:text-blue-800">({reviews.length} reviews)</span></Link>
        </div>
        <Splitter className="mt-4 mb-5" />
        <img className="mx-auto max-h-64" src={image4} alt={name} />
      </Card>

      {/* INFO */}
      <Card className="text-left p-5 md:row-span-5 md:mb-4">
        <div className="grid sm:grid-cols-2 md:grid-cols-1">
          <div className="flex flex-col justify-between">
            <div className="mb-2">
              <p className="text-3xl font-semibold">{`£${price.toFixed(2)}`}</p>
              <div className="text-base font-normal">{_stock}</div>
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <TruckIcon className="w-7 text-blue-600" />
                <p className="text-sm">Delivery by <span className="font-bold ml-0.5 text-green-600">{date}</span></p>
              </div>
              <div className="flex items-center space-x-2">
                <CashIcon className="w-7 text-blue-600" />
                <p className="text-sm">30-day Money Back Guarantee</p>
              </div>
            </div>

          </div>
          <div className="flex flex-col space-y-2 mt-3 sm:mt-0 md:mt-2">
            <AddToCart data={{id, name, price, stock}} />
            {auth.userData && auth.userData.isAdmin &&
              <>
                <ProductViewEdit productId={id} />
                <ProductViewDelete productId={id} />
              </>
            }
          </div>
        </div>
        <Splitter className="mt-3 mb-4" />
        <ProductViewSection header="Description">{general.desc}</ProductViewSection>
        <ProductViewSection header="Delivery">{general.delivery}</ProductViewSection>
        <ProductViewSection header="Payment">
          <p>We accept the following payment methods:</p>
          <div className="flex items-center space-x-3 text-3xl mt-2 -mb-2">
            <Icon icon={paypal} />
            <Icon icon={mastercard} className="text-5xl" />
            <Icon icon={visa} className="text-blue-700" />
            <Icon icon={applePay} />
          </div>
        </ProductViewSection>
        <ProductViewSection header="Our policy">{general.policy}</ProductViewSection>
      </Card>

      {/* WRITE REVIEW */}
      <ProductViewReview
        productId={id}
        writeReviewRef={writeReviewRef}
      />

      {/* REVIEWS */}
      {/* hooking this up is simple */}
      {/* 1. hook in array of data from back-end (in this case, reviews) */}
      {/* 2. choose perPage and a callback to change this components state to sync with pagination */}
      <Card ref={reviewsRef} className="p-5 text-left md:col-span-2 relative">
        <div className="pb-4">
          <h3 className="text-2xl font-semibold">Reviews</h3>
          <p className="text-sm">There are <span className="font-semibold">{reviews.length}</span> written reviews for this product</p>
        </div>
        <ReviewList reviews={reviews} />
        <Splitter className="mt-4 mb-12" />
        <div className="absolute bottom-3 left-5" ref={paginationRef}>
           {/* TODO: CREATE HOOK!!!!!!!!!!!!!!! */}
          {/* <Pagination
            array={reviews}
            perPage={5}
            onPageChange={onPageChange}
            onInitPage={onPageInit}
          /> */}
        </div>
      </Card>
    </div>
  );
}

export default ProductView;