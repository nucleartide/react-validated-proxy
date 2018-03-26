"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var validated_proxy_1 = require("validated-proxy");
var Validate = /** @class */ (function (_super) {
    __extends(Validate, _super);
    function Validate(p) {
        var _this = _super.call(this, p) || this;
        _this.set = function (name, value) {
            _this.state.model[name] = value;
            _this.setState({ model: _this.state.model });
        };
        _this.reset = function () {
            _this.state.model.reset();
            _this.setState({ model: _this.state.model });
        };
        _this.flush = function () {
            _this.state.model.flush();
            _this.setState({ model: _this.state.model });
        };
        _this.state = {
            model: validated_proxy_1.validatedProxy(p.model, { validations: p.as }),
        };
        return _this;
    }
    Validate.prototype.render = function () {
        return this.props.children({
            model: this.state.model,
            set: this.set,
            reset: this.reset,
            isPristine: Object.keys(this.state.model.cache).length === 0,
            hasErrors: this.state.model.errors.length > 0,
            flush: this.flush,
        });
    };
    return Validate;
}(react_1.Component));
exports.default = Validate;
