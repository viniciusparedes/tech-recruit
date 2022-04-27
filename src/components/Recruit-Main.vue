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
            <v-tab-item v-for="(template, t) in templates" :key="build_slug(template)" :id="build_slug(template)" class="template-content">
              <p class="ma-md-4" v-if="template.text">
                {{ template.text }}
              </p>
              <v-row>
                <v-col>
              <v-expansion-panels class="ma-md-3">
                <v-expansion-panel v-for="(subject, s) in template.subjects" :key="subject.name">
                  <v-expansion-panel-header>{{ subject.name }}</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-row class="ma-2" align="stretch">
                      <v-col md="2" class="pa-3 pb-12 d-flex flex-column subject-card" v-for="(item, i) in subject.items" :key="item.name">
                        <h3 class="text-center">{{ item.name }}</h3>
                        <hr>
                        <p class="mt-2">
                          <v-chip class="ma-1" outlined v-for="example in item.examples" :key="example">{{ example }}</v-chip>
                        </p>
                        <div class="text-center subject-rating pr-6">
                          <v-rating half-increments hover dense color="warning" length="5" v-model="templates[t].subjects[s].items[i].stars"></v-rating>
                        </div>
                      </v-col>
                    </v-row>
                    <v-row class="ma-2">
                      <v-col md="2">
                        <v-btn-toggle v-model="templates[t].subjects[s].score" style="flex-direction: column;">
                          <v-tooltip right><template v-slot:activator="{on, attrs}">
                            <v-btn v-bind="attrs" v-on="on" block small value="5">Especialista</v-btn>
                          </template><span>Domina totalmente a base teórica, já utilizou intensamente na prática em projtos de dificuldade muito alta e consegue transmitir o conhecimento.</span></v-tooltip>
                          <v-tooltip right><template v-slot:activator="{on, attrs}">
                            <v-btn v-bind="attrs" v-on="on" block small value="4">Avançado</v-btn>
                          </template><span>Possui uma sólida base teórica e já utilizou em diversas situações práticas em projetos de dificuldade intermediária/alta.</span></v-tooltip>
                          <v-tooltip right><template v-slot:activator="{on, attrs}">
                            <v-btn v-bind="attrs" v-on="on" block small value="3">Intermediário</v-btn>
                          </template><span>Possui uma boa base teórica e também já teve boas experiências práticas em projetos de dificuldade baixa/intermediária.</span></v-tooltip>
                          <v-tooltip right><template v-slot:activator="{on, attrs}">
                            <v-btn v-bind="attrs" v-on="on" block small value="2">Básico</v-btn>
                          </template><span>Já estudou, mas tem pouca experiência prática (POC).</span></v-tooltip>
                          <v-tooltip right><template v-slot:activator="{on, attrs}">
                            <v-btn v-bind="attrs" v-on="on" block small value="1">Não Possui Conhecimento</v-btn>
                          </template><span>Não possui conhecimento</span></v-tooltip>
                          <v-tooltip right><template v-slot:activator="{on, attrs}">
                            <v-btn v-bind="attrs" v-on="on" depressed block small value="0">Sem Avaliação</v-btn>
                          </template><span>Não foi possível concluir esta habilidade técnica com o candidato</span></v-tooltip>
                        </v-btn-toggle>
                      </v-col>
                      <v-col md="10">
<!--                          :style="{display: templates[t].subjects[s].score !== null ? 'none' : 'inline'}"-->
                        <v-textarea outlined label="Justificativa"
                          v-model="templates[t].subjects[s].justify"
                        ></v-textarea>
                      </v-col>
                    </v-row>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="text-center">
                  <ExportDialog v-bind:template="template" />
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
import templates from '@/assets/data/templates.json';
import ExportDialog from './Export-Dialog';

export default {
  name: 'RecruitMain',
  components: {ExportDialog},

  data: () => ({
    tab: null,
    templates: templates,
    template_active: null,
  }),
  created() {
    templates.forEach((template, t)=>{
      this.templates[t]["slug"] = this.build_slug(template)
      templates[t].subjects.forEach((subject, s)=>{
        this.templates[t].subjects[s]["score"] = null
        this.templates[t].subjects[s]["justify"] = null
        templates[t].subjects[t].items.forEach((item, i)=>{
          this.templates[t].subjects[s].items[i]["stars"] = 0
        })
      })
    })
  },
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
  overflow-x: hidden;
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
