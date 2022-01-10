import * as gcp  from "@pulumi/gcp";
import { Topic, isTopic,errTypes,ErrFactory } from "./types";
import {IConfigData,ConfigReader} from "./ConfigReader"
 
export class TopicCollection {

    constructor(public configData: IConfigData){}

    static getTopics(topicPath: string) : TopicCollection{
       return new TopicCollection(new ConfigReader(topicPath) )
    }

    private getCollection(): Topic[] | [] {
        let checkpoint: Array<number>=[] ;
        this.configData.readConfig();
        for (let i=0; i< this.configData.configData.length; i++ ){
           if (isTopic( this.configData.configData[i] )){
       
            checkpoint.push(i)
            }

        }
        
        if (checkpoint.length=== this.configData.configData.length ){
            console.log('line 25')
            return this.configData.configData as Topic[]
        } else { throw ErrFactory.getErr(errTypes.invalidTopic) }


        
         }

    getPubSubTopics(): gcp.pubsub.Topic[]{
  
     const topics =this.getCollection();
  
    const pubsubTopics= topics.map(topic => new gcp.pubsub.Topic(topic.topic, topic.attributes));
    return pubsubTopics;
   
}
}