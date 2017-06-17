<!-- src/components/Hello.vue -->
<template>
    <div>
        <div class="greeting">Hello {{name}}{{exclamationMarks}}</div>
        <button @click="decrement">-</button>
        <button @click="increment">+</button>
    </div>
</template>

<script lang="ts">

import { Component, Inject, Model, Prop, Vue, Watch } from 'vue-property-decorator'

@Component
export default class App extends Vue {
    @Prop() name: string
    @Prop() initialEnthusiasm: number 

    enthusiasmm = this.initialEnthusiasm

    ready() {
        console.log(this.initialEnthusiasm)
    }

    increment() { 
        this.enthusiasmm++; 
    }

    decrement() {
        if (this.enthusiasmm > 1) {
            this.enthusiasmm--;
        }
    }
    
    get exclamationMarks(): string {
        return Array(this.enthusiasmm + 1).join('!');
    }
}
</script>

<style>
.greeting {
    font-size: 20px;
}
</style>
