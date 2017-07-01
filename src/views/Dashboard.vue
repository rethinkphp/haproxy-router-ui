<template>
    <div class="main-inner">
        <div class="page-title">
            <span>All Services ({{services.length}})</span>
            <router-link :to="{name: 'service.new'}">New Service</router-link>
        </div>
        <div class="page-content">
            <div v-for="service in services" class="content-row">
                <div class="info">
                    <router-link :to="{name: 'service.view', params: {id: service.name}}" class="name">{{service.name}}</router-link>
                    <span class="desc">API services for all other systems</span>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="stylus">
@require "../styles/variables.styl"

.page-title {
    font-size: 20px;
    color: fontColor2;
    padding: 10px 0;
    margin-top: 20px;
    border-bottom: solid 1px bgLightColor1;

    a {
        float: right;
        background-color: mainColor;
        color: white;
        font-size: 16px;
        padding: 3px 10px;
        border-radius: 5px; 
    }
}

.page-content {
    margin-top: 30px;
}

.content-row {
    height: 75px;
    background: bgLightColor3;
    margin-top: 20px;
    padding: 5px 20px;
    .info {
        .name {
            display: inline-block;
            width: 150px;
            color: fontColor1;
            font-size: 16px;
        }
        .desc {
            color: fontColor3;
        }
    }
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Api, Service } from 'api'

@Component
export default class Dashboard extends Vue {
    @Prop() name: string
    @Prop() initialEnthusiasm: number 

    services: Array<Service> = []

    async mounted() {
        this.services = await Api.getServices()
    }
}
</script>