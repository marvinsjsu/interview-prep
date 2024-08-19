import Observable from "./observable-class.js";

import {
    sendAnalyticsMessage,
    sendTeamsNotification,
    sendSlackNotification,
} from '../utils/messages.util.js';

const AnalyticsObservableFromClass = new Observable();

AnalyticsObservableFromClass.subscribe(sendAnalyticsMessage);
AnalyticsObservableFromClass.subscribe(sendTeamsNotification);
AnalyticsObservableFromClass.subscribe(sendSlackNotification);

export default AnalyticsObservableFromClass;

