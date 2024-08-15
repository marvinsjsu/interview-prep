import AnalyticsObservableFromClass from "./observables/analytics-observable-class.observable.js";
import AnalyticsObservableObjectLiteral from "./observables/analytics-observable-object-literal.observable.js";

const onClickEvent = () => {
    const data = `An event just happened!`
    AnalyticsObservableFromClass.notify(data);
    AnalyticsObservableObjectLiteral.notify(data);
}

onClickEvent();


/**
 * Arrow function and its `this` with lexical scope
 */

const obj = {
    val1: true,
    val2: true,
    getTruthiness: function () {
        return () => {
            console.log(`val1: ${this.val1}, val2: ${this.val2}`);
            return this.val1 && this.val2;
        }
    }
}

const truthyFn = obj.getTruthiness();

console.log(truthyFn());

obj.val2 = false;

console.log(truthyFn());

