/**
 * A small, dependency-free spring integrator — see
 * .claude/skills/apple-design/SKILL.md for the physics this implements
 * (damping ratio + response, momentum projection). Used by
 * CaseStudyGallery's swipe gesture; nothing else on the site animates
 * this way, so this stays a plain function module rather than a library.
 */

/**
 * Converts Apple's designer-friendly (damping ratio, response) into the
 * (stiffness, damping) constants a mass=1 damped-oscillator integrator
 * needs. Standard control-theory mapping: response is treated as roughly
 * 2π/ω0, i.e. how quickly the spring reaches its target.
 */
export function springConstants(dampingRatio: number, response: number) {
  const angularFrequency = (2 * Math.PI) / response;
  const stiffness = angularFrequency * angularFrequency;
  const damping = 2 * dampingRatio * angularFrequency;
  return { stiffness, damping };
}

/** One semi-implicit Euler step of a damped harmonic oscillator (mass 1).
 * `dt` in seconds. Stable for the small, clamped dt an animation frame
 * loop produces. */
export function springStep(
  position: number,
  velocity: number,
  target: number,
  stiffness: number,
  damping: number,
  dt: number,
) {
  const force = -stiffness * (position - target) - damping * velocity;
  const newVelocity = velocity + force * dt;
  const newPosition = position + newVelocity * dt;
  return { position: newPosition, velocity: newVelocity };
}

/**
 * Projects where a flick would come to rest under natural deceleration —
 * the same exponential-decay model Apple uses for scroll/carousel
 * momentum (WWDC 2018, "Designing Fluid Interfaces"). `velocity` in px/s;
 * returns a px offset to add to the current position.
 */
export function projectMomentum(velocity: number, decelerationRate = 0.998) {
  return ((velocity / 1000) * decelerationRate) / (1 - decelerationRate);
}
