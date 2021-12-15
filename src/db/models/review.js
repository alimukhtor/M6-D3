import sequelize from "../sequalization.js";
import s from "sequelize"
const {DataTypes} = s

// "id": 1,
// "text": TEXT,
// "username:STRING,
// "productId":FOREIGN KEY products

const Review = sequelize.define(
    "review",{

        id:{
            primaryKey:true,
            type:DataTypes.UUID,
            defaultValue:DataTypes.UUIDV4,       
        },
        text:{
            type:DataTypes.TEXT,
            allowNull:false,
        },
        username:{
            type:DataTypes.STRING,
            allowNull:false,
        }
    }
)


export default Review;