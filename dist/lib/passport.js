"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const passport_local_1 = require("passport-local");
const database_1 = tslib_1.__importDefault(require("./database"));
const bcrypt_1 = tslib_1.__importDefault(require("bcrypt"));
const deleteProps_1 = tslib_1.__importDefault(require("./deleteProps"));
function passport(passport) {
    passport.use(new passport_local_1.Strategy(function verify(username, password, callback) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield database_1.default.user.findUnique({
                    where: {
                        username,
                    },
                });
                if (!user)
                    return callback(null, false, { message: "Incorrect credentials" });
                const doesMatch = yield bcrypt_1.default.compare(password, user.password);
                if (!doesMatch)
                    return callback(null, false, { message: "Incorrect credentials" });
                return callback(null, (0, deleteProps_1.default)(["password"], user));
            }
            catch (error) {
                return callback(error);
            }
        });
    }));
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser((id, done) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        const user = yield database_1.default.user.findUnique({
            where: {
                id,
            },
        });
        if (!user)
            return done(true, null);
        done(null, user);
    }));
}
exports.default = passport;
//# sourceMappingURL=passport.js.map