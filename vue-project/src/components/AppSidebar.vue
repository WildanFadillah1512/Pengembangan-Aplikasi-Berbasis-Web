<template>
  <aside class="sidebar" :class="{ closed: !isOpen }" :aria-hidden="!isOpen">
    <ul class="menu">
      <li :class="{ active: filterType === 'all' }" @click="$emit('setFilter', 'all')" role="button" tabindex="0">
        <span>All</span><span class="badge">{{ totalTasks }}</span>
      </li>
      <li :class="{ active: filterType === 'active' }" @click="$emit('setFilter', 'active')" role="button" tabindex="0">
        <span>Active</span><span class="badge">{{ activeCount }}</span>
      </li>
      <li :class="{ active: filterType === 'completed' }" @click="$emit('setFilter', 'completed')" role="button" tabindex="0">
        <span>Completed</span><span class="badge">{{ completedCount }}</span>
      </li>
    </ul>

    <div class="categories" v-if="categories.length">
      <h4>Categories</h4>
      <ul>
        <li
          v-for="cat in categories"
          :key="cat"
          :class="{ active: selectedCategory === cat }"
          @click="$emit('selectCategory', cat)"
          role="button"
          tabindex="0"
        >
          {{ cat }} <span class="cat-count">{{ countByCategory(cat) }}</span>
        </li>
      </ul>
    </div>

    <div class="sidebar-footer">
      <small>© {{ new Date().getFullYear() }} Task Manager</small>
    </div>
  </aside>
</template>

<script setup>
defineProps({
  isOpen: { type: Boolean, default: true },
  filterType: { type: String, default: 'all' },
  selectedCategory: { type: String, default: '' },
  totalTasks: { type: Number, default: 0 },
  activeCount: { type: Number, default: 0 },
  completedCount: { type: Number, default: 0 },
  categories: { type: Array, default: () => [] },
  countByCategory: { type: Function, default: () => () => 0 }
});

defineEmits(['setFilter', 'selectCategory']);
</script>