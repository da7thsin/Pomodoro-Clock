function clickEvents(){
  var started = false, activated = false;

  function addZero(num){
    if(num < 10){
      return '0' + num;
    }
    else{
      return num;
    }
  }

  function timeTick(){
    var tickID;

    function tick(){
      var minuteVal = $('.active .min'), minute = parseInt(minuteVal.text());
      var secondVal = $('.active .sec'), second = parseInt(secondVal.text());
      second--;

      if(second < 0){
        second = 59;
        minute--;
      }

      if(!minute && !second){
        clearInterval(tickID);
        startQue('.break','.session');
      }

      minuteVal.text(addZero(minute));
      secondVal.text(addZero(second));
    }

    function startQue(typeA, typeB){
      if($('.break').hasClass('active')){
        started = false;
        $('.settings').removeClass('active inactive');
      }
      else{
        $('.settings').removeClass('active inactive');
        $(typeA).toggleClass('active');
        $(typeB).toggleClass('inactive');
        tickID = setInterval(tick, 100);
      }

    }

    if(!$('.settings').hasClass('active')){
      started = true;
      startQue('.session','.break');
    }

  }

  $('.start').click(timeTick);

  $('.settings').click(function(){
    var now = $(this);

    now.addClass('active');

    if(!started && !activated && now.hasClass('active')){
      activated = true;
      $('.active .min').addClass('highlight');
    }

    if(now.next().length == 0){
      now.prev().addClass('inactive');
    }
    else{
      now.next().addClass('inactive');
    }

  });

  $('.num').click(function(){
    var activeDiv = $('.settings').hasClass('active');
    var now = $(this);
    var closest = now.closest('div');

    if(closest.next().length){
      closest = closest.next().find('.num');
    }
    else{
      closest = closest.prev().find('.num');
    }

    if(!started && activeDiv && !now.hasClass('higlight') && closest.hasClass('highlight')){
      now.addClass('highlight');
      closest.removeClass('highlight');
    }

  });

  $('#up').click(function(){
    var highlighted = $('.highlight');
    var value = parseInt(highlighted.text());

    if(!started){
      if(highlighted.hasClass('min')){
        if(value < 30){
          value++;
          highlighted.text(addZero(value));
        }
        else{
          highlighted.text(addZero(1));
        }
      }
      else{
        if(value < 59){
          value++;
          highlighted.text(addZero(value));
        }
        else{
          highlighted.text(addZero(0));
        }
      }
    }

  });

  $('#down').click(function(){
    var highlighted = $('.highlight');
    var value = parseInt(highlighted.text());

    if(!started){
      if(highlighted.hasClass('min')){
        if(value > 1){
          value--;
          highlighted.text(addZero(value));
        }
        else{
          highlighted.text(addZero(30));
        }
      }
      else{
        if(value > 0){
          value--;
          highlighted.text(addZero(value));
        }
        else{
          highlighted.text(addZero(59));
        }
      }
    }

  });

  $('.back').click(function(){
    if(!started){
      activated = false;
      $('.settings').removeClass('active inactive');
      $('.num').removeClass('highlight');
    }
  });

  $('.reset').click(function(){
    if(!started){
      $('.session .min').text('25');
      $('.session .sec').text('00');
      $('.break .min').text('05');
      $('.break .sec').text('00');
    }
  });

}

$(document).ready(function(){
  clickEvents();
});
