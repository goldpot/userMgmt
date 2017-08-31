"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
// Imports for loading & configuring the in-memory web api
var angular_in_memory_web_api_1 = require("angular-in-memory-web-api");
var user_data_1 = require("./user-data");
var user_list_component_1 = require("./user-list.component");
var user_edit_component_1 = require("./user-edit.component");
var user_filter_pipe_1 = require("./user-filter.pipe");
var user_service_1 = require("./user.service");
var shared_module_1 = require("../shared/shared.module");
var UserModule = (function () {
    function UserModule() {
    }
    return UserModule;
}());
UserModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
            forms_1.ReactiveFormsModule,
            angular_in_memory_web_api_1.InMemoryWebApiModule.forRoot(user_data_1.UserData),
            router_1.RouterModule.forChild([
                { path: 'users', component: user_list_component_1.UserListComponent },
                { path: 'userEdit/:id',
                    component: user_edit_component_1.UserEditComponent },
            ])
        ],
        declarations: [
            user_list_component_1.UserListComponent,
            user_edit_component_1.UserEditComponent,
            user_filter_pipe_1.UserFilterPipe
        ],
        providers: [
            user_service_1.UserService
        ]
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map