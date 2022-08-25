import models from "../models";
import ICustomerInput from "../inputTypes/ICustomerInput";

export default class CustomerService {
  static async findByEmail(email: string) {
    try {
      const { customer: Customer } = models;
      return await Customer.findOne({
        where: {
          email: email,
        },
      });

    } catch (err) {
      console.error(err);
    }
  }
  static async findOrCreate({ firstName, lastName, email }: ICustomerInput) {
    try {
      const { customer: Customer } = models;
      return await Customer.findOrCreate({
        where: { email: email },
        defaults: {
          firstName,
          lastName,
          email,
        },
      });
    } catch (err) {
      console.error(err);
    }
  }
}
