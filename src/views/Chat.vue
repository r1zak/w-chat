<template>
  <div class="chat">
    <div class="chat__template">
      <div class="chat__online">
        <div class="chat__online-circle"></div>
        <div class="chat__online-text">
          <span>online:</span> {{ this.online }}
        </div>
      </div>
      <div class="scroll scroll4" id="chat">
        <the-chat-list :messages="messages" />
      </div>
    </div>
    <div class="chat__user">
      <the-input
        @keypress.enter="sendMessage"
        placeholder="Type your message here"
        v-model="newMessage"
      />
      <app-button @joinChat="sendMessage" />
    </div>
  </div>
</template>

<script>
import AppButton from "@/components/AppButton/AppButton";
import TheInput from "@/components/TheInput/TheInput";
import TheChatList from "@/components/TheChatTemplate/TheChatList/TheChatList";

export default {
  name: "Chat",
  data() {
    return {
      newMessage: "",
      connection: null,
      messages: [],
      online: 0,
    };
  },
  components: { TheChatList, AppButton, TheInput },
  methods: {
    addMessage(message) {
      this.messages.push(message);
    },
    sendMessage() {
      this.connection.send(
        JSON.stringify({
          event: "message",
          text: this.newMessage,
        })
      );

      this.newMessage = "";
    },
    joinChat() {
      if (!this.$route.query.color) {
        this.$route.query.color = "";
      }
      this.connection = new WebSocket(
        `wss://w-chat-api.herokuapp.com/v1/chats?username=${this.$route.query.username}&color=${this.$route.query.color}`
      );
      this.connection.onmessage = (event) => {
        const msg = JSON.parse(event.data);

        if (msg.event === "connected" || msg.event === "disconnected") {
          this.online = msg.online;
        }

        this.addMessage({
          user: msg.username,
          event: msg.event,
          time: msg.date,
          text: msg.text,
          online: msg.online,
          color: msg.color,
        });

        let objDiv = document.getElementById("chat");
        setTimeout(() => {
          objDiv.scrollTop = objDiv.scrollHeight;
        }, 100);
      };
    },
  },
  mounted() {
    this.joinChat();
  },
};
</script>

<style lang="scss" scoped>
.chat {
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background-color: $white-blur;
  color: $black;
  @include adaptive-value("padding", 70, 10, 1);
}
.chat__online {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
  font-size: $fs-primary - 2px;
  &-circle {
    background-color: $green;
    border-radius: 50%;
    padding: 4px;
    margin-right: 6px;
  }
  span {
    font-size: $fs-primary - 2px;
    font-weight: $fw-medium;
  }
}

.chat__template {
  max-width: 1024px;
  border-radius: 40px;
  background-color: $white;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin: 0 auto 20px;
  @include adaptive-value("padding", 50, 30, 0);

  .scroll {
    width: 100%;
    height: 100%;
    overflow: auto;
  }

  .content {
    height: 100%;
  }

  .scroll4::-webkit-scrollbar {
    width: 10px;
  }

  .scroll4::-webkit-scrollbar-thumb {
    background: #666;
    border-radius: 20px;
  }

  .scroll4::-webkit-scrollbar-track {
    background: #ddd;
    border-radius: 20px;
  }
}

.chat__user {
  display: flex;
  background-color: $white;
  border-radius: 40px;
  padding: 10px;
  max-width: 1024px;
  width: 100%;
}

@media (max-width: 990px) {
  .chat {
    height: 88vh;
  }
}
</style>
