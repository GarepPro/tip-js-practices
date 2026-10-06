const ALLOWED_PRIORITIES = new Set(["low", "medium", "high"]);

// Чистая проверка данных формы. DOM и показ сообщений выполняются в main.js.
// draft: { id, title, priority }; editingId: null либо id редактируемой задачи.
export function validateTaskDraft(draft, tasks, editingId = null) {
  // TODO: нормализовать и проверить id, title и priority.
  // В режиме создания id должен быть уникальным.
  // В режиме редактирования используется editingId и проверяется наличие задачи.
  // Успех: { ok: true, value: { id, title, priority } }.
  // Отказ: { ok: false, errors: { id?: "...", title?: "...", priority?: "..." } }.
  // ALLOWED_PRIORITIES можно использовать при проверке приоритета.
  const errors = {};
  let id;
  let title;
  let priority;

  if (editingId !== null) {
    if (
      typeof editingId !== "number" ||
      !Number.isSafeInteger(editingId) ||
      editingId <= 0
    ) {
      errors.id = "Некорректный идентификатор редактируемой задачи.";
    } else if (!Array.isArray(tasks) || !tasks.some((t) => t.id === editingId)) {
      errors.id = `Задача с id ${editingId} не найдена.`;
    } else {
      id = editingId;
    }
  } else {
    
    const rawId = draft.id;
    if (typeof rawId === "string" && rawId.trim() === "") {
      errors.id = "Введите идентификатор.";
    } else {
      const numId = Number(rawId);
      if (!Number.isSafeInteger(numId) || numId <= 0) {
        errors.id = "Идентификатор должен быть положительным целым числом.";
      } else if (Array.isArray(tasks) && tasks.some((t) => t.id === numId)) {
        errors.id = `Задача с id ${numId} уже существует.`;
      } else {
        id = numId;
      }
    }
  }

  const rawTitle = draft.title;
  if (typeof rawTitle !== "string") {
    errors.title = "Название должно быть строкой.";
  } else {
    const trimmed = rawTitle.trim();
    if (trimmed.length < 1) {
      errors.title = "Название не должно быть пустым.";
    } else if (trimmed.length > 100) {
      errors.title = "Название не должно превышать 100 символов.";
    } else {
      title = trimmed;
    }
  }

  if (!ALLOWED_PRIORITIES.has(draft.priority)) {
    errors.priority = "Выберите приоритет: low, medium или high.";
  } else {
    priority = draft.priority;
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }
  return { ok: true, value: { id, title, priority } };
}
