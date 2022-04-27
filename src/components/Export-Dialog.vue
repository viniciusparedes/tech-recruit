<template>
  <v-dialog
    v-model="dialog"
    width="80%"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn x-large color="primary" dark v-bind="attrs" v-on="on">Concluir</v-btn>
    </template>
    <v-card class="dialog-content">
      <v-btn class="mx-2 close-btn" icon fab small @click="dialog=false">
        <v-icon dark>mdi-close</v-icon>
      </v-btn>
      <v-card-title>
        <span class="text-h5">Concluir Avaliação</span>
      </v-card-title>
      <v-card-text>

        <v-tabs fixed-tabs v-model="tab">
          <v-tab :href="'#dados_do_candidato'">Candidato</v-tab>
          <v-tab :href="'#habilidades_especificas'">Habilidades Específicas</v-tab>
          <v-tab :href="'#observacoes'">Observações</v-tab>
          <v-tab :href="'#avaliacao'">Avaliação</v-tab>
          <v-tab :href="'#recomendacoes_para_o_candidato'">Recomendações</v-tab>
          <v-tab :href="'#dados_do_avaliador'">Avaliador</v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item class="tab-content" id="dados_do_candidato">
            <h3>Dados do Candidato:</h3>
            <v-row>
              <v-col cols="5">
                <v-text-field v-model="dados_do_candidato.nome_do_candidato" label="Nome do Candidato" outlined></v-text-field>
              </v-col>
              <v-col cols="2">
                <v-select
                  v-model="dados_do_candidato.ultima_posicao"
                  :items="this.$niveis_profissionais"
                  label="Última Posição"
                  outlined
                ></v-select>
              </v-col>
              <v-col cols="2">
                <v-select
                  v-model="dados_do_candidato.posicao_almejada"
                  :items="this.$niveis_profissionais"
                  label="Posição Almejada"
                  outlined
                ></v-select>
              </v-col>
              <v-col cols="3">
                <v-text-field v-model="dados_do_candidato.tecnologia" label="Tecnologia" outlined></v-text-field>
              </v-col>
            </v-row>
          </v-tab-item>


          <v-tab-item class="tab-content" id="habilidades_especificas">
            <h3>Habilidades Específicas:</h3>
            <v-simple-table v-show="habilidades_especificas.length > 0" dense class="table-bordered">
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">Descrição</th>
                    <th class="text-left">Nota</th>
                    <th class="text-left">Justificativa</th>
                    <th style="width:5%"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(habilidade, i) in habilidades_especificas" :key="habilidade.descricao">
                    <td>{{ habilidade.descricao }}</td>
                    <td>{{ habilidade.nota }}</td>
                    <td>{{ habilidade.justificativa }}</td>
                    <td><a @click="del_habilidade(i)"><v-icon>mdi-delete</v-icon></a></td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
            <v-row v-show="!habilidades_especificas_form.show">
              <v-col class="text-center">
                <v-btn @click="habilidades_especificas_form.show = true">
                  <v-icon dark>mdi-plus</v-icon>
                  Adicionar
                </v-btn>
              </v-col>
            </v-row>
            <v-row v-show="habilidades_especificas_form.show">
              <v-col cols="4">
                <v-text-field v-model="habilidades_especificas_form.descricao" label="Descrição" outlined></v-text-field>
              </v-col>
              <v-col cols="2">
                <v-select
                  v-model="habilidades_especificas_form.nota"
                  :items="this.$niveis"
                  label="Nota"
                  outlined
                ></v-select>
              </v-col>
              <v-col cols="6">
                <v-text-field v-model="habilidades_especificas_form.justificativa" label="Justificativa" outlined></v-text-field>
              </v-col>
              <v-col class="text-right">
                <v-btn @click="habilidades_especificas_form.show = false">Cancelar</v-btn>
                <v-btn color="success" @click="add_habilidade()" class="ml-2">Salvar</v-btn>
              </v-col>
            </v-row>
          </v-tab-item>


          <v-tab-item class="tab-content" id="observacoes">
            <h3>Observações:</h3>
            <v-row>
              <v-col>
                <v-textarea outlined label="Observações" v-model="observacoes"></v-textarea>
              </v-col>
            </v-row>
          </v-tab-item>


          <v-tab-item class="tab-content" id="avaliacao">
            <h3>Avaliação:</h3>
            <v-row>
              <v-col cols="4">
                <v-dialog
                  ref="dialog"
                  v-model="modal_date"
                  :return-value.sync="date"
                  persistent
                  width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="avaliacao.data"
                      label="Data"
                      prepend-icon="mdi-calendar"
                      v-bind="attrs"
                      v-on="on" outlined
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="avaliacao.data" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn
                      text
                      color="primary"
                      @click="modal_date = false"
                    >
                      Fechar
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.dialog.save(avaliacao.data)"
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-col>
              <v-col cols="4">
                <v-select
                  v-model="avaliacao.posicao"
                  :items="this.$niveis_profissionais"
                  label="Posição"
                  outlined
                ></v-select>
              </v-col>
              <v-col cols="4">
                <v-select
                  v-model="avaliacao.nivel"
                  :items="['I', 'II', 'III']"
                  label="Nível"
                  outlined
                ></v-select>
              </v-col>
              <v-col>
                <v-textarea outlined label="Justificativa" v-model="avaliacao.justificativa"></v-textarea>
              </v-col>
            </v-row>
          </v-tab-item>


          <v-tab-item class="tab-content" id="recomendacoes_para_o_candidato">
            <h3>Recomendações para o Candidato:</h3>
            <v-row>
              <v-simple-table v-show="recomendacoes.length > 0" dense class="table-bordered mt-3">
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">Tópico</th>
                      <th class="text-left">Recomendação</th>
                      <th style="width:5%"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(recomendacao, i) in recomendacoes" :key="recomendacao.recomendacao">
                      <td>{{ recomendacao.topico }}</td>
                      <td>{{ recomendacao.recomendacao }}</td>
                      <td><a @click="del_recomendacao(i)"><v-icon>mdi-delete</v-icon></a></td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-row>
            <v-row v-show="!recomendacoes_form.show">
              <v-col class="text-center">
                <v-btn @click="recomendacoes_form.show = true">
                  <v-icon dark>mdi-plus</v-icon>
                  Adicionar
                </v-btn>
              </v-col>
            </v-row>
            <v-row v-show="recomendacoes_form.show">
              <v-col cols="5">
                <v-text-field v-model="recomendacoes_form.topico" label="Tópico" outlined></v-text-field>
              </v-col>
              <v-col cols="7">
                <v-text-field v-model="recomendacoes_form.recomendacao" label="Recomendação" outlined></v-text-field>
              </v-col>
              <v-col class="text-right">
                <v-btn @click="recomendacoes_form.show = false">Cancelar</v-btn>
                <v-btn color="success" @click="add_recomendacao()" class="ml-2">Salvar</v-btn>
              </v-col>
            </v-row>
          </v-tab-item>


          <v-tab-item class="tab-content" id="dados_do_avaliador">
            <h3>Dados do Avaliador:</h3>
            <v-row>
              <v-col>
                <v-text-field v-model="avaliador.nome" label="Nome" outlined></v-text-field>
              </v-col>
              <v-col>
                <v-text-field v-model="avaliador.email" label="E-Mail" outlined></v-text-field>
              </v-col>
              <v-col>
                <v-text-field v-model="avaliador.especialidade" label="Especialidade" outlined></v-text-field>
              </v-col>
            </v-row>
          </v-tab-item>

        </v-tabs-items>
        
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="secondary darken-1" text @click="dialog = false">Cancelar</v-btn>
        <v-btn color="primary darken-1" text @click="dialog = false">Exportar</v-btn>
        <a download="test.xlsx" href="#" @click="download()">Export to XLSX</a>
        <div style="display:hidden">
          <table id="datatable">
              <tr>
                  <td style="border: 1px solid red" v-html="dados.name"></td> <td>200</td> <td>300</td>
              </tr>
              <tr>
                  <td>400</td> <td>500</td> <td>600</td>
              </tr>
          </table>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import ExcellentExport from 'excellentexport'

