
 import {Subscription} from '../types';
export const subscriptions = (): [Subscription]  => {

    return [
        {
            name: "example-sub",
           attributes:{ topic: "example",
           name: "example-sub",
            ackDeadlineSeconds: 20,
            labels: {
                foo: "prod",
            },
            // expirationPolicy: {
            //     ttl: "300000.5s",
            // } ,
            retryPolicy: {
                minimumBackoff: "10s",
            }, 
            enableMessageOrdering: false,
            // deadLetterPolicy: {
            //     deadLetterTopic: dead-letter,
            //     maxDeliveryAttempts: 5,
            // }
            messageRetentionDuration: "604800s"
    }
    }
    
    ]
}


           