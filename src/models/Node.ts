import Axios from 'axios'

export default class Node extends Object {

    id: string
    name: string

    static populate(data: any): Node {
        let node = Object.create(Node.prototype)

        Object.assign(node, data)

        return node;
    }

}