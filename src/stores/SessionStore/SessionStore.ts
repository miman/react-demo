import { observable, computed } from 'mobx';

export enum LOGIN_STATUS {
  LOGIN_SUCEEDED = "LOGIN_SUCEEDED",
  LOGIN_FAILED = "LOGIN_FAILED",
  LOGIN_ONGOING = "LOGIN_ONGOING",
  NONE = "NONE"
}

export enum LOGOUT_STATUS {
  LOGOUT_SUCEEDED = "LOGOUT_SUCEEDED",
  LOGOUT_FAILED = "LOGOUT_FAILED",
  LOGOUT_ONGOING = "LOGOUT_ONGOING",
  NONE = "NONE"
}

/**
 * A store for the session and user
 */
export class SessionStore {
  apiUrl = process.env.REACT_APP_AUTH_URL;
  user = {};
  @observable userid: string = "";
  @observable avatar: string = '/images/avatars/avatar_11.png';
  @observable accessToken: string = "";
  @observable expiration_at: Date | null= null;
  @observable loginStatus: LOGIN_STATUS = LOGIN_STATUS.NONE;
  @observable logoutStatus: LOGOUT_STATUS = LOGOUT_STATUS.NONE;
  accessTokenStr: string = "testApp.accessToken";
  expirationAtStr: string = "testApp.expiration_at";


  constructor() {
    console.log('SessionStore Created');
    this.accessToken = localStorage.getItem(this.accessTokenStr) || "";
    let dateStr: string | null = localStorage.getItem(this.expirationAtStr);
    if (dateStr !== null && dateStr !== undefined) {
      this.expiration_at = new Date(dateStr);
    } else {
      this.expiration_at = null;
    }
    
    this.userid = localStorage.getItem("userid") || "";
    console.log('Local storage data: ' + this.accessToken + ", userid: " + this.userid);
  }

  @computed public get isLoggedIn() {
    if (this.expiration_at === null || this.accessToken.length < 1) {
      console.log("SessionStore: We don't have any access token -> we are not logged in");
      return false; // We don't have any access token -> we are not logged in
    }

    if (this.expiration_at.getTime() < Date.now()) {
      console.log('SessionStore: The access token has expired');
      return false; // The access token has expired
    }
    return true;  // Access token is still valid
  }

  /**
   * Used to login the user
   * @param userId the user id (email)
   * @param password The password
   */
  public async login(userId: string, password: string) {
    this.loginStatus = LOGIN_STATUS.LOGIN_ONGOING;
    this.userid = userId;
    if (password === "passw") {
      this.loginStatus = LOGIN_STATUS.LOGIN_SUCEEDED;
      this.accessToken = "The-AT";
      this.expiration_at = new Date(Date.now() + 600000); // Expire in 10 min

      localStorage.setItem(this.accessTokenStr, this.accessToken);
      if (this.expiration_at !== null) {
        localStorage.setItem(this.expirationAtStr, this.expiration_at?.toISOString());
      } else {
        localStorage.removeItem(this.expirationAtStr);
      }
      
      localStorage.setItem("userid", this.userid);
} else {
      this.loginStatus = LOGIN_STATUS.LOGIN_FAILED;
    }
  }

  /**
   * Used to login the user
   * @param userId the user id (email)
   * @param password The password
   */
  public async logout() {
    this.logoutStatus = LOGOUT_STATUS.LOGOUT_ONGOING;

    this.accessToken = "";
    this.expiration_at = null;
    this.logoutStatus = LOGOUT_STATUS.LOGOUT_SUCEEDED;

    localStorage.setItem(this.accessTokenStr, this.accessToken);
    localStorage.removeItem(this.expirationAtStr);

    this.logoutStatus = LOGOUT_STATUS.LOGOUT_SUCEEDED;
  }
}
