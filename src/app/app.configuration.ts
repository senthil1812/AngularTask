import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class Configuration {

    public login = environment.nodeApi + '/User';

    public departmentList = environment.nodeApi + '/Department';

    public employeeList = environment.nodeApi + '/Employee';

    public addEmployee = environment.nodeApi + '/Employee';

    public updateEmployee = environment.nodeApi + '/Employee';

    public getEmployee = environment.nodeApi + '/Employee';

    public deleteEmployee = environment.nodeApi + '/Employee';

}
