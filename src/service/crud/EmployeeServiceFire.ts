import Employee from "../../model/Employee";
import EmployeesService from "./EmployeesService";
import { Observable, Subscriber, catchError, of } from "rxjs";
import appFirebase from '../../config/firebase-config'
import { CollectionReference, DocumentReference, getFirestore, collection, getDoc, setDoc, deleteDoc, doc, FirestoreError } from 'firebase/firestore'
import { collectionData } from 'rxfire/firestore'
import { getRandomInt } from "../../util/random";
import { getISODateStr } from "../../util/date-functions";

const MIN_ID = 100000
const MAX_ID = 1000000

function getErrorMessage(firestoreError: FirestoreError): string {
    let errorMessage = '';
    switch (firestoreError.code) {
        case 'unauthenticated':
        case 'permission-denied': errorMessage = "Authentication"; break;
        default: errorMessage = firestoreError.message
    }
    return errorMessage;
}

function converEmployee(empl: Employee, id?: string): any {
    const res: any = { ...empl, id: id ? id : empl.id, birthDate: getISODateStr(empl.birthDate) }
    return res;
}

export default class EmployeesServiceFire implements EmployeesService {
    private collectionRef: CollectionReference = collection(getFirestore(appFirebase),
    'employees');
    async addEmployee(empl: Employee): Promise<Employee> {
        const id: string = await this.getId()
        const employee = converEmployee(empl, id);
        const docRef = this.getDocRef(id);
        try {
            await setDoc(docRef, employee)
        } catch (error: any) {
            const firestoreError: FirestoreError = error;
            const errorMessage = getErrorMessage(firestoreError)
            throw errorMessage;
        }
        return employee;
    }

    private getDocRef(id: string): DocumentReference {
        return doc(this.collectionRef, id);
    }

    private async exists(id: string): Promise<boolean> {
        const docRef: DocumentReference = this.getDocRef(id);
        const docSnap = await getDoc(docRef);
        return docSnap.exists();
    }

    private async getId(): Promise<string> {
        let id: string = '';
        do {
          id =  getRandomInt(MIN_ID, MAX_ID).toString()
        } while (await this.exists(id))
        return id;
    }

    getEmployees(): Observable<string | Employee[]> {
        return collectionData(this.collectionRef).pipe(catchError(error => {
            const firestoreError: FirestoreError = error;
            const errorMessage = getErrorMessage(firestoreError)
            return of(errorMessage)
        })) as Observable<string | Employee[]>
    }

    async deleteEmployee(id: any): Promise<void> {
        const docref = this.getDocRef(id)
        if (!await this.exists(id)) {
            throw 'Not found'
        }
        try {
            deleteDoc(docref);
        } catch (error: any) {
            const firestoreError: FirestoreError = error;
            const errorMessage = getErrorMessage(firestoreError)
            throw errorMessage;
        }
    }

    async updateEmployee( empl: Employee): Promise<Employee> {
        const docRef = this.getDocRef(empl.id);
        if (!empl.id || await this.exists(empl.id)) {https://onedrive.live.com/?v=photos&cid=1208BD1DD81FFAC7&id=1208BD1DD81FFAC7!167&sc=photosWidget
            throw 'Not found'
        }
        try {
            await setDoc(docRef, empl)
        } catch (error: any) {
            const firestoreError: FirestoreError = error;
            const errorMessage = getErrorMessage(firestoreError)
            throw errorMessage;
        }
        return empl;
    }

}