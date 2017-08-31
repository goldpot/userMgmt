import { InMemoryDbService } from 'angular-in-memory-web-api';

import { IUser } from './user';

export class UserData implements InMemoryDbService {

    createDb() {
        let users: IUser[] = [
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
        return { users };
    }
}
