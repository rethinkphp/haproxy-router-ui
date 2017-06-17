<template>
    <div>
        <div v-for="service in services">
            {{service.id}} - {{service.name}}
        </div>
    </div>
</template>

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

<style>
.greeting {
    font-size: 20px;
}
</style>
