"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    render: function (image) {
        return {
            id: image.id,
            url: "https://heroku-nlw-happy.herokuapp.com/uploads/" + image.path
        };
    },
    renderMany: function (images) {
        var _this = this;
        return images.map(function (image) { return _this.render(image); });
    }
};
