"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const tslib_1 = require("tslib");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const express_1 = tslib_1.__importDefault(require("express"));
const node_path_1 = tslib_1.__importDefault(require("node:path"));
const passport_1 = tslib_1.__importDefault(require("passport"));
const passport_js_1 = tslib_1.__importDefault(require("./lib/passport.js"));
const express_session_1 = tslib_1.__importDefault(require("express-session"));
const database_js_1 = tslib_1.__importDefault(require("./lib/database.js"));
const prisma_session_store_1 = require("@quixo3/prisma-session-store");
const logger_1 = require("@blazingworks/logger");
const transports_1 = require("@blazingworks/logger/transports");
const auth_1 = tslib_1.__importDefault(require("./routers/auth"));
const public_js_1 = tslib_1.__importDefault(require("./routers/public.js"));
const logger = new logger_1.Logger({
    transports: [
        {
            module: new transports_1.ConsoleTransport(),
        },
    ],
});
exports.logger = logger;
const app = (0, express_1.default)();
(0, passport_js_1.default)(passport_1.default);
app.set("view engine", "ejs");
app.set("views", node_path_1.default.join(__dirname, "views"));
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET,
    resave: true,
    name: "tideAuth",
    saveUninitialized: true,
    cookie: {
        maxAge: 7 * 24 * 60 * 60,
    },
    store: new prisma_session_store_1.PrismaSessionStore(database_js_1.default, {
        checkPeriod: 2 * 60 * 1000,
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined,
    }),
}));
app.use(express_1.default.static(node_path_1.default.join(__dirname, "public")));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use("/auth", auth_1.default);
app.use("/", public_js_1.default);
app.listen(process.env.PORT, () => {
    logger.info(`Server opened on ${process.env.PORT}`);
});
//# sourceMappingURL=app.js.map