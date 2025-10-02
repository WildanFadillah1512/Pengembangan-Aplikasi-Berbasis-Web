<template>
  <li class="task-item" :class="{ completed: task.completed }">
    <div class="left">
      <button
        class="checkbox"
        :aria-pressed="task.completed"
        @click="$emit('toggle', task.id)"
        :title="task.completed ? 'Mark as not done' : 'Mark as done'"
        aria-label="Toggle done"
      >
        <span v-if="task.completed">✓</span>
      </button>
      <div class="meta">
        <div class="text">{{ task.text }}</div>
        <div class="meta-sub">
          <span class="time">{{ formatDate(task.createdAt) }}</span>
          <span v-if="task.category" class="pill">{{ task.category }}</span>
        </div>
      </div>
    </div>
    <div class="right">
      <button class="btn ghost" @click="$emit('edit', task.id)" title="Edit" aria-label="Edit">✎</button>
      <button class="btn delete" @click="$emit('delete', task.id)" title="Delete" aria-label="Delete">🗑</button>
    </div>
  </li>
</template>

<script setup>

import { formatDate } from '../utils';

defineProps({
  task: { type: Object, required: true }
});

defineEmits(['toggle', 'edit', 'delete']);
</script>