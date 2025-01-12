"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ms = ms;
const s = 1000;
const m = s * 60;
const h = m * 60;
const d = h * 24;
const w = d * 7;
const y = d * 365.25;
function ms(str) {
    if (typeof str !== 'string' || str.length === 0 || str.length > 100) {
        throw new Error('Value provided to ms() must be a string with length between 1 and 99.');
    }
    const match = /^(?<value>-?(?:\d+)?\.?\d+) *(?<type>milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(str);
    const groups = match?.groups;
    if (!groups) {
        return NaN;
    }
    const n = parseFloat(groups.value);
    const type = (groups.type || 'ms').toLowerCase();
    switch (type) {
        case 'years':
        case 'year':
        case 'yrs':
        case 'yr':
        case 'y':
            return n * y;
        case 'weeks':
        case 'week':
        case 'w':
            return n * w;
        case 'days':
        case 'day':
        case 'd':
            return n * d;
        case 'hours':
        case 'hour':
        case 'hrs':
        case 'hr':
        case 'h':
            return n * h;
        case 'minutes':
        case 'minute':
        case 'mins':
        case 'min':
        case 'm':
            return n * m;
        case 'seconds':
        case 'second':
        case 'secs':
        case 'sec':
        case 's':
            return n * s;
        case 'milliseconds':
        case 'millisecond':
        case 'msecs':
        case 'msec':
        case 'ms':
            return n;
        default:
            throw new Error(`Ошибка: единица времени ${type} была распознана, но не существует соответствующего случая. Пожалуйста, проверьте введенные данные.`);
    }
}
//# sourceMappingURL=ms.utils.js.map