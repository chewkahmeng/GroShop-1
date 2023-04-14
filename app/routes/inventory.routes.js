var router = require("express").Router();
const middleware = require("../middleware/middleware.js")
const upload = require("../middleware/image.middleware.js");
const inventoryController = require("../controllers/inventory/inventory.controller.js");

const { check, validationResult } = require('express-validator')

// Inventory Home Page
router.get("/", middleware.isLoggedIn, 
(req, res) => res.render('admin/inventory/inventory', {
    employee: req.user
}));

router.get("/productViewPage", middleware.isLoggedIn, inventoryController.viewProducts)

// Upload Product details
router.get("/create", middleware.isLoggedIn, (req, res) => {
    res.render('admin/inventory/inventoryForm', {
    employee: req.user,
    mode: "CREATE"
  })
});
router.post("/create", middleware.isLoggedIn, inventoryController.createProduct)

// Upload Photo of Product
router.get("/:id/uploadPhoto", middleware.isLoggedIn, (req, res) => {
    res.render('./admin/inventory/productImageForm', {
      employee: req.user,
      productId: req.params.id
    })
})
router.post("/:id/uploadPhoto", middleware.isLoggedIn, upload.single('image'), inventoryController.uploadPhoto)
router.post("/:id/savePhoto", middleware.isLoggedIn, inventoryController.addPhotoToProduct)

router.get("/:id/update",
    middleware.isLoggedIn,
    inventoryController.getProductToUpdate
)

router.post("/:id/update",
    middleware.isLoggedIn,
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            errors.array().forEach(err => req.flash('error', err.msg));
            return res.redirect(`/admin/inventory/${req.params.id}/update`);
        }
        next()
    },
    inventoryController.updateProduct
)

router.post("/:id/delete",
    middleware.isLoggedIn,
    inventoryController.deleteProduct
)

module.exports = router