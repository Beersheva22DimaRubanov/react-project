import UserData from "../../model/UserData";
import AuthService from "./AuthService";
export const AUTH_DATA_JWT = 'authDataJWT'

function getUserData(data: any): UserData{
    const token = data.accessToken;
    localStorage.setItem(AUTH_DATA_JWT, token)
    const jwtPayloadJSON = atob(token.split('.')[1]);
    const jwtPayloadObj = JSON.parse(jwtPayloadJSON);
    return {email: jwtPayloadObj.username, role: jwtPayloadObj.sub}
}

export default class AuthServiceJwt implements AuthService{
    constructor(private url: string){}
    getAvailableProvider(): { providerName: string; providerIconUrl: string; }[] {
      return [];
    }

   async login(loginData: { email: string; password: string; }): Promise<UserData> {
        const response = await fetch(this.url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        });
            return response.ok ? getUserData(await response.json()) : null
    }


    async logout(): Promise<void> {
        localStorage.removeItem(AUTH_DATA_JWT)
    }
    
}