<template>
  <div class="home">
    <div class="home__inner">
      <h1>Welcome!</h1>
      <div class="input">
        <the-input
          @keypress.enter="
            username ? this.$router.push(`/chat?username=${username}`) : ``
          "
          placeholder="Enter your username"
          v-model="username"
          :model-value="username"
        >
        </the-input>
        <router-link :to="username ? `/chat?username=${username}` : ``"
          ><app-button></app-button
        ></router-link>
      </div>
    </div>
  </div>
</template>

<script>
import TheInput from "@/components/TheInput/TheInput";
import AppButton from "@/components/AppButton/AppButton";
// import TheChatList from "@/components/TheChatTemplate/TheChatList/TheChatList";

export default {
  name: "Home",
  components: { TheInput, AppButton },
  data() {
    return {
      username: "",
      id: "",
    };
  },
};
</script>

<style lang="scss">
.home {
  background-color: $white-blur;
  color: $gray;
  //padding: 50px;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  @include adaptive-value("line-height", 1.2, 1.1, 0);
  &__inner {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    h1 {
      margin-bottom: 30px;
    }
    .input {
      position: relative;
      display: flex;
      justify-content: space-between;
      background-color: $white;
      border-radius: 40px;
      padding: 10px;
    }
  }
}
</style>
