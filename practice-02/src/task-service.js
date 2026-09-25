// Заготовка модуля. throw ниже отмечает отсутствие реализации,
// а не способ обработки некорректных данных в готовом решении.
// Для предусмотренных ошибок необходимо возвращать { ok: false, error: "..." }.
// console.log(), prompt(), document и чтение внешнего состояния здесь не нужны.

import { demoTasks } from "./data.js";

function idcheck(id){
  if ((typeof(id) !== "number") || (!Number.isSafeInteger(id)) || (id <= 0)){
    return {ok: false, error: "id должен быть положительным безопасным целым числом"};
  }
  return {ok: true};
}

function checktitle(title){
  if (typeof(title) !== "string"){
    return {ok: false, error: "title должен быть строкой"};
  }
  if (((title.trim()).length < 1) || ((title.trim()).length > 100)){
    return {ok: false, error: "title должен содержать от 1 до 100 символов"};
  }
  return {ok: true, title: title.trim()};
}

export function createTask(id, title, priority = "medium") {
  // TODO: проверить поля и вернуть результат создания задачи.
  if (idcheck(id).ok !== true){
    return idcheck(id)
  }
  if (checktitle(title).ok !== true){
    return checktitle(title)
  }
  if ((priority !== "low") && (priority !== "medium") && (priority !== "high")){
    return {ok: false, error: "priority должен быть low, medium или high"};
  }
  return{
    ok: true,
    task:{
      id,
      title: title.trim(),
      completed: false,
      priority,
    },
  };
}
export function findTaskById(tasks, id) {
  // TODO: найти задачу с помощью find(); отсутствие результата — undefined.
  return tasks.find((task) => task.id === id)
}

export function getPendingTasks(tasks) {
  // TODO: вернуть новый массив невыполненных задач с помощью filter().
  return tasks.filter((task) => task.completed === false)
}

export function getTaskTitles(tasks) {
  // TODO: вернуть массив названий с помощью map().
  return tasks.map((task) => task.title)
}

export function getTaskStats(tasks) {
  // TODO: вернуть { total, completed, pending, progress }.
  const total = tasks.length
  const pending = getPendingTasks(tasks).length
  const completed = total - pending
  let progress = 0
  if (total !== 0){progress = completed/total*100}
  return{
    total,
    completed,
    pending,
    progress,
  }
}

export function addTask(tasks, id, title, priority = "medium") {
  // TODO: проверить данные через createTask(), исключить дублирование id,
  // вернуть { ok: true, tasks: новыйМассив } без изменения исходного массива.
  const createdtask = createTask(id, title, priority)
  if(createdtask.ok === false){
    return createdtask
  }
  if((tasks.find((task) => task.id === id)) !== undefined){
    return {ok: false, error: "Задача с id " + id + " уже существует"};
  }
  return {ok: true, tasks: [...tasks, createdtask.task]};
}

export function setTaskCompleted(tasks, id, completed) {
  // TODO: проверить id и completed, найти задачу, создать обновлённые данные.
  if (idcheck(id).ok !== true){
    return idcheck(id)
  }
  if (typeof completed !== "boolean"){
    return {ok: false, error: "completed должен быть true или false"}
  }
  const target = tasks.find((task) => task.id === id);
  if (target === undefined){
    return {ok: false, error: "Задача с id " + id + " не найдена"}
  }
  const updated = tasks.map((task) => {
    if (task.id === id){
      return {...task, completed};
    }
    return task;
  });
  return {ok: true, tasks: updated};
}

export function renameTask(tasks, id, title) {
  // TODO: проверить id и title, изменить только название выбранной задачи.
  if (idcheck(id).ok !== true){
    return idcheck(id)
  }
  if (checktitle(title).ok !== true){
    return checktitle(title)
  }
  const target = tasks.find((task) => task.id === id)
  if (target === undefined){
    return {ok: false, error: "Задача с id " + id + " не найдена"}
  }
  const updated = tasks.map((task) => {
    if (task.id === id){
      return {...task, title: checktitle(title).title};
    }
    return task;
  });
  return {ok: true, tasks: updated};
}

export function removeTask(tasks, id) {
  // TODO: проверить id, обработать отсутствие задачи, вернуть новый массив.
  if (idcheck(id).ok !== true){
    return idcheck(id)
  }
  const target = tasks.find((task) => task.id === id)
  if (target === undefined){
    return {ok: false, error: "Задача с id " + id + " не найдена"}
  }
  const updated = tasks.filter((task) => task.id !== id);
  return {ok: true, tasks: updated};
}

export function getPrioritySummary(tasks) {
  const summary = {
    low: {total: 0, pending: 0},
    medium: {total: 0, pending: 0},
    high: {total: 0, pending: 0},
  };

  for (const priority of ["low", "medium", "high"]) {
    const withPriority = tasks.filter((task) => task.priority === priority);
    summary[priority].total = withPriority.length;
    summary[priority].pending = withPriority.filter((task) => task.completed === false).length;
  }
  return summary;
}