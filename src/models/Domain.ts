import Axios from 'axios'

export default class Domain extends Object {

    id: string
    name: string

    static populate(data: any): Domain {
        let domain = Object.create(Domain.prototype)

        Object.assign(domain, data)

        return domain;
    }

}