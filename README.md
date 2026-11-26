# mpblab.github.io

Official website of the **Mathematical Physics & Biology Research Lab (MPB Lab)**,
led by Prof. Dr. Md. Golam Hafez, Department of Mathematics, CUET.

Live site: <https://mpblab.github.io>

The site is built with [Jekyll](https://jekyllrb.com/), which GitHub Pages runs
automatically. After you save a change on GitHub, the site updates within a
minute or two.

## Pages

| Page | Address | Content comes from |
|---|---|---|
| Home | `/` | `index.html`, latest items in `_data/news.yml` |
| About | `/about/` | `about.md` |
| Research | `/research/` | the files in `_research/` |
| Research areas (3) | `/research/plasma-waves/` etc. | `_research/*.md` |
| People | `/people/` | `_data/people.yml` |
| Lab leader profile | `/people/hafez/` | `_data/people.yml` (the `leader` section) |
| Publications | `/publications/` | `_data/publications.yml` |
| News and events | `/news/` | `_data/news.yml` |
| Join us | `/join/` | `join.html` |
| Contact | `/contact/` | `_config.yml` (address and email) |

## How to update the website

Edit files directly on github.com: open a file, click the pencil icon, make
your change, and click **Commit changes**. Each data file has an example at the
top showing the format.

| To… | Edit |
|---|---|
| Change the lab email, address or Google Scholar / ResearchGate / ORCID links | `_config.yml` |
| Change the banner background (waves, plasma, orbits, contours) | `_config.yml`, the `banner:` line (or `banner:` at the top of a single page) |
| Add a student or alumnus | `_data/people.yml` |
| Update Prof. Hafez's profile (positions, education, awards) | `_data/people.yml`, `leader` section |
| Add a paper | `_data/publications.yml` |
| Add news, a seminar or a talk | `_data/news.yml` |
| Edit a research area page | `_research/plasma-waves.md`, `_research/evolution-equations.md`, `_research/mathematical-biology.md` |

### Smart features

- **Publications** are grouped by year, and visitors can filter them by topic
  and search them. Give a paper a `topic:` and it also appears automatically
  on that research area's page.
- **Events** (`type: event` in `news.yml`) with a future date are shown under
  "Upcoming events" on the News page.
- Empty sections (no students yet, no awards, and so on) are hidden
  automatically.
- Equations are written in LaTeX: `$$ u_t + 6uu_x + u_{xxx} = 0 $$` in the
  research pages.

### Adding a photo

1. Open `assets/img/people/` on GitHub and click **Add file → Upload files**.
2. Upload a portrait photo (for example `hafez.jpg`, about 600 × 750 pixels).
3. In `_data/people.yml`, set `photo: hafez.jpg` for that person.

### Adding a research area

1. Copy one of the files in `_research/` and give it a new name, such as `fluid-dynamics.md`.
2. Change its `title`, `order`, `field` and `summary`, and write the page text.
3. Add a matching entry to `_data/topics.yml` so papers can be tagged with it.

### Tips

- In `.yml` files indentation matters: use spaces, not tabs, and copy the
  indentation of the examples.
- If the site stops updating after a change, open the **Actions** tab on
  GitHub to see the error, then fix the file you last changed.

## Previewing locally (optional)

```bash
gem install jekyll
jekyll serve
```

Then open <http://localhost:4000>.

## Credits

- Typeface: Computer Modern Unicode (CMU), SIL Open Font License (`assets/fonts/OFL.txt`).
- Equations: [KaTeX](https://katex.org), MIT License (`assets/vendor/katex/LICENSE`).
- Figures are generated from exact solutions of the KdV and Burgers equations
  and numerical solutions of the Lotka–Volterra model.
