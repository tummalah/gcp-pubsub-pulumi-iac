import * as gcp  from "@pulumi/gcp";
import { Topic } from "./state/non-prod/topics";
import {IConfigData,ConfigReader} from "./ConfigReader"
 
export class TopicCollection {

    constructor(public configData: IConfigData){}

    static getTopics(stack: string) : TopicCollection{
       return new TopicCollection(new ConfigReader('Topic') )
    }

    getCollection(): [Topic] {
         this.configData.readConfig();
         return this.configData.configData as [Topic];
    }

    getPubSubTopics(): gcp.pubsub.Topic[]{

      return  this.getCollection().map(topic => new gcp.pubsub.Topic(topic.topic, topic.attributes) )
    }
}