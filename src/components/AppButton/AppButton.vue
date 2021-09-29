<template>
  <button
    class="btn"
    type="submit"
    @click="$emit('joinChat')"
    @keyup.enter="$emit('enterMethod')"
  >
    <img class="chat__user-arrow" src="@/assets/arrow-white.svg" alt="#" />
  </button>
</template>

<script>
export default {
  name: "AppButton",
  emits: ["joinChat", "enterMethod"],
};
</script>

<style lang="scss" scoped>
.btn {
  border-radius: 50px;
  background-color: $blue;
  padding: 10px 12px;
  .chat__user-arrow {
    width: 14px;
    height: 14px;
  }
}
</style>
