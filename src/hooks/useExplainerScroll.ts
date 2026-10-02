import { type RefObject } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from '../motionTokens';

gsap.registerPlugin(ScrollTrigger, useGSAP);

type RootRef = RefObject<HTMLElement | null>;
const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const compactViewport = () => window.matchMedia('(max-width: 767px)').matches;

export function useHeroEntrance(root: RootRef) {
  useGSAP(() => { if (!prefersReducedMotion()) gsap.timeline().from(gsap.utils.selector(root)<HTMLElement>('.hero-reveal'), { autoAlpha: 0, y: 28, duration: motion.duration.slow, ease: motion.easing.enter, stagger: 0.08 }); }, { scope: root });
}

export function useProgressScroll(root: RootRef, bar: RefObject<HTMLSpanElement | null>) {
  useGSAP(() => {
    const page = root.current;
    const nav = page?.querySelector<HTMLElement>('.topnav');
    const updateNavHeight = () => page?.style.setProperty('--story-nav-height', `${nav?.offsetHeight ?? 0}px`);
    const observer = nav ? new ResizeObserver(updateNavHeight) : null;
    if (nav) observer?.observe(nav);
    updateNavHeight();

    if (bar.current && prefersReducedMotion()) {
      ScrollTrigger.create({ trigger: root.current, start: 'top top', end: 'bottom bottom', onUpdate: (self) => gsap.set(bar.current, { scaleX: self.progress, transformOrigin: 'left' }) });
    } else if (bar.current) {
      gsap.to(bar.current, { scaleX: 1, transformOrigin: 'left', ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom bottom', scrub: 0.25 } });
    }

    return () => {
      observer?.disconnect();
      page?.style.removeProperty('--story-nav-height');
    };
  }, { scope: root });
}

export function useSectionNumberParallax(root: RootRef) {
  useGSAP(() => {
    if (prefersReducedMotion() || compactViewport()) return;
    gsap.utils.selector(root)<HTMLElement>('.section-heading > span').forEach((number) => gsap.to(number, { yPercent: -18, ease: 'none', scrollTrigger: { trigger: number.closest('.section'), start: 'top bottom', end: 'bottom top', scrub: 0.3 } }));
  }, { scope: root });
}

export function useSection01Scroll(root: RootRef) {
  useGSAP(() => {
    if (prefersReducedMotion()) return;
    const query = gsap.utils.selector(root); const theory = query<HTMLElement>('.definition-theory')[0]; const practice = query<HTMLElement>('.definition-practice')[0]; const link = query<HTMLElement>('.definition-link')[0];
    if (!theory || !practice || !link) return;
    if (compactViewport()) { gsap.from([theory, practice], { autoAlpha: 0, y: 18, duration: motion.duration.base, stagger: 0.12, ease: motion.easing.standard, scrollTrigger: { trigger: theory.parentElement, start: 'top 82%', once: true } }); return; }
    gsap.fromTo(theory, { autoAlpha: 0, xPercent: -9 }, { autoAlpha: 1, xPercent: 0, ease: motion.easing.standard, scrollTrigger: { trigger: theory, start: 'top 84%', end: 'top 48%', scrub: 0.25 } });
    gsap.fromTo(practice, { autoAlpha: 0, xPercent: 9 }, { autoAlpha: 1, xPercent: 0, ease: motion.easing.standard, scrollTrigger: { trigger: practice, start: 'top 84%', end: 'top 48%', scrub: 0.25 } });
    gsap.fromTo(link, { autoAlpha: 0, rotate: -50, scale: 0.6 }, { autoAlpha: 1, rotate: 0, scale: 1, duration: motion.duration.base, ease: motion.easing.enter, scrollTrigger: { trigger: link, start: 'top 75%', once: true } });
  }, { scope: root });
}

export function useSection02Scroll(root: RootRef) {
  useGSAP(() => {
    if (prefersReducedMotion()) return;
    const query = gsap.utils.selector(root); const section = query<HTMLElement>('.practice-section')[0]; const cards = query<HTMLElement>('.role-card');
    if (!section || !cards.length) return;
    gsap.from(cards, { autoAlpha: 0, y: 20, duration: motion.duration.base, stagger: 0.12, ease: motion.easing.standard, scrollTrigger: { trigger: section, start: 'top 80%', once: true } });
  }, { scope: root });
}

export function useSection03Scroll(root: RootRef) {
  useGSAP(() => {
    if (prefersReducedMotion()) return;
    const query = gsap.utils.selector(root); const section = query<HTMLElement>('.theory-section')[0]; const glow = query<HTMLElement>('.theory-glow')[0]; const star = query<HTMLElement>('.theory-star')[0]; const lines = query<HTMLElement>('.theory-line');
    if (!section || !glow || !star || !lines.length) return;
    gsap.fromTo(glow, { autoAlpha: 0.24, scale: 0.28 }, { autoAlpha: 0.85, scale: 1, duration: motion.duration.slow, ease: motion.easing.standard, scrollTrigger: { trigger: glow, start: 'top 90%', once: true } });
    gsap.to(star, { rotate: 90, duration: motion.duration.slow, ease: motion.easing.standard, scrollTrigger: { trigger: star, start: 'top 82%', once: true } });
    gsap.from(lines, { autoAlpha: 0, y: 20, duration: motion.duration.base, stagger: 0.18, ease: motion.easing.standard, scrollTrigger: { trigger: section, start: 'top 64%', once: true } });
  }, { scope: root });
}

export function useSection04Scroll(root: RootRef) {
  useGSAP(() => {
    if (prefersReducedMotion()) return;
    const query = gsap.utils.selector(root); const section = query<HTMLElement>('.fpt-section')[0]; const cards = query<HTMLElement>('.experience-card');
    if (!section || !cards.length) return;
    gsap.from(cards, { autoAlpha: 0, y: 22, duration: motion.duration.base, stagger: 0.12, ease: motion.easing.standard, scrollTrigger: { trigger: section, start: 'top 78%', once: true } });
  }, { scope: root });
}

export function useSection05Scroll(root: RootRef) {
  useGSAP(() => {
    if (prefersReducedMotion()) return;
    const query = gsap.utils.selector(root); const section = query<HTMLElement>('.split-section')[0]; const columns = query<HTMLElement>('.split-comparison article'); const divider = query<HTMLElement>('.split-divider')[0];
    if (!section || columns.length !== 2 || !divider) return;
    gsap.fromTo(columns[0], { xPercent: 0 }, { xPercent: -5, duration: motion.duration.slow, ease: motion.easing.standard, scrollTrigger: { trigger: columns[0], start: 'top 78%', once: true } });
    gsap.fromTo(columns[1], { xPercent: 0 }, { xPercent: 5, duration: motion.duration.slow, ease: motion.easing.standard, scrollTrigger: { trigger: columns[1], start: 'top 78%', once: true } });
    gsap.fromTo(divider, { scaleY: 0 }, { scaleY: 1, duration: motion.duration.slow, ease: motion.easing.standard, scrollTrigger: { trigger: section, start: 'top 72%', once: true } });
  }, { scope: root });
}

export function useSection06Scroll(root: RootRef) {
  useGSAP(() => {
    if (prefersReducedMotion()) return;
    const query = gsap.utils.selector(root); const section = query<HTMLElement>('.conclusion')[0]; const lines = query<HTMLElement>('.conclusion-line'); const statement = query<HTMLElement>('.conclusion-statement')[0];
    if (!section || !lines.length || !statement) return;
    const timeline = gsap.timeline({ scrollTrigger: { trigger: section, start: 'top 72%', once: true } });
    timeline.from(lines, { autoAlpha: 0, y: 22, duration: motion.duration.base, stagger: 0.16, ease: motion.easing.standard }).from(statement, { autoAlpha: 0, y: 14, scale: 0.97, duration: motion.duration.slow, ease: motion.easing.enter }, '>-0.1');
  }, { scope: root });
}
