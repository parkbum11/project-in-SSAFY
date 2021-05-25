<template>
  <v-container>
    <SideBar />
    <h2>타임라인 상세</h2>
    <v-btn>돌아가기</v-btn>
    <v-container>
      <h3>2021-03-01</h3>
      <StackedBarChart />
      <PieChart />
    </v-container>
  </v-container>
</template>
<script>
import SideBar from '@/components/mypage/SideBar.vue';
import StackedBarChart from '@/components/mypage/timeline/StackedBarChart';
import PieChart from '@/components/mypage/timeline/PieChart';
export default {
  name: 'TimelineDetail',
  components: {
    SideBar,
    StackedBarChart,
    PieChart,
  },
  data() {
    return {};
  },
};
</script>
