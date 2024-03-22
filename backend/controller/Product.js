const { Product } = require("../model/Product")

exports.createProduct = async (req, res) => {
    //Product details has to receive from API body.
    const product = new Product(req.body);
    try {
        const response = await product.save();
        res.status(201).json(response)
    } catch (error) {
        res.status(400).json(error);
    }
}

exports.fetchAllProducts = async (req, res) => {
    //Product details has to receive from API body.
    let query = Product.find({});
    let totalProductsCount = Product.find({})

    if (req.query._sort && req.query._order) {
        query = query.sort({ [req.query._sort]: req.query._order });
    }
    if (req.query.category) {
        query = query.find({ category: req.query.category });
        totalProductsCount = totalProductsCount.find({ category: req.query.category });
    }
    if (req.query.brand) {
        query = query.find({ brand: req.query.brand });
        totalProductsCount = totalProductsCount.find({ brand: req.query.brand });
    }
    if (req.query._page && req.query._limit) {
        const pageSize = +req.query._limit;
        const page = +req.query._page
        query = query.skip(pageSize * (page - 1)).limit(pageSize);
    }
    const totalDocs = await totalProductsCount.count().exec();
    console.log({totalDocs})
    
    try {
        const response = await query.exec();
        res.set('X-Total-Count', totalDocs)
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json(error);
    }
}
