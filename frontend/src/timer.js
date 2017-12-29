
let t;
class Timer {

  static countdown(secs) {
    const time = document.getElementById('time');
      if (secs === 60 ) {
        time.innerText = `1:00`;
      } else if (secs >= 10) {
        time.innerText = `0:${secs}`;
      } else if (secs < 10 && secs > 0) {
        time.innerText = `0:0${secs}`;
      } else if (secs === 0) {
        time.innerText = `0:0${secs}`;
      }
      
    t = setTimeout(function() { Timer.countdown(secs - 1) }, 1000);
  }

  static showTimer() {
    const timer = document.getElementsByClassName('timer')[0];
    timer.addEventListener('click', function(event) {
      timer.style.display = 'none';
      container.style.display = 'initial';
      handleEvent(event);
    });
  }

}
