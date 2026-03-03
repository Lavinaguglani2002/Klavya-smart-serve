



const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
    categoryname: { type: String, required: true },
    categoryimage: { type: String },
    createdAt:{type:Date,default:Date.now},
    subcategories: [
        {
            subcategoryname: { type: String, required: true },
            subcategoryimage: { type: String, required: true },
            content:{ type: String },
            createdAt:{type:Date,default:Date.now},
            smallsubcategories:[
                {
                    smallsubcategoryname: { type: String, required: true },
            smallsubcategoryimage: { type: String, required: true },
            smallsubcategorycontent:{ type: String },
            price:{type:String},
            rating: { type: Number, min: 0, max: 5 }, // Add the rating field (0-5 scale)

            createdAt:{type:Date,default:Date.now},
                }

            ]
        }
    ]
    
}, { timestamps: true });

const CategoryModel = mongoose.model("Category", CategorySchema);

module.exports = CategoryModel;

