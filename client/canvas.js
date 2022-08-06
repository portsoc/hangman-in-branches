/**
 * It draws a hangman on a canvas, relative to its size, and depending on the number lives left
 * the canvas is empty if lives is 10 and the hangman is completely drawm if it is 0
 * in between these values, the function adds limbs/pieces of the noose one by one.
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

  // draw hangman relative to the size of the canvas
  const x = canvas.width / 2.5;
  const y = canvas.height / 1.25;

  // add a background for now
  c.fillStyle = '#faa';
  c.fillRect(0, 0, canvas.width, canvas.height);

  lives <= 9 && line(c, x + 100, y + 20, x - 50, y + 20); // ground
  lives <= 8 && line(c, x + 80, y + 20, x + 80, y - 150); // the pole
  lives <= 7 && line(c, x, y - 150, x + 80, y - 150); // the horizontal stick
  lives <= 6 && line(c, x, y - 150, x, y - 100); // the vertical
  lives <= 5 && drawHead(c, x, y - 100); // head
  lives <= 4 && line(c, x, y - 40, x, y - 80); // body
  lives <= 3 && line(c, x + 20, y, x, y - 40); // right leg
  lives <= 2 && line(c, x - 20, y, x, y - 40); // left leg
  lives <= 1 && line(c, x + 20, y - 40, x, y - 80); // right arm
  lives === 0 && line(c, x - 20, y - 40, x, y - 80); // left arm
}

/**
 * It draws a line from (x1, y1) to (x2, y2) on the canvas `c`.
 * @param c - the canvas context
 * @param x1 - the x-coordinate of the start point
 * @param y1 - the y-coordinate of the start of the line
 * @param x2 - The x-coordinate of the end point of the line
 * @param y2 - The y-coordinate of the end point of the line
 */
function line(c, x1, y1, x2, y2) {
  c.beginPath();
  c.moveTo(x1, y1);
  c.lineTo(x2, y2);
  c.stroke();
}

/**
 * It the hangman's head on canvas context `c`, centered at point (x,y).
 * @param c - the canvas context
 * @param x - the x coordinate of the center of the circle
 * @param y - y-coordinate of the center of the circle
 */
function drawHead(c, x, y) {
  // head is a circle with eyes and a smile
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
 * @param x - the x-coordinate of the center of the circle
 * @param y - the y coordinate of the center of the circle
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
 * @param deg - The degree of the angle.
 * @returns The radian of the angle.
 */
function rad(deg) {
  return deg * Math.PI / 180;
}

/**
 * It draws a cross on the canvas `c`.
 * @param c - the canvas context
 * @param x - The x-coordinate of the center of the cross
 * @param y - The y coordinate of the center of the cross
 * @param r - The radius of the cross (roughly, the length of the arms)
 */
function cross(c, x, y, r) {
  line(c, x - (r / 2), y - (r / 2), x + (r / 2), y + (r / 2));
  line(c, x - (r / 2), y + (r / 2), x + (r / 2), y - (r / 2));
}

/**
 * It draws an arc on the canvas `c`.
 * @param c - the canvas context
 * @param x - The x-coordinate of the center of the circle
 * @param y - The y-coordinate of the center of the circle
 * @param r - the radius of the circle the arc is part of
 * @param startAngle - The starting angle, in radians (0 is at the 3 o'clock of the circle)
 * @param endAngle - The angle at which the arc ends, in radians
 */
function arc(c, x, y, r, startAngle, endAngle) {
  c.beginPath();
  c.arc(x, y, r, startAngle, endAngle, false);
  c.stroke();
}
