---
title: Nonlinear evolution equations
order: 2
field: physics
figure: burgers-shocks
summary: >-
  Deriving Burgers, Korteweg–de Vries and Kadomtsev–Petviashvili type
  equations from physical models, and finding their wave solutions.
equation: 'u_t + A\,u\,u_x + B\,u_{xxx} = C\,u_{xx}'
equation_name: Korteweg–de Vries–Burgers equation
points:
  - Deriving Burgers, KdV and Kadomtsev–Petviashvili type equations
  - Exact travelling-wave, soliton and shock solutions
  - Fractional evolution equations and higher-dimensional systems such as Davey–Stewartson
---

Many different physical systems reduce, in the right limit, to a small family
of nonlinear partial differential equations. Studying these equations tells
us how waves behave in plasmas, fluids and other media.

## The equations

The **Korteweg–de Vries (KdV) equation** balances nonlinearity against dispersion
and supports solitary waves:

$$
u_t + A\,u\,u_x + B\,u_{xxx} = 0 .
$$

The **Burgers equation** balances nonlinearity against dissipation and supports
shock waves:

$$
u_t + A\,u\,u_x = C\,u_{xx} .
$$

The **Kadomtsev–Petviashvili (KP) equation** extends KdV to two space dimensions,
for waves that are weakly bent across their direction of travel:

$$
\left(u_t + A\,u\,u_x + B\,u_{xxx}\right)_x + D\,u_{yy} = 0 .
$$

The coefficients $$A, B, C, D$$ come from the underlying physical model, so
each solution can be read back in terms of the real system.

## Shock waves

For the Burgers equation with $$A = 1$$, a shock joining the states $$u_L$$ and
$$u_R$$ travels at speed $$(u_L + u_R)/2$$ with the profile

$$
u(\xi) = \frac{u_L + u_R}{2} - \frac{u_L - u_R}{2}\,\tanh\!\left(\frac{(u_L - u_R)\,\xi}{4C}\right).
$$

The smaller the dissipation $$C$$, the steeper the shock (Figure 1).

{% include figure.html svg="burgers-shocks" number=1 caption="Shock profiles of the Burgers equation joining \(u_L = 1\) to \(u_R = 0\), for four values of the dissipation coefficient \(\nu = C\). Smaller dissipation gives a steeper shock." %}

Beyond these, we study systems such as the (3 + 1)-dimensional
Davey–Stewartson system and fractional evolution equations, combining
dynamical-systems analysis with exact solitary-wave solutions.

## Methods

- Reductive perturbation methods for deriving the equations
- Exact solution methods for travelling waves, solitons and shocks
- Numerical simulation to check the solutions and explore cases without exact solutions
