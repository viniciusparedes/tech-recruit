<template>
  <v-dialog
    v-model="table_dialog"
    width="80%"
  >
    <v-card>
      <v-card-text>
        <table>
            <tr><td class="cabecalho text-center"><h2>Ficha de Avaliação - {{ dados.name }}</h2></td></tr>
            <tr><td class="spacer"></td></tr>

            <tr><td class="cabecalho">Dados do Candidato</td></tr>
            <tr><td>
              <table class="sub-table">
                <tbody>
                  <tr><td class="label">Nome</td><td v-html="dados.dados_do_candidato.nome_do_candidato"></td></tr>
                  <tr><td class="label">Última Posição</td><td v-html="dados.dados_do_candidato.ultima_posicao"></td></tr>
                  <tr><td class="label">Posição Almejada</td><td v-html="dados.dados_do_candidato.posicao_almejada"></td></tr>
                  <tr><td class="label">Tecnologia</td><td v-html="dados.dados_do_candidato.tecnologia"></td></tr>
                </tbody>
              </table>
            </td></tr>

            <tr><td class="cabecalho">Habilidades Técnicas</td></tr>
            <tr><td>
              <table class="sub-table">
                <thead>
                  <tr><th style="width:45%">Habilidades Técnicas</th><th style="width:15%">Conhecimentos Técnicos</th><th style="width:10%">Nota</th><th style="width:30%">Justificativa</th></tr>
                </thead>
                <tbody>
                  <tr v-for="hab in dados.subjects" :key="hab.name">
                    <td>
                      <table class="sub-sub-table">
                        <tr v-for="item in hab.items" :key="item.name">
                          <td style="width:40%" class="label" v-html="item.name"></td>
                          <!--td style="width:5%" v-html="item.stars !== undefined ? item.stars+'/5' : ''"></td-->
                          <td style="width:60%" v-html="item.examples.join(', ')"></td>
                        </tr>
                      </table>
                    </td>
                    <td class="text-center text-bold" v-html="hab.name"></td>
                    <td class="text-center" v-html="$niveis[hab.score]"></td>
                    <td v-html="hab.justification"></td>
                  </tr>
                </tbody>
              </table>
            </td></tr>

            <tr><td class="cabecalho">Habilidades Específicas</td></tr>
            <tr><td>
              <table class="sub-table">
                <thead>
                  <tr><th style="width:35%">Habilidades Específicas</th><th style="width:15%">Nota</th><th style="width:50%">Justificativa</th></tr>
                </thead>
                <tbody>
                  <tr v-for="hab in dados.habilidades_especificas" :key="hab.name">
                    <td class="text-bold" v-html="hab.descricao"></td>
                    <td class="text-center" v-html="hab.nota"></td>
                    <td v-html="hab.justificativa"></td>
                  </tr>
                </tbody>
              </table>
            </td></tr>

            <tr><td class="cabecalho">Observações</td></tr>
            <tr><td>
              <table class="sub-table">
                <tbody>
                  <tr>
                    <td class="text-bold" v-html="dados.observacoes"></td>
                  </tr>
                </tbody>
              </table>
            </td></tr>

            <tr><td class="cabecalho">Avaliação</td></tr>
            <tr><td>
              <table class="sub-table">
                <tbody>
                  <tr><td class="label">Data</td><td v-html="dados.avaliacao.data"></td></tr>
                  <tr><td class="label">Posição</td><td v-html="dados.avaliacao.posicao"></td></tr>
                  <tr><td class="label">Nível</td><td v-html="dados.avaliacao.nivel"></td></tr>
                </tbody>
              </table>
            </td></tr>
            <tr><td>
              <table class="sub-table">
                <thead><tr><th>Justificativa</th></tr></thead>
                <tbody><tr><td v-html="dados.avaliacao.justificativa"></td></tr></tbody>
              </table>
            </td></tr>

            <tr><td class="cabecalho">Recomendações para o Candidato</td></tr>
            <tr><td>
              <table class="sub-table">
                <thead>
                  <tr><th style="width:30%">Tópico</th><th style="width:70%">Recomendação</th></tr>
                </thead>
                <tbody>
                  <tr v-for="rec in dados.recomendacoes" :key="rec.topico">
                    <td v-html="rec.topico"></td>
                    <td v-html="rec.recomendacao"></td>
                  </tr>
                </tbody>
              </table>
            </td></tr>

            <tr><td class="cabecalho">Dados do Avaliador</td></tr>
            <tr><td>
              <table class="sub-table">
                <tbody>
                  <tr><td class="label">Nome</td><td v-html="dados.avaliador.nome"></td></tr>
                  <tr><td class="label">E-mail</td><td v-html="dados.avaliador.email"></td></tr>
                  <tr><td class="label">Especialidade</td><td v-html="dados.avaliador.especialidade"></td></tr>
                </tbody>
              </table>
            </td></tr>
        </table>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="secondary darken-1" text @click="table_dialog = false">Fechar</v-btn>
        <v-btn color="primary darken-1" text @click="imprimir()">Imprimir</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ExportTable',
  props: {
    dados: {
      type: Object,
      required: true
    },
    dialog: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    table_dialog: false
  }),

  created(){
    this.table_dialog = this.dialog
  },

  mounted(){
    this.$root.$on('change-table-dialog', (val)=>{this.table_dialog = val})
  },

  beforeDestroy(){
    this.$root.$off('change-table-dialog')
  }

}
</script>

<style scoped>
table{
  width: 100%;
  color: black;
}
.cabecalho{
  border: 2px solid black;
  padding: 3px 3rem;
  text-transform: capitalize;
  font-weight: bold;
  background-color: goldenrod;
  color: black;
}
.spacer{
  height: 1rem;
}
.sub-table{
  width: calc(100% - 2rem);
  margin: .5rem 1rem 1.3rem;
  border: 1px solid #333;
  padding: 0;
  border-collapse: collapse
}
.sub-table>tbody>tr:nth-child(even) {
  background-color: antiquewhite;
}
.sub-table>tbody>tr>td{
  padding: 3px;
  border: 1px solid #333;
}
.sub-table>thead>tr>th{
  background-color: rgb(252, 215, 124);
  border: 1px solid #333;
}
.label{
  font-weight: bold;
  width: 20%;
}
.text-bold{
  font-weight: bold;
}
.sub-sub-table{
  width: 100%;
  border-collapse: collapse
}
.sub-sub-table>tr{
  border-bottom: 1px solid #555;
}
.sub-sub-table>tr>td{
  padding: 2px;
}
.sub-sub-table>tr:last-child{
  border-bottom: none;
}

</style>
