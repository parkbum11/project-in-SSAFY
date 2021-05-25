<template>
<v-card
    class="mx-auto"
    max-width="344"
    outlined
  >
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline mb-4">
          {{content}}
        </div>
        <v-list-item-title class="headline mb-1">
          {{title}}
        </v-list-item-title>
      </v-list-item-content>

    </v-list-item>
  </v-card>    
</template>
<script>
export default {
    name: 'Card',
    props: ['content','title'],
    data() {
        return {
        }
    }
}
</script>
<style>

</style>