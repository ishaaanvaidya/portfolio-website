"use client";

import { useEffect, useRef } from "react";

export default function StarryBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let stars: Array<{
            x: number;
            y: number;
            size: number;
            speedX: number;
            speedY: number;
            opacity: number;
            baseOpacity: number;
            fadeSpeed: number;
            fadeDir: number;
        }> = [];

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initStars();
        };

        const initStars = () => {
            const starCount = Math.floor((canvas.width * canvas.height) / 9000); // ideal density of stars
            stars = [];
            for (let i = 0; i < starCount; i++) {
                const baseOpacity = Math.random() * 0.5 + 0.2; // base opacity between 0.2 and 0.7
                stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 1.2 + 0.4, // size from 0.4px to 1.6px
                    speedX: (Math.random() - 0.5) * 0.04, // very slow drift X
                    speedY: (Math.random() - 0.5) * 0.04, // very slow drift Y
                    opacity: baseOpacity,
                    baseOpacity: baseOpacity,
                    fadeSpeed: Math.random() * 0.005 + 0.002, // twinkling speed
                    fadeDir: Math.random() > 0.5 ? 1 : -1,
                });
            }
        };

        const drawStars = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "#ffffff";

            stars.forEach((star) => {
                // Gentle twinkling effect
                star.opacity += star.fadeSpeed * star.fadeDir;
                if (star.opacity > star.baseOpacity + 0.25 || star.opacity > 0.95) {
                    star.fadeDir = -1;
                } else if (star.opacity < star.baseOpacity - 0.25 || star.opacity < 0.1) {
                    star.fadeDir = 1;
                }

                ctx.globalAlpha = star.opacity;
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fill();

                // Slow drift update
                star.x += star.speedX;
                star.y += star.speedY;

                // Wrap stars screen borders
                if (star.x < 0) star.x = canvas.width;
                if (star.x > canvas.width) star.x = 0;
                if (star.y < 0) star.y = canvas.height;
                if (star.y > canvas.height) star.y = 0;
            });

            ctx.globalAlpha = 1.0;
            animationFrameId = requestAnimationFrame(drawStars);
        };

        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();
        drawStars();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none -z-10 w-full h-full"
        />
    );
}
