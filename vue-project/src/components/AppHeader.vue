<template>
  <nav class="navbar">
    <div class="nav-left">
      <button class="hamburger" @click="$emit('toggleSidebar')" aria-label="Toggle sidebar">☰</button>
      <div class="brand">
        <span class="logo">📋</span>
        <span class="app-name">Task Manager</span>
      </div>
    </div>
    <div class="nav-center">
      <input
        :value="searchQuery"
        @input="$emit('update:searchQuery', $event.target.value)"
        class="nav-search"
        type="search"
        placeholder="Search tasks..."
        aria-label="Search tasks"
      />
      <button v-if="searchQuery" class="clear-search" @click="$emit('update:searchQuery', '')" title="Clear search">✖</button>
    </div>
    <div class="nav-right">
      <button class="theme-toggle" @click="$emit('toggleTheme')" :title="isDark ? 'Light mode' : 'Dark mode'">
        {{ isDark ? "🌙" : "☀️" }}
      </button>
    </div>
  </nav>
</template>

<script setup>
defineProps({
  searchQuery: { type: String, default: '' },
  isDark: { type: Boolean, default: false }
});

defineEmits(['toggleSidebar', 'toggleTheme', 'update:searchQuery']);
</script>