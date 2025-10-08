<template>
  <div class="stats-container">
    <div class="stat-box like-stat">
      <div class="stat-icon">❤️</div>
      <div class="stat-number">{{ likeCount }}</div>
      <div class="stat-description">Like</div>
    </div>
    <div class="stat-box">
      <div class="stat-icon">👎</div>
      <div class="stat-number">{{ dislikeCount }}</div>
      <div class="stat-description">Dislike</div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  likeCount: Number,
  dislikeCount: Number
});
</script>
fu