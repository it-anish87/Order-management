import models from "../models";
import { Request, Response } from "express";
import CustomerService from "../services/customerService";

export default class CustomerController {
  /*static async getAllCustomers(req: Request, res: Response){
    const allCustomers = await CustomerService.findAllCustomers;
    res.send(allCustomers);
  }*/
  static async create(req: Request, res: Response) {
    const { customer: Customer } = models;
    const newCustomer = await CustomerService.findOrCreate(req.body);
    res.send(newCustomer[0].toJSON());  //response to postman 
                                        //findOrCreate returns array of Objects
  }
}
