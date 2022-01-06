import * as gcp  from "@pulumi/gcp";
import { Topic } from "./types";
import {IConfigData,ConfigReader} from "./ConfigReader"
 
export class TopicCollection {

    constructor(public configData: IConfigData){}

    static getTopics(topicPath: string) : TopicCollection{
       return new TopicCollection(new ConfigReader(topicPath) )
    }

    private getCollection(): Topic[] {
        this.configData.readConfig();
        return this.configData.configData as Topic[];
         
    }

    getPubSubTopics(): gcp.pubsub.Topic[]{

     const topics =this.getCollection();
    const pubsubTopics= topics.map(topic => new gcp.pubsub.Topic(topic.topic, topic.attributes));
    return pubsubTopics;
    }
}