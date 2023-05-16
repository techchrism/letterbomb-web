import {Component, createEffect, createMemo, createSignal, createUniqueId, For, Show, Signal} from 'solid-js'
import ouiList from '../assets/oui-list.json'

export type MacInputProps = {
    onMacChange: (mac: string, valid: boolean) => void
}

const MacInput: Component<MacInputProps> = (props) => {
    const inputIDs: HTMLInputElement[] = []
    const inputValues: Signal<string>[] = []
    for(let i = 0; i < 6; i++) {
        inputValues.push(createSignal(''))
    }
    const firstInputID = createUniqueId()

    const error = createMemo(() => {
        const oui = inputValues.slice(0, 3).map(v => v[0]()).join('').toUpperCase()
        return (oui.length !== 6 || ouiList.includes(oui)) ? '' : 'Invalid MAC address'
    })

    const isValid = createMemo(() => {
        return error() === '' && inputValues.every(v => v[0]().length === 2)
    })

    createEffect(() => {
        const mac = inputValues.map(v => v[0]()).join(':').toUpperCase()
        props.onMacChange(mac, isValid())
    })

    const keyup = (event: KeyboardEvent, index: number) => {
        if((event.target as HTMLInputElement).value.length === 2 && index !== 5) {
            inputIDs[index + 1].focus()
        }
    }

    const keydown = (event: KeyboardEvent) => {
        if(event.key.match(/[0-9a-fA-F]/) === null) event.preventDefault()
    }

    return (
        <>
            <div class="text-2xl">
                <label class="block text-xl font-semibold mb-1" for={firstInputID}>Wii MAC Add&#8204;ress</label>
                <For each={[0,1,2,3,4,5]}>
                    {(i) => (
                        <>
                            <input type="text"
                                   id={i === 0 ? firstInputID : undefined}
                                   class="input input-bordered shadow-md w-10 h-10 px-2 text-center text-accent-content bg-base-200"
                                   maxlength="2"
                                   autocomplete="off"
                                   ref={(el) => inputIDs[i] = el}
                                   onKeyUp={(event) => keyup(event, i)}
                                   onKeyDown={keydown}
                                   onInput={(event) => inputValues[i][1](event.target.value)}
                            />
                            {i !== 5 && <span class="text-2xl mx-1">-</span>}
                        </>
                    )}
                </For>

                <Show when={error()}>
                    <div class="alert alert-error shadow-lg w-fit mx-auto mt-4">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span>{error()}</span>
                        </div>
                    </div>
                </Show>
            </div>
        </>
    )
}

export default MacInput