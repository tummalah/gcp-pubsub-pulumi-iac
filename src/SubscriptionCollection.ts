import * as gcp  from "@pulumi/gcp";
import { Subscription } from "./types";
import {IConfigData,ConfigReader} from "./ConfigReader"


export class SubscriptionCollection {

    constructor(public configData: IConfigData){}

    static getSubscriptions(subscriptionPath: string) : SubscriptionCollection{
       return new SubscriptionCollection(new ConfigReader(subscriptionPath) )
    }

    private getCollection(): Subscription[] {
       this.configData.readConfig();
      return this.configData.configData as Subscription[]
       
  }

   getPubSubSubscriptions(): gcp.pubsub.Subscription[]{

    const subscriptions = this.getCollection();
   const pubsubSubscriptions= subscriptions.map(sub => new gcp.pubsub.Subscription(sub.name, sub.attributes));
   return pubsubSubscriptions;
   }

    
}