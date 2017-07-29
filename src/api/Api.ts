import Axios from 'axios'

import Service from 'models/Service'
import Route from 'models/Route'
import Node from 'models/Node'

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
            response = await Axios.put(this.baseUrl + '/services/' + service.id, service)
        }

        return Service.populate(response.data)
    }

    static async loadService(id: string): Promise<Service> {
        let response = await Axios.get(this.baseUrl + '/services/' + id)

        return Service.populate(response.data)
    }

    static async deleteService(id: string) {
        await Axios.delete(this.baseUrl + '/services/' + id)
    }

    static async getRoutes(serviceId: string) {
        let response = await Axios.get(this.baseUrl + '/services/' + serviceId + '/routes')

        return response.data.map(Route.populate)
    }

    static async saveRoute(serviceId: string, route: Route) {
        let response

        if (route.id) {
            response = await Axios.put(this.baseUrl + '/services/' + serviceId + '/routes/' + route.id, route)
        } else {
            response = await Axios.post(this.baseUrl + '/services/' + serviceId + '/routes', route)
        }

        return Route.populate(response.data)
    }

    static async deleteRoute(serviceId: string, route: Route) {
        await Axios.delete(this.baseUrl + '/services/' + serviceId + '/routes/' + route.id)
    }

    static async getNodes(serviceId: string) {
        let response = await Axios.get(this.baseUrl + '/services/' + serviceId + '/nodes')

        return response.data.map(Node.populate)
    }

    static async saveNode(serviceId: string, node: Node) {
        let response

        if (node.id) {
            response = await Axios.put(this.baseUrl + '/services/' + serviceId + '/nodes/' + node.id, node)
        } else {
            response = await Axios.post(this.baseUrl + '/services/' + serviceId + '/nodes', node)
        }

        return Node.populate(response.data)
    }

    static async deleteNode(serviceId: string, node: Node) {
        await Axios.delete(this.baseUrl + '/services/' + serviceId + '/nodes/' + node.id)
    }
}