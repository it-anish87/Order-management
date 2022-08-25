import models from "../models";
import ITrackingInput from "../inputTypes/ITrackingInput";

export default class TrackingService {
  static async findTracking(targetTrackingId: number){
    const { tracking: Tracking } = models;
    return await Tracking.findOne({
      where: {
        id: targetTrackingId
      }
    }); //find by tracking id
  }
  static async create( {orderStatus} : ITrackingInput) {
    try {
      const { tracking: Tracking } = models;
      return await Tracking.create({ orderStatus });
    } catch (err) {
      console.error(err);
    }
  }

  static async update(trackingObj: any) {
    try {
      const { tracking: Tracking } = models;

      return await Tracking.update({orderStatus: trackingObj.orderStatus}, {
        where: {
          id: trackingObj.id
        }
      }
      )
    } catch(err) {
      console.log(err)
    }
  }
}