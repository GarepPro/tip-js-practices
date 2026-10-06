// Перед началом ПР4 заменить этот файл собственной проверенной версией из ПР3.
export function getVisibleTasks(tasks, filter = "all") {
  // TODO: all — копия массива, pending — невыполненные, completed — выполненные.
  if (!Array.isArray(tasks)) return [];
  switch (filter) {
    case "pending":
      return tasks.filter((t) => t.completed === false);
    case "completed":
      return tasks.filter((t) => t.completed === true);
    case "all":
    default:
      return tasks.slice();
  }
}

export function getVisibleTasksByPriority(tasks, filter = "all", priority = "all") {
  const byStatus = getVisibleTasks(tasks, filter);
  if (priority === "all") return byStatus;
  if (!["low", "medium", "high"].includes(priority)) return byStatus;
  return byStatus.filter((t) => t.priority === priority);
}