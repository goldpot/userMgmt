"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var user_service_1 = require("./user.service");
var number_validator_1 = require("../shared/number.validator");
var email_validator_1 = require("../shared/email.validator");
require("rxjs/add/operator/debounceTime");
var UserEditComponent = (function () {
    function UserEditComponent(fb, route, router, userService) {
        this.fb = fb;
        this.route = route;
        this.router = router;
        this.userService = userService;
        this.pageTitle = 'User Edit';
        // Use with the generic validation message class
        this.validationMessages = {
            required: 'Please enter your email address.',
            pattern: 'Please enter a valid email address.'
        };
    }
    UserEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userForm = this.fb.group({
            userName: ['', [forms_1.Validators.required,
                    forms_1.Validators.minLength(4),
                    forms_1.Validators.maxLength(20), forms_1.Validators.pattern('[a-zA-Z0-9._+-]+')]],
            //userEmail: ['', Validators.required,Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+')],  
            userEmail: ['', [forms_1.Validators.required, email_validator_1.EmailValidators.validEmail]],
            userAge: ['', [forms_1.Validators.required, number_validator_1.NumberValidators.range(1, 100)]]
        });
        var emailControl = this.userForm.get('userEmail');
        emailControl.valueChanges.debounceTime(1000).subscribe(function (value) {
            return _this.setMessage(emailControl);
        });
        // Read the user Id from the route parameter
        this.sub = this.route.params.subscribe(function (params) {
            var id = +params['id'];
            _this.getUser(id);
        });
    };
    UserEditComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    UserEditComponent.prototype.getUser = function (id) {
        var _this = this;
        this.userService.getUser(id)
            .subscribe(function (user) { return _this.onUserRetrieved(user); }, function (error) { return _this.errorMessage = error; });
    };
    UserEditComponent.prototype.onUserRetrieved = function (user) {
        if (this.userForm) {
            this.userForm.reset();
        }
        this.user = user;
        if (this.user.id === 0) {
            this.pageTitle = 'Add User';
        }
        // Update the data on the form
        this.userForm.patchValue({
            userName: this.user.userName,
            userAge: this.user.userAge,
            userEmail: this.user.userEmail
        });
    };
    UserEditComponent.prototype.setMessage = function (c) {
        var _this = this;
        this.emailMessage = '';
        if ((c.touched || c.dirty) && c.errors) {
            this.emailMessage = Object.keys(c.errors).map(function (key) {
                return _this.validationMessages[key];
            }).join(' ');
        }
    };
    UserEditComponent.prototype.saveUser = function () {
        var _this = this;
        if (this.userForm.dirty && this.userForm.valid) {
            // Copy the form values over the user object values
            var p = Object.assign({}, this.user, this.userForm.value);
            this.userService.saveUser(p)
                .subscribe(function () { return _this.onSaveComplete(); }, function (error) { return _this.errorMessage = error; });
        }
        else if (!this.userForm.dirty) {
            this.onSaveComplete();
        }
    };
    UserEditComponent.prototype.onSaveComplete = function () {
        // Reset the form to clear the flags
        this.userForm.reset();
        this.router.navigate(['/users']);
    };
    return UserEditComponent;
}());
UserEditComponent = __decorate([
    core_1.Component({
        templateUrl: 'app/users/user-edit.component.html'
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder,
        router_1.ActivatedRoute,
        router_1.Router,
        user_service_1.UserService])
], UserEditComponent);
exports.UserEditComponent = UserEditComponent;
//# sourceMappingURL=user-edit.component.js.map