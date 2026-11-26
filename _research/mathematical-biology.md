---
title: Mathematical biology
order: 3
field: biology
figure: lotka-volterra
banner: orbits
summary: >-
  Differential-equation models of infectious diseases and living systems in
  Bangladesh, including COVID-19, dengue and tuberculosis, and models of
  neuron dynamics.
equation: '\frac{dI}{dt} = \frac{\beta S I}{N} - \gamma I, \qquad R_0 = \frac{\beta}{\gamma}'
equation_name: Infected class of the SIR epidemic model
points:
  - COVID-19, dengue and tuberculosis transmission in Bangladesh
  - Fractional and fractal-fractional models fitted to data
  - Neuronal dynamics with Hodgkin–Huxley type models
  - Thresholds, stability and the effect of interventions
---

Living systems change over time: infections spread through a community,
vaccination and treatment change their course, and cells such as neurons fire
in complex rhythms. Differential equations let us describe these changes
precisely, fit them to real data, and test what would happen under
different interventions.

## What we study

- **Infectious diseases in Bangladesh.** Models of COVID-19 (including double
  vaccination and COVID-19 with lung cancer coinfection), dengue transmission
  in urban and rural areas, and tuberculosis transmission with treatment
  default and pseudo-recovery.
- **Fractional and fractal-fractional models.** Models with memory, built with
  operators such as the Caputo–Fabrizio derivative, analysed theoretically and
  solved numerically against epidemiological data.
- **Neuronal dynamics.** Fractal-fractional versions of the Hodgkin–Huxley
  model for intrinsically bursting neurons.
- **Thresholds and stability.** When an outbreak dies out or persists, and how
  that depends on contact, recovery and treatment rates.

## Epidemic models

Most of our disease models extend the classic SIR model, in which a population
of size $$N$$ is split into susceptible ($$S$$), infected ($$I$$) and recovered
($$R$$) people:

$$
\frac{dS}{dt} = -\frac{\beta S I}{N}, \qquad
\frac{dI}{dt} = \frac{\beta S I}{N} - \gamma I, \qquad
\frac{dR}{dt} = \gamma I .
$$

An outbreak grows when the basic reproduction number $$R_0 = \beta/\gamma$$
is greater than one. Our models add further compartments, such as exposed,
hospitalised or vaccinated people, and fit their parameters to data from
Bangladesh.

## Population dynamics

The same tools describe interacting populations. In the Lotka–Volterra model
of prey $$x$$ and predators $$y$$,

$$
\frac{dx}{dt} = \alpha x - \beta x y, \qquad
\frac{dy}{dt} = \delta x y - \gamma y ,
$$

the two populations cycle around an equilibrium point (Figure 1).

{% include figure.html svg="lotka-volterra" number=1 caption="Phase portrait of the Lotka–Volterra model with \(\alpha = \beta = \gamma = \delta = 1\). Each closed curve is one possible population cycle; arrows show the direction of time." class="field--biology" %}
