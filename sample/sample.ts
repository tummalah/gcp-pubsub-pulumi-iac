import { TopicCollection } from "../src";
import { SubscriptionCollection } from "../src";



const topicCollection= TopicCollection.getTopics('topics.json');
const topics= topicCollection.getPubSubTopics();
const subscriptionCollection= SubscriptionCollection.getSubscriptions('subscribers.json');
const subs= subscriptionCollection.getPubSubSubscriptions();

export = async () => {
    // create resources
    return { topics: topics.map(topic=>topic.name),subs: subs.map(sub=> sub.name) };
}