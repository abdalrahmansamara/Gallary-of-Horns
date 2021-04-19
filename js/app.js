'use strict';
let selectElements = [];
const Horn = function(obj) {
  this.title = obj.title;
  this.url = obj.image_url;
  this.horns = obj.horns;
  this.description = obj.description;
  this.keyword = obj.keyword;
};
Horn.prototype.render = function () {
  let $newRender = $('#photo-template').clone();
  $('main').append($newRender);
  $newRender.removeAttr('id');
  $newRender.find('h2').text(this.title);
  $newRender.find('img').attr('src', this.url);
  $newRender.find('p').text(this.description);
  $newRender.find('h4').text(this.horns);
  $newRender.find('h5').text(this.keyword);
};

$.ajax('data/page-1.json')
  .then(data => {
    data.forEach(obj => {
      if(!selectElements.includes(obj.keyword)) {selectElements.push(obj.keyword);}
      let newObj = new Horn(obj);
      newObj.render();

    });
    selectElements.forEach((keyword,idx) => {
      let newOption = ` <option value="${keyword}" id = "${idx}">${keyword}</option>`;
      $('select').append(newOption);
    });
  });

$('select').on('change', function () {
  let $newValue = $('select').val();
  console.log($('this').attr('id'));
  let len = $('div').length;
  for(let i = 1; i <= len; i++ ){
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
