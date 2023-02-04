const video5 = document.getElementsByClassName('input_video5')[0];
const out5 = document.getElementsByClassName('output5')[0];
const controlsElement5 = document.getElementsByClassName('control5')[0];
const excercise_select = document.getElementById("video-transform");
const canvasCtx5 = out5.getContext('2d');
const counter_div = document.getElementById('counter-div');
const rectangles = document.getElementById("rectangles");
const fpsControl = new FPS();
const canvas = document.getElementById('myCanvas');
const color_scheme = document.getElementById('toggle-scheme');
const ctx = canvas.getContext('2d');
var excercise_option = 0;
const container = document.getElementById("container");
const login_button = document.getElementById("login-button");
const username = document.getElementById("username");
const password = document.getElementById("password");
const login_div = document.getElementById("login");
const toggle_angle = document.getElementById("toggle-angle");
const toggle_arrows = document.getElementById("toggle-arrow");
const toggle_bars = document.getElementById("toggle-bars")
const fullscreen = document.getElementById("control-screen");
const cross_hip = document.getElementById('cross-hip');
const cross_knee = document.getElementById('cross-knee');
const cross_elbow = document.getElementById('cross-elbow');
const cross_shoulder = document.getElementById('cross-shoulder');
const r_cross_hip = document.getElementById('r-cross-hip');
const r_cross_knee = document.getElementById('r-cross-knee');
const r_cross_elbow = document.getElementById('r-cross-elbow');
const r_cross_shoulder = document.getElementById('r-cross-shoulder');
var needs_inversion = false;
var angle_visible = true;
var arrow_visible = true;
var bars_visible = true;
var fullscreen_toggle = false;
var angle_active = false;
var arrow_active = false;
var orange_active = false;

var scheme = ["red", "greenyellow"];

login_button.addEventListener("click", function () {
  if (username.value == "admin" && password.value == "admin") {
    login_div.style.display = "none";
    container.style.display = "block";
  } else {
    alert("Wrong username or password");
  }
});

fullscreen.addEventListener("click", function () {
  goFullScreen();
});

toggle_angle.addEventListener("click", function () {
  if (angle_visible) {
    angle_visible = false;
    document.getElementById("angle-div").style.display = "block";
    toggle_angle.style.backgroundColor = "#0B0B45";
  } else {
    angle_visible = true;
    document.getElementById("angle-div").style.display = "none";
    toggle_angle.style.backgroundColor = "#000080";
  }
});

toggle_arrows.addEventListener("click", function () {
  if (arrow_visible) {
    arrow_visible = false;
    document.getElementById("arrow-div").style.display = "block";
    toggle_arrows.style.backgroundColor = "#0B0B45";
  } else {
    arrow_visible = true;
    document.getElementById("arrow-div").style.display = "none";
    toggle_arrows.style.backgroundColor = "#000080";
  }
});

const spinner = document.querySelector('.loading');
spinner.ontransitionend = () => {
  spinner.style.display = 'none';
};

