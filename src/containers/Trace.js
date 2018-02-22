import { connect } from 'react-redux'
import { Trace as component, TraceComparator as componentTraceComparator } from '../components/Trace';
import { fetchTestResultForTrace, fetchTrace } from '../actions/testDetails';

const mapStateToProps = (state, props) => {
    return {
        spans: state.testDetails.traces.find(tr => tr.trace_id === props.trace_id),
        testResult: state.testDetails.testResults.find(tr => tr.trace_id === props.trace_id),
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchTrace: (trace_id) => dispatch(fetchTrace(trace_id)),
        fetchTestResultForTrace: (trace_id) => dispatch(fetchTestResultForTrace(trace_id))
    }
}

const Trace = connect(
    mapStateToProps,
    mapDispatchToProps
)(component)

export default Trace

const mapStateToPropsTraceComparator = (state, props) => {
    return {
        spansBase: state.testDetails.traces.find(tr => tr.trace_id === props.base),
        testResultBase: state.testDetails.testResults.find(tr => tr.trace_id === props.base),
        spansWith: state.testDetails.traces.find(tr => tr.trace_id === props.with),
        testResultWith: state.testDetails.testResults.find(tr => tr.trace_id === props.with),
    }
}
const mapDispatchToPropsTraceComparator = dispatch => {
    return {
        fetchTrace: (trace_id) => dispatch(fetchTrace(trace_id)),
        fetchTestResultForTrace: (trace_id) => dispatch(fetchTestResultForTrace(trace_id))
    }
}
export const TraceComparator = connect(
    mapStateToPropsTraceComparator,
    mapDispatchToPropsTraceComparator
)(componentTraceComparator)
