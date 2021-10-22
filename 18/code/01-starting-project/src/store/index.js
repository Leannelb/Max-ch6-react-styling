import { createStore } from 'redux';

const initalState = { counter: 0, showCounter: true};

const counterReducer = (state = initalState, action )=> {
    if (action.type === 'increment') {
        return {
            counter: state.counter + 1,
            showCounter: state.showCounter
        };
    };

    if (action.type === 'increace') {
        return {
            counter: state.counter + action.amount,
            showCounter: state.showCounter
        }
    }

    if (action.type === 'decrement') {
        return {
            counter: state.counter -1,
            showCounter: state.showCounter
        };
    };

    if(action.type === 'toggle') {
        return {
            showCounter: !state.showCounter
        }
    }

    return state;
}

const store = createStore(counterReducer);

export default store;