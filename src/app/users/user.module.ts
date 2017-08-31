import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { UserData }  from './user-data';

import { UserListComponent } from './user-list.component';
import { UserEditComponent } from './user-edit.component';


import { UserFilterPipe } from './user-filter.pipe';
import { UserService } from './user.service';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    InMemoryWebApiModule.forRoot(UserData),
    RouterModule.forChild([
      { path: 'users', component: UserListComponent },      
      { path: 'userEdit/:id',
        
        component: UserEditComponent },
    ])
  ],
  declarations: [
    UserListComponent,    
    UserEditComponent,
    UserFilterPipe
  ],
  providers: [
    UserService   
    
  ]
})
export class UserModule {}
