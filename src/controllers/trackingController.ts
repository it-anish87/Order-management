
import { Request, Response } from "express";
import TrackingService from "../services/trackingService";

export default class TrackingController {
  static async trackOrder(req: Request, res: Response){
    if (req.query && req.query.trackingId && typeof req.query.trackingId === "string") {  
      const filteredOrderByTracking = await TrackingService.findTracking(+(req.query.trackingId));
      res.send(filteredOrderByTracking);
    }else {
      req.statusCode = 400;
      res.send('Invalid tracking ID');
    }
  }
}