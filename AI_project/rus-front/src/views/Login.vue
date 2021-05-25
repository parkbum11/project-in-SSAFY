<template>
  <v-card class="mx-auto loginCard" max-width="344">
    <v-img src="@/assets/kakaoLoginImage.png" height="200px"></v-img>

    <v-card-title class="font-weight-bold pb-0">
      RUS
    </v-card-title>

    <v-card-title class="caption">
      RUS를 카톡으로 간편 로그인하세요. 로그인 후에 RUS의 모든 서비스를 이용할 수
      있습니다
    </v-card-title>
    <v-card-actions>
      <img
        class="mx-auto mb-4 loginBtn"
        @click="kakaoLogin"
        src="../assets/kakao_login_medium_wide.png"
        alt="kakaoLogin"
      />
    </v-card-actions>
  </v-card>
</template>
<script src="https://developers.kakao.com/sdk/js/kakao.js"></script>
<script>
export default {
  data() {
    return {
    }
  },
  methods: {
    kakaoLogin() {
      var vm = this
      Kakao.Auth.login({
        scope: 'profile, account_email',
        success: function(authObj) {
          Kakao.Auth.setAccessToken(authObj['access_token']);
          Kakao.API.request({
            url: '/v2/user/me',
            success: res => {
              const kakao_account = res.kakao_account;
              const user = {
                email: kakao_account['email'],
                name: kakao_account['profile']['nickname'],
                profileImage: kakao_account['profile']['profile_image_url'],
                token: authObj['access_token']
              }
              // console.log(user);
              vm.$store.dispatch('login', user)
              vm.$router.push('/start')
            },
            fail: error => {
              console.log(error)
            }
          });
        },
      });
    },
  },
};
</script>
<style scoped>
.loginCard {
  margin-top: 10%;
}
.loginBtn {
  cursor: pointer;
}
</style>
