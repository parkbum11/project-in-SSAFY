<template>
  <v-container>
    <SideBar />
    <h2>타임라인</h2>
    <Calendar />
  </v-container>
</template>
<script>
import SideBar from '@/components/mypage/SideBar.vue';
import Calendar from '@/components/mypage/timeline/Calendar';
export default {
  name: 'Timeline',
  components: {
    SideBar,
    Calendar,
  },
};
</script>
<style></style>
