"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    render: function (image) {
        return {
            id: image.id,
            url: "http://192.168.1.4:3333/uploads/" + image.path
        };
    },
    renderMany: function (images) {
        var _this = this;
        return images.map(function (image) { return _this.render(image); });
    }
};
