<template>
  <v-navigation-drawer clipped permanent app>
    <v-list>
      <router-link to="/mypage/timeline" tag="v-list-item">
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-inbox-arrow-down</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>타임라인</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </router-link>

      <router-link to="/mypage/analysis" tag="v-list-item">
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-send</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>분석</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </router-link>

      <router-link to="/mypage/group" tag="v-list-item">
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-alert-octagon</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>그룹찾기</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </router-link>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
export default {
  name: 'SideBar',
  components: {},
  data() {
    return {
      links: [
        ['mdi-inbox-arrow-down', '타임라인', '/mypage'],
        ['mdi-send', '분석', '/mypage/analysis'],
        ['mdi-alert-octagon', '그룹찾기', '/mypage/group'],
      ],
    };
  },
  methods: {},
};
</script>
<style></style>
