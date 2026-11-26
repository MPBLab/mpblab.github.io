---
title: Mathematical biology
order: 3
field: biology
figure: lotka-volterra
banner: orbits
summary: >-
  Differential-equation models of how populations grow and interact, and how
  infectious diseases spread.
---
{% comment %}
  TODO (lab): please confirm or rewrite this page so it matches the lab's
  actual work in mathematical biology.
{% endcomment %}

Living systems change over time: populations grow and compete, predators and
prey rise and fall together, and infections spread through a community.
Differential equations let us describe these changes precisely and predict
how a system will behave.

## Population dynamics

The classic Lotka–Volterra model describes prey $$x$$ and predators $$y$$:

$$
\frac{dx}{dt} = \alpha x - \beta x y, \qquad
\frac{dy}{dt} = \delta x y - \gamma y .
$$

Prey grow on their own and are eaten by predators; predators grow by eating
prey and die off without them. The two populations cycle around an
equilibrium point (Figure 1).

{% include figure.html svg="lotka-volterra" number=1 caption="Phase portrait of the Lotka–Volterra model with \(\alpha = \beta = \gamma = \delta = 1\). Each closed curve is one possible population cycle; arrows show the direction of time." class="field--biology" %}

## Epidemic models

In the SIR model, a population of size $$N$$ is split into susceptible ($$S$$),
infected ($$I$$) and recovered ($$R$$) people:

$$
\frac{dS}{dt} = -\frac{\beta S I}{N}, \qquad
\frac{dI}{dt} = \frac{\beta S I}{N} - \gamma I, \qquad
\frac{dR}{dt} = \gamma I .
$$

An outbreak grows when the basic reproduction number $$R_0 = \beta/\gamma$$
is greater than one.

## Stability and bifurcation

For each model we ask when the system settles to a steady state, when it
oscillates, and how its behaviour changes as parameters such as birth,
contact or recovery rates are varied.
