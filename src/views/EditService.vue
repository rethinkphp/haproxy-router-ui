<template>
<div>
    <div class="main-inner">
        <div class="page-title">
            <span v-if="service.id">{{service.name}}</span>
            <span v-else>New Service</span>
            <span v-if="!service.id && service.name"> - {{service.name}}</span>
            <a v-if="service.id" href="javascript:void(0)" @click="deleteService(service)" title="Remove the service">x</a>
        </div>
        <div class="page-content clearfix">
            <ul class="sidenav">
                <li v-bind:class="{active: isActive('basic')}"
                    @click="currentTab='basic'"
                >
                    Basic
                </li>
                <li v-bind:class="{active: isActive('routes')}"
                    @click="currentTab='routes'"
                >
                    Routes
                </li>
                <li v-bind:class="{active: isActive('nodes')}"
                    @click="currentTab='nodes'"
                >
                    Nodes
                </li>
            </ul>
            <div class="body">
                <div>
                    <h2>Basic</h2>
                    <section class="group-control">
                        <label for="name">Service Name</label>
                        <input 
                            name="name" 
                            type="text" 
                            v-model="service.name"
                            autocomplete="off" 
                            placeholder="A unique name to identity services"
                        >
                    </section>
                    <section class="group-control">
                        <label for="description">Description</label>
                        <textarea 
                            name="description" 
                            v-model="service.description"
                            placeholder="The description of the service">
                        </textarea>
                    </section>
                </div>
                <div>
                    <h2>Routes</h2>
                    <section class="routes group-control" v-for="(route, index) in routes" :key="route.id">
                        <span class="no">{{index + 1}}.</span>
                        <input 
                            :name="'route_name_' + index" 
                            type="text" 
                            class="name"
                            v-model="route.name"
                            autocomplete="off" 
                            placeholder="The route name"
                        >
                        <input 
                            :name="'route_host_' + index" 
                            type="text" 
                            class="host"
                            v-model="route.host"
                            autocomplete="off" 
                            placeholder="The route hostname"
                        >
                        <input 
                            :name="'route_path_' + index" 
                            type="text" 
                            class="path"
                            v-model="route.path"
                            autocomplete="off" 
                            placeholder="The route hostname"
                        >
                        <a class="delete" href="javascript:void(0)" @click="deleteRoute(route)">x</a>
                    </section>
                    <div class="group-action clearfix">
                        <a class="add-new" href="javascript:void(0)" @click="addRoute()">Add New Route</a>
                    </div>
                </div>
                <div>
                    <h2>Nodes</h2>
                    <section class="nodes group-control" v-for="(node, index) in nodes" :key="node.id">
                        <span class="no">{{index + 1}}.</span>
                        <input 
                            :name="'node_name_' + index" 
                            type="text" 
                            class="name"
                            v-model="node.name"
                            autocomplete="off" 
                            placeholder="The node name"
                        >
                        <input 
                            :name="'node_host_' + index" 
                            type="text" 
                            class="host"
                            v-model="node.host"
                            autocomplete="off" 
                            placeholder="The node hostname"
                        >
                        <input 
                            :id="'node_check_' + index" 
                            type="checkbox" 
                            class="check"
                            v-model="node.check"
                            autocomplete="off" 
                        >
                        <label :for="'node_check_' + index">check</label>
                        <a class="delete" href="javascript:void(0)" @click="deleteNode(node)">x</a>
                    </section>
                    <div class="group-action clearfix">
                        <a class="add-new" href="javascript:void(0)" @click="addNode()">Add New Node</a>
                    </div>
                </div>
                <div style="height: 50px;"></div>
            </div>
        </div>
    </div>
    <div class="action-bar">
        <div class="main-inner">
            <button @click="doSave()">
                <span v-if="!service.id">Create Service</span>
                <span v-else>Update Service</span>
            </button>
        </div>
    </div>
</div>
</template>
<style lang="stylus" scoped>
@require "../styles/variables"

rightSpaceSize = 200px

.page-title {
    a {
        float right
    }
}

