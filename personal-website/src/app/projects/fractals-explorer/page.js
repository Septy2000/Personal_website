'use client'

import React, { useRef, useEffect, useState } from 'react'

export default function FractalsExplorerPage() {

    const canvasRef = useRef(null)  
    const contextRef = useRef(null)

    const [isGenerated, setIsGenerated] = useState(false);

    // Current real and imaginary sets values
    let RE_MIN = -2, RE_MAX = 2;
    let IM_MIN = -1.5, IM_MAX = 1.5;

    const MAX_ITERATIONS = 500;

    // Scaling factor for taking into account resolution difference between the actual canvas
    // and the displayed canvas
    let scaling_factor = 1;

    useEffect(() => {   
        const canvas = canvasRef.current;
        canvas.width = 400;
        canvas.height = 400;
        canvas.style.width = '400px';
        canvas.style.height = '300px';
        const ctx = canvas.getContext('2d');
        contextRef.current = ctx;
    }, [])

    useEffect(() => {
        if (!isGenerated) {
            generate();
            setIsGenerated(true);
        }
    }, [isGenerated])

    function mandelbrot(c) {
        // Initialise complex number z
        let z = {x: 0, y: 0 };
        // Iteration number
        let iterations = 0;
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
            iterations += 1;
            // Repeat until the point passes the threshold or reaches maximum iterations
        } while ((Math.abs(z.x) + Math.abs(z.y)) <= 2 && iterations < MAX_ITERATIONS);
        
        return iterations;
    }
    
    /**
     * Calculate the corresponding complex plane points using the points in canvas
     * @param {number} x point on real axis
     * @param {number} y point on complex axis
     * @returns object containing x and y values on the complex plane
     */
    function complexPlanePoint(x, y) {
        let canvas = canvasRef.current;
        let WIDTH = canvas.width;
        let HEIGHT = canvas.height;

        x = RE_MIN + (x / WIDTH) * (RE_MAX - RE_MIN);
        y = IM_MIN + (y / HEIGHT) * (IM_MAX - IM_MIN);
        return { x, y }
    }
    
    function generate() {
        for (let column = 0; column < canvasRef.current.width; column++) {
            let columnValues = [];
            for (let row = 0; row < canvasRef.current.height; row++) {
                let iterationsReached = mandelbrot(complexPlanePoint(row, column)); 
                columnValues.push(iterationsReached);
            }

            drawColumn(column, columnValues);
        }
    }

    function drawColumn(column, columnValues) {
        for (let row = 0; row < canvasRef.current.height; row++) {
            draw(column, row, columnValues[row]);
        }
    }

    function draw(column, row, iterations) {
        const ctx = contextRef.current;
        ctx.fillStyle = color_HSL(iterations);
        let rect_width = (scaling_factor < 1) ? (1 / scaling_factor) : 1;
        let rect_height = (scaling_factor < 1) ? (1 / scaling_factor) : 1;

        ctx.fillRect(column, row, rect_width, rect_height);  
    }

    /**
     * Return an HSL color based on iterations
     * @param {number} iterations 
     * @returns HSL color
     */
    function color_HSL(iterations) {
    // If the point reached max iterations, this means it's part of Mandelbrot / Julia set and is colored in black
    if (iterations === MAX_ITERATIONS) {
        return `black`;
    }
    // Set the hue of the color based on the iterations number
    // Increasing the color intensity makes the colors pop more and adds more colors overall
    let hue = 1 * 360 * (iterations / MAX_ITERATIONS);
    return `hsl(${parseInt(hue)}, 100%, 50%)`

}
    
    return (
        <div>
            <h1>Fractals Explorer</h1>
            <p>Explore the Mandelbrot set and experiment with Perlin noise art</p>
            <canvas ref={canvasRef} />
        </div>
    );
}