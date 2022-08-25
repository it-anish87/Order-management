import models from "../models";
import { Request, Response } from "express";
import ProductService from "../services/productService";

export default class ProductController {

  static async getAllProducts(req: Request, res: Response){
    const allProducts = await ProductService.findAllProducts;
    res.send(allProducts);
  }
  static async create(req: Request, res: Response) {
    const { product: Product } = models; //product service
    const { name, description, code, price } = req.body;
    const newProduct = await Product.create({
      name,
      description,
      code,
      price,
    });
    res.send(newProduct.toJSON());
  }
}
