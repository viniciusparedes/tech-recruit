<template>
  <v-app class="app-main" :style="{backgroundImage:
        'url(' + require('@/assets/estrelas.png') + '), ' +
        'url(' + require('@/assets/nebulosa_nova.png') + '), ' +
        'url(' + require('@/assets/bg.png') + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
        }">
    <AppBar/>
    <v-main>
      <RecruitMain/>
    </v-main>
  </v-app>
</template>

<script>
import RecruitMain from './components/Recruit-Main';
import AppBar from './components/App-Bar';

export default {
  name: 'App',
  components: {
    AppBar, RecruitMain
  },

  data: () => ({
    //
  }),
  created() {
    document.title = "Invillia Tech-Recruit"
    document.documentElement.style.overflow = 'hidden'
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700&display=swap');
.app-main{
    font-family: 'Roboto', sans-serif;
    background-color: #311452 !important;
    color: #DDD !important;
}
.text-white{
    color: #FFF;
}
</style>