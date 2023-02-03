"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const app_1 = require("../app");
const router = (0, express_1.Router)();
console.log(app_1.logger);
router.get("/render/:page", (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = require(`../views/${req.params.page}`);
        if (!page)
            return res.status(404).send("Not Found");
        res.render(`../views/${req.params.page}`, {
            user: req.user,
        });
    }
    catch (error) {
        app_1.logger.error(`Page not found: /render/${req.params.page}`);
        return res.status(404).json({ message: "Not Found" });
    }
}));
exports.default = router;
//# sourceMappingURL=public.js.map