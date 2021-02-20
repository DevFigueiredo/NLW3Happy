"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var images__view_1 = __importDefault(require("./images _view"));
exports.default = {
    render: function (orphanage) {
        return {
            id: orphanage.id,
            name: orphanage.name,
            latitude: orphanage.latitude,
            longitude: orphanage.longitude,
            about: orphanage.about,
            instructions: orphanage.instructions,
            opening_hours: orphanage.opening_hours,
            open_on_weekends: orphanage.open_on_weekends,
            images: images__view_1.default.renderMany(orphanage.images)
        };
    },
    renderMany: function (orphanages) {
        var _this = this;
        return orphanages.map(function (orphanage) { return _this.render(orphanage); });
    }
};
