<template>
  <div class="status-box">
    <p :class="['status-message', { 'active': reaction !== null }]">
      <span v-if="reaction === 'like'" class="status-emoji">✨</span>
      <span v-if="reaction === 'dislike'" class="status-emoji">💭</span>
      {{ message }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  reaction: String,
  message: String
});
</script>
