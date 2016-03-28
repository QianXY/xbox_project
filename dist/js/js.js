$(document).ready(function() {

//Declare the elements we are going to use as variables
var input = $('.input');
	player = $('.player');
	searchbutton = $('.searchButton');

//On Mouseover of the player, add the class 'playerhover' to '.player' and 'searchButtonHover' to '.searchButton'
player.mouseover(
  function () {
    player.addClass('playerHover');
	searchbutton.addClass('searchButtonHover');
  });
  
//On Mouseout of the player, remove the class 'playerhover' to '.player' and 'searchButtonHover' to '.searchButton'  
player.mouseout(
  function () {
    player.removeClass('playerHover');
	searchbutton.removeClass('searchButtonHover');
  });

//On focus of '.input' add the class 'playerfocus' to '.player' and 'searchButtonHover' to '.searchButton'  
input.focus(function() {
	
	player.addClass('playerFocus');
	searchbutton.addClass('searchButtonFocus');
});

//On Blur of '.input' remove the class 'playerfocus' to '.player' and 'searchButtonHover' to '.searchButton'  
input.blur(function() {
	
	player.removeClass('playerFocus')
	searchbutton.removeClass('searchButtonFocus');

});

});

