import models from "../models";
import product from "../models/product";

export default class OrderItemService {

  static async findAllOrderItems(){
    const { orderItem: OrderItem } = models;
    return await OrderItem.findAll();
  }
  static async bulkCreate(products: any) {
    try {
      const { orderItem: OrderItem } = models;
      
      return await OrderItem.bulkCreate(products);
    } catch (err) {
      console.error(err);
    }
  }
}
