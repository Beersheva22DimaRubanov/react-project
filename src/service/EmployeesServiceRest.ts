import { Observable, Subscriber } from "rxjs";
import Employee from "../model/Employee";
import { AUTH_DATA_JWT } from "./AuthServiceJwt";
import EmployeesService from "./EmployeesService";
import { error } from "console";
import { TableBody } from "@mui/material";

const POLLER_INTERVAL = 2000;

class Cache {
    cacheString: string = '';
    setCache(employees: Employee[]): void{
        this.cacheString = JSON.stringify(employees)
    }
    reset(): void {
        this.cacheString = ''
    }
    isEqual(employees: Employee[]): boolean{
        return this.cacheString == JSON.stringify(employees)
    }

    getCache(): Employee[]{
        return !this.isEmpty() ? JSON.parse(this.cacheString) : []
    }

    isEmpty(): boolean{
        return this.cacheString.length === 0
    }
}

export default class EmployeesServiceRest implements EmployeesService {
    private observable: Observable<Employee[] | string> | null = null;
    private cache: Cache = new Cache;
    constructor(private url: string) { }
    
    async updateEmployee(id: any, empl: Employee): Promise<Employee| string> {
        let responseText = '';
        console.log (this.url +' /' + id)
        try {
            const response = await fetch(this.url +'/' + id, {
                method: "PUT",
                headers: {
                    'Content-type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem(AUTH_DATA_JWT)
                },
                body: JSON.stringify({...empl, userId: 'admin'})
                
            });
            if (!response.ok) {
                const { status, statusText } = response;
                responseText = status == 401 || status == 403 ? 'Authentication' : statusText;
                throw responseText;
            }
            return await response.json();
        } catch (error: any) {

            throw responseText ? responseText : "Server is unavailable. Repeat later on";
        
        }
    }

    async deleteEmployee(id: any): Promise<void| string> {
        let responseText = ''
        try{
            const response = await fetch(this.url + '/' + id, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem(AUTH_DATA_JWT) || ''
                },
            })
            if(!response.ok){
                const{status, statusText} = response;
                responseText = status == 401 || status == 403 ? 'Authentication': statusText
                throw responseText
            }
            return await response.json()
        } catch(error: any){
            throw responseText ? responseText : 'Server is unavailable.'
        }
    }

    
    async addEmployee(empl: Employee): Promise<Employee| string> {
        let responseText = '';
        try {
            const response = await fetch(this.url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem(AUTH_DATA_JWT)}`
                },
                body: JSON.stringify({ ...empl, userId: 'admin' })
            });
            if (!response.ok) {
                const { status, statusText } = response;
                responseText = status == 401 || status == 403 ? 'Authentication' : statusText;
                throw responseText;
            }
            return await response.json();
        } catch (error: any) {

            throw responseText ? responseText : "Server is unavailable. Repeat later on";
        }
    }

    getEmployees(): Observable<Employee[] | string> {
        if(this.observable == null){
            this.observable = new Observable<Employee[] | string> ((subscriber) =>{
                if(this.cache.isEmpty()){
                    this.putEmploeesToCash(subscriber)
                } else{
                    const employees = this.cache.getCache()
                    subscriber.next(employees)
                }

               const interval =  setInterval(()=>{
                    this.putEmploeesToCash(subscriber)
                }, POLLER_INTERVAL);
                return () => clearInterval(interval)

            })
        }
        return this.observable;
    }

    private async putEmploeesToCash(subscriber: Subscriber<Employee[] | string>){
        let responseText = '';
        try {
            const response = await fetch(this.url, {
            method: 'GET',
            headers: { Authorization: 'Bearer ' + localStorage.getItem(AUTH_DATA_JWT) }
            });
            if (!response.ok) {
                const { status, statusText } = response;
                responseText = status == 401 || status == 403 ? 'Authentication' : statusText;
                throw responseText;
            }
            const employees : Employee[] = await response.json();
                if(!this.cache.isEqual(employees)){
                    this.cache.setCache(employees)
                    subscriber.next(employees)
                }
        } catch (error: any) {
            // throw responseText ? responseText : "Server is unavailable. Repeat later on";
            subscriber.next(error)
        }


        // const response =  await fetch(this.url, {
        //     headers: { Authorization: 'Bearer ' + localStorage.getItem(AUTH_DATA_JWT) }
        // })
        //     let res: Promise<Employee[] | string>;
        //     if (response.ok) {
        //        const employees : Employee[] = await response.json();
        //         if(!this.cache.isEqual(employees)){
        //             this.cache.setCache(employees)
        //             subscriber.next(employees)
        //         }
        //     } else {
        //         res = Promise.resolve(response.status == 401 || response.status == 403 ?
        //             'Authentication' : response.statusText)
        //         subscriber.next(await res)
        //     }
        
    }

}