"use client";

import React, { useEffect, useRef, useState } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";

// Modal File Cards for Card 1: Character Animation
const CHARACTER_ANIMATION_CARDS = [
  /*{
    title: "Rigging Setup",
    desc: "Advanced skeletal rigging with IK/FK controls for smooth character movement.",
    image: "/icons/rig.png",
    images: ["/icons/rig.png", "/icons/blender.png", "/icons/pro.png"],
  },
  {
    title: "Motion Capture",
    desc: "High-fidelity motion capture data processed and refined for realistic animations.",
    image: "/icons/blender.png",
    images: ["/icons/blender.png", "/icons/render.png", "/icons/pro.png"],
  },
  {
    title: "Facial Animation",
    desc: "Detailed facial expressions and lip-sync animations for character performance.",
    image: "/icons/substance.png",
    images: ["/icons/substance.png", "/icons/blender.png", "/icons/render.png"],
  },*/
  {
    title: "Walk Cycles",
    desc: "Natural and physics-based walk cycles for various character types and weights.",
    image: "/project/animation/animation04/walk-preview.png",
    images: ["/project/animation/animation04/walking01.mp4", "/project/animation/animation04/walking02.mp4"],
  },
  {
    title: "Dancing",
    desc: "A stylized dancing animation with smooth motion, rhythmic movement, and lively expressive energy.",
    image: "/project/animation/animation05/dance-preview.png",
    images: ["/project/animation/animation05/dance01.mp4", "/project/animation/animation05/dance02.mp4"],
  },
] as const;

// Modal File Cards for Card 2: Environment Design
const ENVIRONMENT_DESIGN_CARDS = [
  {
    title: "Sci-Fi Army Base",
    desc: "A stylized sci-fi army base with futuristic structures, glowing elements, and a sleek high-tech design.",
    image: "/project/environment/environment01/environment01.jpg",
    images: ["/project/environment/environment01/environment01.jpg", "/project/environment/environment01/environment02.jpg", "/project/environment/environment01/environment03.jpg", "/project/environment/environment01/environment04.jpg", "/project/environment/environment01/environment05.jpg", "/project/environment/environment01/environment06.jpg"],
  },
  {
    title: "Sci-Fi Farm-House",
    desc: "A stylized sci-fi farmhouse with rustic forms, sleek panels, and soft glowing accents.",
    image: "/project/environment/environment02/environment01.jpg",
    images: ["/project/environment/environment02/environment01.jpg", "/project/environment/environment02/environment02.jpg", "/project/environment/environment02/environment03.jpg"],
  },
  {
    title: "Stylized Witch Hall",
    desc: "A stylized witch hall with dark magical architecture, glowing runes, and a mystical, eerie atmosphere..",
    image: "/project/environment/environment03/environment01.jpg",
    images: ["/project/environment/environment03/environment01.jpg", "/project/environment/environment03/environment02.jpg", "/project/environment/environment03/environment03.jpg"],
  },
  {
    title: "Sci-Fi Civilization",
    desc: "A stylized sci-fi civilization with futuristic cities, glowing infrastructure, and a vast high-tech atmosphere.",
    image: "/project/environment/environment04/environment01.jpg",
    images: ["/project/environment/environment04/environment01.jpg", "/project/environment/environment04/environment02.jpg", "/project/environment/environment04/environment03.jpg"],
  },
  {
    title: "Destroyed Japanese City",
    desc: "A destroyed Japanese city with ruins, debris, and a somber atmosphere.",
    image: "/project/environment/environment05/environment01.png",
    images: ["/project/environment/environment05/environment01.png", "/project/environment/environment05/environment02.mp4"],
  },
] as const;

// Modal File Cards for Card 3: Game-Ready Assets
const GAME_READY_ASSETS_CARDS = [
  {
    title: "Stylized Tiny-House",
    desc: "A cute pastel-blue 3D tiny house with a red tiled roof, wooden doors, and a soft cozy storybook vibe.",
    image: "/project/assets/tinyhouse/preview.png",
    images: ["/project/assets/tinyhouse/tinyhouse.png", "/project/assets/tinyhouse/solid.jpg", "/project/assets/tinyhouse/wireframe.jpg", "/project/assets/tinyhouse/tinyhouse.webm"],
  },
  {
    title: "NAGRA D-II TB4 Alpha",
    desc: "Efficient UV layouts with minimal seams, perfect for texture atlasing and game engines.",
    image: "/project/assets/model02/armstrong01.jpg",
    images: ["/project/assets/model02/armstrong01.jpg", "/project/assets/model02/armstrong02.jpg", "/project/assets/model02/armstrong-studio.jpg", "/project/assets/model02/armstrong-vintage.jpg", "/project/assets/model02/armstron-open.jpg"],
  },
  {
    title: "Tree Stump",
    desc: "A stylized 3D tree stump with textured bark, visible growth rings, and a soft, earthy, natural look.",
    image: "/project/assets/model03/fedorenko01.jpg",
    images: ["/project/assets/model03/fedorenko01.jpg", "/project/assets/model03/fedorenko02.jpg", "/project/assets/model03/fedorenko03.jpg", "/project/assets/model03/fedorenko03.jpg"],
  },
  {
    title: "Fire Hydrant",
    desc: "A stylized 3D fire hydrant with a compact shape, smooth rounded edges, and a clean, vibrant finish.",
    image: "/project/assets/model04/hydrant01.jpg",
    images: ["/project/assets/model04/hydrant01.jpg", "/project/assets/model04/hydrant02.jpg", "/project/assets/model04/hydrant03.jpg", "/project/assets/model04/hydrant04.jpg", "/project/assets/model04/hydrant05.jpg"],
  },
  {
    title: "Lamp Variants",
    desc: "A collection of stylized 3D lamp variants featuring different shapes, soft lighting, and a cohesive modern design aesthetic.",
    image: "/project/assets/model05/studio01.jpg",
    images: ["/project/assets/model05/studio01.jpg", "/project/assets/model05/studio02.jpg", "/project/assets/model05/studio03.jpg", "/project/assets/model05/studio04.jpg"],
  },
] as const;

// Modal File Cards for Card 4: Stylized-Characters
const STYLIZED_CHARACTERS_CARDS = [
  {
    title: "Stylized Girl Character",
    desc: "A stylized 3D girl character with soft features, expressive eyes, and a cute, polished look.",
    image: "/project/characters/model01/girl01.jpg",
    images: ["/project/characters/model01/girl01.jpg", "/project/characters/model01/girl02.jpg", "/project/characters/model01/girl03.jpg", "/project/characters/model01/girl04.jpg", "/project/characters/model01/girl05.mp4", "/project/characters/model01/girl06.jpg"],
  },
  {
    title: "Stylized Demon Girl",
    desc: "A stylized 3D demon girl with small horns, glowing eyes, and a cute yet slightly dark aesthetic.",
    image: "/project/characters/model02/demon_girl01.jpg",
    images: ["/project/characters/model02/demon_girl01.jpg", "/project/characters/model02/demon_girl02.jpg", "/project/characters/model02/demon_girl03.jpg", "/project/characters/model02/demon_girl04.jpg", "/project/characters/model02/demon_girl05.mp4", "/project/characters/model02/demon_girl06.jpg"],
  },
  {
    title: "Stylized Girl Junjie",
    desc: "A stylized 3D girl named Junjie with soft features, expressive eyes, and a clean, polished look.",
    image: "/project/characters/model03/junjie01.webp",
    images: ["/project/characters/model03/junjie01.webp", "/project/characters/model03/junjie02.webp", "/project/characters/model03/junjie03.webp", "/project/characters/model03/junjie04.webp", "/project/characters/model03/junjie05.mp4", "/project/characters/model03/junjie06.webp"],
  },
  {
    title: "Stylized Boy",
    desc: "A stylized 3D boy with soft features, simple proportions, and a clean, playful look.",
    image: "/project/characters/model04/stylized_boy01.webp",
    images: ["/project/characters/model04/stylized_boy01.webp", "/project/characters/model04/stylized_boy02.webp", "/project/characters/model04/stylized_boy03.webp", "/project/characters/model04/stylized_boy04.mp4", "/project/characters/model04/stylized_boy05.webp"],
  },
  {
    title: "Stylized Mini-Robot",
    desc: "A stylized 3D mini-robot with a compact design, smooth edges, and a vibrant color scheme.",
    image: "/project/characters/model05/robot01.png",
    images: ["/project/characters/model05/robot01.png", "/project/characters/model05/robot02.png", "/project/characters/model05/robot03.png", "/project/characters/model05/robot04.png", "/project/characters/model05/robot05.png"],
  },
] as const;

