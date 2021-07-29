import * as gcp  from "@pulumi/gcp";
import { Topic } from "./state/types";
import {IConfigData,ConfigReader} from "./ConfigReader"
 
export class TopicCollection {

    constructor(public configData: IConfigData){}

    static getTopics(stack: string) : TopicCollection{
       return new TopicCollection(new ConfigReader('Topic',stack) )
    }

    async getCollection(): Promise<[Topic]> {
        await this.configData.readConfig();
        return this.configData.configData as [Topic]
         
    }

    async getPubSubTopics(): Promise<gcp.pubsub.Topic[]>{

     const topics =await this.getCollection();
    const pubsubTopics= topics.map(topic => new gcp.pubsub.Topic(topic.topic, topic.attributes));
    return pubsubTopics;
    }
}