

function countdown(secs) {
  const time = document.getElementById('time')



    window.setTimeout(function() {
      if (secs === 60) {
        time.innerText = `1:00`;
        countdown(secs - 1);
      } else if (secs >= 10) {
        time.innerText = `0:${secs}`;
        countdown(secs - 1);
      } else if (secs < 10 && secs >=0) {
        time.innerText = `0:0${secs}`;
        countdown(secs - 1);
      }
    }, 1000);
  }



// function countdown(secs, obj) {
//   const time = document.getElementById('time')
//   let boolean = obj[0];
//   let count = obj[1];
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
