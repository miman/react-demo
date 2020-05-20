export interface UserTO {
    primarykey: string;
	name?: string;
    email: string;
    appId?: string;
	accesstoken?: string;
    expiration_at?: string;
    refreshtoken?: string;
    expiration_rt?: string;
    roles?: string[];
}

export interface UserInputTO {
    primarykey?: string;
	name?: string;
    email: string;
    password: string;
}

export interface LoginRequest {
    userId: string;
    password: string;
    scope?: string;
}

export interface LoginResponse {
	accesstoken: string;
    expiration_at: string;
    refreshtoken?: string;
    expiration_rt?: string;
}

export interface LogoutRequest {
    userId: string;
    appId?: string;
	accesstoken: string;
}

export interface TokenValidationRequest {
    userId: string;
    accesstoken: string;
    scope?: string;
}

export interface TokenValidationResponse {
    success: boolean;
    error?: string;
}
