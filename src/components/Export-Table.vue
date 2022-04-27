<template>
    <table id="datatable">
        <tr>
            <td style="border: 1px solid red" v-html="dados.name"></td> <td>200</td> <td>300</td>
        </tr>
        <tr>
            <td>400</td> <td>500</td> <td>600</td>
        </tr>
    </table>
</template>

<script>
export default {
  name: 'ExportTable',
  props: {
    dados: {
      type: Object,
      required: true
    }
  },

  data: () => ({
    
  }),

}
</script>

<style scoped>

</style>
