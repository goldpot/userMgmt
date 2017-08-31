"use strict";
var UserData = (function () {
    function UserData() {
    }
    UserData.prototype.createDb = function () {
        var users = [
            {
                'id': 1,
                'userName': 'Smitha',
                'userAge': 16,
                'userEmail': 's@s.com'
            },
            {
                'id': 2,
                'userName': 'Vidya',
                'userAge': 10,
                'userEmail': 'v@v.com'
            },
            {
                'id': 3,
                'userName': 'Shreya',
                'userAge': 10,
                'userEmail': 'vs@v.com'
            }
        ];
        return { users: users };
    };
    return UserData;
}());
exports.UserData = UserData;
//# sourceMappingURL=user-data.js.map