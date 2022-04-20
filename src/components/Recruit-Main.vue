<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card class="default-bg">
          <v-tabs
              background-color="purple darken-3"
              fixed-tabs
              dark
              v-model="tab"
          >
            <v-tab v-for="template in templates" :key="build_slug(template)" :href="'#'+build_slug(template)">
              {{ template.name }}
            </v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab" class="default-bg">
            <v-tab-item v-for="template in templates" :key="build_slug(template)" :id="build_slug(template)" class="template-content">
              <p class="ma-md-4" v-if="template.text">
                {{ template.text }}
              </p>

              <v-expansion-panels class="ma-md-3">
                <v-expansion-panel v-for="subject in template.subjects" :key="subject.name">
                  <v-expansion-panel-header>{{ subject.name }}</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <ul>
                      <li v-for="item in subject.items" :key="item">{{ item }}</li>
                    </ul>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>

            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import templates from '@/assets/data/templates.json'

export default {
  name: 'RecruitMain',

  data: () => ({
    tab: null,
    templates: templates,
    template_active: null
  }),
  methods: {
    build_slug(template){
      return template.name
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, '')
          .replace(/[\s_-]+/g, '-')
          .replace(/^-+|-+$/g, '')
    }
  }
}
</script>

<style scoped>
.template-content{
  background-color: rgba(255, 255, 255, .3) !important;
  height: calc(100vh - 140px);
}
.default-bg{
  background-color: rgba(0, 0, 0, 0) !important;
  color: #EEE;
}
</style>
