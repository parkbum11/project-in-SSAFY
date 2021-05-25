<template>
  <v-app id="app" data-app>
    <Header />
    <!-- <SideBar /> -->
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import Header from '@/components/common/Header.vue';
// import SideBar from './components/mypage/SideBar.vue';

export default {
  name: 'App',

  components: {
    Header,
    // SideBar,
  },

  data: () => ({
    //
  }),
};
</script>
