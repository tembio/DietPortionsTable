///<reference path="./portionsTable.ts"/>
window.onload = function () {
    var portionTypes = { protein: 'Proteina', proteinFat: 'Proteina Grasa', fat: 'Grasa', carbs: 'HC', dairy: 'Lacteos', fruit: 'Fruta', vegetables: 'Vegetales' };
    var dietMeals = [
        new Meal("Breakfast", { "protein": 1, "proteinFat": 0, "fat": 0, "carbs": 3, "dairy": 0, "fruit": 2, "vegetables": 0 }),
        new Meal("Lunch", { "protein": 1, "proteinFat": 0, "fat": 0, "carbs": 3, "dairy": 0, "fruit": 2, "vegetables": 0 }),
        new Meal("Dinner", { "protein": 1, "proteinFat": 0, "fat": 0, "carbs": 3, "dairy": 0, "fruit": 2, "vegetables": 0 }),
        new Meal("PostWorkout", { "protein": 1, "proteinFat": 0, "fat": 0, "carbs": 3, "dairy": 0, "fruit": 2, "vegetables": 0 }),
        new Meal("AnyTime", { "protein": 1, "proteinFat": 0, "fat": 0, "carbs": 3, "dairy": 0, "fruit": 2, "vegetables": 0 }),
    ];
    var remainingPortions = [];
    var storedRemainingMeals = JSON.parse(localStorage.getItem('remainingPortions'));
    if (isNewDay())
        remainingPortions = dietMeals;
    else if (storedRemainingMeals)
        storedRemainingMeals.map(function (x) { return remainingPortions.push(new Meal(x.name, x.portions)); });
    else
        remainingPortions = dietMeals;
    var table = new PortionsTable(remainingPortions, 'remainingPortions');
    table.createTable();
};
function isNewDay() {
    var lastDay = localStorage.getItem('lastDay');
    var today = ((new Date()).getDay()).toString();
    if (!lastDay) {
        localStorage.setItem('lastDay', today);
    }
    else {
        if (lastDay != today) {
            localStorage.setItem('lastDay', today);
            return true;
        }
    }
    return false;
}
