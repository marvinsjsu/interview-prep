import AnalyticsObservableFromClass from "./observables/analytics-observable-class.observable.js";
import AnalyticsObservableObjectLiteral from "./observables/analytics-observable-object-literal.observable.js";

const onClickEvent = () => {
    const data = `An event just happened!`
    AnalyticsObservableFromClass.notify(data);
    AnalyticsObservableObjectLiteral.notify(data);
}


onClickEvent();

