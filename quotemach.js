var url = "http://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=?"
var quote = function(data) {
  $('.card2').append('<p class="qtext">' + data.quoteText + '</p>');
  if (data.quoteAuthor === "") {
    data.quoteAuthor = "Unknown";
  }
  $('.card2').append('<p class="author">' + data.quoteAuthor + '</p>');
}

function reset() {
  $('.l1').css({
    height: "0"
  });
  $('.l2').css({
    width: "0"
  });
  $('.gear').toggleClass('rotate-right');
  $('.gear').toggleClass('rotate-left');
  $('.card').first().removeClass('card2').addClass('card1');
  $('.cards').prepend('<div class="card card2"><div class="pin"></div></div>');
  $('button').removeAttr('disabled');
  $('button').removeClass('disabled');
}

$(document).ready(function() {
  $('button').removeAttr('disabled');
  $('button').click(function() {
    $(this).attr('disabled', 'disabled');
    $(this).addClass('disabled');
    $.getJSON(url, quote);
    $('.l1').animate({
      height: "+=125"
    }, 1000);
    setTimeout(function() {
      $('.gear').toggleClass('rotate-right');
      $('.gear').toggleClass('rotate-left');
      setTimeout(function() {
        $('.l2').animate({
          width: "+=350"
        }, 1500);
        setTimeout(function() {
          $('.lb-head').css("fill", "yellow");
          setTimeout(function() {
            $('.stopper').addClass("rotate");
            $('.card1').addClass('animated hinge');
            setTimeout(function() {
              $('.stopper').removeClass('rotate');
            }, 250);
            $('.card1').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
              $('.lb-head').css("fill", "#c4c4c4");
              reset();
            });
          }, 1000);
        }, 600);
      }, 2000);
    }, 1000);
  });
});
