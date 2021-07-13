
 export type Subscription= {
    name: string,
   attributes:{ 
       topic: string,
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
export const subscriptions = (): [any]  => {

    return [
        {
            name: "example-sub",
           attributes:{ topic: "example",
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


           