// --- ১. স্ক্রাবিং ভিডিও কম্পোনেন্ট (lag-fixed) ---
function ScrubVideo({ src, className, tiltStrength = 7 }: { src: string; className: string; tiltStrength?: number }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const isHoveredRef = useRef(false);
  const lastMouseX = useRef<number | null>(null);
  const pendingMouseX = useRef<number | null>(null);
  const rafId = useRef<number | null>(null);

  const rotateRef = useRef({ x: 0, y: 0 });

  const applyTransform = () => {
    const video = videoRef.current;
    if (!video) return;
    video.style.transform = `rotateX(${rotateRef.current.x}deg) rotateY(${rotateRef.current.y}deg)`;
  };

  const processScrub = () => {
    const video = videoRef.current;
    if (!video) {
      rafId.current = null;
      return;
    }

    const mouseX = pendingMouseX.current;
    if (
      mouseX !== null &&
      isHoveredRef.current &&
      video.readyState >= 2 &&
      lastMouseX.current !== null
    ) {
      const deltaX = lastMouseX.current - mouseX;
      // sensitivity কমানো হয়েছে for smoother scrubbing
      let nextTime = video.currentTime + deltaX * 0.02;
      const duration = video.duration || 0;

      if (duration > 0) {
        if (nextTime < 0) nextTime = duration;
        if (nextTime > duration) nextTime = 0;
        video.currentTime = nextTime;
      }

      lastMouseX.current = mouseX;
    }

    pendingMouseX.current = null;
    rafId.current = null;
  };

  const queueScrub = () => {
    if (rafId.current !== null) return;
    rafId.current = requestAnimationFrame(processScrub);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLVideoElement>) => {
    const video = videoRef.current;
    if (!video) return;

    // video scrubbing throttled by rAF
    pendingMouseX.current = e.clientX;
    queueScrub();

    // 3D tilt without re-render
    const rect = video.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    rotateRef.current.x = ((y - centerY) / centerY) * -tiltStrength;
    rotateRef.current.y = ((x - centerX) / centerX) * tiltStrength;
    applyTransform();
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLVideoElement>) => {
    isHoveredRef.current = true;
    lastMouseX.current = e.clientX;
    videoRef.current?.pause();
  };

  const handleMouseLeave = () => {
    isHoveredRef.current = false;
    lastMouseX.current = null;
    pendingMouseX.current = null;

    rotateRef.current = { x: 0, y: 0 };
    applyTransform();

    if (rafId.current !== null) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }

    videoRef.current?.play().catch(() => { });
  };

  useEffect(() => {
    return () => {
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div style={{ perspective: "1000px" }}>
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        className={`${className} cursor-ew-resize transition-transform duration-150 ease-out will-change-transform`}
        preload="metadata"
        style={{ transformStyle: "preserve-3d" }}
      >
        <source src={src} type="video/webm" />
      </video>
    </div>
  );
}

// --- ২. প্রজেক্ট কার্ড কম্পোনেন্ট ---
function ProjectCard({
  title,
  desc,
  previewImage,
  glowColor,
  borderColor,
  tags,
  titleHoverClass,
  cardId,
  onViewDetails,
}: {
  title: string;
  desc: string;
  previewImage: string;
  glowColor: string;
  borderColor: string;
  tags: string[];
  titleHoverClass: string;
  cardId: number;
  onViewDetails: (project: { title: string; desc: string; tags: string[]; preview: string; cardId: number }) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty("--mouse-x", `${x}px`);
    el.style.setProperty("--mouse-y", `${y}px`);
  };

  const match = glowColor.match(/rgba\((\d+,\d+,\d+)/);
  const edgeGlowColor = match ? `rgba(${match[1]}, 0.8)` : "rgba(255,255,255,0.8)";

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`group edge-glow relative p-[1px] rounded-xl bg-white/5 backdrop-blur-md border border-white/10 transition-all duration-300 ${borderColor}`}
      style={{ "--glow-color": edgeGlowColor } as React.CSSProperties}
    >
      <div className="relative overflow-hidden rounded-lg bg-transparent p-3 h-full flex flex-col">
        <div
          className="relative rounded-md overflow-hidden aspect-[1/0.8] cursor-pointer"
          onClick={() => onViewDetails({ title, desc, tags, preview: previewImage, cardId })}
        >
          <img
            src={previewImage}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails({ title, desc, tags, preview: previewImage, cardId });
              }}
              className="relative px-0 py-1 text-[10px] leading-none font-medium text-white rounded-full bg-black/30 backdrop-blur-[2px] group transition-transform duration-300 hover:scale-105 border border-white/10"
            >
              <span className="relative z-10 tracking-tight uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">View Details</span>
            </button>
          </div>
        </div>

        <div className="px-2 pt-16 pb-1">
          <h3
            className={`text-white text-2xl md:text-3xl font-light tracking-tight transition-transform duration-300 opacity-70 group-hover:opacity-100 group-hover:-translate-y-2 group-hover:-translate-x-2 ${titleHoverClass}`}
          >
            {title}
          </h3>
          <p className="text-gray-400 text-sm mt-2">{desc}</p>
        </div>

        <div className="px-2 pb-2 flex flex-wrap gap-2">
          {tags.map((tag, i) => (
            <div
              key={i}
              className="flex items-center justify-center transition-all duration-300 hover:scale-110 opacity-50"
            >
              <img src={tag} alt="tech" className="w-5 h-5 object-contain" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- ৩. লোকাল টাইম কম্পোনেন্ট ---
function LocalTime() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const bdTime = new Date(utc + 6 * 60 * 60 * 1000);
      const formatted = bdTime.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
      setTime(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return <span className="text-gray-300">{time} UTC+6</span>;
}

// --- ৩.৫. ম্যাগনেটিক সার্ভিস কার্ড কম্পোনেন্ট ---
function MagneticServiceCard({
  service,
}: {
  service: {
    icon: string;
    title: string;
    desc: string;
    glowColor: string;
    borderColor: string;
    iconColor: string;
  };
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    el.style.setProperty('--mouse-x', `${x}px`);
    el.style.setProperty('--mouse-y', `${y}px`);

    const magnetX = (x - centerX) * 0.05;
    const magnetY = (y - centerY) * 0.05;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    gsap.to(el, {
      x: magnetX,
      y: magnetY,
      rotateX,
      rotateY,
      duration: 0.15,
      ease: "power2.out",
      transformPerspective: 1000,
    });
  };

  const handleMouseLeave = () => {
    const el = cardRef.current;
    if (!el) return;

    gsap.to(el, {
      x: 0,
      y: 0,
      rotateX: 0,
      rotateY: 0,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const match = service.glowColor.match(/rgba\((\d+,\d+,\d+)/);
  const edgeGlowColor = match ? `rgba(${match[1]}, 0.8)` : "rgba(255,255,255,0.8)";

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group edge-glow bg-[#111827]/80 backdrop-blur-md p-8 rounded-lg border transition-[border-color,box-shadow,background-color] duration-300 ${service.borderColor}`}
      style={{ transformStyle: "preserve-3d", "--glow-color": edgeGlowColor } as React.CSSProperties}
    >
      <div style={{ transform: "translateZ(30px)", backfaceVisibility: "hidden" }}>
        <div className={`text-blue-400 text-xl mb-4 transition-transform duration-300 group-hover:scale-110 ${service.iconColor}`}>
          {service.icon}
        </div>
        <h3 className={`text-white font-semibold mb-2 transition-colors duration-300 ${service.iconColor}`}>{service.title}</h3>
        <p className="text-gray-400 text-sm">{service.desc}</p>
      </div>
    </div>
  );
}

// --- ৩.৬. বাবল ব্যাকগ্রাউন্ড কম্পোনেন্ট (Contact Section) ---
function BubbleBackground() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const bubble1Ref = useRef<HTMLDivElement>(null);
  const bubble2Ref = useRef<HTMLDivElement>(null);
  const bubble3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapperRef.current) return;

    // Initial idle animation
    const idleAnim = gsap.to([bubble1Ref.current, bubble2Ref.current, bubble3Ref.current], {
      x: "random(-200, 200)",
      y: "random(-200, 200)",
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 2
    });

    let isHovering = false;

    const handleMouseMove = (e: MouseEvent) => {
      const container = wrapperRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();

      // Check if mouse is inside the bounds of the container
      const isInside = (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      );

      if (isInside) {
        if (!isHovering) {
          isHovering = true;
          idleAnim.pause();
        }

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        gsap.to(bubble1Ref.current, { x: x - centerX, y: y - centerY, duration: 0.4, ease: "power2.out" });
        gsap.to(bubble2Ref.current, { x: x - centerX, y: y - centerY, duration: 1.2, ease: "power2.out" });
        gsap.to(bubble3Ref.current, { x: x - centerX, y: y - centerY, duration: 2.5, ease: "power2.out" });
      } else if (isHovering) {
        isHovering = false;
        // Return to center slowly and resume idle
        gsap.to([bubble1Ref.current, bubble2Ref.current, bubble3Ref.current], {
          x: 0,
          y: 0,
          duration: 2,
          ease: "power2.out",
          onComplete: () => {
            idleAnim.restart();
          }
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      idleAnim.kill();
    };
  }, []);

  return (
    <div ref={wrapperRef} className="absolute inset-0 overflow-hidden pointer-events-none z-0 rounded-md">
      {/* Bubbles */}
      <div
        ref={bubble1Ref}
        className="absolute w-[300px] h-[300px] rounded-full bg-gradient-to-tr from-cyan-500/80 to-blue-500/80 blur-[40px]"
        style={{ top: '50%', left: '50%', margin: '-150px 0 0 -150px' }}
      />
      <div
        ref={bubble2Ref}
        className="absolute w-[400px] h-[400px] rounded-full bg-gradient-to-br from-purple-500/70 to-pink-500/70 blur-[60px]"
        style={{ top: '50%', left: '50%', margin: '-200px 0 0 -200px' }}
      />
      <div
        ref={bubble3Ref}
        className="absolute w-[200px] h-[200px] rounded-full bg-gradient-to-bl from-amber-500/60 to-orange-500/60 blur-[30px]"
        style={{ top: '50%', left: '50%', margin: '-100px 0 0 -100px' }}
      />
    </div>
  );
}

// --- ৩.৭. গ্লোবাল পার্টিকেল ব্যাকগ্রাউন্ড ---
function GlobalParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: { x: number, y: number, radius: number, vx: number, vy: number, baseVx: number, baseVy: number, alpha: number, maxAlpha: number, color: string }[] = [];
    const colors = ['#22d3ee', '#a855f7', '#ec4899', '#ffffff'];

    let mouse = { x: -1000, y: -1000 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseOut = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseOut);

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const numParticles = Math.floor((canvas.width * canvas.height) / 15000);
      for (let i = 0; i < numParticles; i++) {
        const vx = (Math.random() - 0.5) * 0.2;
        const vy = (Math.random() - 0.5) * 0.2 - 0.1;
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5 + 0.5,
          vx: vx,
          vy: vy,
          baseVx: vx,
          baseVy: vy,
          alpha: Math.random(),
          maxAlpha: Math.random() * 0.5 + 0.2,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        // Mouse interaction
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 150;

        if (distance < maxDistance) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const force = (maxDistance - distance) / maxDistance;

          p.vx -= forceDirectionX * force * 0.6;
          p.vy -= forceDirectionY * force * 0.6;
        }

        // Friction to return to original speed
        p.vx += (p.baseVx - p.vx) * 0.05;
        p.vy += (p.baseVy - p.vy) * 0.05;

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        p.alpha += (Math.random() - 0.5) * 0.02;
        if (p.alpha > p.maxAlpha) p.alpha = p.maxAlpha;
        if (p.alpha < 0.1) p.alpha = 0.1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.fill();

        // Draw connecting line to mouse
        if (distance < maxDistance) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = p.color;
          ctx.globalAlpha = p.alpha * (1 - distance / maxDistance) * 0.8;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      });

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-40" />;
}

// --- ৪. মেইন হোম পেজ ---
export default function Home() {
  const [active, setActive] = useState("home");
  const [showSocials, setShowSocials] = useState(false);
  const [showScrollHint, setShowScrollHint] = useState(true);
  const [liftBadges, setLiftBadges] = useState(false);
  const [loveJump, setLoveJump] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState<{
    title: string;
    desc: string;
    tags: string[];
    preview: string;
  } | null>(null);
  const [selectedCard, setSelectedCard] = useState<{
    title: string;
    desc: string;
    image: string;
    images?: readonly string[];
  } | null>(null);
  const [selectedFileCardIndex, setSelectedFileCardIndex] = useState<number | null>(null);
  const [activeCardId, setActiveCardId] = useState<number | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoomedMediaId, setZoomedMediaId] = useState<string | null>(null);
  const [zoomOrigin, setZoomOrigin] = useState("50% 50%");
  const [zoomScale, setZoomScale] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [imageAspectRatios, setImageAspectRatios] = useState<Record<string, number>>({});
  const dragStartRef = useRef<{ x: number; y: number; pointerId: number } | null>(null);
  const dragMovedRef = useRef(false);
  const ignoreClickRef = useRef(false);
  const contactCardRef = useRef<HTMLDivElement | null>(null);
  const previewScrollRef = useRef<HTMLDivElement | null>(null);

  // Navigation state for project preview
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

  useEffect(() => {
    setZoomedMediaId(null);
    setZoomOrigin("50% 50%");
    setZoomScale(1);
  }, [selectedCard]);

  useEffect(() => {
    if (previewScrollRef.current) {
      previewScrollRef.current.scrollTop = 0;
    }
  }, [selectedCard]);

  const lenisRef = useRef<Lenis | null>(null);
  const lenisRafIdRef = useRef<number | null>(null);

  // Helper function to get the correct modal file cards based on cardId
  const getModalFileCards = (cardId: number) => {
    switch (cardId) {
      case 1:
        return CHARACTER_ANIMATION_CARDS;
      case 2:
        return ENVIRONMENT_DESIGN_CARDS;
      case 3:
        return GAME_READY_ASSETS_CARDS;
      case 4:
        return STYLIZED_CHARACTERS_CARDS;
      default:
        return CHARACTER_ANIMATION_CARDS;
    }
  };

  const initLenis = () => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
    });
    lenisRef.current = lenis;
  };

  useEffect(() => {
    initLenis();

    const raf = (time: number) => {
      lenisRef.current?.raf(time);
      lenisRafIdRef.current = requestAnimationFrame(raf);
    };

    lenisRafIdRef.current = requestAnimationFrame(raf);

    const handleAnchorClick = (e: MouseEvent) => {
      const targetNode = e.target;
      if (!(targetNode instanceof Element)) return;

      const target = targetNode.closest("a");
      if (target && target.hash && target.origin === window.location.origin) {
        e.preventDefault();
        const id = target.hash.slice(1);
        const element = document.getElementById(id);
        if (element) {
          lenisRef.current?.scrollTo(element, { offset: -80 });
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      if (lenisRafIdRef.current) cancelAnimationFrame(lenisRafIdRef.current);
      document.removeEventListener("click", handleAnchorClick);
      lenisRafIdRef.current = null;
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;

    if (showModal) {
      html.style.overflow = "hidden";
      body.style.overflow = "hidden";
      // Lenis intercepts wheel events; destroy it while modal is open
      lenisRef.current?.destroy();
      lenisRef.current = null;
    } else {
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
      if (!lenisRef.current) initLenis();
    }

    return () => {
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
      if (!lenisRef.current) initLenis();
    };
  }, [showModal]);

  useEffect(() => {
    if (showEmailForm) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      lenisRef.current?.stop();
    } else if (!showModal) {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      lenisRef.current?.start();
    }

    return () => {
      if (!showModal) {
        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";
        lenisRef.current?.start();
      }
    };
  }, [showEmailForm, showModal]);

  useEffect(() => {
    if (showModal) {
      const frame = requestAnimationFrame(() => setModalVisible(true));
      return () => cancelAnimationFrame(frame);
    }
    setModalVisible(false);
    return undefined;
  }, [showModal]);

  useEffect(() => {
    if (!showModal) return;
    const handlePopState = () => {
      if (window.location.hash !== '#modal') {
        setShowModal(false);
        setSelectedProject(null);
        setSelectedFileCardIndex(null);
        setSelectedCard(null);
        setActiveCardId(null);
        setIsFullscreen(false);
        setZoomedMediaId(null);
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [showModal]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const fullscreen = !!document.fullscreenElement;
      setIsFullscreen(fullscreen);
      setZoomedMediaId(null);
      setZoomOrigin("50% 50%");
      setPanOffset({ x: 0, y: 0 });
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange as EventListener);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange as EventListener);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange as EventListener);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange as EventListener);
      document.removeEventListener("mozfullscreenchange", handleFullscreenChange as EventListener);
      document.removeEventListener("MSFullscreenChange", handleFullscreenChange as EventListener);
    };
  }, []);

  useEffect(() => {
    const sections = ["home", "about", "projects", "services", "contact"];

    const handleScroll = () => {
      let current = "home";
      sections.forEach((id) => {
        const section = document.getElementById(id);
        if (section) {
          const offset = section.offsetTop - 150;
          if (window.scrollY >= offset) {
            current = id;
          }
        }
      });
      setActive(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleHideOnScroll = () => {
      if (contactCardRef.current) {
        const rect = contactCardRef.current.getBoundingClientRect();
        if (rect.top > window.innerHeight + 100) {
          setShowSocials(false);
        }
      }
    };

    window.addEventListener("scroll", handleHideOnScroll);
    return () => window.removeEventListener("scroll", handleHideOnScroll);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setShowScrollHint(window.scrollY < 60);
    };

    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onScrollLift = () => {
      setLiftBadges(window.scrollY > 40);
    };

    onScrollLift();
    window.addEventListener("scroll", onScrollLift);
    return () => window.removeEventListener("scroll", onScrollLift);
  }, []);

  const handleLoveClick = () => {
    setLoveJump(true);
    setTimeout(() => setLoveJump(false), 1000); // Reset after animation
  };

  const handleViewDetails = (project: { title: string; desc: string; tags: string[]; preview: string; cardId: number }) => {
    const MODAL_CARDS = getModalFileCards(project.cardId);
    setSelectedProject(project);
    setActiveCardId(project.cardId);
    setSelectedFileCardIndex(0);
    setCurrentProjectIndex(0);
    setSelectedCard({
      title: MODAL_CARDS[0].title,
      desc: MODAL_CARDS[0].desc,
      image: MODAL_CARDS[0].image,
      images: MODAL_CARDS[0].images,
    });
    setShowModal(true);
    window.location.hash = 'modal';
  };

  const closeModal = (e?: React.SyntheticEvent) => {
    if (e && e.stopPropagation) {
      e.stopPropagation();
    }
    if (window.location.hash === '#modal') {
      window.history.back();
    }
    setShowModal(false);
    setSelectedProject(null);
    setSelectedFileCardIndex(null);
    setSelectedCard(null);
    setActiveCardId(null);
    setIsFullscreen(false);
    setZoomedMediaId(null);
  };

  const openFullscreen = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (!element) return;
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if ((element as any).webkitRequestFullscreen) {
      (element as any).webkitRequestFullscreen();
    }
  };

  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if ((document as any).webkitExitFullscreen) {
      (document as any).webkitExitFullscreen();
    } else if ((document as any).mozCancelFullScreen) {
      (document as any).mozCancelFullScreen();
    } else if ((document as any).msExitFullscreen) {
      (document as any).msExitFullscreen();
    }
  };

  const downloadMedia = (src: string, title: string) => {
    const anchor = document.createElement("a");
    anchor.href = src;
    anchor.download = title.replace(/\s+/g, "-").toLowerCase();
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  const handlePreviewImageClick = (event: React.MouseEvent<HTMLImageElement>, elementId: string) => {
    if (ignoreClickRef.current) {
      event.stopPropagation();
      return;
    }

    event.stopPropagation();

    if (zoomedMediaId === elementId) {
      setZoomedMediaId(null);
      setZoomScale(1);
      setPanOffset({ x: 0, y: 0 });
      setZoomOrigin("50% 50%");
    } else {
      setZoomOrigin("50% 50%");
      setZoomScale(2);
      setZoomedMediaId(elementId);
      setPanOffset({ x: 0, y: 0 });
    }
  };

  const handlePreviewImageWheel = (
    event: React.WheelEvent<HTMLImageElement>,
    elementId: string
  ) => {
    if (!isFullscreen || zoomedMediaId !== elementId) return;
    event.preventDefault();
    event.stopPropagation();

    setZoomOrigin("50% 50%");

    const delta = -event.deltaY * 0.0025;
    setZoomScale((current) => {
      const next = Math.max(1, Math.min(4, current + delta));
      return next;
    });
  };

  const handlePreviewImagePointerDown = (
    event: React.PointerEvent<HTMLImageElement>,
    elementId: string
  ) => {
    if (zoomedMediaId !== elementId) return;
    event.preventDefault();
    setIsDragging(true);
    dragMovedRef.current = false;
    ignoreClickRef.current = false;
    dragStartRef.current = {
      x: event.clientX,
      y: event.clientY,
      pointerId: event.pointerId,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePreviewImagePointerMove = (
    event: React.PointerEvent<HTMLImageElement>,
    elementId: string
  ) => {
    if (!dragStartRef.current || zoomedMediaId !== elementId) return;
    if (event.pointerId !== dragStartRef.current.pointerId) return;

    const deltaX = event.clientX - dragStartRef.current.x;
    const deltaY = event.clientY - dragStartRef.current.y;
    const moveDistance = Math.hypot(deltaX, deltaY);
    if (moveDistance > 6) {
      dragMovedRef.current = true;
      ignoreClickRef.current = true;
    }

    if (!dragMovedRef.current) return;

    event.preventDefault();
    const sensitivity = 0.45;

    setPanOffset((current) => ({
      x: current.x + deltaX * sensitivity,
      y: current.y + deltaY * sensitivity,
    }));

    dragStartRef.current = {
      x: event.clientX,
      y: event.clientY,
      pointerId: event.pointerId,
    };
  };

  const handlePreviewImagePointerUp = (event: React.PointerEvent<HTMLImageElement>) => {
    if (!dragStartRef.current) return;
    if (event.pointerId !== dragStartRef.current.pointerId) return;
    setIsDragging(false);
    event.currentTarget.releasePointerCapture(event.pointerId);
    dragStartRef.current = null;
    if (ignoreClickRef.current) {
      window.setTimeout(() => {
        ignoreClickRef.current = false;
      }, 0);
    }
  };

  // Navigation handlers for project preview
  const handlePreviousProject = () => {
    // Navigate to previous project category
    const currentId = activeCardId || 1;
    const newCardId = currentId === 1 ? 4 : currentId - 1;
    const modalCards = getModalFileCards(newCardId);

    setActiveCardId(newCardId);
    setCurrentProjectIndex(0);
    setSelectedFileCardIndex(0);
    setSelectedCard({
      title: modalCards[0].title,
      desc: modalCards[0].desc,
      image: modalCards[0].image,
      images: modalCards[0].images,
    });
  };

  const handleNextProject = () => {
    // Navigate to next project category
    const currentId = activeCardId || 1;
    const newCardId = currentId === 4 ? 1 : currentId + 1;
    const modalCards = getModalFileCards(newCardId);

    setActiveCardId(newCardId);
    setCurrentProjectIndex(0);
    setSelectedFileCardIndex(0);
    setSelectedCard({
      title: modalCards[0].title,
      desc: modalCards[0].desc,
      image: modalCards[0].image,
      images: modalCards[0].images,
    });
  };

  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>, mediaId: string) => {
    const img = event.currentTarget;
    const aspectRatio = img.naturalWidth / img.naturalHeight;
    setImageAspectRatios(prev => ({
      ...prev,
      [mediaId]: aspectRatio
    }));
  };

  const getContainerClasses = (aspectRatio: number | undefined, isVideo: boolean = false) => {
    if (!aspectRatio) return "w-full"; // Default while loading

    if (aspectRatio > 2) {
      // Very wide images (panorama)
      return "w-full";
    } else if (aspectRatio > 1.5) {
      // Wide landscape images
      return isVideo ? "w-full" : "w-full max-w-6xl";
    } else if (aspectRatio > 1.2) {
      // Standard landscape
      return isVideo ? "w-full max-w-6xl" : "w-full max-w-5xl";
    } else if (aspectRatio > 0.8) {
      // Square-ish images
      return isVideo ? "w-full max-w-5xl" : "w-full max-w-4xl";
    } else if (aspectRatio > 0.6) {
      // Portrait images
      return isVideo ? "w-full max-w-4xl" : "w-full max-w-3xl";
    } else {
      // Very tall portrait images
      return isVideo ? "w-full max-w-3xl" : "w-full max-w-2xl";
    }
  };

  const navItems = [
    {
      id: "home",
      label: "Home",
      activeCls: "text-cyan-300 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]",
      hoverCls: "hover:text-cyan-300",
    },

    {
      id: "about",
      label: "About",
      activeCls: "text-purple-300 drop-shadow-[0_0_10px_rgba(196,181,253,0.8)]",
      hoverCls: "hover:text-purple-300",
    },
    {
      id: "projects",
      label: "Projects",
      activeCls: "text-pink-300 drop-shadow-[0_0_10px_rgba(249,168,212,0.8)]",
      hoverCls: "hover:text-pink-300",
    },
    {
      id: "services",
      label: "Services",
      activeCls: "text-amber-300 drop-shadow-[0_0_10px_rgba(252,211,77,0.8)]",
      hoverCls: "hover:text-amber-300",
    },
    {
      id: "contact",
      label: "Contact",
      activeCls: "text-emerald-300 drop-shadow-[0_0_10px_rgba(110,231,183,0.8)]",
      hoverCls: "hover:text-emerald-300",
    },
  ];

  return (
    <main className="bg-gradient-to-br from-black via-slate-950 to-blue-950 text-white relative font-sans">
      <GlobalParticles />
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full flex justify-between items-center px-10 py-6 text-[13px] z-60 backdrop-blur-xl bg-black/40 border-b border-white/3">
        <a href="#home" className="cursor-pointer group" onClick={() => { if (showModal) closeModal(); if (showEmailForm) setShowEmailForm(false); setActive("home"); }}>
          <h1 className="font-bold tracking-widest uppercase transition-all duration-300">
            <span className="inline-block text-transparent bg-clip-text [-webkit-text-fill-color:transparent] bp-gradient-anim drop-shadow-[0_0_10px_rgba(96,165,250,0.18)]">
              SHAHEDUL
            </span>
          </h1>
        </a>

        <div className="flex gap-2">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => {
                if (showModal) closeModal();
                if (showEmailForm) setShowEmailForm(false);
                setActive(item.id);
              }}
              className={`transition duration-300 ${active === item.id
                ? `opacity-100 ${item.activeCls}`
                : `text-gray-400 opacity-50 hover:opacity-100 ${item.hoverCls}`
                }`}
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      {/* HERO SECTION */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center px-6 pt-24 overflow-hidden"
      >
        <div className="max-w-7xl w-full grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <div className="flex gap-2 text-[11px] text-gray-300 flex-wrap">
              <span
                className={`px-3 py-1 rounded-full bg-[#111827]/70 border border-blue-500/25 transition-all duration-1000 ease-out hover:scale-105 hover:border-blue-400/70 hover:shadow-[0_0_35px_rgba(59,130,246,0.45)] ${liftBadges ? "-translate-y-6 opacity-100" : "translate-y-0 opacity-90"
                  }`}
              >
                3D Artist
              </span>

              <span
                className={`px-3 py-1 rounded-full bg-[#111827]/70 border border-purple-500/25 transition-all duration-1000 delay-50 ease-out hover:scale-105 hover:border-purple-400/70 hover:shadow-[0_0_35px_rgba(168,85,247,0.45)] ${liftBadges ? "-translate-y-6 opacity-100" : "translate-y-0 opacity-90"
                  }`}
              >
                Animator
              </span>

              <span
                className={`px-3 py-1 rounded-full bg-[#111827]/70 border border-cyan-500/25 transition-all duration-1000 delay-100 ease-out hover:scale-105 hover:border-cyan-400/70 hover:shadow-[0_0_35px_rgba(34,211,238,0.45)] ${liftBadges ? "-translate-y-6 opacity-100" : "translate-y-0 opacity-90"
                  }`}
              >
                Blender Expert
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Hello, I&apos;m <br />
              <span className="inline-block text-transparent bg-clip-text [-webkit-text-fill-color:transparent] bp-gradient-anim drop-shadow-[0_0_16px_rgba(96,165,250,0.16)]">
                Shahedul.
              </span>
            </h1>

            <p className="text-gray-400 max-w-lg">
              Where ideas meet reality - turning visions, dreams, and wild thoughts into fully crafted 3D worlds.
            </p>

            <div className="flex flex-wrap items-center justify-start gap-0 pt-2 md:pt-1">
              <a
                href="#contact"
                className="px-6 py-3 rounded-lg inline-block origin-left bg-blue-500 text-black border border-blue-400/30 transition-all duration-300 transform scale-[0.85] hover:scale-90 hover:bg-blue-600 hover:border-blue-300/80 hover:shadow-[0_0_45px_rgba(59,130,246,0.55)] font-semibold"
              >
                Get in touched {" >"}
              </a>

              <a
                href="#about"
                className="px-6 py-3 rounded-lg inline-block origin-left -ml-2 bg-[#111827]/70 text-white border border-purple-500/20 transition-all duration-300 transform scale-[0.85] hover:scale-90 hover:bg-[#1f2937] hover:border-purple-400/60 hover:shadow-[0_0_45px_rgba(168,85,247,0.45)]"
              >
                Learn more
              </a>
            </div>
          </div>

          <div className="flex justify-center group">
            <ScrubVideo
              src="/hero-video.webm"
              className="w-[600px] transition-all duration-500 ease-out group-hover:scale-105"
            />
          </div>
        </div>

        {/* Scroll discover effect */}
        <div
          className={`absolute bottom-0 left-0 w-full flex justify-center pointer-events-none transition-all duration-700 ${showScrollHint ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
        >
          <div className="w-full max-w-[520px] h-[120px] rounded-t-[120px]" />
        </div>

        <div
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-300 pointer-events-none transition-all duration-700 ${showScrollHint ? "opacity-50" : "opacity-0"
            }`}
        >
          <span className="text-[9px] md:text-[10px] tracking-[0.18em] uppercase text-gray-400/90">
            Scroll to discover
          </span>
          <span className="text-[8px] text-blue-300/80 animate-bounce leading-none">▼</span>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-7xl w-full grid md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center md:order-1 order-2">
            <div className="relative group">
              <ScrubVideo
                src="/about-video.webm"
                className="w-[400px] md:w-[500px] rounded-2xl object-cover transition-all duration-500 ease-out group-hover:scale-105"
                tiltStrength={3}
              />
            </div>
          </div>

          <div className="space-y-10 md:order-2 order-1">
            <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
              I&apos;m a skilled 3D artist with experience since 2019, specializing in creating high-quality models and visually engaging designs.
              My work covers a wide range of areas including 3D modeling, character design, environment creation, and animation.
            </p>

            <div className="grid grid-cols-3 gap-8">
              <div className="group">
                <h3 className="text-4xl md:text-5xl font-bold text-cyan-500 drop-shadow-[0_0_16px_rgba(6,182,212,0.5)] transition group-hover:scale-110">
                  5+
                </h3>
                <p className="text-gray-400 mt-2 group-hover:text-cyan-500 transition">Years of Experience</p>
              </div>
              <div className="group">
                <h3 className="text-4xl md:text-5xl font-bold text-violet-500 drop-shadow-[0_0_16px_rgba(139,92,246,0.5)] transition group-hover:scale-110">
                  7+
                </h3>
                <p className="text-gray-400 mt-2 group-hover:text-violet-500 transition">Technologies Mastered</p>
              </div>
              <div className="group">
                <h3 className="text-4xl md:text-5xl font-bold text-orange-500 drop-shadow-[0_0_16px_rgba(249,115,22,0.5)] transition group-hover:scale-110">
                  12+
                </h3>
                <p className="text-gray-400 mt-2 group-hover:text-orange-500 transition">Companies worked with</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="min-h-screen py-12 px-6 md:px-10 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="mb-24 space-y-5 text-left pt-12">
            <div className="flex items-center gap-3">
              <span className="text-blue-500 text-xl animate-pulse">✦</span>
              <span className="uppercase tracking-[0.5em] text-[10px] font-black text-blue-500/80">
                Projects
              </span>
            </div>

            <h2 className="text-white text-2xl sm:text-3xl md:text-5xl font-bold leading-[0.95] tracking-tight">
              Streamlined{" "}
              <span className="text-transparent bg-clip-text bg-[linear-gradient(90deg,#22d3ee,#a855f7,#22d3ee)]">
                digital experiences.
              </span>
            </h2>

            <p className="text-gray-400 text-sm sm:text-base leading-relaxed w-full whitespace-nowrap overflow-hidden text-ellipsis">
              I&apos;ve worked on a variety of projects, from detailed models to immersive visual experiences. Here are some of my favorites:
            </p>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 -mt-15">
            <ProjectCard
              cardId={1}
              title="Character Animation"
              desc="Creating lifelike character movements and expressive animations for storytelling."
              previewImage="/project/card/animation.jpeg"
              glowColor="hover:shadow-[0_0_50px_rgba(168,85,247,0.25)]"
              borderColor="border-purple-500/10 hover:border-purple-500/40"
              titleHoverClass="group-hover:text-purple-300"
              tags={["/icons/blender.png", "/icons/cloth.png", "/icons/pro.png"]}
              onViewDetails={handleViewDetails}
            />
            <ProjectCard
              cardId={2}
              title="Environment Design"
              desc="Building immersive and atmospheric 3D worlds with realistic lighting and depth."
              previewImage="/project/card/environment.jpg"
              glowColor="hover:shadow-[0_0_50px_rgba(34,211,238,0.25)]"
              borderColor="border-cyan-500/10 hover:border-cyan-500/40"
              titleHoverClass="group-hover:text-cyan-300"
              tags={["/icons/blender.png", "/icons/substance.png", "/icons/ps.png"]}
              onViewDetails={handleViewDetails}
            />
            <ProjectCard
              cardId={3}
              title="Game-Ready Assets"
              desc="Optimized high-to-low poly models ready for seamless integration into game engines."
              previewImage="/project/card/assets.jpeg"
              glowColor="hover:shadow-[0_0_50px_rgba(59,130,246,0.25)]"
              borderColor="border-blue-500/10 hover:border-blue-500/40"
              titleHoverClass="group-hover:text-blue-300"
              tags={["/icons/blender.png", "/icons/substance.png", "/icons/render.png"]}
              onViewDetails={handleViewDetails}
            />
            <ProjectCard
              cardId={4}
              title="Stylized-Characters"
              desc="Organized delivery bundles, export-ready files, and pipeline-ready assets."
              previewImage="/project/card/character.jpeg"
              glowColor="hover:shadow-[0_0_50px_rgba(234,179,8,0.25)]"
              borderColor="border-amber-500/10 hover:border-amber-500/40"
              titleHoverClass="group-hover:text-amber-300"
              tags={["/icons/blender.png", "/icons/substance.png", "/icons/cloth.png"]}
              onViewDetails={handleViewDetails}
            />
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-7xl w-full grid md:grid-cols-3 gap-4 items-start">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-semibold text-white">
              Need more info? <br />
              <span className="text-transparent bg-clip-text bg-[linear-gradient(90deg,#22d3ee,#a855f7,#f59e0b,#22d3ee)] drop-shadow-[0_0_18px_rgba(34,211,238,0.22)]">
                I got you.
              </span>
            </h2>
            <p className="text-gray-400 max-w-sm">
              Here are some of the services I offer. If you have any questions, feel free to reach out.
            </p>
          </div>

          {[
            {
              icon: "🧊",
              title: "3D Modeling",
              desc: "Create high-quality 3D models with precise details, optimized topology, and realistic textures.",
              glowColor: "hover:shadow-[0_0_45px_rgba(59,130,246,0.35)]",
              borderColor: "border-blue-500/20 hover:border-blue-400/60",
              iconColor: "group-hover:text-blue-300",
            },
            {
              icon: "👩🏻‍👦🏼",
              title: "Character Design",
              desc: "Visually appealing characters with strong personality, suitable for games and animations.",
              glowColor: "hover:shadow-[0_0_45px_rgba(168,85,247,0.35)]",
              borderColor: "border-purple-500/20 hover:border-purple-400/60",
              iconColor: "group-hover:text-purple-300",
            },
            {
              icon: "🏕️",
              title: "Environment Design",
              desc: "Immersive environments with realistic lighting, composition, and detailed scene elements.",
              glowColor: "hover:shadow-[0_0_45px_rgba(34,211,238,0.35)]",
              borderColor: "border-cyan-500/20 hover:border-cyan-400/60",
              iconColor: "group-hover:text-cyan-300",
            },
            {
              icon: "🏃",
              title: "3D Animation",
              desc: "Smooth, engaging animations with natural motion, timing, and storytelling focus.",
              glowColor: "hover:shadow-[0_0_45px_rgba(236,72,153,0.35)]",
              borderColor: "border-pink-500/20 hover:border-pink-400/60",
              iconColor: "group-hover:text-pink-300",
            },
            {
              icon: "🎓",
              title: "Blender Course",
              desc: "Structured Blender training covering modeling, rendering, and animation from beginner to advanced.",
              glowColor: "hover:shadow-[0_0_45px_rgba(251,191,36,0.35)]",
              borderColor: "border-amber-500/20 hover:border-amber-400/60",
              iconColor: "group-hover:text-amber-300",
            },
          ].map((service, index) => (
            <MagneticServiceCard key={index} service={service} />
          ))}
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="relative flex items-center justify-center min-h-screen px-6">

        <div
          ref={contactCardRef}
          className="gradient-border relative z-10 w-full max-w-7xl rounded-md bg-black/20"
        >
          <BubbleBackground />
          <div className="relative z-10 text-center bg-white/4 backdrop-blur-3xl rounded-md px-10 md:px-20 py-12 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            <h2 className="text-4xl md:text-5xl font-semibold mb-6">
              Let&apos;s work{" "}
              <span className="text-transparent bg-clip-text bg-[linear-gradient(90deg,rgba(34,211,238,0.95),rgba(168,85,247,0.85))] drop-shadow-[0_0_14px_rgba(34,211,238,0.18)]">
                together
              </span>
            </h2>
            <p className="text-gray-400 mb-3 text-lg">I&apos;m currently available for freelance work and open to discussing new projects.</p>

            <div className="relative flex items-center justify-center min-h-[100px]">
              <button
                onClick={() => setShowSocials(true)}
                className={`absolute px-9 py-3 rounded-full bg-blue-500 text-black border border-blue-400/30 font-medium tracking-wide transition-all duration-200 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)] hover:bg-blue-600 hover:border-blue-300/80 hover:shadow-[0_0_45px_rgba(59,130,246,0.55)] ${showSocials
                  ? "pointer-events-none animate-[socialCtaOut_100ms_ease-in_forwards]"
                  : "opacity-100 scale-90 hover:scale-100"
                  }`}
              >
                Get in touch
              </button>

              <div
                className={`flex items-center justify-center gap-4 ${showSocials
                  ? "opacity-100 animate-[socialTrayIn_600ms_cubic-bezier(0.25,0.46,0.45,0.94)_both]"
                  : "opacity-0 pointer-events-none"
                  }`}
              >
                {[
                  {
                    name: "Gmail",
                    icon: "/icons/gmail.png",
                    link: "mailto:mdshahedislam2002@gmail.com",
                    border: "rgba(255,255,255,0.75)",
                    glow: "0_0_28px_rgba(255,255,255,0.28)",
                  },
                  {
                    name: "WhatsApp",
                    icon: "/icons/whatsapp.png",
                    link: "https://wa.me/01989171425",
                    border: "rgba(34,197,94,0.75)",
                    glow: "0_0_28px_rgba(34,197,94,0.35)",
                  },
                  {
                    name: "Facebook",
                    icon: "/icons/facebook.png",
                    link: "https://facebook.com/shahedislam02",
                    border: "rgba(59,130,246,0.75)",
                    glow: "0_0_28px_rgba(59,130,246,0.35)",
                  },
                  {
                    name: "Instagram",
                    icon: "/icons/instagram.png",
                    link: "https://instagram.com/alleen_animation",
                    border: "rgba(236,72,153,0.75)",
                    glow: "0_0_28px_rgba(236,72,153,0.35)",
                  },
                  {
                    name: "LinkedIn",
                    icon: "/icons/linkedin.png",
                    link: "https://linkedin.com/in/mdshahed0002",
                    border: "rgba(37,99,235,0.75)",
                    glow: "0_0_28px_rgba(37,99,235,0.35)",
                  },
                ].map((social, idx) => (
                  <a
                    key={idx}
                    href={social.name === "Gmail" ? "#" : social.link}
                    target={social.name === "Gmail" ? undefined : "_blank"}
                    rel={social.name === "Gmail" ? undefined : "noopener noreferrer"}
                    onClick={(e) => {
                      if (social.name === "Gmail") {
                        e.preventDefault();
                        setShowEmailForm(true);
                      }
                    }}
                    style={{
                      transitionDelay: showSocials ? `${idx * 100}ms` : "0ms",
                      transform: showSocials
                        ? `scale(1) translateY(0) rotate(${idx % 2 === 0 ? '360deg' : '-360deg'})`
                        : "scale(0) translateY(20px) rotate(0deg)",
                      ["--social-border" as never]: social.border,
                      ["--social-glow" as never]: social.glow,
                    }}
                    className="group relative w-8 h-8 bg-gradient-to-b from-white/10 to-transparent border border-[color:var(--social-border)] rounded-full flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:shadow-[var(--social-glow)] hover:-translate-y-1 hover:scale-110"
                  >
                    <img
                      src={social.icon}
                      alt={social.name}
                      className="w-6 h-6 object-contain transition-transform duration-300 group-hover:rotate-[12deg] group-hover:scale-125"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER AREA */}
        <div className="absolute bottom-4 md:bottom-6 w-full flex justify-center">
          <div className="w-full max-w-7xl flex flex-col md:flex-row justify-center items-center gap-2 md:gap-4 text-[11px] md:text-xs text-gray-500">
            <p className="flex items-center gap-1.5">
              Made with
              <span
                onClick={handleLoveClick}
                className={`cursor-pointer hover:text-red-500 hover:drop-shadow-[0_0_10px_rgba(239,68,68,0.8)] hover:scale-125 ${loveJump ? 'love-jump-animation' : ''
                  }`}
                style={loveJump ? {
                  animation: 'loveJump 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                } : {}}
              >
                ❤️
              </span>
              by shahedul
            </p>
            <span className="hidden md:inline opacity-40">|</span>
            <p className="text-[9px] md:text-[11px]">&copy; 2026 Shahedul. All rights reserved</p>
            <span className="hidden md:inline opacity-40">|</span>
            <div className="flex items-center gap-2">
              <span>Local time:</span>
              <LocalTime />
            </div>
          </div>
        </div>
      </section>

      {/* PROJECT MODAL */}
      {showModal && selectedProject && (
        <div
          onClick={closeModal}
          className={`fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 overflow-hidden transition-all duration-300 ease-out ${modalVisible ? 'bg-black/70 backdrop-blur-sm opacity-100' : 'bg-black/0 backdrop-blur-0 opacity-0 pointer-events-none'}`}
        >
          {/* Project modal - fullscreen */}
          <div className="relative w-full h-full">
            <button
              onClick={closeModal}
              className="absolute top-2 -right-2 md:-right-4 z-50 w-7 h-7 rounded-full flex items-center justify-center text-xs text-gray-400 hover:text-blue-400 transition-all duration-300"
            >
              ✕
            </button>
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative grid w-full h-full gap-6 lg:grid-cols-[4fr_1fr] rounded-[32px] shadow-[0_35px_120px_rgba(0,0,0,0.55)] bg-gradient-to-br from-black/80 via-slate-950/80 to-blue-950/80 backdrop-blur-2xl border border-white/10 overflow-hidden"
            >
              {/* PREVIEW SECTION (scrollbar) */}
              <div ref={previewScrollRef} className="relative h-full bg-black overflow-y-scroll overscroll-contain [scrollbar-gutter:stable] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <div className="relative min-h-[560px] overflow-hidden flex flex-col items-center justify-start gap-6 p-6">
                  {/* Navigation Buttons */}
                  {selectedCard && (selectedCard.images ?? [selectedCard.image]).length > 1 && (
                    <>
                      <button
                        onClick={handlePreviousProject}
                        className="fixed left-[-1.9%] top-1/2 -translate-y-1/2 z-50 w-24 h-24 rounded-full flex items-center justify-center text-white/90 hover:text-blue-400 transition-all duration-300 hover:scale-125 font-bold opacity-50 hover:opacity-100"
                        aria-label="Previous project"
                      >
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                      <button
                        onClick={handleNextProject}
                        className="fixed right-[18.3%] top-1/2 -translate-y-1/2 z-50 w-24 h-24 rounded-full flex items-center justify-center text-white/90 hover:text-blue-400 transition-all duration-300 hover:scale-125 font-bold opacity-50 hover:opacity-100"
                        aria-label="Next project"
                      >
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    </>
                  )}
                  {selectedCard ? (
                    <div className="w-full flex flex-col gap-6">
                      {(selectedCard.images ?? [selectedCard.image]).map((media, idx) => {
                        const isVideo = media.endsWith('.webm') || media.endsWith('.mp4') || media.endsWith('.mov');
                        const aspectRatio = imageAspectRatios[`preview-media-card-${idx}`];
                        const isWideImage = !isVideo && aspectRatio !== undefined && aspectRatio > 1.2;
                        return (
                          <div
                            key={idx}
                            id={`preview-media-card-${idx}`}
                            className={`group ${getContainerClasses(aspectRatio, isVideo || isWideImage)} ${isVideo ? '' : 'bg-black/90 backdrop-blur-sm'} overflow-hidden relative flex items-center justify-center mx-auto`}
                          >
                            {isVideo ? (
                              <div className="w-full flex justify-center items-center mx-auto">
                                <video
                                  ref={(el) => {
                                    if (el && !el.dataset.observerSetup) {
                                      el.dataset.observerSetup = "true";
                                      el.volume = 0.5;

                                      const attemptPlayAndUnmute = () => {
                                        el.muted = true;
                                        const playPromise = el.play();
                                        if (playPromise !== undefined) {
                                          playPromise.then(() => {
                                            el.muted = false;
                                            el.volume = 0.5;
                                          }).catch(() => { });
                                        }
                                      };

                                      // Immediately attempt to play and unmute on mount
                                      attemptPlayAndUnmute();

                                      // Wait for modal transition animation to complete before observing scroll
                                      setTimeout(() => {
                                        const observer = new IntersectionObserver((entries) => {
                                          entries.forEach(entry => {
                                            if (entry.isIntersecting) {
                                              attemptPlayAndUnmute();
                                            } else {
                                              el.pause();
                                            }
                                          });
                                        }, { threshold: 0.3 });
                                        observer.observe(el);
                                      }, 500);

                                      el.addEventListener('play', () => {
                                        const modalVideos = document.querySelectorAll('[id^="preview-media-card-"] video');
                                        modalVideos.forEach(video => {
                                          if (video !== el && !(video as HTMLVideoElement).paused) {
                                            (video as HTMLVideoElement).pause();
                                          }
                                        });
                                      });
                                    }
                                  }}
                                  onLoadedMetadata={(e) => {
                                    const video = e.currentTarget;
                                    setImageAspectRatios(prev => ({
                                      ...prev,
                                      [`preview-media-card-${idx}`]: video.videoWidth / video.videoHeight
                                    }));
                                  }}
                                  src={media}
                                  autoPlay
                                  muted
                                  loop
                                  playsInline
                                  controls
                                  style={{ maxHeight: '85vh' }}
                                  className="w-full h-auto object-contain"
                                />
                              </div>
                            ) : (
                              <>
                                <img
                                  src={media}
                                  alt={`${selectedCard.title} preview ${idx + 1}`}
                                  className={`w-full object-contain ${isWideImage ? 'h-auto' : 'h-full'}`}
                                  onLoad={(e) => handleImageLoad(e, `preview-media-card-${idx}`)}
                                  onClick={isFullscreen ? (e) => handlePreviewImageClick(e, `preview-media-card-${idx}`) : undefined}
                                  onDoubleClick={!isFullscreen ? (e) => handlePreviewImageClick(e, `preview-media-card-${idx}`) : undefined}
                                  onWheel={(e) => handlePreviewImageWheel(e, `preview-media-card-${idx}`)}
                                  onPointerDown={(e) => handlePreviewImagePointerDown(e, `preview-media-card-${idx}`)}
                                  onPointerMove={(e) => handlePreviewImagePointerMove(e, `preview-media-card-${idx}`)}
                                  onPointerUp={handlePreviewImagePointerUp}
                                  onPointerCancel={handlePreviewImagePointerUp}
                                  style={{
                                    maxHeight: isWideImage ? '85vh' : undefined,
                                    transform: zoomedMediaId === `preview-media-card-${idx}`
                                      ? `scale(${zoomScale}) translate(${panOffset.x}px, ${panOffset.y}px)`
                                      : "scale(1)",
                                    transformOrigin: zoomedMediaId === `preview-media-card-${idx}` ? zoomOrigin : "50% 50%",
                                    transition: isDragging ? "none" : zoomedMediaId === `preview-media-card-${idx}` ? "transform 180ms ease" : "transform 250ms ease",
                                    cursor: isDragging
                                      ? "grabbing"
                                      : isFullscreen
                                        ? zoomedMediaId === `preview-media-card-${idx}`
                                          ? "grab"
                                          : "zoom-in"
                                        : zoomedMediaId === `preview-media-card-${idx}`
                                          ? "grab"
                                          : "auto",
                                    touchAction: "none",
                                    userSelect: "none",
                                  }}
                                />
                                {isFullscreen && (
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      exitFullscreen();
                                    }}
                                    className="absolute top-3 right-3 z-20 h-8 w-8 rounded-full text-white/90 flex items-center justify-center text-[11px] transition hover:text-blue-400"
                                    aria-label="Exit fullscreen"
                                  >
                                    ✕
                                  </button>
                                )}

                                <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 translate-y-3 transform scale-80 transition duration-300 ease-out group-hover:opacity-100 ${isFullscreen ? 'hidden' : ''}`}>
                                  <div className="flex items-center gap-0.1 rounded-lg border border-white/10 bg-black/20 px-1 py-1 shadow-[0_18px_40px_rgba(0,0,0,0.25)] backdrop-blur-2xl">
                                    <button
                                      onClick={() => downloadMedia(media, `${selectedCard.title}-${idx + 1}`)}
                                      className="flex h-8 w-8 items-center justify-center rounded-lg translate-x-3 transition duration-200 ease-out hover:text-blue-400"
                                      aria-label="Download media"
                                      type="button"
                                    >
                                      ↓
                                    </button>
                                    <button
                                      onClick={() => openFullscreen(`preview-media-card-${idx}`)}
                                      className="flex h-8 w-8 items-center justify-center rounded-lg -translate-x-1 transition duration-200 ease-out hover:text-blue-400"
                                      aria-label="Open fullscreen"
                                      type="button"
                                    >
                                      ⛶
                                    </button>
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-gray-400 text-center w-full">
                      <p className="text-lg">Select a file to preview</p>
                    </div>
                  )}
                </div>
              </div>

              {/* FILE SECTION (scrollbar) */}
              <div className="relative pl-6 py-6 lg:pl-8 lg:py-8 bg-white/[0.02] backdrop-blur-xl h-full overflow-hidden">
                <div className="h-full flex flex-col min-h-0">
                  <div className="shrink-0 space-y-5 border-b border-white/20 pb-6 mb-2 mr-6 lg:mr-8 -ml-2 pl-2">
                    <h2
                      id="project-modal-title"
                      className="text-2xl md:text-3xl font-light text-white tracking-tight"
                    >
                      {selectedCard ? selectedCard.title : selectedProject.title}
                    </h2>
                    <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                      {selectedCard ? selectedCard.desc : selectedProject.desc}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {selectedProject.tags.map((tag, i) => (
                        <div
                          key={i}
                          className="group rounded-full p-0.5 transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_14px_rgba(59,130,246,0.28),0_0_22px_rgba(168,85,247,0.24),0_0_32px_rgba(234,179,8,0.14)] hover:bg-gradient-to-r hover:from-cyan-400/15 hover:via-violet-500/15 hover:to-amber-400/15"
                        >
                          <img
                            src={tag}
                            alt=""
                            className="w-4 h-4 md:w-5 md:h-5 object-contain opacity-75 transition duration-300 group-hover:opacity-100"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="modal-panel-scroll flex-1 min-h-0 overflow-y-scroll overscroll-contain pl-0 pr-6 lg:pr-8 flex flex-col gap-2 items-start pt-8">
                    {(activeCardId ? getModalFileCards(activeCardId) : CHARACTER_ANIMATION_CARDS).map((card, index) => {
                      const isSelected = selectedFileCardIndex === index;
                      return (
                        <div
                          key={card.title}
                          role="button"
                          tabIndex={0}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedFileCardIndex(index);
                            setCurrentProjectIndex(index);
                            setSelectedCard({ title: card.title, desc: card.desc, image: card.image, images: card.images });
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              setSelectedFileCardIndex(index);
                              setCurrentProjectIndex(index);
                              setSelectedCard({ title: card.title, desc: card.desc, image: card.image, images: card.images });
                            }
                          }}
                          aria-pressed={isSelected}
                          className={`group relative w-full aspect-square flex shrink-0 rounded-none border-2 overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 cursor-pointer transition-all duration-200 ${isSelected
                            ? "border-purple-500/90 bg-purple-500/10 shadow-[0_0_24px_rgba(168,85,247,0.35)]"
                            : "border-white/10 bg-white/[0.05] hover:border-white/30"
                            }`}
                        >
                          <img
                            src={card.image}
                            alt={card.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-slate-950/95 via-slate-900/50 to-transparent opacity-0 translate-y-10 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out flex items-end justify-start p-4 pb-6 border-b-2 border-transparent group-hover:border-purple-500/80">
                            <h3 className="text-sm font-bold tracking-wider transform -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 ease-out inline-block text-transparent bg-clip-text [-webkit-text-fill-color:transparent] bp-gradient-anim drop-shadow-[0_2px_10px_rgba(168,85,247,0.5)]">
                              {card.title}
                            </h3>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* EMAIL FORM MODAL */}
      {showEmailForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm transition-opacity" onClick={() => setShowEmailForm(false)}>
          <div className="relative w-full max-w-md p-8 bg-[#111827]/85 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-[0_0_50px_rgba(0,0,0,0.5)]" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-3xl font-semibold mb-6 tracking-tight text-white">
              Send me a <span className="text-transparent bg-clip-text bg-[linear-gradient(90deg,rgba(34,211,238,0.95),rgba(168,85,247,0.85))] drop-shadow-[0_0_14px_rgba(34,211,238,0.18)]">Message</span>
            </h3>
            <form className="space-y-5" onSubmit={async (e) => {
              e.preventDefault();
              setIsSubmitting(true);
              setSubmitStatus("idle");

              const formData = new FormData(e.currentTarget);
              // TODO: Replace YOUR_ACCESS_KEY_HERE with your actual Web3Forms access key
              formData.append("access_key", "83737c3f-0a66-41d2-8142-206d2c4b1775");

              try {
                const response = await fetch("https://api.web3forms.com/submit", {
                  method: "POST",
                  body: formData
                });

                const data = await response.json();

                if (data.success) {
                  setShowEmailForm(false);
                  setSubmitStatus("idle");
                  setToastMessage("Message sent successfully!");
                  setTimeout(() => setToastMessage(null), 4000);
                } else {
                  setSubmitStatus("error");
                }
              } catch (error) {
                setSubmitStatus("error");
              } finally {
                setIsSubmitting(false);
              }
            }}>
              <div>
                <label className="block text-[11px] font-medium text-gray-400 mb-1.5 uppercase tracking-wider">Your Name</label>
                <input type="text" name="name" required className="w-full px-4 py-3 bg-black/20 backdrop-blur-md border border-white/5 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:bg-black/40 focus:ring-1 focus:ring-cyan-500/50 transition-all" placeholder="Elon Mask" />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-gray-400 mb-1.5 uppercase tracking-wider">Your Email</label>
                <input type="email" name="email" required className="w-full px-4 py-3 bg-black/20 backdrop-blur-md border border-white/5 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 focus:bg-black/40 focus:ring-1 focus:ring-purple-500/50 transition-all" placeholder="elon@example.com" />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-gray-400 mb-1.5 uppercase tracking-wider">Message</label>
                <textarea name="message" required rows={4} className="w-full px-4 py-3 bg-black/20 backdrop-blur-md border border-white/5 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:bg-black/40 focus:ring-1 focus:ring-cyan-500/50 transition-all resize-none" placeholder="How can I help you?"></textarea>
              </div>
              <button type="submit" disabled={isSubmitting} className="w-full mt-2 py-3.5 rounded-xl bg-blue-500 text-black font-semibold tracking-wide border border-blue-400/30 transition-all duration-300 hover:bg-blue-600 hover:border-blue-300/80 hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] disabled:opacity-50 disabled:cursor-not-allowed">
                {isSubmitting ? "Sending..." : submitStatus === "success" ? "Message Sent Successfully!" : submitStatus === "error" ? "Failed to send. Try again." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <>
          <style>{`
            @keyframes toastIn {
              from { opacity: 0; transform: translate(-50%, 20px) scale(0.9); }
              to { opacity: 1; transform: translate(-50%, 0) scale(1); }
            }
          `}</style>
          <div
            className="fixed bottom-8 left-1/2 z-[60] bg-[#111827]/90 backdrop-blur-xl border border-cyan-500/30 text-white px-6 py-3 rounded-full shadow-[0_0_30px_rgba(34,211,238,0.25)] flex items-center gap-3"
            style={{ animation: 'toastIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards' }}
          >
            <div className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center text-black text-xs font-bold">✓</div>
            <span className="text-sm font-medium tracking-wide">{toastMessage}</span>
          </div>
        </>
      )}
    </main>
  );
}