$(function(){
  switch_japanese();
  target = "#textfield";
});

function put_string(chr){
  $(target).shizukey('put_string', {chr: chr});
};

function put_point(type){
  $(target).shizukey('put_point', {type: type});
};

function delete_string(){
  $(target).shizukey('delete_string');
};

function delete_all(){
  $(target).shizukey('delete_all');
};

function move_position(agl){
  $(target).shizukey('move_position', {agl: agl});
};

function switch_target(obj){
  target = "#" + obj.attr("id");
};

function switch_lowercase(){
  $("#uppercase").hide();
  $("#japanese").hide();
  $("#lowercase").show();
};

function switch_uppercase(){
  $("#lowercase").hide();
  $("#japanese").hide();
  $("#uppercase").show();
};

function switch_japanese(){
  $("#lowercase").hide();
  $("#uppercase").hide();
  $("#japanese").show();
};