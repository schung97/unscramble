let off = false;
let t;
class Timer {

  static countdown(secs) {
    const time = document.getElementById('time');
      if (secs === 60 ) {
        time.innerText = `1:00`;
      } else if (secs >= 10) {
        time.innerText = `0:${secs}`;
      } else if (secs < 10 && secs > 1) {
        time.innerText = `0:0${secs}`;
      } else if (secs === 1) {
        time.innerText = `0:0${secs}`;
        off = true;
      } else if (secs === 0) {
        time.innerText = `0:0${secs}`;
        document.getElementsByName('play-again')[0].style.display = 'initial';
        document.getElementsByName('submit')[1].disabled = true;
        console.log(`[from countdown]--> at 0sec, [ before - whenZero]`)
        Attempt.whenZero();
        console.log(`[from countdown]--> at 0sec, [ after - whenZero]`)
      }
    t = setTimeout(function() { Timer.countdown(secs - 1) }, 1000);
  }

  // static showTimer() {
  //   const timer = document.getElementsByClassName('timer')[0];
  //   timer.addEventListener('click', function(event) {
  //
  //     handleEvent(event);
  //     User.attempts();
  //     console.log(`[from showTimer]--> clicked:${event.target.nodeName} ${event.target.nodeName.id}`)
  //   });
  // }


}
