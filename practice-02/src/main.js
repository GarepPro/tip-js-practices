import { demoTasks, variantNumber, variantTasks } from "./data.js";
import {
  createTask,
  findTaskById,
  getPendingTasks,
  getTaskTitles,
  getTaskStats,
  addTask,
  setTaskCompleted,
  renameTask,
  removeTask,
  getPrioritySummary,
} from "./task-service.js";

console.log("ПР2. Заготовка демонстрационного сценария");
console.log("Количество задач в общем наборе:", demoTasks.length);
console.log("Номер варианта:", variantNumber);
console.log("Количество задач в индивидуальном наборе:", variantTasks.length);

// TODO: после реализации функций выполнить общий сценарий из раздела 6.5.
// Текущее состояние хранится в локальной переменной:
let currentTasks = demoTasks;
// После успешной операции currentTasks получает result.tasks.
// При result.ok === false необходимо вывести ошибку, не заменяя состояние.
// Сводка выводится после каждого этапа; вычисления выполняются в task-service.js.

function applyresult(result){
  if (result.ok) {
    currentTasks = result.tasks;
  }
  else{
    console.log("Ошибка: " + result.error)
  }
}

function printstats(tasks){
  const {total, completed, pending, progress} = getTaskStats(tasks);
  console.log("Всего задач: " + total + "; выполнено: " + completed + "; осталось: " + pending);
  if (total === 0){
    console.log("Задач пока нет")
  }
  else{
    console.log("Прогресс: " + progress.toFixed(1) + "%")
  }
}

//1
console.log(getTaskTitles(currentTasks))
console.log(getPendingTasks(currentTasks).map((task) => task.id))
printstats(currentTasks)

//2

applyresult(addTask(currentTasks, 20 , "Добавить проверку", "high"))
printstats(currentTasks);

//3

applyresult(setTaskCompleted(currentTasks, 4 , true))
printstats(currentTasks)

//4

applyresult(renameTask(currentTasks, 10, "Подготовить инструкцию запуска"))
printstats(currentTasks)

//5

applyresult(removeTask(currentTasks, 7))
printstats(currentTasks)

//6

applyresult(addTask(currentTasks, -1, "гыг", "high"))
printstats(currentTasks)

//7

console.log(demoTasks.map((task) => task.id));

// TODO: выполнить отдельный сценарий для variantTasks по разделу 7.
// Общий набор demoTasks не заменяется данными варианта.

function applyvariantresult(result){
  if (result.ok) {
    variantcurret = result.tasks;
  }
  else{
    console.log("Ошибка: " + result.error)
  }
}

let variantcurret = variantTasks

//1
console.log(getTaskTitles(variantcurret))
console.log(getPendingTasks(variantcurret).map((task) => task.id))
printstats(variantcurret)

//2
applyvariantresult(addTask(variantcurret, 80, "Провести репетицию семинара", "high"))
printstats(variantcurret)

//3
applyvariantresult(setTaskCompleted(variantcurret, 11, true))
printstats(variantcurret)

//4
applyvariantresult(renameTask(variantcurret, 23, "  Подготовить раздаточные материалы  "))
printstats(variantcurret)

//5
applyvariantresult(removeTask(variantcurret, 37))
printstats(variantcurret)

//6
applyvariantresult(addTask(variantcurret, 80, "гыг", "high"))
printstats(variantcurret)

//7
console.log(variantcurret.map((task) => task.id))
printstats(variantcurret)
console.log(variantTasks.map((task) => task.id))
console.log(variantTasks.length)


// TODO: показать хотя бы одну обработанную ошибку и неизменность исходных данных.
// Для удобного вывода объектов допустимо использовать console.table().

console.log(demoTasks.map((task) => task.id));
console.log(variantTasks.map((task) => task.id))
applyresult(addTask(currentTasks, -1, "гыг", "high"))

//расширение Б

console.log(getPrioritySummary(demoTasks));
console.log(getPrioritySummary(variantTasks));
console.log(getPrioritySummary([]));
const pr = [
    {id: 1, title: "1", completed: false, priority: "high"},
    {id: 2, title: "2", completed: true,  priority: "high"},
    {id: 3, title: "3", completed: false, priority: "high"},
];
console.log(getPrioritySummary(pr));
const pr1 = [
    {id: 1, title: "1", completed: false, priority: "low"},
    {id: 2, title: "2", completed: true,  priority: "medium"},
  ];
console.log(pr1);
getPrioritySummary(pr1);
console.log(pr1);