---
title: Nonlinear waves in plasmas
order: 1
field: physics
figure: kdv-solitons
summary: >-
  How solitary waves and shock waves form and travel in plasmas, including
  relativistic and nonextensive plasmas found in space and astrophysical settings.
equation: '\phi(\xi,\tau) = \phi_m \sech^2\!\left(\frac{\xi - U_0\tau}{W}\right)'
equation_name: Solitary-wave solution of the Korteweg–de Vries equation
points:
  - Ion-acoustic, positron-acoustic and dust-acoustic solitary and shock waves
  - Waves in the upper ionosphere of Venus
  - Collisions of multi-solitons, lump waves and rogue waves
  - Relativistic plasmas and nonextensive or (r,q)-distributed electrons
---

A plasma is a gas in which many atoms have lost electrons, leaving a mixture
of ions, electrons and sometimes positrons. Small disturbances in a plasma
travel as waves. When the waves grow large, nonlinear effects steepen them,
while dispersion spreads them out. When these two effects balance, the result
is a **solitary wave**, a single pulse that travels without changing shape.
When dissipation is important, the wave can instead form a **shock**.

## What we study

- Ion-acoustic and positron-acoustic solitary waves and shock waves
- Waves in the upper ionosphere of Venus, including shock, anti-shock, periodic and super-periodic structures
- Dust-acoustic waves in dusty plasmas, including strongly coupled plasmas with ion-drag force
- Collisions of multi-solitons, lump waves and rogue waves, in planar, cylindrical and spherical geometry
- Plasmas with relativistic particles and with nonextensive or (r,q)-distributed electrons
- How the amplitude, width and speed of a wave depend on the plasma's composition and temperature

## From plasma model to wave equation

Starting from the fluid equations for each species in the plasma, the
reductive perturbation method introduces stretched coordinates such as

$$
\xi = \varepsilon^{1/2}(x - \lambda t), \qquad \tau = \varepsilon^{3/2} t,
$$

and reduces the full model to a single evolution equation for the
first-order potential. In the simplest case this is the Korteweg–de Vries
(KdV) equation, whose solitary-wave solution has the form

$$
\phi(\xi, \tau) = \phi_m \,\operatorname{sech}^2\!\left(\frac{\xi - U_0 \tau}{W}\right),
$$

where the amplitude $$\phi_m$$ and width $$W$$ depend on the plasma parameters.
Including dissipation leads to Burgers-type equations and shock waves, and
including a second space dimension leads to the Kadomtsev–Petviashvili (KP)
equation. See [nonlinear evolution equations]({{ '/research/evolution-equations/' | relative_url }}).

{% include figure.html svg="kdv-solitons" number=1 caption="Two KdV solitons. Each line is the wave at a later time than the one in front of it. The taller soliton travels faster, passes through the smaller one, and both keep their shape." %}
