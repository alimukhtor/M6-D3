import sequelize from "../sequalization.js";
import s from "sequelize"
const {DataTypes} = s
// "id": 1,
// "name": STRING,
// "last_name": STRING, 
// "email": STRING, 
// "age":INTEGER,
// "country": STRING,

const User = sequelize.define(
    "user",
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
        last_name:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        age:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
        country:{
            type:DataTypes.STRING,
            allowNull:false
        }

    }

);

export default User;