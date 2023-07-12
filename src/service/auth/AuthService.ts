import UserData from "../../model/UserData"

export type NetworkType = {providerName: string, providerIconUrl: string}
export default interface AuthService {
    login(loginData: {email: string, password: string}) : Promise<UserData>
    logout():Promise<void>
    getAvailableProvider(): {providerName: string, providerIconUrl: string}[]
}