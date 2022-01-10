import * as gcp  from "@pulumi/gcp";
import { Subscription,isSubscription,errTypes,ErrFactory } from "./types";
import {IConfigData,ConfigReader} from "./ConfigReader"


export class SubscriptionCollection {

    constructor(public configData: IConfigData){}

    static getSubscriptions(subscriptionPath: string) : SubscriptionCollection{
       return new SubscriptionCollection(new ConfigReader(subscriptionPath) )
    }

    private getCollection(): Subscription[] | [] {
      let checkpoint: Array<number>=[] ;
      this.configData.readConfig();
      for (let i=0; i< this.configData.configData.length; i++ ){
         if (isSubscription( this.configData.configData[i] )){
     
          checkpoint.push(i)
          }

      }
      
      if (checkpoint.length=== this.configData.configData.length ){
         
          return this.configData.configData as Subscription[]
      } else { throw ErrFactory.getErr(errTypes.invalidSubscription) }


      
       }

   getPubSubSubscriptions(): gcp.pubsub.Subscription[]{

         const subscriptions = this.getCollection();
         
            const pubsubSubscriptions= subscriptions.map(sub => new gcp.pubsub.Subscription(sub.name, sub.attributes));
            return pubsubSubscriptions;
   

   }

    
}