<template>
  <v-container>
    <SideBar />
    <h2>분석</h2>
    <v-tabs>
      <v-tab>내 활동</v-tab>
      <v-tab>그룹</v-tab>
    </v-tabs>
    <v-select :items="items" label="Solo field" solo></v-select>
    <v-select :items="items" label="Solo field" solo></v-select>
    <h3 style="text-align:center">2021.03.08 ~ 2021.03.14 내 활동 분석 결과입니다.</h3>
    <v-container fluid>
      <v-row>
        <v-col v-for="card in cards" :key="card.content">
          <Card :content="card.content" :title="card.title" />
        </v-col>
      </v-row>
    </v-container>
    <bar-chart />
  </v-container>
</template>
<script>
import SideBar from '@/components/mypage/SideBar.vue';
import Card from '@/components/mypage/analysis/Card';
import BarChart from '@/components/mypage/analysis/BarChart';
export default {
  name: 'Analysis',
  components: {
    SideBar,
    Card,
    BarChart,
  },
  data() {
    return {
      cards: [
        { content: 'content1', title: 'title1' },
        { content: 'content2', title: 'title2' },
      ],
    };
  },
};
</script>
<style></style>