export default {
  name: 'ExportDialog',
  props: {
    template: {
      type: Object,
      required: true
    }
  },

  data: () => ({
    tab: null,
    modal_date: false,
    dialog: false,
    dados_do_candidato: {
      nome_do_candidato: '',
      ultima_posicao: null,
      posicao_almejada: null,
      tecnologia: ''
    },
    habilidades_especificas_form: {
      show: false,
      descricao: '',
      nota: null,
      justificativa: ''
    },
    habilidades_especificas: [],
    observacoes: '',
    avaliacao: {
      data: null,
      posicao: null,
      nivel: null,
      justificativa: ''
    },
    recomendacoes_form: {
      show: false,
      topico: '',
      recomendacao: ''
    },
    recomendacoes: [],
    avaliador: {
      nome: '',
      email: '',
      especialidade: ''
    }
  }),

  computed: {
    dados: function(){
      return {
        ...this.template,
        dados_do_candidato: this.dados_do_candidato,
        habilidades_especificas: this.habilidades_especificas,
        observacoes: this.observacoes,
        avaliacao: this.avaliacao,
        recomendacoes: this.recomendacoes
      }
    },
    excel_sheetname: function(){
      return `Ficha de Avaliação ${this.template.name}`
    },
    excel_filename: function(){
      return `Avaliacao - ${this.dados_do_candidato.nome_do_candidato}`
    }
  },

  methods: {
    download: function(){
      return ExcellentExport.convert(
        { 
          anchor: document, 
          filename: 'test', 
          format: 'xlsx'
        },
        [
          {
            name: 'Sheet Name Here 1', 
            from: {table: document.getElementById('datatable')}
          }
        ]
      );
    },
    add_habilidade: function(){
      let hab = this.habilidades_especificas_form
      delete hab.show
      this.habilidades_especificas.push(hab)
      this.habilidades_especificas_form = {
        show: false,
        descricao: '',
        nota: null,
        justificativa: ''
      }
    },
    del_habilidade: function(index){
      this.habilidades_especificas.splice(index, 1)
    },
    add_recomendacao: function(){
      let rec = this.recomendacoes_form
      delete rec.show
      this.recomendacoes.push(rec)
      this.recomendacoes_form = {
        show: false,
        topico: '',
        recomendacao: ''
      }
    },
    del_recomendacao: function(index){
      this.recomendacoes.splice(index, 1)
    }
  }
}
</script>

<style scoped>
.dialog-content{
  position: relative;
}
.close-btn{
  position: absolute;
  right: 5px;
  top: 8px;
}
.table-bordered{
  border: 1px solid silver; 
  border-radius: 3px;
  margin-bottom: 1rem;
  width: 100%;
}
.tab-content{
  padding: 1rem;
  height: 60vh;
}
</style>
