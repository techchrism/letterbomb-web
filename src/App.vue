<template>
    <v-app>
        <v-main>
            <v-container fluid class="mt-10">
                <v-row justify="center" class="mb-5">
                    <h1>Letterbomb Web</h1>
                </v-row>
                <v-row justify="center">
                    <v-col cols="10" md="4" sm="8">
                        <mac-input/>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>

import MacInput from '@/components/MacInput';
export default {
    name: 'App',
    components: {MacInput},
    data: () => ({
        //
    })
};
</script>

<style>
html { overflow-y: auto !important; }
</style>
