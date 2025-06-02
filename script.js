$(document).ready(function(){
  $('#actionBtn').on('click', function() {
      $('#actionMsg').fadeIn(200).delay(1200).fadeOut(400);
  });
    $('#menuBtn').on('click', function() {
      alert('Menu button clicked! (Add your menu logic here)');
    });

});