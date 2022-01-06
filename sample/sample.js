const collections= require('../dist/index');
const topicCollections= collections.TopicCollection;
const topicCollection= topicCollections.getTopics('topics.json');
const topics= topicCollection.getPubSubTopics();
const subscriptionCollections= collections.SubscriptionCollection;
const subCollection= subscriptionCollections.getSubscriptions('subscribers.json');
const subs= subCollection.getPubSubSubscriptions();

module.exports = async () => {
    // create resources
    return { topics: topics.map(topic=>topic.name), subs: subs.map(sub=> sub.name) };
}