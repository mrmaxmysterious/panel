"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function deleteProps(array, object) {
    var newObj = object;
    array.forEach((prop) => {
        delete newObj[prop];
    });
    return newObj;
}
exports.default = deleteProps;
//# sourceMappingURL=deleteProps.js.map