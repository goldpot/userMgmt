import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray,AbstractControl, ValidatorFn, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router  } from '@angular/router';


import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { IUser } from './user';
import { UserService } from './user.service';

import { NumberValidators } from '../shared/number.validator';
import { EmailValidators } from '../shared/email.validator';

import 'rxjs/add/operator/debounceTime';

@Component({
    templateUrl: 'app/users/user-edit.component.html'
})
export class UserEditComponent implements OnInit,  OnDestroy {   
    pageTitle: string = 'User Edit';
    errorMessage: string;
    userForm: FormGroup;
    emailMessage: string;

    user: IUser;
    private sub: Subscription;

    // Use with the generic validation message class
    
    private validationMessages = {

        required: 'Please enter your email address.',
        pattern: 'Please enter a valid email address.'
    }
    


    constructor(private fb: FormBuilder,
                private route: ActivatedRoute,
                private router: Router,
                private userService: UserService) {
        
    }

    ngOnInit(): void {
        this.userForm = this.fb.group({
            userName: ['', [Validators.required,
                               Validators.minLength(4),
                               Validators.maxLength(20),Validators.pattern('[a-zA-Z0-9._+-]+')]],  
            //userEmail: ['', Validators.required,Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+')],  
            userEmail: ['', [Validators.required,EmailValidators.validEmail]],                
            userAge: ['', [Validators.required,NumberValidators.range(1, 100)]]
            
            
        });

        const emailControl = this.userForm.get('userEmail');
        emailControl.valueChanges.debounceTime(1000).subscribe(value =>
            this.setMessage(emailControl));

        // Read the user Id from the route parameter
        this.sub = this.route.params.subscribe(
            params => {
                let id = +params['id'];
                this.getUser(id);
            }
        );
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

   

    

    getUser(id: number): void {
        this.userService.getUser(id)
            .subscribe(
                (user: IUser) => this.onUserRetrieved(user),
                (error: any) => this.errorMessage = <any>error
            );
    }

    onUserRetrieved(user: IUser): void {
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
    }

    setMessage(c: AbstractControl): void {
        this.emailMessage = '';
        if ((c.touched || c.dirty) && c.errors) {
            this.emailMessage = Object.keys(c.errors).map(key =>
                this.validationMessages[key]).join(' ');
        }
    }
   

    saveUser(): void {
        if (this.userForm.dirty && this.userForm.valid) {
            // Copy the form values over the user object values
            let p = Object.assign({}, this.user, this.userForm.value);

            this.userService.saveUser(p)
                .subscribe(
                    () => this.onSaveComplete(),
                    (error: any) => this.errorMessage = <any>error
                );
        } else if (!this.userForm.dirty) {
            this.onSaveComplete();
        }
    }

    onSaveComplete(): void {
        // Reset the form to clear the flags
        this.userForm.reset();
        this.router.navigate(['/users']);
    }
}
