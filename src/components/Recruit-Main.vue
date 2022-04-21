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
              <v-row>
                <v-col>
              <v-expansion-panels class="ma-md-3">
                <v-expansion-panel v-for="subject in template.subjects" :key="subject.name">
                  <v-expansion-panel-header>{{ subject.name }}</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-row class="ma-2" align="stretch">
                      <v-col md="2" class="pa-3 pb-12 d-flex flex-column subject-card" v-for="item in subject.items" :key="item.name">
                        <h3 class="text-center">{{ item.name }}</h3>
                        <hr>
                        <p class="mt-2">
                          <v-chip class="ma-1" outlined v-for="example in item.examples" :key="example">{{ example }}</v-chip>
                        </p>
                        <div class="text-center subject-rating pr-6">
                          <v-rating half-increments hover dense color="warning" length="5" value="0"></v-rating>
                        </div>
                      </v-col>
                    </v-row>
                    <v-row class="ma-2">
                      <v-col md="2">
                        <v-tooltip right><template v-slot:activator="{on, attrs}">
                          <v-btn v-bind="attrs" v-on="on" color="#B3E5FC" block small>Especialista</v-btn>
                        </template><span>Domina totalmente a base teórica, já utilizou intensamente na prática em projtos de dificuldade muito alta e consegue transmitir o conhecimento.</span></v-tooltip>
                        <v-tooltip right><template v-slot:activator="{on, attrs}">
                          <v-btn v-bind="attrs" v-on="on" color="#DCEDC8" block small>Avançado</v-btn>
                        </template><span>Possui uma sólida base teórica e já utilizou em diversas situações práticas em projetos de dificuldade intermediária/alta.</span></v-tooltip>
                        <v-tooltip right><template v-slot:activator="{on, attrs}">
                          <v-btn v-bind="attrs" v-on="on" color="#FFECB3" block small>Intermediário</v-btn>
                        </template><span>Possui uma boa base teórica e também já teve boas experiências práticas em projetos de dificuldade baixa/intermediária.</span></v-tooltip>
                        <v-tooltip right><template v-slot:activator="{on, attrs}">
                          <v-btn v-bind="attrs" v-on="on" color="#FFCDD2" block small>Básico</v-btn>
                        </template><span>Já estudou, mas tem pouca experiência prática (POC).</span></v-tooltip>
                        <v-tooltip right><template v-slot:activator="{on, attrs}">
                          <v-btn v-bind="attrs" v-on="on" color="#EF9A9A" block small>Não Possui Conhecimento</v-btn>
                        </template><span>Não possui conhecimento</span></v-tooltip>
                        <v-tooltip right><template v-slot:activator="{on, attrs}">
                          <v-btn v-bind="attrs" v-on="on" depressed block small>Sem Avaliação</v-btn>
                        </template><span>Não foi possível concluir esta habilidade técnica com o candidato</span></v-tooltip>
                      </v-col>
                      <v-col md="10">
                        <v-textarea
                          outlined
                          label="Justificativa"
                          value=""
                        ></v-textarea>
                      </v-col>
                    </v-row>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
                </v-col>
              </v-row>
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
  overflow-y: auto;
}
.default-bg{
  background-color: rgba(0, 0, 0, 0) !important;
  color: #EEE;
}
.subject-card{
  margin: 5px;
  border: 1px solid rebeccapurple;
  border-radius: 6px;
  position: relative;
}
.subject-rating{
  position: absolute;
  bottom: 10px;
  width: inherit;
  text-align: center;
}
</style>
