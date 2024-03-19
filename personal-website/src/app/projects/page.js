'use client';

import React from 'react';
import ItemPaper from '@/app/ui/components/ItemPaper/ItemPaper';
import { usePathname } from 'next/navigation';
import { Container } from '@/app/lib/mui-material';

export default function ProjectsPage() {

    const pathname = usePathname();

    let projects = [
        {
            title: "Fractals Explorer",
            slug: "fractals-explorer",
            description: "Explore the Mandelbrot set and experiment with Perlin noise art"
        },
        {
            title: "A* Algorithm Visualiser",
            slug: "a-star-algorithm-visualiser",
            description: "Visualise the A* algorithm in action"
        }
    ]

    return (
        <Container sx={{ display: 'flex', justifyContent: 'space-evenly', padding: '24px', flexWrap: 'wrap' }}>
          {projects.map((project, index) => 
                <ItemPaper 
                title={project.title} 
                description={project.description} 
                link={`${pathname}/${project.slug}`} 
                key={index} 
                />
            )}
        </Container>

    );
}