exports.topics= () => {

    return [
        {
            topic: "demo1",
            attributes: {
                labels: {
                    test: "test",
                }
            },
            subscription:{
                name: "demo-sub1",
               attributes:{ topic: "demo1",
                ackDeadlineSeconds: 30,
                labels: {
                    test: "test",
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
    }
    ]
}
