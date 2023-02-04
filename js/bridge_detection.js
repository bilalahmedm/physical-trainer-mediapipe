const kneeText = document.getElementById('knee-text');
const hipText = document.getElementById('hip-text');
const hip_o = document.getElementById('hip-o');
const knee_o = document.getElementById('knee-o');
const count_text = document.getElementById('count');


var count = 0;
var up = 0;
var down = 0;
var color = 'green';
var start_list_x = [];
var start_list_y = [];
var end_list_x = [];
var end_list_y = [];

const bridgeExcercise = (landmark_list) => {
    thirdItem.style.display = "none";
    fourthItem.style.display = "none";
    knee_o.style.width = "350px";
    hip_o.style.width = "350px";
    const bridge_val = [126.85687009219882, 173.39191866486968, 58.08149554504566, 81.43936280922864];
  
    const hip_min = bridge_val[0];
    const hip_max = bridge_val[1];
    const knee_min = bridge_val[2];
    const knee_max = bridge_val[3];
    let hip_angle = null;
    let knee_angle = null;
    let x_h= null;
    let y_h= null;
    let x_s= null;
    let y_s= null;
  
  
  
    if (landmark_list.length > 0) {
      hip_angle = find_angle(12, 24, 26, landmark_list);
      knee_angle = find_angle(28, 26, 24, landmark_list);
    }
  
    try {
      x_h= landmark_list[24][1]; 
      y_h = landmark_list[24][2];
      x_s = landmark_list[12][1];
      y_s =  landmark_list[12][2];
    } catch (e) {
      x_h = 0;
      y_h =  0;
      x_s = 0;
      y_s = 0;
    }
  
      const arrow_start_x = x_h - (parseInt(Math.sqrt(Math.pow((x_h - x_s), 2) + Math.pow((y_h - y_s), 2)), 10) / 3);
      const arrow_start_y = y_h - (parseInt(Math.sqrt(Math.pow((x_h - x_s), 2) + Math.pow((y_h - y_s), 2)), 10) / 3);
  
      const arrow_end_x = x_h - (parseInt(Math.sqrt(Math.pow((x_h - x_s), 2) + Math.pow((y_h - y_s), 2)), 10) / 3) - 50;
      const arrow_end_y = y_h - (parseInt(Math.sqrt(Math.pow((x_h - x_s), 2) + Math.pow((y_h - y_s), 2)), 10) / 3) - 100;
  
      start_list_x.push(arrow_start_x);
      start_list_y.push(arrow_start_y);
  
      end_list_x.push(arrow_end_x);
      end_list_y.push(arrow_end_y);
  
      if (start_list_x.length > 8) {
        start_list_x.shift();
        start_list_y.shift();
        end_list_x.shift();
        end_list_y.shift();
      }
  
      let total_start_x = 0;
      let total_start_y = 0;
      let total_end_x = 0;
      let total_end_y = 0;
  
      for (let i = 0, n = start_list_x.length; i < n; ++i) {
        total_start_x += start_list_x[i];
        total_start_y += start_list_y[i];
        total_end_x += end_list_x[i];
        total_end_y += end_list_y[i];
      }
  
      const avg_start_x = parseInt(total_start_x / start_list_x.length,10);
      const avg_start_y = parseInt(total_start_y / start_list_y.length,10);
      const avg_end_x = parseInt(total_end_x / end_list_x.length,10);
      const avg_end_y = parseInt(total_end_y / end_list_y.length,10);
  
    
  
  
      if (down>5 && color!=='red'){
        drawArrow(ctx, avg_start_x, avg_start_y, avg_end_x, avg_end_y, 3, 'red');
      } else if (up>5 && color!=='red'){
        drawArrow(ctx, avg_end_x, avg_end_y, avg_start_x, avg_start_y, 3, 'red');
      }
  
  
  
    if (up === 2) {
      up += 1;
      count += 1;
      count_text.innerText = count;
    }
  
  
    if ((hip_angle > hip_min - 10 && hip_angle < hip_min + 10) && (knee_angle > knee_min - 25 && knee_angle < knee_max + 10)) {
      color = "green";
      up = 0;
      down += 1;
    } else if ((color === "green") && (hip_angle > hip_min + 10 && hip_angle < hip_max - 10)) {
      color = "yellow";
    } else if ((color === "yellow") && (hip_angle > hip_min + 10 && hip_angle < hip_max - 10)) {
      color = "yellow";
    } else if ((color !== "red") && (hip_angle > hip_max - 10 && hip_angle < hip_max + 10)) {
      color = "green";
      up += 1;
      down = 0;
    } else {
      color = "red";
    }
  
    if (knee_angle > knee_min - 25 && knee_angle < knee_max + 10) {
      knee_o.style.backgroundColor = scheme[1];
      kneeText.style.color = scheme[1];
      cross_knee.style.display = "none";
    } else {
      let x = landmark_list[26][1];
      let y = landmark_list[26][2];
      
      cross_knee.style.left = x.toString() + "px";
      cross_knee.style.top = (y - 100).toString() + "px";
      cross_knee.style.display = "block";
      knee_o.style.backgroundColor = scheme[0];
      kneeText.style.color = scheme[0];
    }
  
    if (hip_angle > hip_min - 10 && hip_angle < hip_max + 10) {
      hip_o.style.backgroundColor = scheme[1];
      hipText.style.color = scheme[1];
      cross_hip.style.display = "none";
    } else {
      let x = landmark_list[24][1];
      let y = landmark_list[24][2];
      cross_hip.style.left = x.toString() + "px";
      cross_hip.style.top = y.toString() + "px";
      cross_hip.style.display = "block";
      hip_o.style.backgroundColor = scheme[0];
      hipText.style.color = scheme[0];
    }
  }

