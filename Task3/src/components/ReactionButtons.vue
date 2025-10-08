<template>
  <div class="reaction-grid">
    <button
      @click="$emit('set-reaction', 'like')"
      :class="['reaction-button', { 'selected-like': reaction === 'like' }]"
    >
      <span class="reaction-icon">❤️</span>
      <span class="reaction-label">Like</span>
    </button>

    <button
      @click="$emit('set-reaction', 'dislike')"
      :class="['reaction-button', { 'selected-dislike': reaction === 'dislike' }]"
    >
      <span class="reaction-icon">👎</span>
      <span class="reaction-label">Dislike</span>
    </button>
  </div>
</template>

<script setup>
defineProps({
  reaction: String
});
</script>
