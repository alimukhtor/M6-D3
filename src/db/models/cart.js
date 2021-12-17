import sequelize from "../sequalization.js";

import s from "sequelize";

const { DataTypes } = s;

const Cart = sequelize.define("cart", {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  }
});

export default Cart;