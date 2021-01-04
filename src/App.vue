<template>
    <v-app>
        <v-main>
            <v-container fluid class="mt-10">
                <v-row justify="center" class="mb-4">
                    <div class="text-center">
                        <img class="d-inline-block" src="@/assets/letterbomb_icon.png" alt="LetterBomb Icon"/>
                        <h1>Letterbomb Web</h1>
                        <h3>Clientside version of Letterbomb which is statically hosted</h3>
                    </div>
                </v-row>
                <v-row justify="center" class="mb-4">
                    <v-col cols="10" md="4" sm="8">
                        <mac-input @change="macChange" @finished="macFinished"/>
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
                    <v-btn color="primary"
                           :disabled="!downloadReady"
                           elevation="2"
                           @click="downloadZip"
                           :loading="loading"
                           ref="downloadButton"
                    >
                        Download Zip
                    </v-btn>
                </v-row>
                <v-row justify="center" class="text-center mt-5" v-if="status">
                    {{status}}
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>

import MacInput from '@/components/MacInput';
import RegionInput from '@/components/RegionInput';
import populateTemplate from './populateTemplate';
import JSZip from 'jszip';
import FileSaver from 'file-saver';

export default {
    name: 'App',
    components: {RegionInput, MacInput},
    data: () => ({
        bundle: true,
        region: null,
        mac: null,
        macValid: false,
        status: null
    }),
    computed: {
        downloadReady()
        {
            return this.region !== null && this.macValid;
        },
        loading()
        {
            return this.status !== null;
        }
    },
    methods: {
        macChange({valid, value})
        {
            this.mac = value;
            this.macValid = valid;
        },
        macFinished()
        {
            this.$refs.downloadButton.$el.focus();
        },
        regionChange(value)
        {
            this.region = value;
        },
        async getTemplate()
        {
            return (await fetch(`template${this.region}.bin`)).arrayBuffer();
        },
        async getBundleZip()
        {
            return (await fetch('hackmii.zip')).blob();
        },
        async downloadZip()
        {
            this.status = 'Downloading template' + (this.bundle ? ' and HackMii bundle' : '');
            const promises = [this.getTemplate()];
            if(this.bundle)
            {
                promises.push(this.getBundleZip());
            }
            const [template, bundleZip] = await Promise.all(promises);
            this.status = 'Populating template';
            const {bytes, filePath} = populateTemplate(template, this.mac);

            this.status = 'Zipping letterbomb';
            const zip = new JSZip();
            zip.file(filePath, bytes, {binary: true});
            if(this.bundle)
            {
                this.status = 'Zipping bundle';
                await zip.loadAsync(bundleZip);
            }

            this.status = 'Generating blob';
            const blob = await zip.generateAsync({type: 'blob'});
            this.status = 'Saving zip';
            FileSaver.saveAs(blob, 'LetterBomb.zip');
            this.status = null;
        }
    }
};
</script>

<style>
html { overflow-y: auto !important; }
</style>
