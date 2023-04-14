const db = require("../../models")
const Product = db.products
const ProductImage = db.productImages;

const mysql = require("mysql2");
const dbConfig = require("../../config/db.config.js");
// Create a connection to the database
const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

// Enter Product Details
exports.createProduct = (req, res) => {
    console.log(req.body)

    const product = {
        name: req.body.name,
        description: req.body.description ? req.body.description : null,
        quantity: req.body.quantity ? req.body.quantity : null,
        price: req.body.price ? req.body.price : null,
    };

    Product.create(product)
    .then(product => {
        req.flash('success', 'Product created successfully.')
        res.redirect(`/admin/inventory/${product.id}/uploadPhoto`)
        //res.redirect(`/admin/inventory`)
    }).catch(err => {
        console.log(err)
        req.flash('error', 'Error occurred in creating product.')
        res.redirect(`/admin/inventory/create`)
    });
}

exports.uploadPhoto = async (req, res) => {
    try {
      console.log(req.file)
      const productId = req.params.id
  
      if (req.file == undefined) {
        req.flash('error', 'You must select a file.')
        return res.redirect(`/admin/inventory/${productId}/uploadPhoto`)
      }
      ProductImage.create({
        type: req.file.mimetype,
        name: req.file.originalname,
        srcPath: "/images/uploads/" + req.file.filename
      }).then((image) => {
        res.render('./admin/inventory/productImageForm', {
            employee: req.user,
            productId: productId,
            image: image
          })
      }).catch(err => {
        console.log(err)
        req.flash('error', 'Error occurred in creating product image:' + err)
        res.redirect(`/admin/inventory/${productId}/uploadPhoto`)
    }); 
    } catch (error) {
      console.log(error);
      return res.send(`Error when trying upload images: ${error}`);
    }
}

exports.addPhotoToProduct = (req, res) => {
    console.log(req.body)
    const imageId = req.body.imageId
    if (req.body.imageId == null) {
        req.flash('error', 'Please add a photo before continuing.')
        res.redirect(`/admin/inventory/${productId}/uploadPhoto`)
    }
    const productId = req.params.id
    
    Product.update(
        { imageId: imageId }, 
        {where: { id: productId }}
    ).then(product => {
        req.flash('success', 'Photo added to product successfully.')
        res.redirect(`/admin/inventory`)
    }).catch(err => {
        console.log(err)
        req.flash('error', 'Error occurred in adding photo to product.')
        res.redirect(`/admin/inventory/${productId}/uploadPhoto`)
    });
}

exports.viewProducts = async (req, res) => {
    connection.query('SELECT p.id, p.name, description, quantity, price, pi.srcPath FROM tbl_product p, tbl_product_image pi WHERE p.imageId = pi.id;', (err, res2) => {
        if (err){
            req.flash('error', 'Error occurred in viewing product.')
        }
        //connection.end();
        console.log(res2);
        if (res2) {
            res.render('./admin/inventory/productViewPage', {
                employee: req.user,
                product: res2
            })
        } else {
            req.flash('error', 'Error occurred in retrieving product.')
            res.redirect(`/admin/inventory`)
        }
    });
}

exports.updateProduct = (req, res) => {
    console.log(req.body)
    console.log('req.user: ' + req.user.username)
    const product = {
        name: req.body.name,
        description: req.body.description ? req.body.description : null,
        quantity: req.body.quantity,
        price: req.body.price
    }

    Product.update(
    { 
        name: product.name, description: product.description, quantity: product.quantity, price: product.price
    }, 
    {
        where: { id: req.params.id }
    })
    .then(num => {
      if (num == 1) {
        req.flash('success', 'Product updated successfully.')
        res.redirect('/admin/inventory/productViewPage')
      } else {
        req.flash('error', 'No product found in database')
        res.redirect(`/admin/inventory/${req.params.id}/update`)
      }
    })
    .catch(err => {
      console.log(err)
      req.flash('error', `Error occurred in saving product details.: ${err}`)
      res.redirect(`/admin/inventory/${req.params.id}/update`)
    });
}

exports.getProductToUpdate = async (req, res) => {
    const productId = req.params.id
    const product = await Product.findByPk(productId)

    res.render('admin/inventory/inventoryForm', {
        employee: req.user,
        mode: "UPDATE",
        product: product
    })
}

exports.deleteProduct = async (req, res) => {
    const id = req.params.id;
    Product.destroy({
        where: { id: id }
      })
    .then(num => {
        if (num == 1) {
            req.flash('success', 'Product deleted successfully.')
            res.redirect('/admin/inventory/productViewPage')
        } else {
            req.flash('error', 'No product found in database')
            res.redirect(`/admin/inventory/${req.params.id}/update`)
          }
        })
        .catch(err => {
            console.log(err)
            req.flash('error', `Error occurred in deleing product.: ${err}`)
            res.redirect('/admin/inventory')
        });
}
