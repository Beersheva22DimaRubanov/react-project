import UserData from "../../model/UserData";
import AuthService from "./AuthService";

export default class AuthServiceFake implements AuthService{
    getAvailableProvider(): { providerName: string; providerIconUrl: string; }[] {
       return [];
    }
    login(loginData: { email: string; password: string; }): Promise<UserData> {
        const userData: UserData = 
        {email: loginData.email, role: loginData.email.includes('admin') ? 'admin' : 'user'};
        return Promise.resolve(userData);
    }
    async logout(): Promise<void> {
    }
    
}