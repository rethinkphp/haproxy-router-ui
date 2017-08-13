<template>
<div>
    <div class="main-inner">
        <div class="page-title">
            <span v-if="domain.id">{{domain.name}}</span>
             <a v-if="domain.id" href="javascript:void(0)" @click="deleteDomain(domain)" title="Remove the domain">x</a> 
        </div>
        <div class="page-content clearfix">
            <div class="body">
                <div>
                    <h2>Basic</h2>
                    <section class="group-control">
                        <label for="description">Description</label>
                        <textarea 
                            name="description" 
                            v-model="domain.description"
                            placeholder="The description of the domain">
                        </textarea>
                    </section>
                    <section class="group-control">
                        <label for="tls_only">
                            <input 
                                id="tls_only" 
                                type="checkbox" 
                                v-model="domain.tls_only"
                            >
                            <span>HTTPS Only - All http requests will be redirected to https</span>
                        </label>
                    </section>
                </div>
                <div>
                    <h2>HTTPS</h2>
                    <section class="group-control tls">
                        <label for="tls_provider">TLS Certificate Provider:</label>
                        <label class="provider" for="tls_provider_acme">
                            <input 
                                id="tls_provider_acme" 
                                type="radio" 
                                class="provider"
                                value="acme"
                                v-model="domain.tls_provider"
                            >
                            <span>Automated - The certificate will be fetch from Let's Encrypt automatically</span>
                        </label>
                        <label class="provider" for="tls_provider_manual">
                            <input 
                                id="tls_provider_manual" 
                                type="radio" 
                                class="provider"
                                value="manual"
                                v-model="domain.tls_provider"
                            >
                            <span>Manually - It's up to you to upload the certificate</span>
                        </label>
                    </section>
                    <section class="group-control" v-if="domain.tls_provider == 'manual'">
                        <label for="tls_provider">Upload Certificate</label>
                        <textarea 
                            name="certificate2" 
                            v-model="domain.certificate2"
                            placeholder="The manual of the domain">
                        </textarea>
                    </section>
                </div>
                <div style="height: 50px;"></div>
            </div>
        </div>
    </div>
    <div class="action-bar">
        <div class="main-inner">
            <button @click="doSave()">
                <span>Update Domain</span>
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

.body {
    float left
    width: 960px
    height: 100%
    // margin-left 220px
    overflow-y: auto 
    .group-control {
        label {
            display: block;
            font-size: 16px;
            line-height: 40px;
            color: #666;
        }
        input[type=text] {
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
    
    .group-control.tls {
        label.provider {
            margin-left 20px
        }
        input.provider {
            display inline
            width auto
            height auto
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
import { Api, Domain, Route, Node } from 'api'

@Component
export default class EditService extends Vue {
    @Prop() name: string
    domain: Domain = new Domain()

    async mounted() {
        let domainId = this.$route.params.id
        this.domain = await Api.loadDomain(domainId)

        document.title = this.domain.name + ' - HAProxy Router'
    }

    async deleteDomain(domain: Domain) {
        if(!confirm('Are you sure to delete the domain, this is irreversible')) {
            return;
        }

        await Api.deleteDomain(domain.id)
        this.$router.replace('/domains')
    }

    async doSave () {
        try {
            await Api.saveDomain(this.domain)

            this.$router.replace('/domains')
        } catch (e) {
            console.error(e)
        }
    }
}
</script>
