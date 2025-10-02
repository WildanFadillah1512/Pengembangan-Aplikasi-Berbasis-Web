<template>
  <div class="app-wrapper" :data-theme="isDark ? 'dark' : 'light'">
    <AppHeader
      v-model:searchQuery="searchQuery"
      :is-dark="isDark"
      @toggle-sidebar="toggleSidebar"
      @toggle-theme="toggleTheme"
    />

    <div class="layout">
      <AppSidebar
        :is-open="isSidebarOpen"
        :filter-type="filterType"
        :selected-category="selectedCategory"
        :total-tasks="tasks.length"
        :active-count="activeCount"
        :completed-count="completedCount"
        :categories="categories"
        :count-by-category="countByCategory"
        @set-filter="type => filterType = type"
        @select-category="selectCategory"
      />

      <main class="main-content">
        <section class="task-card">
          <div class="card-header">
            <div>
              <h1 class="card-title">My Tasks</h1>
              <p class="card-sub">Focus on what matters — quick, simple, and reliable.</p>
            </div>
            <div class="card-actions">
              <select v-model="sortBy" class="select">
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="completed">Completed first</option>
                <option value="incomplete">Incomplete first</option>
              </select>
            </div>
          </div>

          <TaskInputForm 
            :categories="categories" 
            :initial-data="taskToEdit"
            @add-task="handleAddTask" 
          />
          
          <transition-group name="task-list-anim" tag="ul" class="task-list">
            <TaskItem
              v-for="task in filteredTasks"
              :key="task.id"
              :task="task"
              @toggle="toggleTask"
              @delete="deleteTask"
              @edit="handleEdit"
            />
          </transition-group>

          <div v-if="filteredTasks.length === 0" class="empty">
            <img src="https://cdn-icons-png.flaticon.com/512/406/406257.png" alt="empty" />
            <p>No tasks match your view — try adding one ✨</p>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useTasks } from './composables/useTasks';
import AppHeader from './components/AppHeader.vue';
import AppSidebar from './components/AppSidebar.vue';
import TaskInputForm from './components/TaskInputForm.vue';
import TaskItem from './components/TaskItem.vue';

// State untuk UI
const isSidebarOpen = ref(true);
const isDark = ref(false);
const taskToEdit = ref(null);

const toggleSidebar = () => isSidebarOpen.value = !isSidebarOpen.value;
const toggleTheme = () => {
  isDark.value = !isDark.value;
  document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : 'light');
};

// Logika utama dari composable
const {
  tasks,
  filterType,
  selectedCategory,
  searchQuery,
  sortBy,
  categories,
  activeCount,
  completedCount,
  filteredTasks,
  addTask,
  updateTask,
  toggleTask,
  deleteTask,
  countByCategory,
  selectCategory
} = useTasks();

// Fungsi ini menangani penambahan tugas baru DAN pembaruan tugas yang diedit
function handleAddTask(taskData) {
  if (taskToEdit.value && taskToEdit.value.id) {
    updateTask(taskToEdit.value.id, taskData);
  } else {
    addTask(taskData);
  }
  taskToEdit.value = null;
}

// Fungsi ini menyiapkan form untuk mode edit
function handleEdit(id) {
  const task = tasks.value.find((t) => t.id === id);
  if (task) {
    taskToEdit.value = { id: task.id, text: task.text, category: task.category };
  }
}
</script>