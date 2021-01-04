<template>
    <div>
        <h4 class="text-center">Wii Mac Address</h4>
        <span v-for="i in 6">
            <v-text-field
                class="macsegment"
                outlined single-line
                dense
                @keydown="keydown($event)"
                @keyup="keyup($event, i - 1)"
                maxlength="2"
                size="2"
                v-model="mac[i - 1].value"
                ref="fields"
                @change="change"
                hide-details
            />
            <span v-if="i !== 6"> - </span>
        </span>
        <v-alert v-if="error" type="error" class="mt-4">{{error}}</v-alert>
    </div>
</template>

<script>
import ouiList from '@/assets/oui-list.json';

export default {
    name: 'MacInput',
    data: () => ({
        mac: [
            {value: ''},
            {value: ''},
            {value: ''},
            {value: ''},
            {value: ''},
            {value: ''}
        ],
        error: ''
    }),
    computed: {
        macString()
        {
            return this.mac.map(element => element.value).join('').toUpperCase();
        },
        valid()
        {
            return !this.error && this.macString.length === 12;
        }
    },
    methods: {
        keydown(event)
        {
            if(event.key.match(/[0-9a-fA-F]/) === null)
            {
                event.preventDefault();
            }
        },
        keyup(event, i)
        {
            if(this.mac[i].value.length === 2)
            {
                if(i === 5)
                {
                    this.$refs.fields[i].$refs.input.blur();
                    requestAnimationFrame(() =>
                    {
                        this.$emit('finished')
                    });
                }
                else
                {
                    this.$refs.fields[i + 1].$refs.input.focus();
                    this.mac[i + 1].value = '';
                }
            }
        },
        change()
        {
            const oui = this.mac.slice(0, 3).map(v => v.value).join('').toUpperCase();
            if(oui.length === 6 && ouiList.indexOf(oui) === -1)
            {
                this.error = 'Invalid MAC address';
            }
            else
            {
                this.error = '';
            }
            this.$emit('change', {valid: this.valid, value: this.macString});
        }
    },
    mounted()
    {
        this.$refs.fields[0].$refs.input.focus();
    }
}
</script>

<style scoped>
.macsegment
{
    display: inline-block;
}

.macsegment >>> input
{
    text-align: center;
    text-transform: uppercase;
}
</style>
