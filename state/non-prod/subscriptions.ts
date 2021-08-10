
 import {Subscription} from '../types';
export const subscriptions = (): [Subscription]  => {

    return [
        {
            name: "orders-sub",
           attributes:{ topic: "orders",
           name: "orders-sub",
            ackDeadlineSeconds: 20,
            labels: {
                foo: "bar",
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


           