function onResultsPose(results) {
  if (angle_visible) {
    document.getElementById("angle-div").style.display = "block";
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  rectangle_punches.style.display = "none";
  counter_div.style.display = "flex";
  counter_div.style.marginTop = "100px";
  if (bars_visible) {
    rectangles.style.display = "flex";
    rectangles.style.justifyContent = "space-between";
  } else{
    rectangles.style.display = "none";
  }
  
  let landmark_list = [];

  if (results.poseLandmarks) {
    for (let i = 0; i < results.poseLandmarks.length; i++) {
      let cx = parseInt(results.poseLandmarks[i].x * 900, 10);
      let cy = parseInt(results.poseLandmarks[i].y * 600, 10);
      landmark_list.push([i, cx, cy]);
    }
  } else {
    document.getElementById("angle-div").style.display = "none";
  }


  // let p1 = landmark_list[24];
  // let p2 = landmark_list[12];
  // let p1x = p1[1];
  // let p2x = p2[1];

  // if (p1x - p2x < 0) {
  //   needs_inversion = true;
  // }




  if (excercise_option === 0) {
    bridgeExcercise(landmark_list);
  } else if (excercise_option === 1) {
    squat(landmark_list);
  } else if (excercise_option === 2) {
    punches(landmark_list);
  }



  document.body.classList.add('loaded');
  fpsControl.tick();

  canvasCtx5.save();
  canvasCtx5.clearRect(0, 0, out5.width, out5.height);
  canvasCtx5.drawImage(
    results.image, 0, 0, out5.width, out5.height);
  drawConnectors(
    canvasCtx5, results.poseLandmarks, POSE_CONNECTIONS, {
    color: (data) => {
      const x0 = out5.width * data.from.x;
      const y0 = out5.height * data.from.y;
      const x1 = out5.width * data.to.x;
      const y1 = out5.height * data.to.y;

      const z0 = clamp(data.from.z + 0.5, 0, 1);
      const z1 = clamp(data.to.z + 0.5, 0, 1);

      const gradient = canvasCtx5.createLinearGradient(x0, y0, x1, y1);
      if (orange_active) {
        if (color === "red") {
          gradient.addColorStop(
            0, `rgba(255, 140, 0, 1)`);
        } else if (color === "green") {
          gradient.addColorStop(
            0, `rgba(0, 255, 255, 1)`);
        } else if (color === "yellow") {
          gradient.addColorStop(
            0, `rgba(112, 128, 144, 1)`);
        } else if (color === "green_final") {
          gradient.addColorStop(
            0, `rgba(0, 255, 0, 1)`);
        }
      } else {
        if (color === "red") {
          gradient.addColorStop(
            0, `rgba(255, 0, 0, 1)`);
        } else if (color === "green") {
          gradient.addColorStop(
            0, `rgba(0, 255, 0, 1)`);
        } else if (color === "yellow") {
          gradient.addColorStop(
            0, `rgba(255, 255, 0, 1)`);
        } else if (color === "green_final") {
          gradient.addColorStop(
            0, `rgba(0, 255, 0, 1)`);
        }
      }
      return gradient;
    }
  });

  canvasCtx5.restore();
}

const pose = new Pose({
  locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/pose@0.2/${file}`;
  }
});
pose.onResults(onResultsPose);

const camera = new Camera(video5, {
  onFrame: async () => {
    await pose.send({ image: video5 });
  },
  width: 900,
  height: 600
});
camera.start();



new ControlPanel(controlsElement5, {
  modelComplexity: 2,
  selfieMode: true,
  upperBodyOnly: false,
  smoothLandmarks: true,
  minDetectionConfidence: 0.7,
  minTrackingConfidence: 0.7
})
  .add([
    new StaticText({ title: 'MediaPipe Pose' }),
    fpsControl,
    new Toggle({ title: 'Selfie Mode', field: 'selfieMode' }),
    new Toggle({ title: 'Upper-body Only', field: 'upperBodyOnly' }),
    new Toggle({ title: 'Smooth Landmarks', field: 'smoothLandmarks' }),
    new Slider({
      title: 'Min Detection Confidence',
      field: 'minDetectionConfidence',
      range: [0, 1],
      step: 0.01
    }),
    new Slider({
      title: 'Min Tracking Confidence',
      field: 'minTrackingConfidence',
      range: [0, 1],
      step: 0.01
    }),
  ])
  .on(options => {
    video5.classList.toggle('selfie', options.selfieMode);
    pose.setOptions(options);
  });

excercise_select.addEventListener('change', () => {
  if (excercise_select.value === "bridge") {
    excercise_option = 0;
  }
  else if (event.target.value === "squats") {
    excercise_option = 1;
  } else if (event.target.value === "punches") {
    excercise_option = 2;
  }

  count = 0;
  count_text.innerText = count;
});

function goFullScreen() {
  const elem = document.getElementById("excercise");
  if (fullscreen_toggle) {
    fullscreen_toggle = false;
    document.exitFullscreen();
    canvasNormal(canvas);
    canvasNormal(out5);
    fullscreen.style.marginLeft = "850px";
    fullscreen.style.marginTop = "550px";
    return;
  }
  if (elem.requestFullScreen) {
    elem.requestFullScreen();
    canvasFullscreen(canvas);
    canvasFullscreen(out5);
  }
  else if (elem.webkitRequestFullScreen) {
    elem.webkitRequestFullScreen();
    canvasFullscreen(canvas);
    canvasFullscreen(out5);
  }
  else if (elem.mozRequestFullScreen) {
    elem.mozRequestFullScreen();
    canvasFullscreen(canvas);
    canvasFullscreen(out5);
  }
  fullscreen_toggle = true;
  fullscreen.style.marginLeft = "95%";
  fullscreen.style.marginTop = "50%";
}

var canvasFullscreen = function (canvas) {
  canvas.width = document.body.clientWidth;
  canvas.height = document.body.clientHeight;
}

var canvasNormal = function (canvas) {
  canvas.width = 900;
  canvas.height = 600;
}

if (document.addEventListener) {
  document.addEventListener('fullscreenchange', exitHandler, false);
  document.addEventListener('mozfullscreenchange', exitHandler, false);
  document.addEventListener('MSFullscreenChange', exitHandler, false);
  document.addEventListener('webkitfullscreenchange', exitHandler, false);
}

function exitHandler() {
  if (!document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
    fullscreen_toggle = false;
    document.exitFullscreen();
    canvasNormal(canvas);
    canvasNormal(out5);
    fullscreen.style.marginLeft = "850px";
    fullscreen.style.marginTop = "550px";
  }
}


toggle_bars.addEventListener('click', () => {
  if (bars_visible) {
    bars_visible = false;
    toggle_bars.style.backgroundColor = "#000080";
  } else {
    bars_visible = true;
    toggle_bars.style.backgroundColor = "#0B0B45";
  }
})

color_scheme.addEventListener('click', () => {
  if (orange_active) {
    orange_active = false;
    color_scheme.style.backgroundColor = "#0B0B45";
    scheme = ["red", "greenyellow"]
  } else {
    orange_active = true;
    color_scheme.style.backgroundColor = "#000080";
    scheme = ["#FF8C00", "#00FFFF"]
  }
});