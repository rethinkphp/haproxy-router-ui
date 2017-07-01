<template>
<div>
    <div class="main-inner">
        <div class="page-title">
            <span v-if="service.id">{{service.name}}</span>
            <span v-else>New Service</span>
            <span v-if="!service.id && service.name"> - {{service.name}}</span>
        </div>
        <div class="page-content clearfix">
            <ul class="sidenav">
                <li v-bind:class="{active: isActive('basic')}"
                    @click="currentTab='basic'"
                >
                    Basic
                </li>
                <li v-bind:class="{active: isActive('nodes')}"
                    @click="currentTab='nodes'"
                >
                    Nodes
                </li>
                <li v-bind:class="{active: isActive('routes')}"
                    @click="currentTab='routes'"
                >
                    Routes
                </li>
            </ul>
            <div class="body" v-if="currentTab == 'basic'">
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
        </div>
    </div>
    <div class="action-bar">
        <div class="main-inner">
            <button @click="doCreate()">
                <span v-if="!service.id">Create Service</span>
                <span v-else>Update Service</span>
            </button>
        </div>
    </div>
</div>
</template>
<style lang="stylus">
@require "../styles/variables"
.sidenav {
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
.body {
    width: 960px - 180px - 50px;
    float right;

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
}
.action-bar {
    position: absolute;
    background bgLightColor2;
    bottom: 0;
    height: 100px;
    width: 100%;

    button {
        float right
        margin-right 200px
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
import { Api, Service } from 'api'

@Component
export default class EditService extends Vue {
    @Prop() name: string
    currentTab = 'basic';
    service: Service = new Service()

    isActive(tab: string) {
        return this.currentTab == tab;
    }

    async mounted() {
        let serviceId = this.$route.params.id
        if (serviceId) {
            this.service = await Api.loadService(serviceId)
        } else {
            this.service = new Service()
        }
    }

    async doCreate () {
        try {
            await Api.saveService(this.service)
            this.$router.replace('/')
        } catch (e) {
            console.error(e)
        }
    }
}
</script>
