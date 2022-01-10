type JSONPrimitive = string | number | boolean | null
type JSONObject = { [k: string]: JSONValue | JSONPrimitive }
type JSONArray = JSONPrimitive[] | JSONObject[]
type JSONValue = JSONArray | JSONObject | JSONPrimitive


export function isJSON(arg: JSONValue): arg is JSONValue { 
 return true

};


export type Topic= {
    topic: string,
    attributes: {
        labels: {
      
        },
        name: string
    }


};

export function isTopic(valueToTest: any): valueToTest is Topic { 

    return (
        valueToTest &&
        typeof valueToTest === "object" &&
        "topic" in valueToTest &&
        typeof valueToTest["topic"] === "string" &&
        "attributes" in valueToTest &&
        typeof valueToTest["attributes"].name === "string"
      )
      
   
   };

export type Subscription= {
    name: string,
   attributes:{ 
       topic: string,
       name: string,
    ackDeadlineSeconds: number,
    labels: {
       
    },
    expirationPolicy?: {
        ttl: string,
    } ,
    retryPolicy?: {
        minimumBackoff: string,
    }, 
    enableMessageOrdering: boolean,
    deadLetterPolicy?: {
        deadLetterTopic: string,
        maxDeliveryAttempts: number,
    }
    messageRetentionDuration?: string
}
};

export function isSubscription(valueToTest: any): valueToTest is Topic { 
   
    return (
        valueToTest &&
        typeof valueToTest === "object" &&
        "name" in valueToTest &&
        typeof valueToTest["name"] === "string" &&
        "attributes" in valueToTest &&
        typeof valueToTest["attributes"].topic === "string" &&
        typeof valueToTest["attributes"].name === "string" &&
        typeof valueToTest["attributes"].ackDeadlineSeconds === "number"
      )
      
   
   };

  export enum errTypes{
    invalidFile= 'File is not JSON',
    invalidTopic= 'Invalid data found in Topic',
    invalidSubscription= 'Invalid data found in Subscription'
  }
 export class ErrFactory {
  
    static getErr(errType : errTypes){
      return new Error(errType)
    }
  }