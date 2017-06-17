import Axios from 'axios'

export default class Route extends Object {

    id: string
    name: string

    static populate(data: any): Route {
        let route = Object.create(Route.prototype)

        Object.assign(route, data)

        return route;
    }

}