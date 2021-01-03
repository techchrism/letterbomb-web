<template>
    <v-app>
        <v-main>
            <v-container fluid class="mt-10">
                <v-row justify="center" class="mb-2">
                    <h1>Letterbomb Web</h1>
                </v-row>
                <v-row justify="center" class="mb-5">
                    <h3>Clientside version of Letterbomb that is statically hosted</h3>
                </v-row>
                <v-row justify="center" class="mb-4">
                    <v-col cols="10" md="4" sm="8">
                        <mac-input @change="macChange"/>
                    </v-col>
                </v-row>
                <v-row justify="center" class="mb-2">
                    <v-col cols="10" md="4" sm="8">
                        <region-input @change="regionChange"/>
                    </v-col>
                </v-row>
                <v-row justify="center" class="mb-4">
                    <v-checkbox label="Bundle HackMii Installer" v-model="bundle"/>
                </v-row>
                <v-row justify="center">
                    <v-btn color="primary" :disabled="!downloadReady" elevation="2">Download Zip</v-btn>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>

import MacInput from '@/components/MacInput';
import RegionInput from '@/components/RegionInput';
export default {
    name: 'App',
    components: {RegionInput, MacInput},
    data: () => ({
        bundle: true,
        region: null,
        mac: null,
        macValid: false
    }),
    computed: {
        downloadReady()
        {
            return this.region !== null && this.macValid;
        }
    },
    methods: {
        macChange({valid, value})
        {
            this.mac = value;
            this.macValid = valid;
        },
        regionChange(value)
        {
            this.region = value;
        },
        downloadZip()
        {

        }
    }
};
</script>

<style>
html { overflow-y: auto !important; }
</style>
