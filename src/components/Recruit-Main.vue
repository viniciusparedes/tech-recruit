<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-card>
            <v-tabs
              v-model="template_active"
              background-color="purple darken-3"
              fixed-tabs
              dark
            >
              <v-tab v-for="template in templates" :key="template.name">{{ template.name }}</v-tab>
            </v-tabs>
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
        templates: templates,
        template_active: null,
        templates_slugs: [...new Set(templates.map(template => template.name.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '')))],
    }),
  }
</script>
