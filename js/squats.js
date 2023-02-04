const shoulderText = document.getElementById("shoulder-text");
const elbowText = document.getElementById("elbow-text");
const shoulder_o = document.getElementById("shoulder-o");
const elbow_o = document.getElementById("elbow-o");
const thirdItem = document.getElementById("third-item");
const fourthItem = document.getElementById("fourth-item");
var count = 0;
var up = 0;
var down = 0;
var color = "green";
var start_list_x_2 = [];
var start_list_y_2 = [];
var end_list_x_2 = [];
var end_list_y_2 = [];
var start_list_x_1 = [];
var start_list_y_1 = [];
var end_list_x_1 = [];
var end_list_y_1 = [];

const squat = (landmark_list) => {
  thirdItem.style.display = "block";
  fourthItem.style.display = "block";
  knee_o.style.width = "150px";
  hip_o.style.width = "150px";
  shoulder_o.style.width = "150px";
  elbow_o.style.width = "150px";

  const squats_val = [92.58, 176.43, 62.48, 183.68, 0.0, 132.32, 152.77, 178.49];

  const knee_min = squats_val[0],
    knee_max = squats_val[1];
  const hip_min = squats_val[2],
    hip_max = squats_val[3];
  const shoulder_min = squats_val[4],
    shoulder_max = squats_val[5];
  const elbow_min = squats_val[6],
    elbow_max = squats_val[7];

  let hip_angle, knee_angle, shoulder_angle, elbow_angle;
  let x_h = null;
  let y_h = null;
  let x_s = null;
  let y_s = null;
  if (landmark_list.length > 0) {
    hip_angle = find_angle(25, 23, 11, landmark_list);
    knee_angle = find_angle(23, 25, 27, landmark_list);
    shoulder_angle = find_angle(23, 11, 13, landmark_list);
    elbow_angle = find_angle(15, 13, 11, landmark_list);
  }

  try {
    x_h = landmark_list[23][1];
    y_h = landmark_list[23][2];
    x_s = landmark_list[11][1];
    y_s = landmark_list[11][2];
  } catch (e) {
    x_h = 0;
    y_h = 0;
    x_s = 0;
    y_s = 0;
  }

  const arrow_start_x_1 = parseInt(x_h,10) - 350;
  const arrow_start_y_1 = parseInt(y_h,10) - 25;

  const arrow_end_x_1 = parseInt(x_h,10) - 200;
  const arrow_end_y_1 = parseInt(y_h,10);

  const arrow_start_x_2 = parseInt(x_s,10) + 250;
  const arrow_start_y_2 = parseInt(y_s,10) - 25;

  const arrow_end_x_2 = parseInt(x_s,10) + 100;
  const arrow_end_y_2 = parseInt(y_s,10);

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

  if (down > 10 && color !== "red") {
    drawArrow(ctx, avg_start_x_1, avg_start_y_1, avg_end_x_1, avg_end_y_1, 3, "red");
    drawArrow(ctx, avg_start_x_2, avg_start_y_2, avg_end_x_2, avg_end_y_2, 3, "red");
  } else if (up > 5 && color !== "red") {
    drawArrow(ctx, avg_end_x_1, avg_end_y_1, avg_start_x_1, avg_start_y_1, 3, "red");
    drawArrow(ctx, avg_end_x_2, avg_end_y_2, avg_start_x_2, avg_start_y_2, 3, "red");
  }

  if (up === 3) {
    up += 1;
    count += 1;
    count_text.innerText = count;
  }

  if (
    hip_angle > hip_max - 20 &&
    hip_angle < hip_max + 5 &&
    knee_angle > knee_max - 25 &&
    knee_angle < knee_max + 10 &&
    shoulder_angle > shoulder_min - 10 &&
    shoulder_angle < shoulder_max + 10 &&
    elbow_angle > elbow_min - 10 &&
    elbow_angle < elbow_max + 10
  ) {
    color = "green";
    up = 0;
    down += 1;
  } else if (
    hip_angle > hip_max - 20 &&
    hip_angle < hip_max + 5 &&
    knee_angle > knee_max - 25 &&
    knee_angle < knee_max + 10 &&
    shoulder_angle > 340 &&
    elbow_angle > elbow_min - 10 &&
    hip_angle < elbow_max + 10
  ) {
    color = "green";
    up = 0;
    down += 1;
  } else if (
    color === "green" &&
    hip_angle < hip_max - 20 &&
    hip_angle > hip_min + 10 &&
    knee_angle > knee_min - 25 &&
    knee_angle < knee_max + 10
  ) {
    color = "yellow";
  } else if (
    color === "yellow" &&
    hip_angle < hip_max - 10 &&
    hip_angle > hip_min + 10 &&
    knee_angle > knee_min - 25 &&
    knee_angle < knee_max + 10 &&
    shoulder_angle > shoulder_min - 10 &&
    shoulder_angle < shoulder_max + 10 &&
    elbow_angle > elbow_min - 10 &&
    hip_angle < elbow_max + 10
  ) {
    color = "yellow";
  } else if (
    color !== "red" &&
    hip_angle < hip_min + 10 &&
    hip_angle > hip_min - 20 &&
    knee_angle > knee_min - 25 &&
    knee_angle < knee_max + 10 &&
    shoulder_angle > shoulder_min - 10 &&
    shoulder_angle < shoulder_max + 10 &&
    elbow_angle > elbow_min - 10 &&
    hip_angle < elbow_max + 10
  ) {
    color = "green";
    up += 1;
    down = 0;
  } else {
    color = "red";
    up = 0;
    down = 0;
  }

  if (knee_angle > knee_min - 25 && knee_angle < knee_max + 10) {
    knee_o.style.backgroundColor = scheme[1];
    kneeText.style.color = scheme[1];
    cross_knee.style.display = "none";
  } else {
    let x = landmark_list[25][1];
    let y = landmark_list[25][2];
    cross_knee.style.left = `${x}px`;
    cross_knee.style.top = `${y}px`;
    cross_knee.style.display = "block";
    knee_o.style.backgroundColor = scheme[0];
    kneeText.style.color = scheme[0];
  }

  if (elbow_angle > elbow_min - 10 && elbow_angle < elbow_max + 10) {
    elbow_o.style.backgroundColor = scheme[1];
    elbowText.style.color = scheme[1];
    cross_elbow.style.display = "none";
  } else {
    let x = landmark_list[13][1];
    let y = landmark_list[13][2];
    cross_elbow.style.left = `${x}px`;
    cross_elbow.style.top = `${y}px`;
    cross_elbow.style.display = "block";
    elbow_o.style.backgroundColor = scheme[0];
    elbowText.style.color = scheme[0];
  }

  if (
    shoulder_angle > shoulder_min - 10 &&
    shoulder_angle < shoulder_max + 10
  ) {
    shoulder_o.style.backgroundColor = scheme[1];
    shoulderText.style.color = scheme[1];
    cross_shoulder.style.display = "none";
  } else {
    if (shoulder_angle > 340) {
      shoulder_o.style.backgroundColor = scheme[1];
      shoulderText.style.color = scheme[1];
      cross_shoulder.style.display = "none";
    } else {
      let x = landmark_list[11][1];
      let y = landmark_list[11][2];
      cross_shoulder.style.left = `${x}px`;
      cross_shoulder.style.top = `${y}px`;
      cross_shoulder.style.display = "block";
      shoulder_o.style.backgroundColor = scheme[0];
      shoulderText.style.color = scheme[0];
    }
  }

  if (hip_angle > hip_max - 20 && hip_angle < hip_max + 5) {
    hip_o.style.backgroundColor = scheme[1];
    hipText.style.color = scheme[1];
    cross_hip.style.display = "none";
  } else if (color !== "red") {
    hip_o.style.backgroundColor = scheme[1];
    hipText.style.color = scheme[1];
    cross_hip.style.display = "none";
  } else {
    if (hip_angle > hip_min - 20 && hip_angle < hip_max + 5) {
      hip_o.style.backgroundColor = scheme[1];
      hipText.style.color = scheme[1];
      cross_hip.style.display = "none";
    } else {
      let x = landmark_list[23][1];
      let y = landmark_list[23][2];
      cross_hip.style.left = `${x}px`;
      cross_hip.style.top = `${y}px`;
      cross_hip.style.display = "block";
      hip_o.style.backgroundColor = scheme[0];
      hipText.style.color = scheme[0];

    }
  }

  if (knee_angle > knee_max - 25 && knee_angle < knee_max + 10) {
    knee_o.style.backgroundColor = scheme[1];
    kneeText.style.color = scheme[1];
    cross_knee.style.display = "none";
  } else if (color !== "red") {
    knee_o.style.backgroundColor = scheme[1];
    kneeText.style.color = scheme[1];
    cross_knee.style.display = "none";
  } else {
    if (knee_angle > knee_min - 20 && knee_angle < knee_max + 10) {
      knee_o.style.backgroundColor = scheme[1];
      kneeText.style.color = scheme[1];
      cross_knee.style.display = "none";
    } else {
      knee_o.style.backgroundColor = scheme[0];
      kneeText.style.color = scheme[0];
      let x = landmark_list[25][1];
      let y = landmark_list[25][2];
      cross_knee.style.left = `${x}px`;
      cross_knee.style.top = `${y }px`;
      cross_knee.style.display = "block";
    }
  }
};