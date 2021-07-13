import { topics,Topic } from "./state/non-prod/topics";
import { subscriptions,Subscription } from "./state/non-prod/subscriptions";




export interface IConfigData {
    readConfig(): void;
    configData: [Topic] | [Subscription];
    configType: string;
}

export class ConfigReader {

    configData: [Topic] | [Subscription];
    
    constructor(public configType: string){

    }

    readConfig(): void {
       if (this.configType=== 'Topic'){
        const topics_config: [Topic]= topics(); 
    
           this.configData= topics_config;
        
       }
       else if (this.configType=== 'Subscription'){
        const subscription_config: [Subscription]= subscriptions(); 
        this.configData= subscription_config;
       }
    }
}