<template>
    <div class="main-inner">
        <div class="page-title">
            <span>All Domains ({{domains.length}})</span>
            <router-link :to="{name: 'domain.new'}">New Domain</router-link>
        </div>
        <div class="page-content">
            <div v-for="domain in domains" class="content-row">
                <div class="info">
                    <router-link :to="{name: 'domain.edit', params: {id: domain.id}}" class="name">{{domain.name}}</router-link>
                    <span class="desc">{{domain.description || 'No description for this domain'}}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="stylus" scoped>
@require "../styles/variables"

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
            width: 200px;
            color: mainColor;
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

    domains: Array<Service> = []

    async mounted() {
        document.title = 'Domains - HAProxy Router'
        this.domains = await Api.getDomains()
    }
}
</script>