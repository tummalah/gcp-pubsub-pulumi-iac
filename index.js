"use strict";
const pulumi = require("@pulumi/pulumi");
const pulumiStack= pulumi.getStack()
const path= require("path")
let dir= path.join(__dirname,".","state")
if (pulumiStack==='prod'){
    dir= path.join(dir,"prod","topics.js")

}
else{
    dir= path.join(dir,"non-prod","topics.js")
}
const gcp = require("@pulumi/gcp")

const topics= require(dir).topics() || []

const outputTopics=[]
const outputSubscriptions=[]

for (let i=0 ; i<topics.length; i++){

let example = new gcp.pubsub.Topic(topics[i].topic, topics[i].attributes);
topics[i].subscription.attributes.topic=example.name        
let exampleSubscription= new gcp.pubsub.Subscription(topics[i].subscription.name,topics[i].subscription.attributes)

outputTopics.push(example.name)
outputSubscriptions.push(exampleSubscription.name)
}

exports.TopicName = outputTopics;
exports.Subscription=outputSubscriptions;
