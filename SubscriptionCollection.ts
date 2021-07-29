import * as gcp  from "@pulumi/gcp";
import { Subscription } from "./state/types";
import {IConfigData,ConfigReader} from "./ConfigReader"


export class SubscriptionCollection {

    constructor(public configData: IConfigData){}

    static getSubscriptions(stack: string) : SubscriptionCollection{
       return new SubscriptionCollection(new ConfigReader('Subscription',stack) )
    }

    async getCollection(): Promise<[Subscription]> {
      await this.configData.readConfig();
      return this.configData.configData as [Subscription]
       
  }

  async getPubSubSubscriptions(): Promise<gcp.pubsub.Subscription[]>{

    const subscriptions =await this.getCollection();
   const pubsubSubscriptions= subscriptions.map(sub => new gcp.pubsub.Subscription(sub.name, sub.attributes));
   return pubsubSubscriptions;
   }

    
}