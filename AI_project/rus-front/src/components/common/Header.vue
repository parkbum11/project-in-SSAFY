<template>
  <v-app-bar app color="primary" dark clipped-left>
    <div class="d-flex align-center">
      <v-img
        alt="Vuetify Logo"
        class="shrink mr-2"
        contain
        src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
        transition="scale-transition"
        width="40"
      />

      <v-img
        alt="Vuetify Name"
        class="shrink mt-1 hidden-sm-and-down"
        contain
        min-width="100"
        src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
        width="100"
      />
    </div>

    <v-spacer></v-spacer>

    <router-link to="/about" tag="v-btn">
      <v-btn text>
        <span class="mr-2">About</span>
      </v-btn>
    </router-link>

    <router-link to="/start" tag="v-btn">
      <v-btn text>
        <span class="mr-2">Start</span>
      </v-btn>
    </router-link>

    <router-link to="/mypage/timeline" tag="v-btn">
      <v-btn text>
        <span class="mr-2">MyPage</span>
      </v-btn>
    </router-link>
    
    <router-link v-if="isLogin == false" to="/login" tag="v-btn">
      <v-btn text>
        <span class="mr-2">Login</span>
      </v-btn>
    </router-link>

    <v-btn v-else text>
      <span class="mr-2" @click="logout">Logout</span>
    </v-btn>
  </v-app-bar>
</template>
<script src="https://developers.kakao.com/sdk/js/kakao.js"></script>

<script>
export default {
  name: 'Header',
  components: {},
  data() {
    return {};
  },
  computed: {
    isLogin() {
      return this.$store.getters.isLogin
    }
  },
  methods: {
    onClick(e, item) {
      console.log(e);
      e.stopPropagation();

      if (item.to || !item.href) return;

      this.$vuetify.goTo(item.href);
    },
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    logout() {
      if (Kakao.Auth.getAccessToken()) {
        var vm = this
        Kakao.API.request({
          url: '/v1/user/unlink',
          success: function(response) {
            console.log(response);
          },
          fail: function(error) {
            console.log(error);
          },
        });
        Kakao.Auth.logout(function() {
          // console.log(Kakao.Auth.getAccessToken());
          alert('로그아웃');
          vm.$router.push('/login')
          vm.$store.dispatch('logout')
        });
      }
    },
  },
  
};
</script>
<style></style>
