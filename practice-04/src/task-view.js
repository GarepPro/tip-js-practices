import { getTaskStats } from "./task-service.js";

// Перенести реализацию ПР3 и расширить карточку действием edit.
// Здесь создаётся DOM, но не изменяются данные и localStorage.
const PRIORITY_LABELS = {
  low: "Низкий",
  medium: "Средний",
  high: "Высокий",
};

// Здесь создаётся DOM, но не изменяется состояние приложения.
// Контракт карточки, селекторы и тексты описаны в методичке.
export function createTaskElement(task) {
  // TODO: li.task-card[data-task-id], название, статус, приоритет, две кнопки.
  // Название — через textContent. Обработчики здесь не назначаются.
  const li = document.createElement("li");
  li.classList.add("task-card");
  li.dataset.taskId = String(task.id);
  if (task.completed) li.classList.add("is-completed");

  const title = document.createElement("h3");
  title.classList.add("task-title");
  title.textContent = task.title;

  const status = document.createElement("p");
  status.classList.add("task-status");
  status.textContent = task.completed ? "Выполнена" : "В работе";

  const priority = document.createElement("p");
  priority.classList.add("task-priority");
  priority.textContent = PRIORITY_LABELS[task.priority] ?? "Средний";

  const actions = document.createElement("div");
  actions.classList.add("task-actions");

  const toggleBtn = document.createElement("button");
  toggleBtn.type = "button";
  toggleBtn.dataset.action = "toggle";
  toggleBtn.setAttribute("aria-pressed", String(task.completed));
  const toggleLabel = document.createElement("span");
  toggleLabel.classList.add("action-label");
  toggleLabel.textContent = "Выполнена";
  toggleBtn.append(toggleLabel);

  const editBtn = document.createElement("button");
  editBtn.type = "button";
  editBtn.dataset.action = "edit";
  const editLabel = document.createElement("span");
  editLabel.classList.add("action-label");
  editLabel.textContent = "Изменить";
  editBtn.append(editLabel);

  const deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.dataset.action = "delete";
  const deleteLabel = document.createElement("span");
  deleteLabel.classList.add("action-label");
  deleteLabel.textContent = "Удалить";
  deleteBtn.append(deleteLabel);

  actions.append(toggleBtn, editBtn, deleteBtn);

  li.append(title, status, priority, actions);
  return li;
}

export function renderTaskList(listElement, tasks) {
  // TODO: создать карточки и заменить дочерние элементы списка.
  // Сам listElement сохраняется: на нём находится делегированный обработчик.
  const cards = tasks.map((t) => createTaskElement(t));
  listElement.replaceChildren(...cards);
}

export function renderSummary(summaryElement, tasks, visibleCount) {
  // TODO: получить getTaskStats(tasks), обновить пять [data-stat] внутри блока.
  // tasks — ВЕСЬ текущий массив, visibleCount — длина отфильтрованного списка.
  const stats = getTaskStats(tasks);

  const set = (key, value) => {
    const el = summaryElement.querySelector(`[data-stat="${key}"]`);
    if (el) el.textContent = String(value);
  };

  set("total", stats.total);
  set("completed", stats.completed);
  set("pending", stats.pending);
  set("progress", `${stats.progress.toFixed(1)}%`);
  set("visible", visibleCount);
}

export function renderEmptyState(messageElement, total, visibleCount) {
  // TODO: различать пустой общий список и пустой результат фильтра.
  if (visibleCount > 0) {
    messageElement.textContent = "";
    messageElement.hidden = true;
    return;
  }
  if (total === 0) {
    messageElement.textContent = "Список задач пуст.";
  } else {
    messageElement.textContent = "Нет задач по выбранному фильтру.";
  }
  messageElement.hidden = false;
}
