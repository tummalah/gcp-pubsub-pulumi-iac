import * as gcp  from "@pulumi/gcp";
import { Subscription } from "./state/non-prod/subscriptions";
import {IConfigData,ConfigReader} from "./ConfigReader"


export class SubscriptionCollection {

    constructor(public configData: IConfigData){}

    static getSubscriptions(stack: string) : SubscriptionCollection{
       return new SubscriptionCollection(new ConfigReader('Subscription') )
    }

    getCollection(): [Subscription] {
         this.configData.readConfig();
         return this.configData.configData as [Subscription];
    }

    getPubSubSubscriptions(): gcp.pubsub.Subscription[]{

      return  this.getCollection().map(Subscription => new gcp.pubsub.Subscription(Subscription.name,Subscription.attributes) )
    }
}