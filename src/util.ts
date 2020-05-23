export function between(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

export function setIntervalX(callback, delay, repetitions) {
  let x = 0;
  let intervalID = setInterval(function() {
    callback();

    if (++x === repetitions) {
      clearInterval(intervalID);
    }
  }, delay);
}
