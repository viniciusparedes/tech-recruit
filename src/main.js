import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

Vue.prototype.$niveis_profissionais = [
    'Iniciante',
    'Junior',
    'Pleno',
    'Senior',
    'Especialista'
]
Vue.prototype.$niveis = [
    'Não possui conhecimento',
    'Básico',
    'Intermediário',
    'Avançado',
    'Especialista'
]

new Vue({
    vuetify,
    render: h => h(App)
}).$mount('#app')
