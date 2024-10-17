
import { useNuxtApp } from '#app';
import { useLoadingStore } from "~/store/loadingStore";
import type { Pinia } from 'pinia';


type ActionWithStore = (store: ReturnType<typeof useLoadingStore>) => void;


const withProgressBar = async (action: () => Promise<void>) => {
    const nuxtApp = useNuxtApp();
    const pinia = nuxtApp.vueApp.config.globalProperties.$pinia as Pinia | undefined;


    runWithPinia(pinia, (store) => {
        console.log("Loading started");
        store.startLoading();
    });

    await action();

    runWithPinia(pinia, (store) => {
        console.log("Loading stopped");
        store.stopLoading();
    });
};


function runWithPinia(pinia: Pinia | undefined, action: ActionWithStore) {
    if (pinia) {
        const store = useLoadingStore(pinia);
        action(store);
        console.log(store.isLoading);
    } else {
        console.error("Pinia is not available");
    }
}

export default withProgressBar;
