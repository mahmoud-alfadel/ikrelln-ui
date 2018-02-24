import { RECEIVE_TEST_RESULT_FOR_TRACE } from '../actions/testDetails';
import { RECEIVE_TEST_RESULTS, RECEIVE_ENVIRONMENTS, FILTER_TEST_RESULTS } from '../actions/testResults';

const sortByDate = (a, b) => {
    if (a['date'] < b['date'])
        return 1;
    if (a['date'] === b['date'])
        return 0;
    return -1;
};

const testResults = (state = { results: [], environments: [], filter: {status: "Any", environment: undefined} }, action) => {
    switch (action.type) {
        case RECEIVE_TEST_RESULTS:
            var new_test_results = state.results.slice();
            action.results.forEach(new_tr => {
                if (state.results.find(tr => tr.trace_id === new_tr.trace_id) === undefined) {
                    new_test_results.push(new_tr);
                }
            });
            new_test_results.sort(sortByDate);
            return Object.assign({}, state, {
                results: new_test_results,
            })
        case RECEIVE_TEST_RESULT_FOR_TRACE:
            if (state.results.find(tr => tr.trace_id === action.testResult[0].trace_id) !== undefined) {
                return state;
            }
            var new_test_results = [...state.results, action.testResult[0]];
            new_test_results.sort(sortByDate);
            return Object.assign({}, state, {
                results: new_test_results,
            })
        case FILTER_TEST_RESULTS:
        return Object.assign({}, state, {
            filter: action.filter,
        })
    case RECEIVE_ENVIRONMENTS:
            return Object.assign({}, state, {
                environments: action.environments,
            })
        default:
            return state
    }
}

export default testResults