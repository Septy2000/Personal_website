export function mandelbrot(c) {
    // Initialise complex number z
    let z = {x: 0, y: 0 };
    // Iteration number
    let n = 0;
    let z_sqr; 
    do {
        // Complex number Z squared 
        // The minus exists because i^2 is -1
        z_sqr = {
            x: Math.pow(z.x, 2) - Math.pow(z.y, 2),
            y: 2 * z.x * z.y
        }

        // Complex number Z with added C (i.e z^2 + c)
        z = {
            x: z_sqr.x + c.x,
            y: z_sqr.y + c.y
        }
        n += 1;
        // Repeat until the point passes the threshold or reaches maximum iterations
    } while ((Math.abs(z.x) + Math.abs(z.y)) <= 2 && n < MAX_ITERATIONS);
    
    return n;
}

/**
 * Calculate the corresponding complex plane points using the points in canvas
 * @param {number} x point on real axis
 * @param {number} y point on complex axis
 * @returns object containing x and y values on the complex plane
 */
function complexPlanePoint(x, y) {
    x = RE_MIN + (x / WIDTH) * (RE_MAX - RE_MIN);
    y = IM_MIN + (y / HEIGHT) * (IM_MAX - IM_MIN);
    return { x, y }
}