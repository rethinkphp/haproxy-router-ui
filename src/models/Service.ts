import Axios from 'axios'

export class Check extends Object {
    type: string = 'http'
    args: Array<string> = []

    static populate(data: any): Check {
        let check = new Check()
        Object.assign(check, data)

        return check;
    }
}

export default class Service extends Object {

    id: string
    name: string
    check: Check

    static populate(data: any): Service {
        let service = Object.create(Service.prototype)

        data.check = Check.populate(data.check || {});
        Object.assign(service, data)

        return service;
    }

}