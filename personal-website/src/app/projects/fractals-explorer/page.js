'use client'

import React, { useRef, useEffect, useState } from 'react'

export default function FractalsExplorerPage() {

    const canvasRef = useRef(null)  
    const contextRef = useRef(null)

    const [isGenerated, setIsGenerated] = useState(false)

    // Default values for the real and imaginary sets
    let RE_MIN_default = -2, RE_MAX_default = 2;
    let IM_MIN_default = -1.5, IM_MAX_default = 1.5;

    // Current real and imaginary sets values
    let RE_MIN = -2, RE_MAX = 2;
    let IM_MIN = -1.5, IM_MAX = 1.5;

    // Scaling factor for taking into account resolution difference between the actual canvas
    // and the displayed canvas
    let scaling_factor;

    const COLUMN_LIST = [];

    useEffect(() => {   
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.width = '${window.innerWidth}px';
        canvas.style.height = '${window.innerHeight}px';

        const ctx = canvas.getContext('2d')

        contextRef.current = ctx

        generate();

    }, [])

    function initColumns() {
        for (let col = 0; col < canvasRef.current.width; col++) {
            COLUMN_LIST[col] = col;
        }
    }

    function mandelbrot(c) {
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
    
    function generate() {
        if (!isGenerated) {
            return;
        }

        initColumns();

        for (let row = 0; row < canvasRef.current.width; row++) {
            for (let column = 0; column < canvasRef.current.height; column++) {
                mandelbrot(complexPlanePoint(row, column));            
            }

        setIsGenerated(true);
        }
    }

    function draw(columnValues) {
   
        for (let i = 0; i < canvas_2d.height; i++) {
            // Extract the iterations number of each point
            const iterations = columnValues[i];

            ctx.fillStyle = color_HSL(iterations);


            // Modify the width and height of each rectangle so that it fits the image if the resolution is lower than the displayed canvas
            let rect_width = (scaling_factor < 1) ? (1 / scaling_factor) : 1;
            let rect_height = (scaling_factor < 1) ? (1 / scaling_factor) : 1;

            ctx.fillRect(col, i, rect_width, rect_height);
        }
    }
    
    return (
        <div>
            <h1>Fractals Explorer</h1>
            <p>Explore the Mandelbrot set and experiment with Perlin noise art</p>
            <canvas ref={canvasRef} />
        </div>
    );
}