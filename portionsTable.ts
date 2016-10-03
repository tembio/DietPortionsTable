interface Portion<T> {
	protein : T,
	proteinFat : T,
	fat : T,
	carbs : T,
	dairy : T,
	fruit : T,
	vegetables : T
}
type PortionType = 'protein' | 'proteinFat' | 'fat' | 'carbs' | 'dairy' | 'fruit' | 'vegetables';
interface PortionLabels extends Portion<string>{}
interface PortionAmounts extends Portion<Number>{}

class Meal{

	name : string;
	portions : PortionAmounts; 

	constructor(name : string,portions : PortionAmounts){
		this.name = name;
		this.portions = portions || 
		  {
			protein : 0,
			proteinFat : 0,
			fat : 0,
			carbs : 0,
			dairy : 0,
			fruit : 0,
			vegetables : 0
		  };
	}

	public getMealLabel() : string{
		return this.name;
	}

	public substractPortion(portion : PortionType) : Number{
		if(this.portions[portion]>0)
		  this.portions[portion] -= 1;
		return this.portions[portion];
	}

	public addPortion(portion : PortionType) : Number{
		this.portions[portion] += 1;
		return this.portions[portion];
	}
}

class PortionsTable{
	meals : Meal[];
	portionLabels : PortionLabels;

	static HOLD_TIME = 500;

	constructor(meals : Meal[], portionLabels? : PortionLabels){
	    this.meals = meals;
	    this.portionLabels = portionLabels || 
	      {
			protein : 'Protein',
			proteinFat : 'ProteinFat',
			fat : 'Fat',
			carbs : 'Carbs',
			dairy : 'Dairy',
			fruit : 'Fruit',
			vegetables : 'Vegetables'
		  };
	}

	public createTable() : void{
		let table = document.getElementById("portionsTable");

		table.appendChild(this.createHeaderRow());
		this.meals.map(meal => table.appendChild(this.createMealRow(meal)));
	}

	private createHeaderRow() : HTMLElement {
		let headerRow : HTMLElement = document.createElement('tr');
		headerRow.id  = 'headerRow';

		let firstHeaderCol = document.createElement('th');
		firstHeaderCol.id = 'cornerCell';
		firstHeaderCol.innerHTML = "";
		headerRow.appendChild(firstHeaderCol);	

		for (let portionType in this.portionLabels){
			let headerCol = document.createElement('th');

			headerCol.id = portionType;
			headerCol.innerHTML = this.portionLabels[portionType];
			headerRow.appendChild(headerCol);	
		}

		return headerRow;
	}

	private createMealRow(meal : Meal)  : HTMLElement{
		let row : HTMLElement = document.createElement('tr');
		row.id  = meal.name;
		this.addColumns(row,meal);

		return row;
	}

	private addColumns(row : HTMLElement, meal : Meal)  : void{
		row.appendChild(this.createCell(meal.name, meal.getMealLabel()));

		for (let portionType in this.portionLabels){
			let cell = this.createCell(meal.name+'-'+portionType, meal.portions[portionType] || '');
			this.handleCellEvents(cell, meal, <PortionType>portionType);
			row.appendChild(cell);	
		}
	}

	private handleCellEvents(cell : HTMLElement, meal : Meal, portionType : PortionType) : void{
            let startMousedown;
            let timer;
			cell.onmousedown = () =>{ 
								startMousedown = (new Date()).getTime(); 
								timer = setTimeout(() =>{
												cell.innerHTML = '' + meal.addPortion(portionType); 
												this.storeData();
							    		}, PortionsTable.HOLD_TIME);
							};
			cell.onmouseup = () =>{ 
				                    if(new Date().getTime() - startMousedown < PortionsTable.HOLD_TIME){
									    clearTimeout(timer);
									    cell.innerHTML = (meal.substractPortion(portionType)||'')+'';
										this.storeData();
				                    }
								}
	} 

	private createCell(id : string, value : string) : HTMLElement{
		let cell = document.createElement('td');
		cell.id = id;
		cell.innerHTML = value;
		return cell;
	}

	private storeData() : void{
		localStorage.setItem('meals', JSON.stringify(this.meals));
		console.log(localStorage.getItem('meals'));
	}
}


function test(){

		let portionTypes = {protein:'Proteina',proteinFat :'Proteina Grasa',fat :'Grasa',carbs :'HC',dairy :'Lacteos',fruit :'Fruta',vegetables:'Vegetales'};
		let mealNames = ['Breakfast','Lunch','Dinner'];
		let portion = {
			protein : 1,
			proteinFat : 0,
			fat : 2,
			carbs : 3,
			dairy : 0,
			fruit : 2,
			vegetables : 0
		  };

		let table : PortionsTable;
		let storedMeals : Meal[] = JSON.parse(localStorage.getItem('meals'));
		let meals;

		if(storedMeals!=null){
          meals = storedMeals.map(m => new Meal(m.name,m.portions));
		}else{
          meals = mealNames.map(name => new Meal(name,portion));
		}

		table =   new PortionsTable(meals, portionTypes);
		table.createTable();

}

