export type Topic= {
    topic: string,
    attributes: {
        labels: {
      
        }
    }


}

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