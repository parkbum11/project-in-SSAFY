<template>
  <v-row justify="space-around">
    <v-col cols="auto">
      <v-dialog
        v-model="openGroupDetailModal"
        persistent
        transition="dialog-top-transition"
        max-width="600"
      >
        <v-card>
          <v-toolbar color="primary" dark>그룹 조회</v-toolbar>
          <v-card-text>
            <div class="text-h2 pa-12">Hello world!</div>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn text @click="closeModal">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
  </v-row>
</template>
<script>
export default {
  props: ['openGroupDetailModal'],
  methods: {
    closeModal() {
      this.$emit('closeModal');
    },
  },
};
</script>
