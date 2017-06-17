import Axios from 'axios'

import { Service } from 'models'

declare var API_ENDPOINT: string

/**
 * The Api class 
 * 
 */
export default class Api {
    static baseUrl = API_ENDPOINT

    static async getServices(): Promise<Array<Service>> {
        let response = await Axios.get(this.baseUrl + '/services')

        return response.data.map(Service.populate)
    }
}