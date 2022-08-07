<template>
  <!-- Header -->
  <AppHeader />

  <!-- Home -->
  <router-view></router-view>

  <!-- Player -->
  <MusicPlayer />

  <!-- Auth Modal -->
  <AppAuth />
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
import AppAuth from "@/components/AppAuth.vue";
import MusicPlayer from "@/components/MusicPlayer.vue";

import { mapWritableState } from "pinia";
import useUserStore from "@/stores/user";
import { auth } from "./includes/firebase/firebase";

export default {
  name: "App",
  components: {
    AppHeader,
    AppAuth,
    MusicPlayer,
  },
  computed: {
    ...mapWritableState(useUserStore, ["userLoggedIn"]),
  },
  created() {
    if (auth.currentUser) {
      this.userLoggedIn = true;
    }
  },
};
</script>
