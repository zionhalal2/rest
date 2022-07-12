function getTimeRemaining(endtime) {
  const total = Date.parse(endtime) - Date.parse(new Date());
  const seconds = Math.floor((total / 1000) % 60);

  return {
    total,

    seconds,
  };
}

function initializeClock(id, endtime) {
  const clock = document.getElementById(id);

  const secondsSpan = clock.querySelector(".seconds");

  function updateClock() {
    const t = getTimeRemaining(endtime);

    secondsSpan.innerHTML = ("0" + t.seconds).slice(-2);

    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }

  updateClock();
  const timeinterval = setInterval(updateClock, 1000);
}

const deadline = new Date(Date.parse(new Date()) + 1 * 55 * 1000);
initializeClock("clockdiv", deadline);
let winCounter = 3;
let goodCounter = 0;
let squarePosition;
let trienglePosition;
let circlePosition;
let audio = new Audio("./mp3/anthem-of-victory-111206.mp3");

let button = document.getElementById("start");
button.addEventListener("click", () => {
  audio.play();
  /*document.getElementById("square_cursor").style.left =
    Math.random() * 75 + "px";
  document.getElementById("triengle_cursor").style.left =
    Math.random() + 50.0 + "px";
  document.getElementById("circle_cursor").style.left =
    Math.random() + 20.0 + "px";*/
  button.style.display = "none";
  document.getElementById("app").style.display = "block";
  squarePosition = document
    .getElementById("square_position")
    .getBoundingClientRect();
  trienglePosition = document
    .getElementById("triengle_position")
    .getBoundingClientRect();
  circlePosition = document
    .getElementById("circle_position")
    .getBoundingClientRect();
  square.addEventListener("mousedown", () => {
    mouse_click_detector = true;
  });
  triengle.addEventListener("mousedown", () => {
    mouse_click_detector = true;
  });
  circle.addEventListener("mousedown", () => {
    mouse_click_detector = true;
  });
  window.addEventListener("mouseup", () => {
    mouse_click_detector = false;
    window_click_detector = false;
    if (squareMove && square.parentNode.querySelector(":hover") == square) {
      square.style.backgroundColor = "rgb(219, 136, 136)";
    } else {
      square.style.backgroundColor = "red";
    }
    if (
      triengleMove &&
      triengle.parentNode.querySelector(":hover") == triengle
    ) {
      triengle.style.borderBottomColor = "orange";
    } else {
      triengle.style.borderBottomColor = "red";
    }
    if (circleMove && circle.parentNode.querySelector(":hover") == circle) {
      circle.style.backgroundColor = "blue";
    } else {
      circle.style.backgroundColor = "red";
    }

    //ריבוע
    if (
      position_x_square < squarePosition.right + 50 &&
      position_y_square < squarePosition.bottom + 50 &&
      position_x_square > squarePosition.left - 50 &&
      position_y_square > squarePosition.top - 50
    ) {
      // square.style.backgroundColor = "green";
      position_x_square = 0;
      position_y_square = 0;
      squareMove = false;
      square.style.display = "none";
      document.getElementById("square_position").style.backgroundColor =
        "green";
      goodCounter++;
      if (goodCounter == winCounter) {
        setWin();
      }
    }

    //משולש
    if (
      position_x_triengle < trienglePosition.right + 100 &&
      position_y_triengle < trienglePosition.bottom + 100 &&
      position_x_triengle > trienglePosition.left - 100 &&
      position_y_triengle > trienglePosition.top - 100
    ) {
      position_x_triengle = 0;
      position_y_triengle = 0;
      // triengle.style.backgroundColor = "green";
      triengleMove = false;
      triengle.style.display = "none";
      document.getElementById("triengle_position").style.borderBottomColor =
        "green";
      goodCounter++;
      if (goodCounter == winCounter) {
        setWin();
      }
    }

    //עיגול
    if (
      position_x_circle < circlePosition.right + 50 &&
      position_y_circle < circlePosition.bottom + 50 &&
      position_x_circle > circlePosition.left - 50 &&
      position_y_circle > circlePosition.top - 50
    ) {
      position_x_circle = 0;
      position_y_circle = 0;
      // circle.style.backgroundColor = "green";
      circleMove = false;
      circle.style.display = "none";
      document.getElementById("circle_position").style.backgroundColor =
        "green";
      goodCounter++;
      if (goodCounter == winCounter) {
        setWin();
      }
    }
    console.log(
      `x = ${position_x_square} and y= ${position_y_square} top ${squarePosition.top} left ${squarePosition.left}
                 right ${squarePosition.right} bottom ${squarePosition.bottom}`
    );
  });

  window.addEventListener("mousedown", (event) => {
    if (mouse_click_detector === true) {
      if (square.parentNode.querySelector(":hover") == square) {
        square.style.zIndex = 999;
        triengle.style.zIndex = 1;
        circle.style.zIndex = 1;
        square.style.backgroundColor = "yellow";
      }
      if (triengle.parentNode.querySelector(":hover") == triengle) {
        triengle.style.zIndex = 999;
        square.style.zIndex = 1;
        circle.style.zIndex = 1;
        triengle.style.borderBottomColor = "yellow";
      }
      if (circle.parentNode.querySelector(":hover") == circle) {
        circle.style.zIndex = 999;
        square.style.zIndex = 1;
        triengle.style.zIndex = 1;
        circle.style.backgroundColor = "yellow";
      }
      window_click_detector = true;

      click_position_x = event.offsetX;
      click_position_y = event.offsetY;
    }
  });

  window.addEventListener("mousemove", (event) => {
    if (mouse_click_detector === true) {
      if (square.parentNode.querySelector(":hover") == square) {
        position_x_square = event.clientX;
        position_y_square = event.clientY;
        if (squareMove) {
          square.style.left = position_x_square - click_position_x + "px";
          square.style.top = position_y_square - click_position_y + "px";
        }
      }
      if (triengle.parentNode.querySelector(":hover") == triengle) {
        position_x_triengle = event.clientX;
        position_y_triengle = event.clientY;
        if (triengleMove) {
          triengle.style.left = position_x_triengle - click_position_x + "px";
          triengle.style.top = position_y_triengle - click_position_y + "px";
        }
      }
      if (circle.parentNode.querySelector(":hover") == circle) {
        position_x_circle = event.clientX;
        position_y_circle = event.clientY;
        if (circleMove) {
          circle.style.left = position_x_circle - click_position_x + "px";
          circle.style.top = position_y_circle - click_position_y + "px";
        }
      }
    }
  });
});
let mouse_click_detector = false; //clicking the mouse WITHOUT moveover
let window_click_detector = false;

let position_x_square = 0;
let position_y_square = 0;
let position_x_triengle = 0;
let position_y_triengle = 0;
let position_x_circle = 0;
let position_y_circle = 0;
let click_position_x = 0;
let click_position_y = 0;

let square = document.getElementById("square_cursor");
let squareMove = true;
let triengle = document.getElementById("triengle_cursor");
let triengleMove = true;
let circle = document.getElementById("circle_cursor");
let circleMove = true;

const setWin = () => {
  setTimeout(() => {
    $.confirm({
      icon: "fa fa-smile-o",
      theme: "modern",
      title: "!ניצחת",
      content: "!כל הכבוד",
      buttons: {
        confirm: {
          text: "משחק חדש",
          action: function () {
            location.reload();
          },
        },
        confirm1: {
          text: " שלב הבא",
          next: function () {
            location.reload();
          },
        },
      },
      animation: "scale",
      type: "blue",
    });
  }, 100);
};
