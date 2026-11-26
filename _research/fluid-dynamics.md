---
title: Fluid dynamics and MHD
order: 6
field: physics
summary: >-
  Magnetohydrodynamic (MHD) and nanofluid flows with heat and mass transfer,
  solved numerically.
equation: 'u\,u_x + v\,u_y = \nu\,u_{yy} - \frac{\sigma B_0^{2}}{\rho}\,u'
equation_name: MHD boundary-layer momentum equation
points:
  - MHD flow through highly porous media with ion-slip current and stratification
  - Soret and Dufour (thermo-diffusion) effects on heat and mass transfer
  - Unsteady stagnation-point nanofluid flow over stretching sheets
---

When an electrically conducting fluid moves through a magnetic field, the
field pushes back on the flow. Magnetohydrodynamics (MHD) describes this
coupling, which matters in cooling systems, materials processing and
geophysical flows.

## What we study

- **MHD flow in porous media.** The effect of ion-slip current and thermal
  and solutal stratification on flow through highly porous media.
- **Thermo-diffusion.** Soret and Dufour effects, in which temperature and
  concentration gradients drive each other.
- **Nanofluids.** Unsteady stagnation-point flow of nanofluids over
  exponentially stretching porous sheets.
- **Numerical methods.** Solving the coupled nonlinear partial differential
  equations of momentum, heat and mass transfer.

## A model equation

In a steady two-dimensional boundary layer with velocity $$(u, v)$$, a
transverse magnetic field $$B_0$$ adds a damping term to the momentum
equation:

$$
u\,u_x + v\,u_y = \nu\,u_{yy} - \frac{\sigma B_0^{2}}{\rho}\,u ,
$$

where $$\nu$$ is the kinematic viscosity, $$\sigma$$ the electrical
conductivity and $$\rho$$ the density.

<figure class="fig">
  <img class="fig__img" src="{{ '/assets/img/pubs/topic-fluid-dynamics.webp' | relative_url }}" alt="Boundary-layer velocity profiles growing along a plate" width="800" height="500">
  <figcaption><span class="fig__num">Figure 1.</span> Boundary-layer velocity profiles at increasing distance along a surface: the layer of slowed fluid grows thicker downstream.</figcaption>
</figure>
