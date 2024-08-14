import observable from './observable-object-literal.js';

import {
    sendAnalyticsMessage,
    sendTeamsNotification,
    sendSlackNotification,
} from '../utils/messages.util.js';



const AnalyticsObservableObjectLiteral = Object.assign({}, observable);

AnalyticsObservableObjectLiteral.subscribe(sendAnalyticsMessage);
AnalyticsObservableObjectLiteral.subscribe(sendTeamsNotification);
AnalyticsObservableObjectLiteral.subscribe(sendSlackNotification);

export default AnalyticsObservableObjectLiteral;



