"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var multer_1 = __importDefault(require("multer"));
var OrphanagesController_1 = __importDefault(require("./controllers/OrphanagesController"));
var upload_1 = __importDefault(require("./config/upload"));
var routes = express_1.Router();
var upload = multer_1.default(upload_1.default);
routes.post('/orphanages', upload.array('images'), OrphanagesController_1.default.create);
routes.get('/orphanages', OrphanagesController_1.default.index);
routes.get('/orphanages/:id', OrphanagesController_1.default.show);
exports.default = routes;
