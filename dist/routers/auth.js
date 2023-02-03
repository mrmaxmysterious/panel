"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const passport_1 = tslib_1.__importDefault(require("passport"));
const router = (0, express_1.Router)();
router.post("/login", passport_1.default.authenticate("local", {
    successRedirect: "/?auth=true",
    failureRedirect: "/?auth=false",
}));
router.post("/logout", (req, res) => {
    req.logout((err) => {
        if (err)
            return res.status(500).send("Could not logout");
    });
    res.redirect("/");
});
exports.default = router;
//# sourceMappingURL=auth.js.map