/**
 * Draws a hangman depending on the number lives in the midddle of the canvas
 * e.g. canvas is empty if `lives` is 10 and the hangman is completely drawn if it is 0
 * @param canvas - the canvas element
 * @param lives - the number of lives the player has left
 */
export function drawHangman(canvas, lives) {
  const c = canvas.getContext('2d');

  // setting our drawing style
  c.lineWidth = 2;
  c.lineCap = 'round';
  c.lineJoin = 'round';
  c.strokeStyle = '#000';

  // position hangman relative to the dimensions of the canvas
  const x = canvas.width / 2.5;
  const y = canvas.height / 1.25;

  // draw a coloured rectangle as the background
  c.fillStyle = '#faa';
  c.fillRect(0, 0, canvas.width, canvas.height);

  // draw hangman depending on lives (left sides of && needs to be true for right side to work)
  lives <= 9 && line(c, x + 100, y + 20, x - 50, y + 20); // ground
  lives <= 8 && line(c, x + 80, y + 20, x + 80, y - 150); // the pole
  lives <= 7 && line(c, x, y - 150, x + 80, y - 150); // the horizontal line
  lives <= 6 && line(c, x, y - 150, x, y - 100); // the vertical line
  lives <= 5 && drawHead(c, x, y - 100); // head
  lives <= 4 && line(c, x, y - 40, x, y - 80); // body
  lives <= 3 && line(c, x + 20, y, x, y - 40); // right leg
  lives <= 2 && line(c, x - 20, y, x, y - 40); // left leg
  lives <= 1 && line(c, x + 20, y - 40, x, y - 80); // right arm
  lives === 0 && line(c, x - 20, y - 40, x, y - 80); // left arm
}

/**
 * Draws a line from (x1, y1) to (x2, y2) on the canvas c
 * @param c - the canvas context
 * @param x1 - x-coordinate of the start point
 * @param y1 - y-coordinate of the start point
 * @param x2 - x-coordinate of the end point
 * @param y2 - y-coordinate of the end point
 */
function line(c, x1, y1, x2, y2) {
  c.beginPath();
  c.moveTo(x1, y1);
  c.lineTo(x2, y2);
  c.stroke();
}

/**
 * Draws the hangman's head on canvas context `c`, centered at point (x,y)
 * @param c - the canvas context
 * @param x - x-coordinate of the center of the circle
 * @param y - y-coordinate of the center of the circle
 */
function drawHead(c, x, y) {
  // head is a circle with eyes and a mouth
  circle(c, x, y, 20); // head
  // draws the eyes (pair of crosses)
  cross(c, x - 7, y - 5, 4);
  cross(c, x + 7, y - 5, 4);
  // draws the frowny mouth further down
  y += 20;
  const startAngle = rad(-135);
  const endAngle = rad(-45);
  arc(c, x, y, 12, startAngle, endAngle);
}

/**
 * Draws a white circle on canvas context `c`, centered at point (x,y) with radius `r`
 * @param c - the canvas context
 * @param x - x-coordinate of the center of the circle
 * @param y - y-coordinate of the center of the circle
 * @param r - radius
 */
function circle(c, x, y, r) {
  c.beginPath();
  c.fillStyle = '#fff';
  c.arc(x, y, r, 0, rad(360), false);
  c.fill();
  c.stroke();
}


/**
 * Convert degrees to radians.
 * @param deg - degree of the angle
 * @returns - radian of the angle
 */
function rad(deg) {
  return deg * Math.PI / 180;
}

/**
 * Draws a cross on the canvas
 * @param c - the canvas context
 * @param x - x-coordinate of the center of the cross
 * @param y - y-coordinate of the center of the cross
 * @param size - size of the cross (roughly, the length of the arms)
 */
function cross(c, x, y, size) {
  line(c, x - (size / 2), y - (size / 2), x + (size / 2), y + (size / 2));
  line(c, x - (size / 2), y + (size / 2), x + (size / 2), y - (size / 2));
}

/**
 * Draws an arc on the canvas
 * @param c - the canvas context
 * @param x - x-coordinate of the center of the circle
 * @param y - y-coordinate of the center of the circle
 * @param r - radius of the circle the arc is part of
 * @param startAngle - starting angle, in radians (0 is at the 3 o'clock of the circle)
 * @param endAngle - angle at which the arc ends, in radians
 */
function arc(c, x, y, r, startAngle, endAngle) {
  c.beginPath();
  c.arc(x, y, r, startAngle, endAngle, false);
  c.stroke();
}
