const express = require('express');
const path = require('path');
const cors = require('cors');
const PORT = 3030;

const app = express();
const router = express.Router();

app.use(cors())
app.use(router)

app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/', express.static(path.join(__dirname, 'html')));

// Preload Page
router.get('/', (req, res) => {
    console.log("Request at /")
    res.sendFile(path.join(`${__dirname}/html/ball.html`))
});

// Landing Page (home)
router.get('/home', (req, res) => {
    console.log("Request at /")
    res.sendFile(path.join(`${__dirname}/html/home.html`))
});

// Search Page
router.get('/search/page', (req, res) => {
    console.log("Request at /search/page")
    res.sendFile(path.join(`${__dirname}/html/search.html`))
});

// Account Page
router.get('/acc', (req, res) => {
    console.log("Request at /account")
    res.sendFile(path.join(`${__dirname}/html/acc.html`))
});

// Catalog Page
router.get('/catalog', (req, res) => {
    console.log("Request at /catalog")
    res.sendFile(path.join(`${__dirname}/html/catalog.html`))
});
// Detail Page
router.get('/catalog/:id', (req, res) => {
    res.sendFile(path.join(`${__dirname}/html/detail.html`))
});
// Contact Page
router.get('/contact', (req, res) => {
    console.log("Request at /contact")
    res.sendFile(path.join(`${__dirname}/html/contact.html`))
});


// ADMIN
router.get('/admin', (req, res) => {
    console.log("Request at /admin")
    res.sendFile(path.join(`${__dirname}/html/adminLand.html`))
});

router.get('/admin/manageOrder', (req, res) => {
    console.log("Request at /admin/manageOrder")
    res.sendFile(path.join(`${__dirname}/html/manageOrder.html`))
});

router.get('/admin/manageProduct', (req, res) => {
    console.log("Request at /admin/manageProduct")
    res.sendFile(path.join(`${__dirname}/html/manageProduct.html`))
});

router.get('/admin/manageUser', (req, res) => {
    console.log("Request at /admin/manageUser")
    res.sendFile(path.join(`${__dirname}/html/manageUser.html`))    
});



// Insert
router.get('/admin/manageProduct/addCat', (req, res) => {
    console.log("Request at /admin/manageProduct/addCat")
    res.sendFile(path.join(`${__dirname}/html/insertProduct.html`))
});

router.get('/admin/manageUser/addUser', (req, res) => {
    console.log("Request at /admin/manageUser/addUser")
    res.sendFile(path.join(`${__dirname}/html/insertUser.html`))
});

// Update
router.get('/admin/manageProduct/editCat', (req, res) => {
    console.log("Request at /admin/manageProduct/editCat")
    res.sendFile(path.join(`${__dirname}/html/editProduct.html`))
});

router.get('/admin/manageUser/editUser', (req, res) => {
    console.log("Request at /admin/manageUser/editUser")
    res.sendFile(path.join(`${__dirname}/html/editUser.html`))
});







// Listen PORT //
app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});