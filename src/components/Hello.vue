<!-- src/components/Hello.vue -->
<template>
    <div>
        <div v-for="service in services">
            {{service.id}} - {{service.name}}
        </div>
    </div>
</template>

<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator'
import { Service } from 'models'
import Api from 'api'

@Component
export default class App extends Vue {
    @Prop() name: string
    @Prop() initialEnthusiasm: number 

    services: Array<Service> = []

    mounted() {
        Api
            .getServices()
            .then(services => this.services = services)
       ;
    }
}
</script>

<style>
.greeting {
    font-size: 20px;
}
</style>
