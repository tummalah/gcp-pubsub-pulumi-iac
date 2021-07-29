
import {Topic} from '../types';
 export const topics = (): [Topic]  => {

    return [
        {
            topic: "example",
         
            attributes: {
                labels: {
                    foo: "prod",
                }
            }
    }
    
    ]
}


        //     subscription:{
        //         name: "example-sub",
        //        attributes:{ topic: "example",
        //         ackDeadlineSeconds: 20,
        //         labels: {
        //             foo: "bar",
        //         },
        //         // expirationPolicy: {
        //         //     ttl: "300000.5s",
        //         // } ,
        //         retryPolicy: {
        //             minimumBackoff: "10s",
        //         }, 
        //         enableMessageOrdering: false,
        //         // deadLetterPolicy: {
        //         //     deadLetterTopic: dead-letter,
        //         //     maxDeliveryAttempts: 5,
        //         // }
        //         messageRetentionDuration: "604800s"
        // }