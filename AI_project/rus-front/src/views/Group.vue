<template>
  <v-container class="mypage">
    <SideBar></SideBar>
    <h1>This is a mypage page</h1>

    <v-container>
      <div class="d-flex justify-space-between">
        <v-text-field
          v-model="search"
          label="search"
          solo
          dense
          background-color="grey lighten-4"
          class="mx-3"
        ></v-text-field>
        <v-btn class="mx-3" color="primary" @click="openCreateGroupModal = true">
          그룹 생성
        </v-btn>
      </div>
      <CreateGroupModal
        :openCreateGroupModal="openCreateGroupModal"
        v-on:close="openCreateGroupModal = false"
      />
      <GroupItem />
    </v-container>
  </v-container>
</template>
<script>
import SideBar from '@/components/mypage/SideBar.vue';
import GroupItem from '@/components/mypage/group/GroupItem';
import CreateGroupModal from '@/components/mypage/group/CreateGroupModal';
export default {
  name: 'Group',
  components: {
    SideBar,
    GroupItem,
    CreateGroupModal,
  },
  data() {
    return {
      openCreateGroupModal: false,
    };
  },
};
</script>
<style></style>
