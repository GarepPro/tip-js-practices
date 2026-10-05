import { demoTasks, variantTasks, variantNumber } from "./data.js";
import { findTaskById, setTaskCompleted, removeTask } from "./task-service.js";
import { getVisibleTasks, getVisibleTasksByPriority } from "./task-selectors.js";
import { renderTaskList, renderSummary, renderEmptyState } from "./task-view.js";

const elements = {
  list: document.querySelector("#task-list"),
  filters: document.querySelector("#task-filters"),
  priorityFilters: document.querySelector("#priority-filters"),
  summary: document.querySelector("#task-summary"),
  empty: document.querySelector("#empty-message"),
  message: document.querySelector("#operation-message"),
  datasetLabel: document.querySelector("#dataset-label"),
};

// Готовая служебная часть: ?dataset=variant включает данные своего варианта.
// Наборы не смешиваются, редактировать код для переключения не требуется.
const isVariant = new URLSearchParams(window.location.search).get("dataset") === "variant";
const initialTasks = isVariant ? variantTasks : demoTasks;
let currentTasks = initialTasks.map((task) => ({ ...task }));
let currentFilter = "all";
let currentPriority = "all";

elements.datasetLabel.textContent = isVariant
  ? `Индивидуальный вариант: ${variantNumber ?? "не указан"}`
  : "Общий контрольный набор";

  function clearMessage() {
  elements.message.textContent = "";
}

function updateFilterButtons() {
  const buttons = elements.filters.querySelectorAll("button[data-filter]");
  buttons.forEach((button) => {
    const isActive = button.dataset.filter === currentFilter;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function updatePriorityButtons() {
  const buttons = elements.priorityFilters.querySelectorAll("button[data-priority]");
  buttons.forEach((button) => {
    const isActive = button.dataset.priority === currentPriority;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function renderApp() {
  // TODO: отобрать видимые задачи; обновить список, общую сводку и пустое состояние.
  // TODO: для кнопок фильтра обновить is-active и aria-pressed.
  // Не изменять currentTasks и не добавлять обработчики событий в этой функции.
  const visibleTasks = getVisibleTasksByPriority(
    currentTasks,
    currentFilter,
    currentPriority,
  );
  renderTaskList(elements.list, visibleTasks);
  renderSummary(elements.summary, currentTasks, visibleTasks.length);
  renderEmptyState(elements.empty, currentTasks.length, visibleTasks.length);
  updateFilterButtons();
  updatePriorityButtons();
}

function handleTaskListClick(event) {
  // TODO: найти кнопку через closest(), проверить её принадлежность списку.
  // TODO: распознать toggle/delete; прочитать и проверить числовой id карточки.
  // TODO: вызвать функцию ПР2, разобрать ok/error, сохранить успешный результат.
  // TODO: renderApp(), затем restoreTaskFocus(id, action).
  if (!(event.target instanceof Element)) return;
  const button = event.target.closest("button[data-action]");
  if (!button || !elements.list.contains(button)) return;
  const action = button.dataset.action;
  if (action !== "toggle" && action !== "delete") return;
  const card = button.closest("li[data-task-id]");
  if (!card) return;
  const id = Number(card.dataset.taskId);
  if (!Number.isSafeInteger(id) || id <= 0) {
    elements.message.textContent = "Некорректный идентификатор задачи.";
    return;
  }
  let result;
  if (action === "toggle") {
    const task = findTaskById(currentTasks, id);
    if (!task) {
      elements.message.textContent = `Задача с id=${id} не найдена.`;
      return;
    }
    result = setTaskCompleted(currentTasks, id, !task.completed);
  } else {
    result = removeTask(currentTasks, id);
  }
  if (!result || result.ok !== true) {
    elements.message.textContent = result?.error ?? "Не удалось выполнить операцию.";
    return;
  }
  currentTasks = result.tasks;
  clearMessage();
  renderApp();
  restoreTaskFocus(id, action);
}

function handleFilterClick(event) {
  // TODO: найти кнопку фильтра, проверить all/pending/completed.
  // TODO: изменить только currentFilter, очистить сообщение и вызвать renderApp().
  if (!(event.target instanceof Element)) return;
  const button = event.target.closest("button[data-filter]");
  if (!button || !elements.filters.contains(button)) return;
  const value = button.dataset.filter;
  if (!["all", "pending", "completed"].includes(value)) return;
  currentFilter = value;
  clearMessage();
  renderApp();
}

function handlePriorityClick(event) {
  if (!(event.target instanceof Element)) return;
  const button = event.target.closest("button[data-priority]");
  if (!button || !elements.priorityFilters.contains(button)) return;
  const value = button.dataset.priority;
  if (!["all", "low", "medium", "high"].includes(value)) return;
  currentPriority = value;
  clearMessage();
  renderApp();
}

// Готовая вспомогательная функция. Сохраняет понятную позицию клавиатурного фокуса
// после замены карточек. Если карточки больше нет, фокус получает активный фильтр.
function restoreTaskFocus(id, action) {
  const actionButton = elements.list.querySelector(
    `[data-task-id="${id}"] button[data-action="${action}"]`,
  );
  const filterButton = elements.filters.querySelector(`[data-filter="${currentFilter}"]`);
  (actionButton ?? filterButton)?.focus();
}

// Подписки выполняются один раз. Эти контейнеры не заменяются при перерисовке.
elements.list.addEventListener("click", handleTaskListClick);
elements.filters.addEventListener("click", handleFilterClick);
elements.priorityFilters.addEventListener("click", handlePriorityClick);

// До реализации renderApp ожидается сообщение о заглушке.
// try/catch здесь — готовая диагностика старта, а не замена проверки result.ok.
try {
  renderApp();
} catch (error) {
  elements.message.textContent = `Ошибка запуска: ${error.message}`;
  console.error(error);
}
