<template>
  <div id="app">
    <Timer :timer="timer" :saveTime="saveTime" :checkTime="checkTime" />
    <Light :color="lights[id].color" :show="visible" />
  </div>
</template>

<script>
import Light from "./components/Light.vue";
import Timer from "./components/Timer.vue";

const green = { color: "green", time: 15 };
const red = { color: "red", time: 8 };
const yellow = { color: "yellow", time: 3 };

const lights = [green, yellow, red, yellow];

function getColorID(color) {
  for (let i = 0; i < lights.length; i++) {
    if (color != lights[i].color) continue;
    return i;
  }
}

export default {
  components: {
    Light,
    Timer,
  },
  data() {
    return {
      lights,
      savedTime: undefined,
      visible: true,
      id: 0,
    };
  },

  computed: {
    timer() {
      if (this.savedTime) {
        let tmp = this.savedTime;
        this.savedTime = undefined;
        return tmp;
      }
      return this.lights[this.id].time;
    },
  },

  methods: {
    changeColor(color, time) {
      if (color >= 0 && color < this.lights.length) {
        this.id = color;
      } else if (this.id < this.lights.length - 1) {
        this.id++;
      } else {
        this.id = 0;
      }

      if (!(time && +time > 0 && +time <= this.lights[this.id].time)) {
        time = this.lights[this.id].time;
      }
      this.savedTime = time;
      this.visible = true;

      this.$router.push(this.lights[this.id].color);
      setTimeout(() => {
        this.changeColor();
      }, time * 1000);
    },

    saveTime(timeLeft) {
      localStorage.timer = timeLeft;
      localStorage.id = this.id;
    },

    checkTime(time) {
      if (time < 3 && time > 0.1 && time % 0.5 == 0)
        this.visible = !this.visible;
    },
  },

  mounted() {
    let routeColor = this.$route.params.color;
    let savedColor = this.lights[localStorage.id].color;

    let id, timer;

    if (routeColor === savedColor) {
      id = +localStorage.id;
      timer = +localStorage.timer;
    } else {
      id = getColorID(routeColor) || 0;
      timer = this.lights[id].time;
    }

    this.changeColor(id, timer);
  },
};
</script>

<style>
#app > div {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
</style>