<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useMainStore } from "@/store/index";

const router = useRouter();
const mainStore = useMainStore();

defineProps<{ msg: string }>();

const handleTo = () => {
  router.push("home");
};
</script>

<template>
  <h1>{{ msg }}</h1>
  <div class="tip">{{ mainStore.name }}</div>
  <van-button type="primary" @click="handleTo">登录</van-button>
</template>

<style scoped lang="scss">
.tip {
  font-size: 21px;
  padding: 20px 0;
}
</style>
