const db = require("../../models")
const Product = db.products
const ProductImage = db.productImages;

const getPagination = (page, size, itemsPerPage) => {
    if (page < 0) page = 0
    const limit = size ? +size : itemsPerPage; // set limit of items per page
    const offset = page ? page * limit : 0;
  
    return { limit, offset };
};

const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: items } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
    const prevPage = (+page - 1) >= 0 ? (+page - 1) : null;
    const nextPage = (+page + 1) <= totalPages ? (+page + 1) : null;

    return { totalItems, items, totalPages, currentPage, prevPage, nextPage };
};

const PRODUCTS_PER_PAGE = 12

exports.viewProducts = async (req, res) => {
    const { page, size } = req.query;
    const { limit, offset } = getPagination(+page - 1, size, PRODUCTS_PER_PAGE);
    Product.findAndCountAll({
        include: [{ model: ProductImage}],
        limit, offset
      })
      .then(data => {
        const response = getPagingData(data, page, limit);
        res.render('./admin/inventory/inventory', {
            employee: req.user,
            products: response.items,
            pageObj: {
                currentPage: response.currentPage,
                totalPages: response.totalPages,
                nextPage: response.nextPage,
                prevPage: response.prevPage
            }
        })
    })
}

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
        res.redirect('/admin/inventory')
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
            res.redirect('/admin/inventory')
        } else {
            req.flash('error', 'No product found in database')
            res.redirect(`/admin/inventory/${req.params.id}/update`)
          }
        })
        .catch(err => {
            console.log(err)
            req.flash('error', `Error occurred in deleting product.: ${err}`)
            res.redirect('/admin/inventory')
        });
}
