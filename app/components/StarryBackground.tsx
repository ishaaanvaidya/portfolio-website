"use client";

import { useEffect, useRef } from "react";

export default function StarryBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Respect prefers-reduced-motion: render a static starfield, no rAF loop.
        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

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
            drawStars(); // always draw at least once on resize
        };

        const initStars = () => {
            const starCount = Math.floor((canvas.width * canvas.height) / 9000);
            stars = [];
            for (let i = 0; i < starCount; i++) {
                const baseOpacity = Math.random() * 0.5 + 0.2;
                stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 1.2 + 0.4,
                    speedX: (Math.random() - 0.5) * 0.04,
                    speedY: (Math.random() - 0.5) * 0.04,
                    opacity: baseOpacity,
                    baseOpacity: baseOpacity,
                    fadeSpeed: Math.random() * 0.005 + 0.002,
                    fadeDir: Math.random() > 0.5 ? 1 : -1,
                });
            }
        };

        const drawStars = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "#ffffff";

            stars.forEach((star) => {
                if (!prefersReducedMotion) {
                    star.opacity += star.fadeSpeed * star.fadeDir;
                    if (star.opacity > star.baseOpacity + 0.25 || star.opacity > 0.95) {
                        star.fadeDir = -1;
                    } else if (star.opacity < star.baseOpacity - 0.25 || star.opacity < 0.1) {
                        star.fadeDir = 1;
                    }
                    star.x += star.speedX;
                    star.y += star.speedY;
                    if (star.x < 0) star.x = canvas.width;
                    if (star.x > canvas.width) star.x = 0;
                    if (star.y < 0) star.y = canvas.height;
                    if (star.y > canvas.height) star.y = 0;
                }

                ctx.globalAlpha = star.opacity;
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fill();
            });

            ctx.globalAlpha = 1.0;

            if (!prefersReducedMotion) {
                animationFrameId = requestAnimationFrame(drawStars);
            }
        };

        const handleVisibilityChange = () => {
            if (document.hidden) {
                if (animationFrameId) {
                    cancelAnimationFrame(animationFrameId);
                    animationFrameId = 0;
                }
            } else {
                if (!animationFrameId && !prefersReducedMotion) {
                    animationFrameId = requestAnimationFrame(drawStars);
                }
            }
        };

        window.addEventListener("resize", resizeCanvas);
        document.addEventListener("visibilitychange", handleVisibilityChange);
        resizeCanvas();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none -z-10 w-full h-full"
            aria-hidden="true"
        />
    );
}
