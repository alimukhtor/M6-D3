import sequelize from "../sequalization.js";
import s from "sequelize"
const {DataTypes} = s
// "id": 1,
// "name": STRING,
// "category": STRING, 
// "description": TEXT, 
// "image":"url(IMAGE LINK)",
// "price":FLOAT,
// "createdAt": "DATE",
// "updatedAt": "DATE",   

const Product = sequelize.define(
    "product",
    {
        id:{
            primaryKey:true,
            type:DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        name:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        category:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        description:{
            type:DataTypes.TEXT,
            allowNull:false,
        },
        image:{
            type:DataTypes.TEXT,
            allowNull:false,
        },
        price:{
            type:DataTypes.FLOAT,
            allowNull:false
        }

    }

);

export default Product;