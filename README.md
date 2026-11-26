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
| Members | `/members/` | `_data/members.yml` (lab leader details from `_data/people.yml`) |
| Lab leader profile | `/people/hafez/` | `_data/people.yml` (the `leader` section) |
| Publications | `/publications/` | `_data/publications.yml` |
| News and events | `/news/` | `_data/news.yml` |

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

### Writing mathematics (LaTeX)

LaTeX is typeset automatically on every page: in research pages, paper
titles, news, biographies, anywhere. Pages without math load nothing extra.

| Where you write | Inline math | Displayed equation |
|---|---|---|
| `.yml` data files (publications, news, people) | `$\kappa$` or `\( \kappa \)` | `$$ ... $$` or `\[ ... \]` |
| `.md` pages (about, research) | `$$\kappa$$` (recommended) or `$\kappa$` | `$$ ... $$` on its own lines |
| `.html` pages | `$\kappa$` or `\( \kappa \)` | `$$ ... $$` or `\[ ... \]` |

`\begin{equation}`, `\begin{align}`, `\begin{aligned}`, `\frac`, `\sqrt`,
matrices, Greek letters and most of standard LaTeX math work.

**Two rules to remember**

1. **In `.yml` files, put text containing LaTeX in single quotes** so the
   backslashes are kept:

   ```yaml
   - title: 'Ion-acoustic solitons in $\kappa$-distributed plasmas'
   ```

   (With double quotes you would have to write every backslash twice: `"$\\kappa$"`.)
   If the text itself contains a single quote, write it twice: `'Venus'' ionosphere'`.

2. **A real dollar sign** (e.g. a fee) is written `\$`, as in `\$50`.

**Shortcuts available everywhere**

| Write | Means |
|---|---|
| `\R`, `\C`, `\N`, `\Z`, `\Q` | ℝ, ℂ, ℕ, ℤ, ℚ |
| `\sech`, `\csch`, `\arctanh`, `\sgn` | sech, csch, arctanh, sgn |
| `\dd x` | upright d, as in ∫ f dx |
| `\pd{u}{t}` | ∂u/∂t |
| `\od{y}{x}` | dy/dx |
| `\abs{x}`, `\norm{x}`, `\vect{v}` | \|x\|, ‖x‖, bold **v** |

To add more shortcuts, edit the `MACROS` list at the top of `assets/js/math.js`.

Visitors who copy an equation from the site get its LaTeX source.
To show LaTeX code without typesetting it, wrap it in `<code>` or in an
element with `class="no-math"`.

### Visitor statistics

The site can count visitors with [GoatCounter](https://www.goatcounter.com)
(free, simple, no cookie banner needed) and/or Google Analytics 4. Sign up,
then put your code in `_config.yml` under `analytics:`:

```yaml
analytics:
  goatcounter: "mpblab"        # your GoatCounter code
  google: "G-XXXXXXXXXX"       # your Google Analytics measurement ID
```

Leave a value empty to turn that service off.

### Members and their photos

Everyone listed on the Members page, and every author circle on the
publication cards, comes from `_data/members.yml`. Each person has an `id`
(for example `tokey-sifullah-tanjil`), which is also the name of their photo file.

**Photo guidelines:** square (1:1), at least 400 × 400 pixels, face centred
with a little space above the head, plain or softly blurred background,
JPG under 300 KB. The site shows it as a circle.

**To add a photo yourself on GitHub**

1. Open `assets/img/members/` and click **Add file → Upload files**.
2. Upload the photo named after the person's id, e.g. `tokey-sifullah-tanjil.jpg`.
3. Open `_data/members.yml`, find that person, and set
   `photo: "tokey-sifullah-tanjil.jpg"`. Commit.

The photo then appears on the Members page and beside the person's name on
every publication card.

**Role and introduction:** in the same entry fill in `status` and the fields
below it, plus `intro` (two or three sentences) and optional `links`. The line
under the name is written automatically:

| status | Fill in | Shown as |
|---|---|---|
| `phd`, `mphil`, `msc`, `bsc` | `year` (optional, started) | Ph.D. Student, CUET |
| `faculty` | `position` | Assistant Professor, CUET |
| `ra` | | Research Assistant, CUET |
| `postdoc` | | Postdoctoral Researcher, CUET |
| `alumni` | `degree`, optional `year` (graduated) and `position` (current job) | M.Sc. Graduate, CUET<br>Now: Lecturer, XYZ University |
| (collaborators) | `position` | Professor, Bharathiar University, India |

If `department` is filled in, it is added before the university, e.g.
"Ph.D. Student, Department of Mathematics, CUET".

The Members page groups people by status: Faculty members, Postdoctoral
researchers, Research assistants, PhD, MPhil, MSc and Undergraduate students, Lab members (status
not filled in yet), Alumni and Collaborators. To move someone between lab
members and collaborators, change `group`.

**New co-authors:** when a new paper has an author who is not yet listed, add
an entry to `members.yml` with that name (exactly as written in
`publications.yml`) in `aliases`. Until then the author still shows with a
grey initials circle.

### Publication images

Each card shows an illustration for its topic. To show a figure from the
paper instead, upload it to `assets/img/pubs/` and add
`image: "file-name.jpg"` (and optionally `image_alt: "Description"`) to that
paper in `_data/publications.yml`. A wide image (about 16:10) works best.
Add `quartile: "Q1"` to show the journal's quartile badge.

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

- Logo: designed by the lab. Files are in `assets/img/logo/` (header emblem, full logo, icons); `assets/img/logo.png` and `assets/img/share.jpg` are the versions used by search engines and link previews.
- Wordmark font: Montserrat, SIL Open Font License (`assets/fonts/OFL-Montserrat.txt`).

- Typeface: Computer Modern Unicode (CMU), SIL Open Font License (`assets/fonts/OFL.txt`).
- Equations: [KaTeX](https://katex.org), MIT License (`assets/vendor/katex/LICENSE`).
- Figures are generated from exact solutions of the KdV and Burgers equations
  and numerical solutions of the Lotka–Volterra model.
