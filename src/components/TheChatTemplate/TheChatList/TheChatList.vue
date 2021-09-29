<template>
  <ul class="chat__list">
    <li class="chat__list-item" v-for="msg in messages" :key="msg.id">
      <span :style="{ color: `#` + msg.color }">{{ msg.user }}</span>
      <p
        :style="[
          msg.event === 'connected' || msg.event === 'disconnected'
            ? { fontWeight: 500 }
            : { fontWeight: 400 },
        ]"
      >
        {{
          msg.event === "connected" || msg.event === "disconnected"
            ? msg.event === "connected"
              ? "connected"
              : "disconnected"
            : msg.text
        }}
      </p>
      <div>{{ formatData(msg.time) }}</div>
    </li>
  </ul>
</template>

<script>
import randomColor from "@/components/TheChatTemplate/TheChatList/randomColor";

export default {
  name: "TheChatList",
  props: {
    messages: {
      type: Array,
    },
    user: {
      type: String,
    },
    event: {
      type: String,
    },
    time: {
      type: Number,
    },
    text: {
      type: String,
    },
    online: {
      type: Number,
    },
    color: {
      type: String,
    },
  },
  data() {
    return {};
  },
  directives: {
    colors: randomColor,
  },
  methods: {
    formatData(v) {
      let date = new Date(v * 1000);
      const hours = date.getHours();
      const minutes = "0" + date.getMinutes();

      return hours + ":" + minutes.substr(-2);
    },
  },
};
</script>

<style lang="scss" scoped>
.chat__list {
  margin-right: 30px;
  padding: -10px 0;
  &-item {
    display: flex;
    justify-content: space-between;
    span {
      font-weight: $fw-medium;
      @include adaptive-value("font-size", 18, 16, 0);
    }
    p {
      margin: 0 auto 0 10px;
      font-weight: $fw-regular;
      text-align: justify;
      @include adaptive-value("font-size", 18, 16, 0);
      //flex: 1 1 0;
    }
    div {
      margin-left: 10px;
      font-weight: $fw-light;
      @include adaptive-value("font-size", 18, 16, 0);
    }
  }
  .chat__list-item + .chat__list-item {
    margin-top: 15px;
  }
  &-connection {
    display: flex;
    justify-content: center;
    p {
      margin-left: 10px;
    }
  }
}
</style>
