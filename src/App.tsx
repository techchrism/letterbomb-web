import type {Component} from 'solid-js';
import letterbombIcon from './assets/letterbomb_icon.png'
import MacInput from './components/MacInput'
import RegionInput, {WiiRegion} from './components/RegionInput'
import {createMemo, createSignal} from 'solid-js'
import populateTemplate from './populateTemplate'
import JSZip from 'jszip'
import FileSaver from 'file-saver'

const App: Component = () => {
    const [bundle, setBundle] = createSignal(true)
    const [mac, setMac] = createSignal('')
    const [macValid, setMacValid] = createSignal(false)
    const [region, setRegion] = createSignal<WiiRegion | undefined>()
    const [loading, setLoading] = createSignal(false)

    const onMacInput = (mac: string, valid: boolean) => {
        setMac(mac)
        setMacValid(valid)
    }

    const valid = createMemo(() => {
        return macValid() && region() !== undefined
    })

    const download = async () => {
        setLoading(true)
        const template = await (await fetch(`template${region()}.bin`)).arrayBuffer()
        const {bytes, filePath} = populateTemplate(template, mac())
        const zip = new JSZip()
        zip.file(filePath, bytes, {binary: true})
        if(bundle()) {
            const bundleBloc = await (await fetch('hackmii.zip')).blob()
            await zip.loadAsync(bundleBloc)
        }
        const blob = await zip.generateAsync({type: 'blob'})
        setLoading(false)
        FileSaver.saveAs(blob, 'LetterBomb.zip')
    }

    return (
        <>
            <main class="flex flex-col mt-4 space-y-5 text-center items-center">
                <div>
                    <img class="inline object-contain flex-shrink" src={letterbombIcon} alt="letterbomb icon"/>

                    <h1 class="text-4xl font-semibold">Letterbomb Web</h1>
                    <h2 class="text-2xl">Clientside version of Letterbomb which is statically hosted</h2>
                </div>

                <MacInput onMacChange={onMacInput}/>

                <RegionInput onRegionChange={setRegion}/>

                <div>
                    <label class="cursor-pointer label">
                        <input type="checkbox" class="checkbox mr-2" checked onClick={(e) => setBundle((e.target as HTMLInputElement).checked)}/>
                        Bundle HackMii Installer
                    </label>
                </div>

                <button class="btn btn-success shadow-md" classList={{'btn-disabled': !valid(), 'loading': loading()}} onClick={download}>Download Zip</button>
            </main>
        </>
    );
};

export default App;
