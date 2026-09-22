"use strict";

const totalTasks = 24;
const completedTasks = 3;
const dailyLimit = 2;

// Здесь разместите своё решение.

if ((typeof completedTasks === "number") && (typeof totalTasks === "number") && (typeof dailyLimit === "number")){
    if((Number.isInteger(completedTasks)) && (Number.isInteger(totalTasks)) && (Number.isInteger(dailyLimit))){
        if(((0 <= totalTasks) && (totalTasks <= 1000)) && ((0 <= completedTasks) && (completedTasks <= totalTasks)) && ((1 <= dailyLimit) && (dailyLimit <= 1000))){
            if((totalTasks == 0) && (completedTasks == 0)){
                console.log("Задач пока нет")
            }
            else{
                let ost = totalTasks - completedTasks
                let ostt = ost
                let day = 0
                console.log("Осталось задач:", ost)
                while(ost !== 0){
                    day += 1
                    if((day % 7 == 6) || (day % 7 == 0)){
                        console.log("День " + day + ": Выходной")
                        continue
                    }
                    if(dailyLimit > ost){
                        console.log("День " + day + ": выполнено " + ost + ", осталось 0")
                        ost = 0
                    }
                    else{
                        ost -= dailyLimit
                        console.log("День " + day + ": выполнено " + dailyLimit + ", осталось " + ost)
                    }
                }
                if(((ostt/dailyLimit)%5 == 0) && (totalTasks != completedTasks)) {
                    console.log("Потребуется рабочих дней: " + (day - (Math.floor((ostt/dailyLimit)/5)*2) + 2))
                }
                else{
                    console.log("Потребуется рабочих дней: " + (day - (Math.floor((ostt/dailyLimit)/5)*2)))
                }
                console.log("Потребуется календарных дней: " + day)
            }
        }
        else{
            console.log("Ошибка: Допустимо 0 <= totalTasks <= 1000 и 0 <= completedTasks <= totalTasks и 1 <= dailyLimit <= 1000")
        }
    }
    else{
        console.log("Ошибка: Введённые числа должны быть целыми и существовать")
    }
}
else{
    console.log("Ошибка: Введённое число не является числом");
}