// draws a hangman on the given canvas el at x,y and at stage specified by lives
export function drawHangman(el, lives) {
  const c = el.getContext('2d');

  // setting our drawing style
  c.lineWidth = 2;
  c.lineCap = 'round';
  c.lineJoin = 'round';
  c.strokeStyle = '#000';

  // draw hangman relative to the size of the canvas
  const x = el.width / 2.5;
  const y = el.height / 1.25;

  c.fillStyle = 'white';
  c.fillRect(0, 0, el.width, el.height);
  lives <= 10 && line(c, x + 100, y + 20, x - 50, y + 20); // ground
  lives <= 9 && line(c, x + 80, y + 20, x + 80, y - 150); // the pole
  lives <= 8 && line(c, x + 30, y - 150, x + 80, y - 100); // the diagonal suppot
  lives <= 7 && line(c, x, y - 150, x + 80, y - 150); // the horizontal stick
  lives <= 6 && line(c, x, y - 150, x, y - 100); // the vertical
  lives <= 5 && drawHead(c, x, y); // head
  lives <= 4 && line(c, x, y - 40, x, y - 80); // body
  lives <= 3 && line(c, x + 20, y, x, y - 40); // right leg
  lives <= 2 && line(c, x - 20, y, x, y - 40); // left leg
  lives <= 1 && line(c, x + 20, y - 40, x, y - 80); // right arm
  lives === 0 && line(c, x - 20, y - 40, x, y - 80); // left arm
}

// draw 2 limbs centered at x,y
function drawLimbs(c, x, y) {
  line(c, x - 20, y, x, y - 40);
  line(c, x + 20, y, x, y - 40);
}

// draw a line on canvas context `c`, from point x1,y1 to point x2,y2
function line(c, x1, y1, x2, y2) {
  c.beginPath();
  c.moveTo(x1, y1);
  c.lineTo(x2, y2);
  c.stroke();
}

function drawHead(c, x, y) {
  // head is a circle with eyes and a smile
  circle(c, x, y - 100, 20); // head
  drawFace(c, x, y - 100); // face
}

function drawFace(c, x, y) {
  const startAngle = rad(-135);
  const endAngle = rad(-45);
  cross(c, x - 7, y - 5, 4);
  cross(c, x + 7, y - 5, 4);
  y += 20;
  arc(c, x, y, 12, startAngle, endAngle);
}

// draw a circle on canvas context `c`, centered on x,y, with radius r
// also fill the circle with white (so it's not transparent)
function circle(c, x, y, r) {
  c.beginPath();
  c.fillStyle = '#fff';
  c.arc(x, y, r, 0, rad(360), false);
  c.fill();
  c.stroke();
}

// convert from degrees to radians
function rad(x) {
  return x * Math.PI / 180;
}

// draw a cross on canvas context `c`, contained within a circle centered at x,y with radius of r
function cross(c, x, y, r) {
  line(c, x - (r / 2), y - (r / 2), x + (r / 2), y + (r / 2));
  line(c, x - (r / 2), y + (r / 2), x + (r / 2), y - (r / 2));
}


// draw an arc that is part of a circle centered at x,y, with radius r, and with start and end angles specified
function arc(c, x, y, r, startAngle, endAngle) {
  c.beginPath();
  if (startAngle == null) {
    startAngle = rad(+45);
  }
  if (endAngle == null) {
    endAngle = rad(+135);
  }
  c.arc(x, y, r, startAngle, endAngle, false);
  c.stroke();
}
