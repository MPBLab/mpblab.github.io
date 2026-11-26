---
title: Control and machine learning
order: 5
field: other
summary: >-
  Stability and control of nonlinear and fractional-order systems, combining
  Lyapunov theory and optimisation with deep neural networks.
equation: 'V(x) > 0, \qquad \dot V(x) = \nabla V(x)\cdot f(x) < 0 \quad (x \neq 0)'
equation_name: Lyapunov conditions for asymptotic stability
points:
  - Neural Lyapunov functions for variable fractional-order systems
  - Nonlinear model predictive control with deep networks and LMI constraints
  - Secured state estimation and tracking control under deception attacks
---

Many engineered and natural systems are nonlinear and have memory. Keeping
them stable, or steering them to a target, needs control laws with
guarantees. We combine classical stability theory with machine learning to
design such controllers.

## What we study

- **Neural Lyapunov control.** Using deep neural networks to find Lyapunov
  functions and stabilising controllers for systems of variable fractional order.
- **Model predictive control.** Nonlinear model predictive control in which a
  neural network is trained under linear matrix inequality (LMI) constraints.
- **Secure estimation and tracking.** State estimation and tracking control for
  periodic piecewise polynomial systems subject to deception attacks over a
  finite horizon.

## Stability in one line

A system $$\dot x = f(x)$$ is asymptotically stable at $$x = 0$$ if there is a
function $$V$$ that is positive away from the origin and decreases along every
trajectory:

$$
V(x) > 0, \qquad \dot V(x) = \nabla V(x)\cdot f(x) < 0 \quad (x \neq 0).
$$

Finding such a $$V$$ is hard for complex systems; neural networks can learn it.

<figure class="fig">
  <img class="fig__img" src="{{ '/assets/img/pubs/topic-control-systems.webp' | relative_url }}" alt="Responses of a controlled system settling to a set point" width="800" height="500">
  <figcaption><span class="fig__num">Figure 1.</span> Responses of a controlled system settling to its set point for different damping; a good controller reaches the target quickly without large oscillations.</figcaption>
</figure>
