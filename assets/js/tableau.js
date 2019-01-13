//initialize a global viz variable in tableau.js
var viz;
var worksheet;

window.onload= function() {
//load viz
    var vizDiv = document.getElementById('myViz');
    var vizURL = 'https://public.tableau.com/views/GithubQuality/Stockexchange';
    var options = {
        hideToolbar: true,
        hideTabs: true,
        width: "1100px",
        height: "800px",
    };
    viz = new tableau.Viz(vizDiv, vizURL, options);
};


function switchView(sheetName) {
    var workbook = viz.getWorkbook();
    workbook.activateSheetAsync(sheetName);
    worksheet = sheetName;
    var activeSheet = workbook.getActiveSheet()
    // this.clearFilter(activeSheet, "Year of Account Period");
}

function getTitleOfSheet(sheetName) {
    if (sheetName === 'Average Age') return 'What is the trend in the average age of the board of director?';
    else if (sheetName === 'Board Supervisor') return 'What is the break down of the number of board of supervisor?';
    else if (sheetName === 'Educational Background') return 'What is the educational background of the board of supervisor?';
    else if (sheetName === 'Ownership Concentration') return 'What is the ownership concentration?';
    else if (sheetName === 'Stock Exchange') return 'What is the effect of the Stock Exchange?';
    else return '';
}

function processViewSwitch(sheetName,e) {
    // change title via inner html
    var titleElement = document.getElementById('title');
    titleElement.innerHTML = this.getTitleOfSheet(sheetName);
    //assign active class
    this.getActiveClass(e);

    //clear all filters
    // worksheet.clearFilter("Industry");
    // worksheet.clearFilter("Listing location name");
    // worksheet.clearFilter("Year of Account Period");
    // worksheet.clearFilter("province_eng");
    //swtich view of sheet
    this.switchView(sheetName);
    this.clearFilter();
}

function clearFilter() {
    // sheet.clearFilterAsync(col);
    viz.revertAllAsync();
}

function getFilters(workbook) {
    console.log(workbook.getActiveSheet());
    workbook.getActiveSheet().getFiltersAsync().then(function(filters) {
      console.log("promise returned");
      // Iterate (using ES6 style) through the filters retrieving properties
      for (filter of filters) {
        console.log(filter.getFieldName());
        console.log(filter.getFilterType());
      }
    });
  }

function getActiveClass(e) {
    var elems = document.querySelector(".active");
    if(elems !==null){
     elems.classList.remove("active");
    }
   e.target.className = "active";
  }


