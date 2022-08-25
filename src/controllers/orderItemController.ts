import models from "../models";
import { Request, Response } from "express";
import OrderItemService from "../services/orderItemService";

export default class OrderItemController {
  static async getAllOrderItems(req: Request, res: Response){
    const allOrderItems = await OrderItemService.findAllOrderItems;
    res.send(allOrderItems);
  }
  static async create(req: Request, res: Response) {
    const { orderItem: OrderItem } = models;
    const newOrderItem = await OrderItemService.bulkCreate(req.body);
    res.send(newOrderItem.toJSON());  //response to postman
  }
}
