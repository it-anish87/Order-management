import models from "../models";
import IProductInput from "../inputTypes/IProductInput";

export default class ProductService {
  static async findAllProducts(){
    const { Product: Product } = models;
    return await Product.findAll();
  }
  static async create({ name, description, code, price }: IProductInput) {
    try {
      const { product: Product } = models;
      return await Product.create({ name, description, code, price });
    } catch (err) {
      console.error(err);
    }
  }
}