let t;
class Timer {

  // static countdown(secs) {
  //   const time = document.getElementById('time');
  //
  //   window.setTimeout(function() {
  //     if (secs === 60) {
  //       time.innerText = `1:00`;
  //       Timer.countdown(secs - 1);
  //     } else if (secs >= 10) {
  //       time.innerText = `0:${secs}`;
  //       Timer.countdown(secs - 1);
  //     } else if (secs < 10 && secs > 0) {
  //       time.innerText = `0:0${secs}`;
  //       Timer.countdown(secs - 1);
  //     } else if (secs === 0) {
  //       time.innerText = `0:0${secs}`;
  //       return 0;
  //     }
  //   }, 1000);
  // }


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



// function countdown(secs) {
//   const time = document.getElementById('time')
//   let obj = getSubmitValue();
//   debugger
//   let word = obj[0];
//   let boolean = obj[1];
//   let count = obj[2];
//
//   if (boolean === false) {
//     window.setTimeout(function() {
//       if (secs === 60) {
//         time.innerText = `1:00`;
//         countdown(secs - 1);
//       } else if (secs >= 10) {
//         time.innerText = `0:${secs}`;
//         countdown(secs - 1);
//       } else if (secs < 10 && secs >=0) {
//         time.innerText = `0:0${secs}`;
//         countdown(secs - 1);
//       }
//     }, 1000);
//   } else {
//     if (secs === 0) {
//       time.innerText = "GOODLUCK TRYING!";
//       time.innerText = `0:0${secs}`;
//       time.innerText = `You've attempted ${count} times.`;
//     } else {
//       time.innerText = "Wow....you have no life..";
//       time.innerText = `0:0${secs}`;
//       time.innerText = `You've attempted ${count} times.`;
//     }
//   }
// }
