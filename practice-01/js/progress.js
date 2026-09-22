"use strict";

const totalTasks = 20;
const completedTasks = 11;

// Здесь разместите своё решение.

if ((typeof completedTasks === "number") && (typeof totalTasks === "number")){
    if((Number.isInteger(completedTasks)) && (Number.isInteger(totalTasks))){
        if(((0 <= totalTasks) && (totalTasks <= 1000)) && ((0 <= completedTasks) && (completedTasks <= totalTasks))){
            if((totalTasks == 0) && (completedTasks == 0)){
                console.log("Задач пока нет")
            }
            else{
                if(completedTasks == 0){
                    console.log("Всего задач:", totalTasks)
                    console.log("Выполнено:", completedTasks)
                    console.log("Осталось:", totalTasks-completedTasks)
                    console.log("Прогресс:", completedTasks / totalTasks * 100,"%")
                    console.log("Статус: Не начато")
                }
                if(completedTasks == totalTasks){
                    console.log("Всего задач:", totalTasks)
                    console.log("Выполнено:", completedTasks)
                    console.log("Осталось:", totalTasks-completedTasks)
                    console.log("Прогресс:", completedTasks / totalTasks * 100,"%")
                    console.log("Статус: Завершено")
                }
                else{
                    console.log("Всего задач:", totalTasks)
                    console.log("Выполнено:", completedTasks)
                    console.log("Осталось:", totalTasks-completedTasks)
                    console.log("Прогресс:", (completedTasks / totalTasks * 100).toFixed(1),"%")
                    console.log("Статус: В работе")
                }
            }
        }
        else{
            console.log("Ошибка: Допустимо 0 <= totalTasks <= 1000 и 0 <= completedTasks <= totalTasks")
        }
    }
    else{
        console.log("Ошибка: Введённые числа должны быть целыми и существовать")
    }
}
else{
    console.log("Ошибка: Введённое число не является числом");
}