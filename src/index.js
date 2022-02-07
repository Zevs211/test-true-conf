import Vue from "vue";
import VueRouter from 'vue-router';
import App from "./App.vue";

Vue.use(VueRouter);

const router = new VueRouter({ 
    mode: "history",
    routes:[
        {path: '/:color', component: App }
    ]
});

var vm = new Vue({
    el:"#app",
    template: '<App/>',
    router,
    components: { App }
});