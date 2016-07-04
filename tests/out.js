System.register("src/action-async", ['es6-promise'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var es6_promise_1;
    var AsyncAction;
    return {
        setters:[
            function (es6_promise_1_1) {
                es6_promise_1 = es6_promise_1_1;
            }],
        execute: function() {
            AsyncAction = (function () {
                function AsyncAction() {
                }
                AsyncAction.foo = function () {
                    return new es6_promise_1.Promise(function (resolve, reject) {
                        setTimeout(function () {
                            resolve(12);
                        }, 1000);
                    });
                };
                return AsyncAction;
            }());
            exports_1("AsyncAction", AsyncAction);
        }
    }
});
System.register("src/interfaces", [], function(exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    return {
        setters:[],
        execute: function() {
        }
    }
});
System.register("src/action", [], function(exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var Action;
    return {
        setters:[],
        execute: function() {
            Action = (function () {
                /*
                The constructor function taking a Step Function as a parameter
                The step function is of type: (...args:any[]) => T
                */
                function Action(f) {
                    this.step = f;
                }
                /*
                Apply the step function
                */
                Action.prototype.ap = function () {
                    var _this = this;
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i - 0] = arguments[_i];
                    }
                    // of course we'd want to support currying...
                    if (args.length < this.step.length) {
                        var curried = function () {
                            var args2 = [];
                            for (var _i = 0; _i < arguments.length; _i++) {
                                args2[_i - 0] = arguments[_i];
                            }
                            return _this.ap.apply(_this, args.concat(args2));
                        };
                        return new Action(curried);
                    }
                    return this.step.apply(null, args);
                };
                /*
                Map should return a new Action, concatting the newly supplied function
            
                u.map(a => a) is equivalent to u (identity)
                u.map(x => f(g(x))) is equivalent to u.map(g).map(f) (composition)
            
                In our case 'a' would be a function of type StepFn. T should be a function
                which takes as a parameter a function of type StepFn and return a StepFn,
                which we than wrap in a new Action and return. I am aware that this is mighty
                complicated....
                */
                Action.prototype.map = function (t) {
                    var _this = this;
                    // create the new function by composing the current step with the new function
                    // f(g(x)) so we do something like:
                    // t( this.step(x) );
                    var f = function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i - 0] = arguments[_i];
                        }
                        var result = _this.step.apply(_this, args);
                        return t.apply(_this, [result]);
                    };
                    return new Action(f);
                };
                /* map an action, simple wrapper to unwrap and apply the Action */
                Action.prototype.mapAction = function (a) {
                    return this.map(a.step);
                };
                // Create an empty Action which just returns the parameters as arguments.
                Action.empty = function () {
                    return new Action(function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i - 0] = arguments[_i];
                        }
                        return args;
                    });
                };
                return Action;
            }());
            exports_3("Action", Action);
        }
    }
});
System.register("src/main", ["src/action"], function(exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var action_1;
    var add, a, aTick, result;
    return {
        setters:[
            function (action_1_1) {
                action_1 = action_1_1;
            }],
        execute: function() {
            add = function (a, b) { return a + b; };
            a = new action_1.Action(add);
            aTick = a.map(function (t) { return t; });
            result = aTick.ap(12, 13);
            console.log(result);
        }
    }
});
System.register("tests/action.spec", ["src/action", "src/action-async"], function(exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var action_2, action_async_1;
    function default_1() {
        describe('An Action', function () {
            it('exists', function () { return expect(action_2.Action).toBeDefined(); });
            it('should be constructable', function () {
                var add = function (x, y) { return x + y; };
                var a = new action_2.Action(add);
                return expect(a.ap).toBeDefined();
            });
            it('can return a tuple', function () {
                var add = function (x, y) { return x + y; };
                var a = new action_2.Action(add);
                return expect(a.ap(12, 13)).toEqual(25);
            });
            it('should support currying', function () {
                var add = function (x, y) { return x + y; };
                var a = new action_2.Action(add);
                return expect(a.ap(12) instanceof action_2.Action).toBeTruthy() &&
                    expect(a.ap(12).ap(13)).toEqual(25);
            });
            it('should allow currying with multiple parameters', function () {
                var add = function (x, y, z) { return x + y + z; };
                var a = new action_2.Action(add);
                var b = a.ap(12);
                var c = b.ap(13);
                var d = c.ap(14);
                return expect(d).toEqual(39);
            });
            it('test', function (done) {
                action_async_1.AsyncAction.foo().then(function (result) {
                    console.log(result);
                    return done(expect(result).toEqual(12));
                });
                return true;
            });
        });
        describe('The Empty function', function () {
            it('exists', function () { return expect(action_2.Action.empty).toBeDefined(); });
            it('can be called and returns an action', function () {
                var e = action_2.Action.empty();
                return expect(e).toBeDefined() && expect(e.ap(12)).toEqual([12]);
            });
            it('will return a tuple when applied', function () {
                var a = action_2.Action.empty();
                var _a = a.ap(1, 2), first = _a[0], second = _a[1]; // we'll need to cast this in order to not get an error
                return expect(first).toEqual(1) && expect(second).toEqual(2);
            });
        });
        describe('An action sould be a Functor', function () {
            it('and have a map function', function () {
                var add = function (x, y) { return x + y; };
                var a = new action_2.Action(add);
                return expect(a.map).toBeDefined();
            });
            it('The map function should compose functions', function () {
                var add = function (x, y) { return x + y; };
                var double = function (x) { return x + x; };
                var a = new action_2.Action(add);
                var b = a.map(double);
                var result = b.ap(2, 3);
                return expect(result).toEqual(10);
            });
            it('Should be able to compose multiple functions', function () {
                var createList = function () { return [1, 2, 3, 4, 5, 6]; };
                var filterEvenNumbers = function (list) { return list.filter(function (i) { return i % 2 === 0; }); };
                var sumNumbers = function (list) { return list.reduce(function (accumulator, i) { return accumulator + i; }, 0); };
                var action = new action_2.Action(createList).map(filterEvenNumbers).map(sumNumbers);
                var result = action.ap();
                return expect(result).toEqual(12);
            });
            it('Composition should be possible with actions', function () {
                var createList = function () { return [1, 2, 3, 4, 5, 6]; };
                var filterEvenNumbers = function (list) { return list.filter(function (i) { return i % 2 === 0; }); };
                var sumNumbers = function (list) { return list.reduce(function (accumulator, i) { return accumulator + i; }, 0); };
                var aAction = new action_2.Action(createList);
                var bAction = new action_2.Action(filterEvenNumbers).map(sumNumbers);
                var cAction = aAction.mapAction(bAction);
                var result = cAction.ap();
                return expect(result).toEqual(12);
            });
        });
    }
    exports_5("default", default_1);
    return {
        setters:[
            function (action_2_1) {
                action_2 = action_2_1;
            },
            function (action_async_1_1) {
                action_async_1 = action_async_1_1;
            }],
        execute: function() {
        }
    }
});
//# sourceMappingURL=out.js.map