.page-content {
    position fixed 
    width 100%;
    top: heightHeader;
    bottom heightActionBar
}
.sidenav {
    position absolute
    top: 0;
    float: left;
    width: 180px;
    padding: 0;
    margin: 0;

    >li {
        list-style-type none;
        font-size: 20px
        padding-left: 30px;
        height: 60px;
        line-height 60px;
        border: solid 1px #ddd;
        margin-top: -1px;
    }
    >li:hover {
        cursor: pointer;
    }
    >li.active {
        color: mainColor
        border-left: 2px solid mainColor;
        border-right: none;
    }
}
::-webkit-scrollbar {
    width: 10px;  /* remove scrollbar space */
    background: transparent;  /* optional: just make scrollbar invisible */
}
.body {
    float left;
    width: 960px - 180px - 50px;
    height: 100%
    margin-left 220px
    overflow-y: auto 
    .group-control {
        label {
            display: block;
            font-size: 16px;
            line-height: 40px;
            color: #666;
        }
        input {
            display: block;
            height: 40px;
            width: 300px;
            color: #666;
            padding-left: 10px;
            border: 1px solid bgLightColor1;
        }
        textarea {
            color: #666;
            padding: 5px 10px;
            line-height: 25px;
            width: 500px;
            border: 1px solid bgLightColor1;
        }
    }
    
    .group-control.routes,
    .group-control.nodes {
        padding: 4px 0;
        .no {
            display inline-block
            width 10px
            color #999;
        }
        .delete {
            margin-left 10px
            color #999
        }
        input {
            display inline;
        }
        input.name {
            width 110px;
        }
        input.host {
            width 160px;
            margin-left 10px
        }
        input.path {
            width 150px;
            margin-left 10px
        }
    }
    .group-control.nodes {
        input.host {
            width 250px;
        }
        input.check {
            margin-left 10px
            line-height 50px;
            width 15px 
            height 15px
        }
        label {
            display inline-block
            color #999
        }
    }
    .group-action {
        margin-top 20px;
        a {
            float right
            color mainColor
            margin-right rightSpaceSize
        }
    }
    h2 {
        color mainColor
    }
}
.action-bar {
    position: fixed;
    background bgLightColor2;
    bottom: 0;
    height: heightActionBar
    width: 100%;

    button {
        float right
        margin-right rightSpaceSize
        height 50px
        padding 0 20px
        font-weight 500
        font-size 16px
        color white
        background mainColor
        border none
        border-radius 4px
        margin-top 25px
        cursor pointer
    }
}
</style>

<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator'
import { Api, Service, Route, Node } from 'api'

@Component
export default class EditService extends Vue {
    @Prop() name: string
    currentTab = 'basic';
    service: Service = new Service()
    routes: Array<Route> = []
    nodes: Array<Node> = []

    deletedRoutes: Array<Route> = []
    deletedNodes: Array<Node> = []

    isActive(tab: string) {
        return this.currentTab == tab;
    }

    async mounted() {
        let serviceId = this.$route.params.id
        if (serviceId) {
            this.service = await Api.loadService(serviceId)
            this.routes  = await Api.getRoutes(serviceId)
            this.nodes = await Api.getNodes(serviceId)

            document.title = this.service.name + ' - HAProxy Router'
        } else {
            this.service = new Service()
            document.title = 'New Service - HAProxy Router'
        }
    }

    addRoute() {
        this.routes.push(new Route())
    }

    addNode() {
        this.nodes.push(new Node())
    }

    deleteRoute(route: Route) {
        let index = this.routes.findIndex(v => route === v) 
        this.routes.splice(index, 1)

        if (route.id) {
            this.deletedRoutes.push(route)
        }
    }

    deleteNode(node: Node) {
        let index = this.nodes.findIndex(v => node === v)
        this.nodes.splice(index, 1)

        if (node.id) {
            this.deletedNodes.push(node)
        }
    }

    async deleteService(service: Service) {
        if(!confirm('Are you sure to delete the service, this is irreversible')) {
            return;
        }

        await Api.deleteService(service.name)
        this.$router.replace('/')
    }

    async doSave () {
        try {
            let service = await Api.saveService(this.service)

            this.routes.forEach(async route => await Api.saveRoute(service.name, route))
            this.nodes.forEach(async node=> await Api.saveNode(service.name, node))

            this.deletedRoutes.forEach(async route => await Api.deleteRoute(service.name, route))
            this.deletedNodes.forEach(async node => await Api.deleteNode(service.name, node))

            this.$router.replace('/')
        } catch (e) {
            console.error(e)
        }
    }
}
</script>
