<template>
  <v-app id="inspire">
    <v-main class="pl-0 pt-0">
      <v-container fluid>
        <v-row>
          <v-col v-for="card in cards" :key="card" cols="12">
            <v-card>
              <v-tabs>
                <v-tab>내 그룹</v-tab>
                <v-tab>그룹 찾기</v-tab>
              </v-tabs>
              <v-col class="pb-0" cols="12" sm="6" md="4"> </v-col>

              <v-list two-line>
                <template v-for="n in 5">
                  <v-list-item :key="n">
                    <v-list-item-avatar color="grey darken-1"> </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title>Message {{ n }}</v-list-item-title>

                      <v-list-item-subtitle class="d-flex align-center justify-space-between">
                        SSAFY 특화 B102팀
                        <div class="d-flex">
                          <v-btn class="ma-1" @click="openGroupDetailModal = true">
                            조회
                          </v-btn>
                          <v-btn class="ma-1">
                            가입
                          </v-btn>
                        </div>
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-divider v-if="n !== 5" :key="`divider-${n}`" inset></v-divider>
                </template>
                <GroupDetailModal
                  :openGroupDetailModal="openGroupDetailModal"
                  v-on:closeModal="openGroupDetailModal = false"
                >
                </GroupDetailModal>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import GroupDetailModal from '@/components/mypage/group/GroupDetailModal.vue';

export default {
  components: {
    GroupDetailModal,
  },
  data: () => ({
    cards: ['Today'],
    search: '',
    openGroupDetailModal: false,
  }),
};
</script>
