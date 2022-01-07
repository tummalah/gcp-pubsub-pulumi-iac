import * as gcp  from "@pulumi/gcp";
import { Topic, isTopic } from "./types";
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
        } else { return [] }


        
         }

    getPubSubTopics(): gcp.pubsub.Topic[]{
    try{
     const topics =this.getCollection();
     if (topics.length>0){
    const pubsubTopics= topics.map(topic => new gcp.pubsub.Topic(topic.topic, topic.attributes));
    return pubsubTopics;
     }
    else{
        throw new Error("No Topic data found in File")
    }
    
    } catch(e){
        throw e
    }
}
}