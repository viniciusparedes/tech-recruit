import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        iconfont: 'mdiSvg',
    },
    theme: {
        themes: {
            light: {
                primary: '#673ab7',
                secondary: '#03a9f4',
                accent: '#607d8b',
                error: '#f44336',
                warning: '#ffc107',
                info: '#009688',
                success: '#4caf50'
            }
        }
    }
});
