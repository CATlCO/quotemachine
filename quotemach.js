var url = "http://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=?"
var quote = function(data) {
  $('.card2').append('<p class="qtext">'+ data.quoteText +'</p>');
  if (data.quoteAuthor === "") { data.quoteAuthor = "Unknown"; }
  $('.card2').append('<p class="author">'+ data.quoteAuthor +'</p>');
}
function reset(){
  $('.l1').css({height: "0"});
  $('.l2').css({width: "0"});
  $('.gear').toggleClass('rotate-right');
  $('.gear').toggleClass('rotate-left');
  $('.card').first().removeClass('card2').addClass('card1');
  $('.cards').prepend('<div class="card card2"><div class="pin"></div></div>');
  $('button').removeAttr('disabled');
  $('button').removeClass('disabled');
}

$(document).ready(function(){
  $('button').removeAttr('disabled');
  $('button').click(function(){
    $(this).attr('disabled','disabled');
    $(this).addClass('disabled');
    $.getJSON(url, quote);
    $('.l1').animate({height: "+=125"}, 2000);
      setTimeout(function(){
        $('.gear').toggleClass('rotate-right');
        $('.gear').toggleClass('rotate-left');
        setTimeout(function(){
          $('.l2').animate({width: "+=350"}, 3000);
          setTimeout(function(){
            $('.lb-head').css("fill", "yellow");
            setTimeout(function(){
              $('.stopper').attr('transform', 'translate(8 44) rotate(-90)');
              $('.card1').addClass('animated hinge');
              setTimeout(function(){
                $('.stopper').removeAttr('transform');
              }, 500);
              $('.card1').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                $('.l1').fadeOut(2000);
                $('.l2').fadeOut(2000);
                $('.lb-head').css("fill", "#c4c4c4");
                setTimeout(function(){
                  reset();
                }, 2000);
              });
            }, 2000);
          }, 1200);
        }, 4000);
      }, 2000);
  });
});