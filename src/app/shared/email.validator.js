"use strict";
var EmailValidators = (function () {
    function EmailValidators() {
    }
    EmailValidators.validEmail = function (email) {
        return function (c) {
            var val = c.value;
            console.log(c.value);
            var regEx = new RegExp("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+");
            //if (c.touched || (c.dirty) && c.errors) {
            //   return { 'emailV': true };
            //}
            return regEx.test(val) ? null : { 'validEmail': true };
        };
    };
    return EmailValidators;
}());
exports.EmailValidators = EmailValidators;
//# sourceMappingURL=email.validator.js.map