<template>
  <!-- Header -->
  <AppHeader />

  <!-- Home -->

  <router-view></router-view>

  <!-- Router with transitions -->
  <!-- <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in"
      ><component :is="Component"></component
    ></transition>
  </router-view> -->

  <!-- Player -->
  <MusicPlayer v-if="current_song.modified_name" />

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

import { mapState } from "pinia";
import usePlayerStore from "@/stores/player";

export default {
  name: "App",
  components: {
    AppHeader,
    AppAuth,
    MusicPlayer,
  },
  computed: {
    ...mapWritableState(useUserStore, ["userLoggedIn"]),
    ...mapState(usePlayerStore, ["current_song"]),
  },
  created() {
    if (auth.currentUser) {
      this.userLoggedIn = true;
    }
  },
};
</script>

<style>
.fade-enter-from {
  opacity: 0;
}

.fade-enter-active {
  transition: all 0.3s linear;
}

.fade-leave-to {
  transition: all 0.3s linear;
  opacity: 0;
}
</style>
