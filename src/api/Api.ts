import Axios from 'axios'

import Service from 'models/Service'

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

    static async saveService(service: Service): Promise<Service> {
        let response;

        if (!service.id) {
            response = await Axios.post(this.baseUrl + '/services', service)
        } else {
            response = await Axios.put(this.baseUrl + '/services/' + service.name, service)
        }

        return Service.populate(response.data)
    }

    static async loadService(id: string): Promise<Service> {
        let response = await Axios.get(this.baseUrl + '/services/' + id)

        return Service.populate(response.data)
    }
}