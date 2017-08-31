import { Component, OnInit }  from '@angular/core';

import { IUser } from './user';
import { UserService } from './user.service';

@Component({
    templateUrl: 'app/users/user-list.component.html',
    styleUrls: ['app/users/user-list.component.css']
})
export class UserListComponent implements OnInit {
    pageTitle: string = 'User List';
    imageWidth: number = 50;
    imageMargin: number = 2;    
    listFilter: string;
    errorMessage: string;

    users: IUser[];

    constructor(private userService: UserService) {

    }

    

    ngOnInit(): void {
        this.userService.getUsers()
                .subscribe(users => this.users = users,
                           error => this.errorMessage = <any>error);
    }
    
}
