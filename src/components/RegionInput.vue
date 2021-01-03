<template>
    <div>
        <h4 class="text-center">Wii Region</h4>
        <v-radio-group row
                       class="center-radio-group mt-0"
                       v-model="region"
        >
            <v-radio v-for="regionCode of ['U', 'E', 'J', 'K']"
                     :label="'4.3' + regionCode"
                     :value="regionCode"
            />
        </v-radio-group>
    </div>

</template>

<script>
export default {
    name: 'RegionInput',
    data: () => ({
        region: null
    }),
    mounted()
    {
        const offset = (new Date()).getTimezoneOffset() / 60;
        if(offset >= -5 && offset <= 1)
        {
            this.region = 'E'
        }
        else if(offset >= 4 && offset <= 11)
        {
            this.region = 'U';
        }
    },
    watch: {
        region()
        {
            this.$emit('change', this.region);
        }
    }
};
</script>

<style scoped>
.center-radio-group >>> .v-input--radio-group__input
{
    justify-content: center;
}
</style>
