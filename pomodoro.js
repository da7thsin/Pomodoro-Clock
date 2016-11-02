var audio = new Audio('http://www.freesound.org/data/previews/13/13119_35389-lq.mp3');

function clickEvents(){
  var started = false;
  var activated = false;
  var typeA = '.session';
  var typeB = '.break';
  var tickID;

  function addZero(num){
    if(num < 10){
      return '0' + num;
    }
    else{
      return num;
    }
  }

  function reset(){
    if(!started){
      typeA = '.session';
      typeB = '.break';
      $('.session .min').text('25');
      $('.session .sec').text('00');
      $('.break .min').text('05');
      $('.break .sec').text('00');
    }
  }

  function timeTick(){

    if(!$('.num').hasClass('highlight') && !started){
      startQue(typeA,typeB);
      $('.start').text('stop');
    }
    else if(started){
      started = false;
      clearInterval(tickID);
      $('.start').text('start');
    }

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

    function startQue(a, b){
      typeA = a;
      typeB = b;

      if($('.break').hasClass('active') && started){
        started = false;
        $('.settings').removeClass('active inactive');
        setTimeout(reset,100);
      }
      else{
        audio.play();
        started = true;
        $('.settings').removeClass('active inactive');
        $(a).toggleClass('active');
        $(b).toggleClass('inactive');
        tickID = setInterval(tick, 1000);
      }
    }

  }

  $('.settings').click(function(){
    var now = $(this);

    if(!started){
      now.addClass('active');

      if(!activated && now.hasClass('active')){
        activated = true;
        $('.active .min').addClass('highlight');
      }

      if(now.next().length == 0){
        now.prev().addClass('inactive');
      }
      else{
        now.next().addClass('inactive');
      }
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

  $('.reset').click(reset);

  $('.start').click(timeTick);

}

$(document).ready(function(){
  clickEvents();
});
