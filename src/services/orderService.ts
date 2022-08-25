import models from "../models";
import IOrderInput from "../inputTypes/IOrderInput";
import { Op } from "sequelize";
import IDateRange from "../inputTypes/IDateRange";
import CustomerService from "./customerService";
import OrderItemService from "./orderItemService";
import TrackingService from "./trackingService";

export default class OrderService {
  //Filter orders by email
  static async findOrdersByEmail(email: string, limit: number, offset: number) {
    const { order: Order } = models;
    const customer = await CustomerService.findByEmail(email);
    console.log(limit,offset, "here");
      const orders = await Order.findAll({
        limit,
        offset,
        where: {
          customerId: customer.id
        }
      });
      console.log(orders);
    return orders;
  }

  //Filter orders by date
  static async findOrdersByDate({ startDate, endDate }: IDateRange) {
    const { order: Order } = models;
    if(startDate && endDate){    //between date range
      return await Order.findAll({
        where: {
          createdAt: {
            [Op.lte]: new Date(
              new Date(endDate).getTime() + 60 * 60 * 24 * 1000 - 1
            ),
            [Op.gte]: new Date(startDate),
          },
        },
      });
    } else if(startDate){      //start date till present
      return await Order.findAll({
        where: {
          createdAt: {
            [Op.gte]: new Date(startDate)
          },
        },
      });
    } else if(endDate){        //everything till end date
      return await Order.findAll({
        where: {
          createdAt: {
            [Op.lte]: new Date(
              new Date(endDate).getTime() + 60 * 60 * 24 * 1000 - 1
            )
          },
        },
      });
    }
    
  }
  //Respond with all orders
  static async findAllOrders(){
    const {order:Order} = models;
    return await Order.findAll();
  }
  //create new order
  static async createOrder(
    { customer, products, itemTotal, discount, grandTotal }: IOrderInput,
    trackingId: string
  ) {
    const { order: Order } = models;

    setTimeout(async () => {
      //Randomize Success/Fail simulation
      if (~~(Math.random() * 10) % 2) {
        //find or create new customer
        const currentCustomer = await CustomerService.findOrCreate(customer);
        const newOrder = await Order.create({
          customerId: currentCustomer[0].id,
          trackingId: trackingId,
          itemTotal,
          discount,
          grandTotal,
        });
        //map product
        products = products.map((product: any) => {
          product.orderId = newOrder.id;
          return product;
        });
        //create multiple order items
        await OrderItemService.bulkCreate(products);
        TrackingService.update({ id: trackingId, orderStatus: "SUCCESS" });
      } else {
        //no record created in case of fail
        TrackingService.update({ id: trackingId, orderStatus: "FAIL" });
      }
    }, 5000);
  }
  static async create(args: IOrderInput) {
    try {
      const currentTracking = await TrackingService.create({
        orderStatus: "Processing",
      });
      this.createOrder(args, currentTracking.id);
      return currentTracking.id;
    } catch (err) {
      console.error(err);
    }
  }
}
