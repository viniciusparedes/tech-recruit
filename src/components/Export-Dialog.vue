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
        <v-text-field label="Nome do Candidato" filled></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="secondary darken-1" text @click="dialog = false">Cancelar</v-btn>
        <v-btn color="primary darken-1" text @click="dialog = false">Exportar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ExportDialog',

  data: () => ({
    dialog: false
  })
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
</style>
