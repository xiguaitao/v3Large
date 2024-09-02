import { defineStore } from 'pinia';

export const useCounterStore = defineStore({
    id: 'counter',
    state: () => ({
        loadPage: false,
        routerName:"",
    }),
    actions: {
        setLoadPage(state: boolean = true) {
            // console.log("loadPageOpen");
            this.loadPage = state;
        },
        setRouterName(state: string ) {
            // console.log("loadPageOpen");
            this.routerName = state;
        },
    }
});


