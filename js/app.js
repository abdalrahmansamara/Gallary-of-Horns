'use strict';
let selectElements = [];
let all = [];
let currentPage = '1';
let currentSort = 'default';
const Horn = function(obj) {
  this.title = obj.title;
  this.url = obj.image_url;
  this.horns = obj.horns;
  this.description = obj.description;
  this.keyword = obj.keyword;
  all.push(this);
};
Horn.prototype.render = function () {
  let template = $('#photo-template').html();
  let rendering = Mustache.render(template,this);
  $('main').append(rendering);
};

$.ajax('data/page-1.json') .then(renderData);

function renderData(data) {
  selectElements = [];
  data.forEach(obj => {
    if(!selectElements.includes(obj.keyword)) {selectElements.push(obj.keyword);}
    new Horn(obj);
  });
  renderTheAll();
  generateTheList();
}

function renderTheAll() {
  all.forEach(objec =>{
    objec.render();
  });
}

function generateTheList() {
  selectElements.forEach((keyword,idx) => {
    let newOption = ` <option value="${keyword}" id = "${idx}">${keyword}</option>`;
    $('select:eq(0)').append(newOption);
  });
}


$('button').on('click', function() {
  let newPage = this.id;
  if(newPage === currentPage) {return true;}
  currentPage = newPage;
  $('main').empty();
  $('select:eq(0)').empty();
  $('select:eq(0)').append(`<option value="default">Filter by Keyword</option>`);
  $('select:eq(1)').prop('selectedIndex', 0).val();
  all = [];
  getJSONdata(newPage);
});

function getJSONdata (newPage) {
  if(newPage === '1'){
    $.ajax('data/page-1.json')
      .then(renderData);
  }
  else if (newPage === '2'){
    $.ajax('data/page-2.json')
      .then(renderData);
  }
}


$('select').on('change', function () {
  let $newValue = $('select:eq(0)').val();
  let $newValue2 = $('select:eq(1)').val();
  let len = $('div').length;
  if($newValue2 !== currentSort) {
    currentSort = $newValue2;
    $('main').empty();
    if($newValue2 === '1') {
      all = sortByHorns(all);
      renderTheAll();
    }
    else if ($newValue2 === '2') {
      all = sortByTitle(all);
      renderTheAll();
    }
    else if ($newValue2 === 'default') {
      all = [];
      getJSONdata(currentPage);
      $('select:eq(0)').prop('selectedIndex', 0).val();
      //check if we are in the first or the second page
    }
  }


  for(let i = 0; i < len; i++ ){
    if ($newValue === 'default') {
      $('div').removeClass('displays');
    }
    else if($(`div h5:eq(${i})`).text() === $newValue){
      $(`div:eq(${i})`).removeClass('displays');
    }
    else if($(`div h5:eq(${i})`).text() !== $newValue){
    //   console.log($(`div h5:eq(${i})`).text());
      $(`div:eq(${i})`).addClass('displays');
    }

  }
});

function sortByHorns (arr) {
  arr.sort((a,b)=> {
    if(a.horns > b.horns)
      return 1;
    else if ( a.horns < b.horns )
      return -1;
  });
  return arr;
}
function sortByTitle (arr) {
  arr.sort((a,b) => {
    if (a.title.toUpperCase() < b.title.toUpperCase()){
      return -1;
    }
    else if (a.title.toUpperCase() > b.title.toUpperCase()) return 1;
  });
  return arr;
}

// $('select:eq(1)').on('change', function () {
//   let $newValue2 = $('select:eq(1)').val();
//   console.log($newValue2);
// });
