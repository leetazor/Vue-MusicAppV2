import { defineStore } from "pinia";
import { Howl } from "howler";
import helper from "@/includes/utility/helper";

export default defineStore("player", {
  state: () => ({
    current_song: {},
    sound: {},
    seek: "00:00",
    duration: "00:00",
    playerProgress: "0%",
  }),
  getters: {
    playing: (state) => {
      if (state.sound.playing) {
        return state.sound.playing();
      }
      return false;
    },
  },
  actions: {
    async playNewSong(song) {
      if (this.sound instanceof Howl) {
        this.sound.unload();
      }

      this.current_song = song;

      this.sound = new Howl({
        src: [song.url],
        html5: true,
      });

      this.sound.play();

      this.sound.on("play", () => {
        // this function will execute a function passed into it.
        // it's similar to the setInterval() function, except this func gets called
        // before the next frame gets painted onto the screen
        requestAnimationFrame(this.progress);
      });
    },
    async toggleAudio() {
      if (!this.sound.playing) {
        return;
      }

      if (this.sound.playing()) {
        this.sound.pause();
      } else {
        this.sound.play();
      }
    },
    progress() {
      this.seek = helper.formatTime(this.sound.seek());
      this.duration = helper.formatTime(this.sound.duration());

      this.playerProgress = `${
        (this.sound.seek() / this.sound.duration()) * 100
      }%`;

      if (this.sound.playing()) {
        requestAnimationFrame(this.progress);
      }
    },
    updateSeek(event) {
      if (!this.sound.playing) {
        return;
      }

      // the 'x' property represents the distance from the left side of the document
      // to the left side of the currentTarget (music player)
      // 'width' gives us the width of the currentTarget
      const { x, width } = event.currentTarget.getBoundingClientRect();

      // the clickX parameter gives us the coordinates of the click event
      //  relative to the width of the entire screen
      const clickX = event.clientX - x;
      const percentage = clickX / width;
      const seconds = this.sound.duration() * percentage;

      // sound.seek can be used to update the current song position
      this.sound.seek(seconds);

      // the 'once' function will listen for an event
      // if the event is emitted, it will run the callback function passed into it
      // this callback function will only run once
      // we're listening for an event called 'seek'
      // Howler will emit this event when the audio has oficially changed position
      // we're using 'progress' function as a callback, to keep the visual of the song playing on the player
      this.sound.once("seek", this.progress);
    },
  },
});
