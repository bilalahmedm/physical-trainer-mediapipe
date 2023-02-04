const knee_angle_div = document.getElementById("angle-knee");
const hip_angle_div = document.getElementById("angle-hip");


function drawLine(ctx, fromx, fromy, tox, toy, lineWidth, color) {


  ctx.save();
  ctx.strokeStyle = color;

  //starting path of the arrow from the start square to the end square
  //and drawing the stroke
  ctx.beginPath();
  ctx.moveTo(fromx, fromy);
  ctx.lineTo(tox, toy);
  ctx.lineWidth = lineWidth;
  ctx.stroke();


  ctx.restore();
}

function drawArrow(ctx, fromx, fromy, tox, toy, arrowWidth, color) {
  //variables to be used when creating the arrow
  var headlen = 10;
  var angle = Math.atan2(toy - fromy, tox - fromx);

  ctx.save();
  ctx.strokeStyle = color;

  //starting path of the arrow from the start square to the end square
  //and drawing the stroke
  ctx.beginPath();
  ctx.moveTo(fromx, fromy);
  ctx.lineTo(tox, toy);
  ctx.lineWidth = arrowWidth;
  ctx.stroke();

  //starting a new path from the head of the arrow to one of the sides of
  //the point
  ctx.beginPath();
  ctx.moveTo(tox, toy);
  ctx.lineTo(
    tox - headlen * Math.cos(angle - Math.PI / 7),
    toy - headlen * Math.sin(angle - Math.PI / 7)
  );

  //path from the side point of the arrow, to the other side point
  ctx.lineTo(
    tox - headlen * Math.cos(angle + Math.PI / 7),
    toy - headlen * Math.sin(angle + Math.PI / 7)
  );

  //path from the side point back to the tip of the arrow, and then
  //again to the opposite side point
  ctx.lineTo(tox, toy);
  ctx.lineTo(
    tox - headlen * Math.cos(angle - Math.PI / 7),
    toy - headlen * Math.sin(angle - Math.PI / 7)
  );

  //draws the paths created above
  ctx.stroke();
  ctx.restore();
}

const find_angle = (p1, p2, p3, landmark_list) => {
  let x1 = landmark_list[p1][1];
  let y1 = landmark_list[p1][2];

  let x2 = landmark_list[p2][1];
  let y2 = landmark_list[p2][2];

  let x3 = landmark_list[p3][1];
  let y3 = landmark_list[p3][2];
  if (p2 == 26 && excercise_option == 0) {
    knee_angle_div.style.left = x2 - 50..toString() + "px";
    knee_angle_div.style.top = y2 - 60..toString() + "px";
  } else if (p2 == 24 && excercise_option == 0) {
    hip_angle_div.style.left = x2 - 50..toString() + "px";
    hip_angle_div.style.top = y2 - 60..toString() + "px";
  }

  if (p2 == 25 && excercise_option == 1) {
    knee_angle_div.style.left = x2 - 50..toString() + "px";
    knee_angle_div.style.top = y2 - 60..toString() + "px";
  } else if (p2 == 23 && excercise_option == 1) {
    hip_angle_div.style.left = x2 - 50..toString() + "px";
    hip_angle_div.style.top = y2.toString() + "px";
  }


  let angle = Math.atan2(y3 - y2, x3 - x2) - Math.atan2(y1 - y2, x1 - x2);

  angle = (angle * 180) / Math.PI;
  if (angle < 0) angle = 360 + angle;

  if (p2 == 26 && excercise_option == 0) {
    knee_angle_div.innerHTML = parseInt(angle).toString() + "°";
  } else if (p2 == 24 && excercise_option == 0) {
    hip_angle_div.innerHTML = parseInt(angle).toString() + "°";
  }
  if (p2 == 25 && excercise_option == 1) {
    knee_angle_div.innerHTML = parseInt(angle).toString() + "°";
  } else if (p2 == 23 && excercise_option == 1) {
    hip_angle_div.innerHTML = parseInt(angle).toString() + "°";
  }

  return angle;
};


const find_angle_n = (p1, p2, p3, landmark_list) => {
  let x1 = landmark_list[p1][1];
  let y1 = landmark_list[p1][2];

  let x2 = landmark_list[p2][1];
  let y2 = landmark_list[p2][2];

  let x3 = landmark_list[p3][1];
  let y3 = landmark_list[p3][2];

  if (p2 == 13 && excercise_option == 2) {
    knee_angle_div.style.left = x2 - 50..toString() + "px";
    knee_angle_div.style.top = y2 - 60..toString() + "px";
  } else if (p2 == 14 && excercise_option == 2) {
    hip_angle_div.style.left = x2 - 50..toString() + "px";
    hip_angle_div.style.top = y2 - 60..toString() + "px";
  }

  let angle = Math.atan2(y3 - y2, x3 - x2) - Math.atan2(y1 - y2, x1 - x2);

  angle = (angle * 180) / Math.PI;

  if (p2 == 13 && excercise_option == 2) {
    knee_angle_div.innerHTML = parseInt(angle).toString() + "°";
  } else if (p2 == 14 && excercise_option == 2) {
    hip_angle_div.innerHTML = parseInt(angle).toString() + "°";
  }

  return angle;
};
