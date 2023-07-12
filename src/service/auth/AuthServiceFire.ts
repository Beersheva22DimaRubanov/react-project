import UserData from "../../model/UserData";
import AuthService from "./AuthService";
import {getFirestore, collection, getCountFromServer, query, where, doc, getDoc} from "firebase/firestore";
import {AuthProvider, GoogleAuthProvider, TwitterAuthProvider, getAuth, signInWithEmailAndPassword, signInWithPopup, signOut} from "firebase/auth"
import appFirebase from '../../config/firebase-config' 

const mapProviders: Map<string, AuthProvider> = new Map([
    ['GOOGLE', new GoogleAuthProvider()],
    ['TWITER', new TwitterAuthProvider()]

])

export default class AuthServiceFire implements AuthService{
    getAvailableProvider(): { providerName: string; providerIconUrl: string; }[] {
      return [{providerName: 'GOOGLE', providerIconUrl: "https://img.icons8.com/color/2x/google-logo.png"}]
    }
    private auth = getAuth(appFirebase)
    private administrators = collection(getFirestore(appFirebase), 'administrators')

    private async isAdmin(uid: any): Promise<boolean>{
        const docRef = doc(this.administrators, uid);
        return (await getDoc(docRef)).exists();
    }
    async login(loginData: { email: string; password: string; }): Promise<UserData> {
        let userData: UserData = null;
        try {
            const userAuth = !loginData.password? 
             await signInWithPopup(this.auth, mapProviders.get(loginData.email)!) :
            await signInWithEmailAndPassword(this.auth, loginData.email,
                 loginData.password);
            userData = {email: loginData.email,
                 role: await this.isAdmin(userAuth.user.uid) ? 'admin' : 'user'}     
                
        } catch (error: any) {
            console.log(error.code, error)
        }
        return userData;
    }
    async logout(): Promise<void> {
        return signOut(this.auth);
    }
    
}