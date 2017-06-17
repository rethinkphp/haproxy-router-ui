import Axios from 'axios'

import { Service } from 'models'

/**
 * The Api class 
 * 
 */
export default class Api {
    static baseUrl = 'http://gw.rethinkphp.me'

    static getServices(): Promise<Array<Service>> {
        return Axios
            .get(this.baseUrl + '/services')
            .then(response => response.data.map(Service.populate))
    }
}