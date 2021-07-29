
import { Topic, Subscription } from "./state/types";





export interface IConfigData {
    readConfig(): Promise<void>;
    configData: [Topic] | [Subscription];
    configType: string;
}

export class ConfigReader {

    configData: [Topic] | [Subscription] ;
    
    constructor(public configType: string, public stack: string){

    }

  async  readConfig(): Promise<void> {
       if (this.configType=== 'Topic'){
        let topics_config: [Topic];
         topics_config = await this.getTopicConfig();
        this.configData= topics_config;
    
           
        
       }
       else if (this.configType=== 'Subscription'){
        let subscriptions_config: [Subscription];
        subscriptions_config= await this.getSubscriptionConfig();
        this.configData= subscriptions_config;

       }

      
    }

    private async getTopicConfig(): Promise<[Topic]>  {
        let topicsConfig: [Topic] ;
        if (this.stack==='dev'){
            const  moduleObj = await import('./state/non-prod/topics') ;
            const topics= moduleObj.topics;
            topicsConfig = topics();
        }
        else {

            const  moduleObj = await import('./state/prod/topics') ;
            const topics= moduleObj.topics;
            topicsConfig = topics();
        }

        return topicsConfig;

    }
    private async getSubscriptionConfig(): Promise<[Subscription]>  {
        let subscriptionsConfig: [Subscription] ;
        if (this.stack==='dev'){
            const  moduleObj = await import('./state/non-prod/subscriptions') ;
            const subscriptions= moduleObj.subscriptions;
            subscriptionsConfig = subscriptions();
        }
        else {

            const  moduleObj = await import('./state/prod/subscriptions') ;
            const subscriptions= moduleObj.subscriptions;
            subscriptionsConfig = subscriptions();
        }

        return subscriptionsConfig;

    }
}