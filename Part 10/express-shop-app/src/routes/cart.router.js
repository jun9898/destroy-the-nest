const express = require('express');
const router = express.Router();
const Product = require('../models/products.model');

router.get('/checkout', (req, res) => {
    res.render('checkout', )
});

router.post('/:product', async (req, res, next) => {
    const slug = req.params.product;
    try {
        const product = await Product.findOne({slug: slug});
        req.session.cart = req.session.cart || [];
        let cartItem = req.session.cart.find(item => item.title === slug);

        if (cartItem) {
            cartItem.qty++;
        } else {
            req.session.cart.push({
                title: slug,
                qty: 1,
                price: product.price,
                image: `/product-images/${product._id}/${product.image}`,
            });
        }

        req.flash('success', 'Product added to cart');
        res.redirect('back');
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.get('/update/:product', (req, res) => {
    const slug = req.params.product;
    const action = req.query.action;
    let cart = req.session.cart || [];

    for (let i = 0; i < cart.length; i++) {
        if (cart[i].title === slug) {
            switch (action) {
                case 'add':
                    cart[i].qty++;
                    break;
                case 'remove':
                    cart[i].qty--;
                    if (cart[i].qty < 1) {
                        cart.splice(i, 1);
                    }
                    break;
                case 'clear':
                    cart.splice(i, 1);
                    if (cart.length === 0) {
                        delete req.session.cart;
                    }
                    break;
                default:
                    console.error('Action not found');
                    break;
            }
        }
    }
    req.flash('success', 'Cart updated');
    res.redirect('/cart/checkout');
})

router.delete('/', (req, res) => {
    delete req.session.cart;
    req.flash('success', 'Cart cleared');
    res.redirect('/cart/checkout');
});

router.get('/complete-order', (req, res) => {
    delete req.session.cart;
    res.sendStatus(200);
});

module.exports = router;
