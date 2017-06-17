import Axios from 'axios'

export default class Service extends Object {

    id: string
    name: string

    static populate(data: any): Service {
        let service = Object.create(Service.prototype)

        for (let i in data) {
            service[i] = data[i]
        }

        return service;
    }

}