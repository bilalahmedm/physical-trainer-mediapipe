const rectangle_punches = document.getElementById("rectangles-punches");
const elbow_rightText = document.getElementById("elbow-right");
const elbow_right_o = document.getElementById("elbow-right-o");
const elbow_leftText = document.getElementById("elbow-left");
const elbow_left_o = document.getElementById("elbow-left-o");
const knee_leftText = document.getElementById("knee-left");
const knee_left_o = document.getElementById("knee-left-o");
const knee_rightText = document.getElementById("knee-right");
const knee_right_o = document.getElementById("knee-right-o");
const hip_leftText = document.getElementById("hip-left");
const hip_left_o = document.getElementById("hip-left-o");
const hip_rightText = document.getElementById("hip-right");
const hip_right_o = document.getElementById("hip-right-o");


var l_count = 0;
var r_count = 0;
var l_begin = 0;
var r_begin = 0;
var color = "green";
var start_list_x_2 = [];
var start_list_y_2 = [];
var end_list_x_2 = [];
var end_list_y_2 = [];
var start_list_x_1 = [];
var start_list_y_1 = [];
var end_list_x_1 = [];
var end_list_y_1 = [];
var left = false;

const punches = (landmark_list) => {
  rectangles.style.display = "none";
  counter_div.style.marginTop = "100px";
  if (bars_visible) {
    rectangle_punches.style.display = "block";
  }
  elbow_left_o.style.width = "100px";
  elbow_right_o.style.width = "100px";
  knee_left_o.style.width = "100px";
  knee_right_o.style.width = "100px";
  hip_left_o.style.width = "100px";
  hip_right_o.style.width = "100px";



  const punches_val = [
    160, 193, 150, 195, 156, 192, 159, 190, -45, 185, -185, 45,
  ];

  const l_knee_min = punches_val[0],
    l_knee_max = punches_val[1];
  const r_knee_min = punches_val[2],
    r_knee_max = punches_val[3];
  const l_hip_min = punches_val[4],
    l_hip_max = punches_val[5];
  const r_hip_min = punches_val[6],
    r_hip_max = punches_val[7];
  const l_elbow_min = punches_val[8],
    l_elbow_max = punches_val[9];
  const r_elbow_min = punches_val[10],
    r_elbow_max = punches_val[11];

  let l_hip_angle,
    r_hip_angle,
    l_knee_angle,
    r_knee_angle,
    shoulder_angle,
    l_elbow_angle,
    r_elbow_angle,
    plumb_line_start_x,
    plumb_line_start_y,
    plumb_line_end_y;

  let x_rs = null;
  let y_rs = null;
  let x_ls = null;
  let y_ls = null;

  if (landmark_list.length > 0) {
    plumb_line_start_x = landmark_list[0][1];
    plumb_line_start_y = landmark_list[0][2];
    l_hip_angle = find_angle(11, 23, 25, landmark_list);
    r_hip_angle = find_angle(26, 24, 12, landmark_list);
    l_knee_angle = find_angle(23, 25, 27, landmark_list);
    r_knee_angle = find_angle(28, 26, 24, landmark_list);
    shoulder_angle = find_angle_n(24, 12, 14, landmark_list);
    l_elbow_angle = find_angle_n(15, 13, 11, landmark_list);
    r_elbow_angle = find_angle_n(16, 14, 12, landmark_list);
    plumb_line_end_y = landmark_list[31][2];
  }

  if (orange_active) {
    drawLine(ctx, plumb_line_start_x, plumb_line_start_y-20, plumb_line_start_x, plumb_line_end_y-20, 3, "#FF69B4");
    drawLine(ctx, plumb_line_start_x-100, plumb_line_start_y+20, plumb_line_start_x+100, plumb_line_start_y+20, 3, "#FF69B4");
  } else {
    drawLine(ctx, plumb_line_start_x, plumb_line_start_y-20, plumb_line_start_x, plumb_line_end_y-20, 3, "#4c00b0");
    drawLine(ctx, plumb_line_start_x-100, plumb_line_start_y+20, plumb_line_start_x+100, plumb_line_start_y+20, 3, "#4c00b0");
  }

  try {
    x_rs = landmark_list[12][1];
    y_rs = landmark_list[12][2];
    x_ls = landmark_list[11][1];
    y_ls = landmark_list[11][2];
  } catch (e) {
    x_rs = 0;
    y_rs = 0;
    x_ls = 0;
    y_ls = 0;
  }

  const arrow_start_x_1 = parseInt(x_rs, 10) - 250;
  const arrow_start_y_1 = parseInt(y_rs, 10) + 40;

  const arrow_end_x_1 = parseInt(x_rs, 10) - 100;
  const arrow_end_y_1 = parseInt(y_rs, 10) + 60;

  const arrow_start_x_2 = parseInt(x_ls, 10) + 250;
  const arrow_start_y_2 = parseInt(y_ls, 10) + 40;

  const arrow_end_x_2 = parseInt(x_ls, 10) + 100;
  const arrow_end_y_2 = parseInt(y_ls, 10) + 60;

  start_list_x_1.push(arrow_start_x_1);
  start_list_y_1.push(arrow_start_y_1);

  start_list_x_2.push(arrow_start_x_2);
  start_list_y_2.push(arrow_start_y_2);

  end_list_x_1.push(arrow_end_x_1);
  end_list_y_1.push(arrow_end_y_1);

  end_list_x_2.push(arrow_end_x_2);
  end_list_y_2.push(arrow_end_y_2);

  if (start_list_x_1.length > 8) {
    start_list_x_1.shift();
    start_list_y_1.shift();
    start_list_x_2.shift();
    start_list_y_2.shift();
    end_list_x_1.shift();
    end_list_y_1.shift();
    end_list_x_2.shift();
    end_list_y_2.shift();
  }

  let total_start_x_1 = 0;

  let total_start_y_1 = 0;
  let total_start_x_2 = 0;
  let total_start_y_2 = 0;
  let total_end_x_1 = 0;
  let total_end_y_1 = 0;
  let total_end_x_2 = 0;
  let total_end_y_2 = 0;

  for (let i = 0, n = start_list_x_1.length; i < n; ++i) {
    total_start_x_1 += start_list_x_1[i];
    total_start_y_1 += start_list_y_1[i];
    total_start_x_2 += start_list_x_2[i];
    total_start_y_2 += start_list_y_2[i];
    total_end_x_1 += end_list_x_1[i];
    total_end_y_1 += end_list_y_1[i];
    total_end_x_2 += end_list_x_2[i];
    total_end_y_2 += end_list_y_2[i];
  }

  const avg_start_x_1 = parseInt(total_start_x_1 / start_list_x_1.length, 10);
  const avg_start_y_1 = parseInt(total_start_y_1 / start_list_y_1.length, 10);
  const avg_start_x_2 = parseInt(total_start_x_2 / start_list_x_2.length, 10);
  const avg_start_y_2 = parseInt(total_start_y_2 / start_list_y_2.length, 10);

  const avg_end_x_1 = parseInt(total_end_x_1 / end_list_x_1.length, 10);
  const avg_end_y_1 = parseInt(total_end_y_1 / end_list_y_1.length, 10);
  const avg_end_x_2 = parseInt(total_end_x_2 / end_list_x_2.length, 10);
  const avg_end_y_2 = parseInt(total_end_y_2 / end_list_y_2.length, 10);


  if (l_count > 10 && color !== "red") {
    drawArrow(ctx, avg_start_x_1, avg_start_y_1, avg_end_x_1, avg_end_y_1, 3, "red");
  }
  if (r_count > 10 && color !== "red") {
    drawArrow(ctx, avg_start_x_2, avg_start_y_2, avg_end_x_2, avg_end_y_2, 3, "red");
  }
  if (l_begin > 5 && color !== "red") {
    drawArrow(ctx, avg_end_x_1, avg_end_y_1, avg_start_x_1, avg_start_y_1, 3, "red");
  }
  if (r_begin > 5 && color !== "red") {
    drawArrow(ctx, avg_end_x_2, avg_end_y_2, avg_start_x_2, avg_start_y_2, 3, "red");
  }



  if (l_count === 5 || r_count === 5) {
    l_count += 1;
    r_count += 1;
    count += 1;
    count_text.innerText = count;
  }


  if (
    l_elbow_angle > -45 &&
    l_elbow_angle < 45 &&
    r_elbow_angle > -45 &&
    r_elbow_angle < 45 &&
    l_hip_angle > l_hip_min - 10 &&
    l_hip_angle < l_hip_max + 10 &&
    l_knee_angle > l_knee_min - 10 &&
    l_knee_angle < l_knee_max + 10 &&
    r_hip_angle > r_hip_min - 10 &&
    r_hip_angle < r_hip_max + 10 &&
    r_knee_angle > r_knee_min - 10 &&
    r_knee_angle < r_knee_max + 10
  ) {
    color = "green";
    l_count = 0;
    r_count = 0;

    if (left) {
      l_begin += 1;
    } else {
      r_begin += 1;
    }
  } else if (
    color === "green" &&
    l_elbow_angle > 45 &&
    l_elbow_angle < l_elbow_max - 20 &&
    l_hip_angle > l_hip_min - 10 &&
    l_hip_angle < l_hip_max + 10 &&
    l_knee_angle > l_knee_min - 10 &&
    l_knee_angle < l_knee_max + 10 &&
    r_hip_angle > r_hip_min - 10 &&
    r_hip_angle < r_hip_max + 10 &&
    r_knee_angle > r_knee_min - 10 &&
    r_knee_angle < r_knee_max + 10
  ) {
    color = "yellow";
  } else if (
    color === "yellow" &&
    l_elbow_angle > 45 &&
    l_elbow_angle < l_elbow_max - 20 &&
    l_hip_angle > l_hip_min - 10 &&
    l_hip_angle < l_hip_max + 10 &&
    l_knee_angle > l_knee_min - 10 &&
    l_knee_angle < l_knee_max + 10 &&
    r_hip_angle > r_hip_min - 10 &&
    r_hip_angle < r_hip_max + 10 &&
    r_knee_angle > r_knee_min - 10 &&
    r_knee_angle < r_knee_max + 10
  ) {
    color = "yellow";
  } else if (
    color !== "red" &&
    l_elbow_angle < l_elbow_max + 10 &&
    l_elbow_angle > l_elbow_max - 20 &&
    l_hip_angle > l_hip_min - 10 &&
    l_hip_angle < l_hip_max + 10 &&
    l_knee_angle > l_knee_min - 10 &&
    l_knee_angle < l_knee_max + 10 &&
    r_hip_angle > r_hip_min - 10 &&
    r_hip_angle < r_hip_max + 10 &&
    r_knee_angle > r_knee_min - 10 &&
    r_knee_angle < r_knee_max + 10
  ) {
    color = "green";
    l_count += 1;
    left = false;
    l_begin = 0;
    r_begin = 0;
  } else if (
    color === "green" &&
    r_elbow_angle < -45 &&
    r_elbow_angle > r_elbow_min + 20 &&
    shoulder_angle < 20 &&
    l_hip_angle > l_hip_min - 10 &&
    l_hip_angle < l_hip_max + 10 &&
    l_knee_angle > l_knee_min - 10 &&
    l_knee_angle < l_knee_max + 10 &&
    r_hip_angle > r_hip_min - 10 &&
    r_hip_angle < r_hip_max + 10 &&
    r_knee_angle > r_knee_min - 10 &&
    r_knee_angle < r_knee_max + 10
  ) {
    color = "yellow";
  } else if (
    color === "yellow" &&
    r_elbow_angle < -45 &&
    r_elbow_angle > r_elbow_min + 20 &&
    shoulder_angle < 20 &&
    l_hip_angle > l_hip_min - 10 &&
    l_hip_angle < l_hip_max + 10 &&
    l_knee_angle > l_knee_min - 10 &&
    l_knee_angle < l_knee_max + 10 &&
    r_hip_angle > r_hip_min - 10 &&
    r_hip_angle < r_hip_max + 10 &&
    r_knee_angle > r_knee_min - 10 &&
    r_knee_angle < r_knee_max + 10
  ) {
    color = "yellow";
  } else if (
    color !== "red" &&
      r_elbow_angle > r_elbow_min - 10 &&
      r_elbow_angle < r_elbow_min + 20 ||
      r_elbow_angle > 170 &&
      r_elbow_angle < 195 &&
      l_hip_angle > l_hip_min - 10 &&
      l_hip_angle < l_hip_max + 10 &&
      l_knee_angle > l_knee_min - 10 &&
      l_knee_angle < l_knee_max + 10 &&
      r_hip_angle > r_hip_min - 10 &&
      r_hip_angle < r_hip_max + 10 &&
      r_knee_angle > r_knee_min - 10 &&
      r_knee_angle < r_knee_max + 10
  ) {
    color = "green";
    r_count += 1;
    left = true;
    l_begin = 0;
    r_begin = 0;
  } else {
    color = "red";
    l_begin = 0;
    r_begin = 0;
  }

  if (l_elbow_angle > l_elbow_min - 10 && l_elbow_angle < l_elbow_max + 10) {
    elbow_rightText.style.color = scheme[1];
    elbow_right_o.style.backgroundColor = scheme[1];
    r_cross_elbow.style.display = "none";
  } else {
    let x = landmark_list[13][1];
    let y = landmark_list[13][2];
    r_cross_elbow.style.left = x + "px";
    r_cross_elbow.style.top = y + "px";
    r_cross_elbow.style.display = "block";
    elbow_rightText.style.color = scheme[0];
    elbow_right_o.style.backgroundColor = scheme[0];
  }

  if (r_elbow_angle > r_elbow_min - 10 && r_elbow_angle < r_elbow_max + 10) {
    elbow_left_o.style.backgroundColor = scheme[1];
    elbow_leftText.style.color = scheme[1];
    cross_elbow.style.display = "none";
  } else {
    if (r_elbow_angle > 175 && r_elbow_angle < 195) {
      elbow_left_o.style.backgroundColor = scheme[1];
      elbow_leftText.style.color = scheme[1];
      cross_elbow.style.display = "none";
    } else {
      let x = landmark_list[14][1];
      let y = landmark_list[14][2];
      cross_elbow.style.left = x + "px";
      cross_elbow.style.top = y + "px";
      cross_elbow.style.display = "block";
      elbow_left_o.style.backgroundColor = scheme[0];
      elbow_leftText.style.color = scheme[0];

    }
  }

  if (l_hip_angle > l_hip_min - 10 && l_hip_angle < l_hip_max + 10) {
    hip_right_o.style.backgroundColor = scheme[1];
    hip_rightText.style.color = scheme[1];
    r_cross_hip.style.display = "none";
  } else {
    let x = landmark_list[24][1];
    let y = landmark_list[24][2];
    r_cross_hip.style.left = x + "px";
    r_cross_hip.style.top = y + "px";
    r_cross_hip.style.display = "block";
    hip_right_o.style.backgroundColor = scheme[0];
    hip_rightText.style.color = scheme[0];
  }
  if (r_hip_angle > r_hip_min - 10 && r_hip_angle < r_hip_max + 10) {
    hip_left_o.style.backgroundColor = scheme[1];
    hip_leftText.style.color = scheme[1];
    cross_hip.style.display = "none";
  } else {
    let x = landmark_list[23][1];
    let y = landmark_list[23][2];
    cross_hip.style.left = x + "px";
    cross_hip.style.top = y + "px";
    cross_hip.style.display = "block";
    hip_left_o.style.backgroundColor = scheme[0];
    hip_leftText.style.color = scheme[0];
  }


  if (l_knee_angle > l_knee_min - 10 && l_knee_angle < l_knee_max + 10) {
    knee_right_o.style.backgroundColor = scheme[1];
    knee_rightText.style.color = scheme[1];
    r_cross_knee.style.display = "none";
  } else {
    let x = landmark_list[26][1];
    let y = landmark_list[26][2];
    r_cross_knee.style.left = x + "px";
    r_cross_knee.style.top = y + "px";
    r_cross_knee.style.display = "block";
    knee_right_o.style.backgroundColor = scheme[0];
    knee_rightText.style.color = scheme[0];
  }

  if (r_knee_angle > r_knee_min - 10 && r_knee_angle < r_knee_max + 10) {
    knee_left_o.style.backgroundColor = scheme[1];
    knee_leftText.style.color = scheme[1];
    cross_knee.style.display = "none";
  } else {
    let x = landmark_list[25][1];
    let y = landmark_list[25][2];
    cross_knee.style.left = x + "px";
    cross_knee.style.top = y + "px";
    cross_knee.style.display = "block";
    knee_left_o.style.backgroundColor = scheme[0];
    knee_leftText.style.color = scheme[0];
  }

};
