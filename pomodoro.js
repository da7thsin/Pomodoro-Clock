function clickEvents(){
  var started = false;

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

    if(now.next().length == 0){
      now.prev().addClass('inactive');
    }
    else{
      now.next().addClass('inactive');
    }
  });

  $('#up').click(function(){
    var minVal = $('.active .min');
    var minute = parseInt(minVal.text());

    if(minute < 25){
      minute++;
      minVal.text(addZero(minute));
    }
  });

  $('#down').click(function(){
    var minVal = $('.active .min');
    var minute = parseInt(minVal.text());

    if(minute > 1){
      minute--;
      minVal.text(addZero(minute));
    }
  });

  $('.start').click(function(){
      timeTick();
  });

  $('.back').click(function(){
    if(!started){
      $('.settings').removeClass('active');
      $('.settings').removeClass('inactive');
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
