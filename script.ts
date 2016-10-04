///<reference path="./portionsTable.ts"/>

window.onload = function(){

		let portionTypes = {protein:'Proteina',proteinFat :'Proteina Grasa',fat :'Grasa',carbs :'HC',dairy :'Lacteos',fruit :'Fruta',vegetables:'Vegetales'};

		let dietMeals : Meal[] = [
			new Meal("Breakfast",{"protein":1,"proteinFat":0,"fat":0,"carbs":3,"dairy":0,"fruit":2,"vegetables":0}),
			new Meal("Lunch",{"protein":1,"proteinFat":0,"fat":0,"carbs":3,"dairy":0,"fruit":2,"vegetables":0}),
			new Meal("Dinner",{"protein":1,"proteinFat":0,"fat":0,"carbs":3,"dairy":0,"fruit":2,"vegetables":0}),
			new Meal("PostWorkout",{"protein":1,"proteinFat":0,"fat":0,"carbs":3,"dairy":0,"fruit":2,"vegetables":0}),
			new Meal("AnyTime",{"protein":1,"proteinFat":0,"fat":0,"carbs":3,"dairy":0,"fruit":2,"vegetables":0}),
			];


		

		let remainingPortions : Meal[] = []; 
		let storedRemainingMeals = JSON.parse(localStorage.getItem('remainingPortions'));  

		if(isNewDay())
		  remainingPortions = dietMeals;
		else
			if(storedRemainingMeals)
				storedRemainingMeals.map( x => remainingPortions.push(new Meal(x.name, x.portions)) );
		


		

		let table : PortionsTable = new PortionsTable(remainingPortions,'remainingPortions');
		table.createTable();

};

function isNewDay() : boolean{
	let lastDay = localStorage.getItem('lastDay');
	let today = ((new Date()).getDay()).toString();

	if(!lastDay){
		localStorage.setItem('lastDay', today);
	}else{
		if(lastDay!=today){
		  localStorage.setItem('lastDay', today);
		  return true;
		}
	}

	return false;
}