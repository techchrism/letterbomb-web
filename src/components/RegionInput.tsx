import {Component, createEffect, createSignal, For} from 'solid-js'

export type WiiRegion = 'U' | 'E' | 'J' | 'K'

export type RegionInputProps = {
    onRegionChange?: (region: WiiRegion) => void
}

const RegionInput: Component<RegionInputProps> = (props) => {
    const regions: WiiRegion[] = ['U', 'E', 'J', 'K']
    const offset = (new Date()).getTimezoneOffset() / 60
    let defaultRegion: WiiRegion | undefined = undefined
    if(offset >= -5 && offset <= 1) {
        defaultRegion = 'E'
    } else if(offset >= 4 && offset <= 11) {
        defaultRegion = 'U'
    }
    const [selectedRegion, setSelectedRegion] = createSignal<WiiRegion | undefined>(defaultRegion)

    createEffect(() => {
        if(props.onRegionChange) props.onRegionChange(selectedRegion())
    })

    return (
        <>
            <div class="w-fit">
                <label class="block text-xl font-semibold mb-1">Wii Region</label>
                <div class="flex flex-row mx-auto space-x-5">
                    <For each={regions}>
                        {(region) => (
                            <>
                                <div class="flex items-center">
                                    <input type="radio" name="region" id={`region-${region}`} class="radio mr-2" checked={selectedRegion() === region} onClick={() => setSelectedRegion(region)}/>
                                    <label for={`region-${region}`} class="">4.3{region}</label>
                                </div>
                            </>
                        )}
                    </For>
                </div>
            </div>
        </>
    )
}

export default RegionInput