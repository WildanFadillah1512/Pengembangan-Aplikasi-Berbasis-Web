<template>
  <div>
    <div class="input-row">
      <input
        v-model="newTask"
        @keyup.enter="handleAddTask"
        type="text"
        placeholder="What needs to be done?"
        class="task-input"
        aria-label="New task"
        ref="taskInput"
      />
      <select v-model="taskCategory" class="select small" :class="{ error: showError }" aria-label="Select category">
        <option value="">Select category *</option>
        <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
      </select>
      <button class="btn add-btn" @click="handleAddTask" aria-label="Add task">Add</button>
    </div>

    <transition name="error-anim">
      <div v-if="showError" class="error-message" role="alert">
        ⚠️ Select category before adding task!
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue';

const props = defineProps({
  categories: { type: Array, default: () => [] },
  initialData: { type: Object, default: null }
});

const emit = defineEmits(['addTask']);

const newTask = ref("");
const taskCategory = ref("");
const showError = ref(false);
const taskInput = ref(null); // Untuk auto-focus

function handleAddTask() {
  const text = newTask.value.trim();
  if (!text) {
    taskInput.value?.focus();
    return;
  }
  
  if (!taskCategory.value) {
    showError.value = true;
    setTimeout(() => { showError.value = false; }, 3000);
    return;
  }
  
  emit('addTask', { text: newTask.value, category: taskCategory.value });
  
  // Reset form
  newTask.value = "";
  taskCategory.value = "";
  showError.value = false;
  nextTick(() => taskInput.value?.focus());
}

// Watcher untuk mode edit: jika initialData berubah, isi form
watch(() => props.initialData, (newData) => {
  if (newData) {
    newTask.value = newData.text;
    taskCategory.value = newData.category;
    nextTick(() => taskInput.value?.focus());
  } else {
    // Jika user selesai edit, reset formnya
    newTask.value = "";
    taskCategory.value = "";
  }
}, { immediate: true });
</script>