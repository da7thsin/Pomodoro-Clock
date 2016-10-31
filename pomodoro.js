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
    started = true;

    $('.session').addClass('active');
    $('.break').addClass('inactive');

    var minuteVal = $('.active .min'), minute = parseInt(minuteVal.text());
    var secondVal = $('.active .sec'), second = parseInt(secondVal.text());


    function tick(){
      second--;

      if(second < 0){
        second = 59;
        minute--;
      }

      minuteVal.text(addZero(minute));
      secondVal.text(addZero(second));
    }

    var intervalID = setInterval(tick,1000);

  }

  $('.settings').click(function(){
    var now = $(this);

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

    if(activeDiv && !now.hasClass('higlight') && closest.hasClass('highlight')){
      now.addClass('highlight');
      closest.removeClass('highlight');
    }

  });

  $('#up').click(function(){
    var highlighted = $('.highlight');
    var value = parseInt(highlighted.text());

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

  });

  $('#down').click(function(){
    var highlighted = $('.highlight');
    var value = parseInt(highlighted.text());

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
      if(value > 1){
        value--;
        highlighted.text(addZero(value));
      }
      else{
        highlighted.text(addZero(59));
      }
    }

  });

  $('.start').click(function(){
      timeTick();
  });

  $('.back').click(function(){
    if(!started){
      activated = false;
      $('.settings').removeClass('active');
      $('.settings').removeClass('inactive');
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
