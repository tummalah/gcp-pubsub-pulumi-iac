import { TopicCollection } from "./TopicCollection";
import { SubscriptionCollection } from "./SubscriptionCollection";
import { Stack } from "./Stack";
const stack = Stack.getStack();

const topicCollection= TopicCollection.getTopics(stack);
export const topics= topicCollection.getPubSubTopics().then(topics=> topics.map(topic=> topic.name));
const subscriptionCollection= SubscriptionCollection.getSubscriptions(stack);
export const subscriptions= subscriptionCollection.getPubSubSubscriptions().then(subscriptions => subscriptions.map(sub=> sub.name));

