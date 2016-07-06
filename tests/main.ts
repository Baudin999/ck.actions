import ExceptionSpec from '/tests/exception.spec';
import ActionSpec from '/tests/action.spec';
import AsyncActionSpec from '/tests/async-action.spec';
import ObservableActionSpec from '/tests/observable-action.spec';
import ProcessSpec from '/tests/process.spec';

ExceptionSpec();
ActionSpec();
AsyncActionSpec();
ObservableActionSpec();
ProcessSpec();

window.onload();