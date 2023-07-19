const time = document.getElementById("time");
const ampm = document.getElementById("ampm");

setInterval(function () {
  const date = new Date();
  let hour = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let amOrPm = "AM";

  if (hour >= 12) {
    if (hour > 12) {
      hour -= 12;
    }
    amOrPm = "PM";
  } else if (hour == 0) {
    hour = 12;
    amOrPm = "AM";
  }

  hour = hour < 10 ? "0" + hour : hour;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  let currentTime = hour + ":" + minutes + ":" + seconds;
  time.innerHTML = currentTime;
  ampm.innerHTML = "<sub>" + amOrPm + "</sub>";
}, 1000);
