---
title: Relativistic astrophysics
order: 4
field: physics
summary: >-
  Analytic models of compact stars and gravastars in general relativity: their
  structure, rotation, tidal deformation and comparison with observations.
equation: '\frac{dp}{dr} = -\frac{(\rho + p)\left(m + 4\pi r^{3} p\right)}{r\,(r - 2m)}'
equation_name: Tolman–Oppenheimer–Volkoff equation (G = c = 1)
points:
  - Exact interior solutions of Einstein's equations, including Tolman IV and gravastar-like models
  - Equations of state that bridge neutron stars and gravastars
  - Slow rotation (Hartle–Thorne), tidal Love numbers and deformability
  - Matching models to observed masses and radii, such as NICER data
blurb: >-
  Models of neutron stars and gravastars in general relativity, tested against observations.
anim_caption: "Orbits around a compact star precess because space is curved."
---

Neutron stars and other compact objects are so dense that Newtonian gravity
no longer describes them. Their structure follows from Einstein's equations of
general relativity. We build analytic models of these objects, check that they
are physically viable, and compare their predictions with observations.

## What we study

- **Exact interior solutions.** Closed-form solutions of Einstein's field
  equations for the interior of compact stars, including anisotropic models
  and gravastar-like objects with a de Sitter core.
- **Equations of state.** Analytical equations of state that connect ordinary
  neutron stars with gravastars within a single family of models.
- **Rotation and tidal effects.** Slowly rotating extensions of static
  solutions using the Hartle–Thorne approach, tidal Love numbers,
  deformability and universal relations.
- **Observational checks.** Compactness, surface redshift and comparison with
  mass and radius measurements from NICER.

## The structure equation

For a static, spherically symmetric star the pressure $$p$$, density
$$\rho$$ and enclosed mass $$m(r)$$ satisfy the Tolman–Oppenheimer–Volkoff
equation (in units $$G = c = 1$$):

$$
\frac{dp}{dr} = -\frac{(\rho + p)\left(m + 4\pi r^{3} p\right)}{r\,(r - 2m)},
\qquad \frac{dm}{dr} = 4\pi r^{2} \rho .
$$

<figure class="fig">
  <img class="fig__img" src="{{ '/assets/img/pubs/topic-relativistic-astrophysics.webp' | relative_url }}" alt="Embedding diagram of curved space around a compact star" width="800" height="500">
  <figcaption><span class="fig__num">Figure 1.</span> Embedding diagram of the curved space outside a static compact star: the closer to the star, the stronger the curvature.</figcaption>
</figure>
