"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var e_1, _a;
exports.__esModule = true;
exports.move = exports.Action = void 0;
var Action;
(function (Action) {
    Action[Action["DAY_EARLIER"] = 0] = "DAY_EARLIER";
    Action[Action["DAY_LATER"] = 1] = "DAY_LATER";
    Action[Action["HOUR_EARLIER"] = 2] = "HOUR_EARLIER";
    Action[Action["HOUR_LATER"] = 3] = "HOUR_LATER";
})(Action = exports.Action || (exports.Action = {}));
var move = function (meeting, action) {
    switch (action) {
        case Action.DAY_EARLIER:
            meeting.date.setDate(meeting.date.getDate() - 1);
            return meeting;
        case Action.DAY_LATER:
            meeting.date.setDate(meeting.date.getDate() + 1);
            return meeting;
        case Action.HOUR_EARLIER:
            if (meeting.date.getHours() <= 9)
                meeting.date.setDate(meeting.date.getDate() - 1);
            else
                meeting.date.setHours(meeting.date.getHours() - 1);
            return meeting;
        case Action.HOUR_LATER:
            if (meeting.date.getHours() >= 19)
                meeting.date.setDate(meeting.date.getDate() + 1);
            else
                meeting.date.setHours(meeting.date.getHours() + 1);
            return meeting;
    }
};
exports.move = move;
var meeting = [
    { title: "Spotkanie1", date: new Date("2019-02-05T12:00:00"), duration: 1 },
    { title: "Spotkanie2", date: new Date("2019-02-05T12:00:00"), duration: 2 },
    { title: "Spotkanie3", date: new Date("2019-02-05T12:00:00"), duration: 3 },
];
var actions = [
    Action.DAY_EARLIER,
    Action.DAY_LATER,
    Action.HOUR_EARLIER,
];
try {
    for (var _b = __values(meeting.entries()), _c = _b.next(); !_c.done; _c = _b.next()) {
        var _d = __read(_c.value, 2), i = _d[0], el = _d[1];
        (0, exports.move)(el, actions[i]);
    }
}
catch (e_1_1) { e_1 = { error: e_1_1 }; }
finally {
    try {
        if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
    }
    finally { if (e_1) throw e_1.error; }
}
