import * as gcp  from "@pulumi/gcp";
import { Subscription,isSubscription } from "./types";
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
          console.log('line 25')
          return this.configData.configData as Subscription[]
      } else { return [] }


      
       }

   getPubSubSubscriptions(): gcp.pubsub.Subscription[]{

      try{
         const subscriptions = this.getCollection();
         if (subscriptions.length>0){
            const pubsubSubscriptions= subscriptions.map(sub => new gcp.pubsub.Subscription(sub.name, sub.attributes));
            return pubsubSubscriptions;
         }
         else{
            throw new Error('No Subscriptions data found in file')
         }
      }
      catch(e){
         throw e
      }
   

   }

    
}