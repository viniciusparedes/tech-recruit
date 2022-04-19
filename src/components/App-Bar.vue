<template>
        <v-app-bar app color="#311452" elevation=0 flat=true>
        <v-row>
          <v-col cols="1">
            <v-img
              :src="require('@/assets/logo.png')"
              width="60"
              class="center"
            />
          </v-col>

          <v-col cols="8" class="text-left text-white">
              TechRecruit
          </v-col>

          <v-col cols="3">

          </v-col>

        </v-row>
    </v-app-bar>
</template>

<script>
  export default {
    name: 'AppBar',

    data: () => ({

    }),
  }
</script>