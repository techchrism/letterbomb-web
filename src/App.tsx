import type {Component} from 'solid-js';
import letterbombIcon from './assets/letterbomb_icon.png'
import MacInput from './components/MacInput'

const App: Component = () => {
    const onMacInput = (mac: string, valid: boolean) => {
        console.log(mac, valid)
    }

    return (
        <>
            <main class="flex flex-col mt-4 space-y-5 text-center">
                <div>
                    <img class="inline object-contain flex-shrink" src={letterbombIcon} alt="letterbomb icon"/>

                    <h1 class="text-4xl font-semibold">Letterbomb Web</h1>
                    <h2 class="text-2xl">Clientside version of Letterbomb which is statically hosted</h2>
                </div>
                <div>
                    <MacInput onMacChange={onMacInput}/>
                </div>
            </main>
        </>
    );
};

export default App;
