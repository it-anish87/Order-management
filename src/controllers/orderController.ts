import models from "../models";
import { Request, response, Response } from "express";
import OrderService from "../services/orderService";
import IDateRange from "../inputTypes/IDateRange";
import Pagination from "../util/pagination";

export default class OrderController {
  static getOrders(req: Request, res: Response) {
    if (req.query && req.query.email) {
      OrderController.getOrdersByEmail(req, res);
    } else if (req.query.startDate || req.query.endDate) {
      OrderController.getOrdersByDate(req, res);
    } else {
      OrderController.getAllOrders(req, res);
    }
  }
  //Filter orders by email
  static async getOrdersByEmail(req: Request, res: Response) {
    if (typeof req.query.email === "string") {
      const page = (req.query.page == undefined)? 0 : +(req.query.page);
      const size = (req.query.size == undefined)? 0 : +(req.query.size);
      const pagination = Pagination.getPagination(page, size);
      const filteredOrders = await OrderService.findOrdersByEmail(
        req.query.email,
        pagination.limit,
        pagination.offset
      );
      return res.send(filteredOrders);
    } else {
      req.statusCode = 400;
      return res.send("Invalid or no email address");
    }
  }
  //Filter orders by date
  static async getOrdersByDate(req: Request, res: Response) {
    const filteredOrders = await OrderService.findOrdersByDate(
      req.query as IDateRange
    );
    return res.send(filteredOrders);
  }
  //Respond will all orders when no parameters passed
  static async getAllOrders(req: Request, res: Response) {
    const allOrders = await OrderService.findAllOrders();
    return res.send(allOrders);
  }
  //Create new order
  static async create(req: Request, res: Response) {
    const { order: Order } = models;
    const trackingId = await OrderService.create(req.body);
    return res.send({ trackingId: trackingId }); //response to postman
  }
}
