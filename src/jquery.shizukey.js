/**
shizukey

Copyright (c) 2015 Kana Miyasaka

This software is released under the MIT License.
http://opensource.org/licenses/mit-license.php
*/
;(function($) {
  var characters = {
                  "origin":
                    ["あ", "い", "う", "え", "お",
                     "か", "き", "く", "け", "こ",
                     "さ", "し", "す", "せ", "そ",
                     "た", "ち", "つ", "て", "と",
                     "は", "ひ", "ふ", "へ", "ほ",
                     "や", "ゆ", "よ"],
                  "dakuon":
                    ["あ", "い", "う", "え", "お",
                     "が", "ぎ", "ぐ", "げ", "ご",
                     "ざ", "じ", "ず", "ぜ", "ぞ",
                     "だ", "ぢ", "づ", "で", "ど",
                     "ば", "び", "ぶ", "べ", "ぼ",
                     "や", "ゆ", "よ"],
                  "handaku":
                    ["あ", "い", "う", "え", "お",
                     "か", "き", "く", "け", "こ",
                     "さ", "し", "す", "せ", "そ",
                     "た", "ち", "つ", "て", "と",
                     "ぱ", "ぴ", "ぷ", "ぺ", "ぽ",
                     "や", "ゆ", "よ"],
                  "small":
                    ["ぁ", "ぃ", "ぅ", "ぇ", "ぉ",
                     "か", "き", "く", "け", "こ",
                     "さ", "し", "す", "せ", "そ",
                     "た", "ち", "っ", "て", "と",
                     "は", "ひ", "ふ", "へ", "ほ",
                     "ゃ", "ゅ", "ょ"] }

  var methods = {
    init : function(options){
      return this;
    },
    put_string : function(options){
      var elements = this;
      var defaults = {
            chr : ''
          };
      var setting = $.extend(defaults, options);
      elements.each(function(i, element) {
        $(element).selection('insert', {
          text: setting.chr,
          mode: 'after',
          caret: "end"
        });
        $(element).shizukey('move_position', {agl: 1});
      });
      return this;
    },
    put_point : function(options){
      var elements = this;
      var defaults = {
            type : 'dakuon'
          };
      var setting = $.extend(defaults, options);
      elements.each(function(i, element) {
        pos = $(element).selection('getPos');
        $(element).selection('setPos', {start: pos["start"]-1, end: pos["end"]});
        str = $.selection('text')
        index = $.inArray(str, characters["origin"])
        if (index >= 0){
          $(element).selection('replace', {
            text: characters[setting.type][index],
            mode: 'after',
            caret: "end"
          });
        }
        $(element).selection('setPos', {start: pos["start"], end: pos["end"]});
      });
      return this;
    },
    delete_string : function(options){
      var elements = this;
      var defaults = {};
      var setting = $.extend(defaults, options);
      elements.each(function(i, element) {
        pos = $(element).selection('getPos');
        $(element).selection('setPos', {start: pos["start"]-1, end: pos["end"]});
        $(element).selection('replace', {
          text: "",
          mode: 'after',
          caret: "end"
        });
      });
      return this;
    },
    delete_all : function(options){
      var elements = this;
      var defaults = {};
      var setting = $.extend(defaults, options);
      elements.each(function(i, element) {
        elements.selection('setPos', {start: 0, end: elements.val().length});
        elements.selection('replace', {
          text: "",
          mode: 'after',
          caret: "end"
        });
      });
      return this;
    },
    move_position : function(options){
      var elements = this;
      var defaults = {
            agl : 1
          };
      var setting = $.extend(defaults, options);
      elements.each(function(i, element) {
        pos = $(element).selection('getPos');
        $(element).selection('setPos', {start: pos["start"]+setting.agl, end: pos["end"]+setting.agl});
      });
      return this;
    }
  }
  $.fn.shizukey = function(method){
    if ( methods[method] ) {
      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.shizukey' );
    }
  };
})(jQuery);