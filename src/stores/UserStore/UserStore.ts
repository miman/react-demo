import axios from 'axios';
import { User } from './UserModel';
import { observable } from 'mobx';

export enum FETCH_STATUS {
  FETCH_SUCEEDED = "FETCH_SUCEEDED",
  FETCH_FAILED = "FETCH_FAILED",
  FETCH_ONGOING = "FETCH_ONGOING",
  NONE = "NONE"
}

/**
 * A proxy for the API @ https://jsonplaceholder.typicode.com/
 */
export class UserStore {
    apiUrl = process.env.REACT_APP_USER_URL;
    user = {};
    userid = 0;
    @observable users: User[] = [];
    @observable fetchUsersStatus: FETCH_STATUS = FETCH_STATUS.NONE;

    constructor() {
      console.log('UserStore Created');
    }

    async fetchUsers() {
      let fullUrl = this.apiUrl;
      this.fetchUsersStatus = FETCH_STATUS.FETCH_ONGOING;
      axios({ method: 'get', url: fullUrl })
      .then(response => {
        let fetchedUsers: User[] = response.data;
        
        fetchedUsers.forEach(user => {
          this.users.push(user);
        })
        this.fetchUsersStatus = FETCH_STATUS.FETCH_SUCEEDED;
        console.log('UserStore> Data received: ' + JSON.stringify(response.data));
      }).catch(() => {
        this.fetchUsersStatus = FETCH_STATUS.FETCH_FAILED;
      });
    }
}
