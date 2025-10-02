import { ref, computed, watch } from 'vue';

// Pastikan Anda memiliki file ini atau ganti dengan array biasa
// contoh: const DEFAULT_CATEGORIES = ['Personal', 'Work'];
import { DEFAULT_CATEGORIES } from '../constants';

// Fungsi untuk memuat tugas dari localStorage dengan aman
function initTasks() {
  try {
    const raw = JSON.parse(localStorage.getItem("tasks") || "[]");
    if (!Array.isArray(raw)) return [];
    return raw.map((t, i) => ({
      id: t.id ?? `${Date.now()}-${i}`,
      text: t.text ?? "",
      completed: !!t.completed,
      createdAt: t.createdAt ?? Date.now() - i,
      category: t.category ?? "",
    }));
  } catch (e) {
    console.warn("Gagal mem-parsing tugas dari localStorage:", e);
    return [];
  }
}

export function useTasks() {
  // State reaktif
  const tasks = ref(initTasks());
  const filterType = ref("all");
  const selectedCategory = ref("");
  const searchQuery = ref("");
  const sortBy = ref("newest");

  // Computed properties untuk data turunan
  const categories = computed(() => {
    const taskCats = new Set(tasks.value.map(t => t.category).filter(Boolean));
    return [...new Set([...DEFAULT_CATEGORIES, ...taskCats])];
  });
  
  const activeCount = computed(() => tasks.value.filter((t) => !t.completed).length);
  const completedCount = computed(() => tasks.value.filter((t) => t.completed).length);

  const filteredTasks = computed(() => {
    let out = [...tasks.value];
    
    // 1. Filter berdasarkan kategori
    if (selectedCategory.value) {
      out = out.filter((t) => t.category === selectedCategory.value);
    }
    
    // 2. Filter berdasarkan status (all, active, completed)
    if (filterType.value === "active") {
      out = out.filter((t) => !t.completed);
    } else if (filterType.value === "completed") {
      out = out.filter((t) => t.completed);
    }
    
    // 3. Filter berdasarkan pencarian
    if (searchQuery.value.trim()) {
      const q = searchQuery.value.toLowerCase();
      out = out.filter((t) => t.text.toLowerCase().includes(q) || (t.category ?? "").toLowerCase().includes(q));
    }
    
    // 4. Urutkan hasil
    switch (sortBy.value) {
      case "newest":
        out.sort((a, b) => b.createdAt - a.createdAt);
        break;
      case "oldest":
        out.sort((a, b) => a.createdAt - b.createdAt);
        break;
      case "completed":
        out.sort((a, b) => Number(b.completed) - Number(a.completed));
        break;
      case "incomplete":
        out.sort((a, b) => Number(a.completed) - Number(b.completed));
        break;
    }
    
    return out;
  });

  // Fungsi untuk menyimpan ke localStorage
  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks.value));
  }

  // --- Aksi / Metode ---
  function addTask(taskData) {
    const { text, category } = taskData;
    if (!text || !category) return;
    
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    tasks.value.unshift({ id, text, completed: false, createdAt: Date.now(), category });
  }

  function updateTask(id, updatedData) {
    const task = tasks.value.find((t) => t.id === id);
    if (task) {
      task.text = updatedData.text;
      task.category = updatedData.category;
    }
  }

  function toggleTask(id) {
    const task = tasks.value.find((t) => t.id === id);
    if (task) task.completed = !task.completed;
  }

  function deleteTask(id) {
    tasks.value = tasks.value.filter((t) => t.id !== id);
  }

  function countByCategory(cat) {
    return tasks.value.filter((t) => t.category === cat).length;
  }

  function selectCategory(cat) {
    selectedCategory.value = (selectedCategory.value === cat) ? "" : cat;
  }
  
  // Watcher untuk auto-save
  watch(tasks, saveTasks, { deep: true });

  // Expose state dan fungsi agar bisa digunakan di komponen
  return {
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
  };
}