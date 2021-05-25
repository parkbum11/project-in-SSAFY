import Vue from "vue";
import VueRouter from "vue-router";
import Login from '@/views/Login.vue'
import About from '@/views/About.vue'
import Start from '@/views/Start.vue'
import Timeline from '@/views/Timeline'
import TimelineDetail from '@/views/TimelineDetail'
import Analysis from '@/views/Analysis'
import AnalysisGroup from '@/views/AnalysisGroup'
import Group from '@/views/Group'

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/about",
    name: "About",
    component: About
  },
  {
    path: "/start",
    name: "Start",
    component: Start
  },
  {
    path: "/mypage/timeline",
    name: "Timeline",
    component: Timeline
  },
  {
    path: "/mypage/timeline/detail",
    name: "TimelineDetail",
    component: TimelineDetail
  },
  {
    path: "/mypage/analysis",
    name: "Analysis",
    component: Analysis
  },
  {
    path: "/mypage/analysis/group",
    name: "AnalysisGroup",
    component: AnalysisGroup
  },
  {
    path: "/mypage/group",
    name: "Group",
    component: Group
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
