export const STORAGE_VERSION = 1;

const ALLOWED_PRIORITIES = new Set(["low", "medium", "high"]);

// Все функции принимают объект storage явно, чтобы их можно было проверить
// без обращения к глобальному window.localStorage.

function isValidTask(task) {
  if (task === null || typeof task !== "object") return false;
  if (
    typeof task.id !== "number" ||
    !Number.isSafeInteger(task.id) ||
    task.id <= 0
  ) {
    return false;
  }
  if (typeof task.title !== "string") return false;
  const trimmed = task.title.trim();
  if (trimmed.length < 1 || trimmed.length > 100) return false;
  if (typeof task.completed !== "boolean") return false;
  if (!ALLOWED_PRIORITIES.has(task.priority)) return false;
  return true;
}

export function isValidTaskList(value) {
  // TODO: проверить массив задач, поля каждой задачи и уникальность id.
  if (!Array.isArray(value)) return false;
  const seen = new Set();
  for (const task of value) {
    if (!isValidTask(task)) return false;
    if (seen.has(task.id)) return false;
    seen.add(task.id);
  }
  return true;
}

function copyTasks(tasks) {
  return tasks.map((task) => ({ ...task }));
}

export function loadTasks(storage, key, fallbackTasks) {
  // TODO: прочитать строку, разобрать объект { version, tasks }, проверить данные.
  // Нет записи: { ok: true, source: "initial", tasks: копия fallbackTasks }.
  // Есть корректная запись: { ok: true, source: "storage", tasks: новая копия }.
  // Ошибка чтения, JSON или схемы: { ok: false, source: "fallback",
  // tasks: копия fallbackTasks, error: "понятное сообщение" }.
  const fallbackCopy = copyTasks(fallbackTasks);
  try {
    const raw = storage.getItem(key);
    if (raw === null) {
      return { ok: true, source: "initial", tasks: fallbackCopy };
    }
    const parsed = JSON.parse(raw);
    if (
      parsed === null ||
      typeof parsed !== "object" ||
      parsed.version !== STORAGE_VERSION
    ) {
      return {
        ok: false,
        source: "fallback",
        tasks: fallbackCopy,
        error: "Версия сохранённых данных не поддерживается.",
      };
    }
    if (!isValidTaskList(parsed.tasks)) {
      return {
        ok: false,
        source: "fallback",
        tasks: fallbackCopy,
        error: "Сохранённые задачи повреждены или имеют неверный формат.",
      };
    }
    return { ok: true, source: "storage", tasks: copyTasks(parsed.tasks) };
  } catch (error) {
    return {
      ok: false,
      source: "fallback",
      tasks: fallbackCopy,
      error: `Не удалось прочитать сохранённые данные: ${error.message}`,
    };
  }
}

export function saveTasks(storage, key, tasks) {
  // TODO: проверить задачи и сохранить JSON.stringify({ version, tasks }).
  // Вернуть { ok: true } либо { ok: false, error: "..." }; исключение не выпускать.
  if (!isValidTaskList(tasks)) {
    return { ok: false, error: "Некорректный список задач — запись отменена." };
  }
  try {
    const payload = JSON.stringify({ version: STORAGE_VERSION, tasks });
    storage.setItem(key, payload);
    return { ok: true };
  } catch (error) {
    return { ok: false, error: `Не удалось сохранить данные: ${error.message}` };
  }
}

export function removeSavedTasks(storage, key) {
  // TODO: удалить только переданный ключ; вернуть результат и перехватить исключение.
  try {
    storage.removeItem(key);
    return { ok: true };
  } catch (error) {
    return { ok: false, error: `Не удалось удалить данные: ${error.message}` };
  }
}
