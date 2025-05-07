import Category from '../models/category.js'

export const addCategory = async(req, res) => {
    const {categoryName } = req.body
    const existingCategory = await Category.find().where({ categoryName: { $eq: categoryName } });
    if (existingCategory.length > 0) {
        return res.status(400).send({ error: `הקטגוריה קיימת` });
    }
    const newCategory = new Category({
        categoryName: categoryName  
    })
    newCategory.save()
        .then(cat => {
            res.status(200).send({ message: `create city ${cat} succeed!` })
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}

export const getAllCategories = (req,res)=>{
    Category.find()
            .then(categories=>{
                res.status(200).send({categories})
            })
            .catch(err=>{
                res.status(500).send({error:err.message})
            })
}