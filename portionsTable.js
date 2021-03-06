var Meal = (function () {
    function Meal(name, portions) {
        this.name = name;
        this.portions = portions ||
            {
                protein: 0,
                proteinFat: 0,
                fat: 0,
                carbs: 0,
                dairy: 0,
                fruit: 0,
                vegetables: 0
            };
    }
    Meal.prototype.getMealLabel = function () {
        return this.name;
    };
    Meal.prototype.substractPortion = function (portion) {
        if (this.portions[portion] > 0)
            this.portions[portion] -= 1;
        return this.portions[portion];
    };
    Meal.prototype.addPortion = function (portion) {
        this.portions[portion] += 1;
        return this.portions[portion];
    };
    return Meal;
}());
var PortionsTable = (function () {
    function PortionsTable(meals, tableID, portionLabels) {
        this.meals = meals;
        this.targetHTML = tableID;
        this.storageKey = tableID;
        this.portionLabels = portionLabels ||
            {
                protein: 'Protein',
                proteinFat: 'ProteinFat',
                fat: 'Fat',
                carbs: 'Carbs',
                dairy: 'Dairy',
                fruit: 'Fruit',
                vegetables: 'Vegetables'
            };
    }
    PortionsTable.prototype.createTable = function () {
        var _this = this;
        var table = document.getElementById(this.targetHTML);
        table.appendChild(this.createHeaderRow());
        this.meals.map(function (meal) { return table.appendChild(_this.createMealRow(meal)); });
    };
    PortionsTable.prototype.createHeaderRow = function () {
        var headerRow = document.createElement('tr');
        headerRow.id = 'headerRow';
        var firstHeaderCol = document.createElement('th');
        firstHeaderCol.id = 'cornerCell';
        firstHeaderCol.innerHTML = "";
        headerRow.appendChild(firstHeaderCol);
        for (var portionType in this.portionLabels) {
            var headerCol = document.createElement('th');
            headerCol.id = portionType;
            headerCol.innerHTML = this.portionLabels[portionType];
            headerCol.classList.add(portionType);
            headerRow.appendChild(headerCol);
        }
        return headerRow;
    };
    PortionsTable.prototype.createMealRow = function (meal) {
        var row = document.createElement('tr');
        row.id = meal.name;
        this.addColumns(row, meal);
        return row;
    };
    PortionsTable.prototype.addColumns = function (row, meal) {
        var rowHeader = this.createCell(meal.name, meal.getMealLabel());
        rowHeader.classList.add("rowHeader");
        row.appendChild(rowHeader);
        for (var portionType in this.portionLabels) {
            var cell = this.createCell(meal.name + '-' + portionType, meal.portions[portionType] || '');
            cell.classList.add(portionType);
            this.handleCellEvents(cell, meal, portionType);
            row.appendChild(cell);
        }
    };
    PortionsTable.prototype.handleCellEvents = function (cell, meal, portionType) {
        var _this = this;
        var startMousedown;
        var timer;
        cell.onmousedown = function () {
            startMousedown = (new Date()).getTime();
            timer = setTimeout(function () {
                cell.innerHTML = '' + meal.addPortion(portionType);
                _this.storeData();
            }, PortionsTable.HOLD_TIME);
        };
        cell.onmouseup = function () {
            if (new Date().getTime() - startMousedown < PortionsTable.HOLD_TIME) {
                clearTimeout(timer);
                cell.innerHTML = (meal.substractPortion(portionType) || '') + '';
                _this.storeData();
            }
        };
    };
    PortionsTable.prototype.createCell = function (id, value) {
        var cell = document.createElement('td');
        cell.id = id;
        cell.innerHTML = value;
        return cell;
    };
    PortionsTable.prototype.storeData = function () {
        localStorage.setItem(this.storageKey, JSON.stringify(this.meals));
        console.log(localStorage.getItem(this.storageKey));
    };
    PortionsTable.HOLD_TIME = 500;
    return PortionsTable;
}());
