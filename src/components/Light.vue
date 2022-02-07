<template>
  <div>
    <div class="red light"></div>
    <div class="yellow light"></div>
    <div class="green light"></div>
  </div>
</template>

<script>
function getElByColor(color, lights) {
  for (let i = 0; i < lights.length; i++) {
    if (!lights[i].classList.contains(color)) continue;
    return lights[i];
  }
}

export default {
  props: ["color", "show"],

  computed: {
    currentLight() {
      return getElByColor(this.color, this.lights);
    },

    lights() {
      return this.$el.querySelectorAll(".light");
    },
  },

  watch: {
    color(newColor, oldColor) {
      let newLight = getElByColor(newColor, this.lights);
      let oldLight = getElByColor(oldColor, this.lights);

      if (newLight) {
        newLight.style.opacity = 1.0;
      }
      if (oldLight) {
        oldLight.style.opacity = 0.3;
      }
    },

    show(visible) {
      let style = this.currentLight.style;
      if (visible) style.opacity = 1.0;
      else style.opacity = 0.3;
    },
  },

  mounted() {
    this.currentLight.style.opacity = 1.0;
  },
};
</script>

<style>
.green,
.red,
.yellow {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  opacity: 0.3;
  margin-top: 20px;
}
.green {
  background-color: green;
}
.red {
  background-color: red;
}
.yellow {
  background-color: yellow;
}
</style>