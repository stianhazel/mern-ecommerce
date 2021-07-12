const express = require('express');
const { check } = require('express-validator');

const productControllers = require('../controllers/product-controllers');

const router = express.Router();

router.get('/', productControllers.getAllProducts);

router.get('/:pid', productControllers.getProductById);

router.post('/:pid/review',
  [
    check('title')
      .not()
      .isEmpty(),
    check('text')
      .not()
      .isEmpty(),
    check('rating')
      .isLength({min: 0.5, max: 5})
      .custom(value => {
        return (value % 0.5) === 0;
      }),
    check('date')
      .not()
      .isEmpty(),
    check('user')
      .isMongoId()
  ],
  productControllers.createReview
);

router.delete('/:pid/review', productControllers.deleteReview);

router.post('/new',
  [
    check('name')
      .not()
      .isEmpty(),
    check('brand')
      .not()
      .isEmpty(),
    check('price')
      .isDecimal({force_decimal: false, decimal_digits: 2, locale: 'en-GB'}),
    check('stock')
      .isNumeric()
  ],
  productControllers.createProduct
);

router.patch('/:pid',
  [
    check('name')
      .not()
      .isEmpty(),
    check('brand')
      .not()
      .isEmpty(),
    check('price')
      .isDecimal({ force_decimal: false, decimal_digits: 2, locale: 'en-GB' }),
    check('stock')
      .isNumeric()
  ],
  productControllers.editProduct
);

router.delete('/', productControllers.deleteAllProducts);

router.delete('/:pid', productControllers.deleteProduct);

module.exports = router;