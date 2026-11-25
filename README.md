# mpblab.github.io

Official website of the **Mathematical Physics & Biology Research Lab (MPB Lab)**,
led by Prof. Dr. Md. Golam Hafez, Department of Mathematics, CUET.

Live site: <https://mpblab.github.io>

The site is built with [Jekyll](https://jekyllrb.com/), which GitHub Pages runs
automatically. After you save a change on GitHub, the site updates within a minute or two.

## How to update the website

You can edit everything directly on github.com: open a file, click the pencil
icon, make your change, and click **Commit changes**.

| To change… | Edit this file |
|---|---|
| Lab name, address, contact email, Google Scholar / ResearchGate / ORCID links | `_config.yml` |
| Lab members and their photos | `_data/people.yml` (photos go in `assets/img/people/`) |
| Publications | `_data/publications.yml` |
| News items | `_data/news.yml` |
| Research areas and topics | `_data/research.yml` |
| Top menu | `_data/navigation.yml` |
| Text on the Join us page | `join.html` |

Each data file has an example at the top showing the format.

### Adding a photo

1. Open the `assets/img/people/` folder on GitHub and click **Add file → Upload files**.
2. Upload a square photo (for example `hafez.jpg`, about 400 × 400 pixels).
3. In `_data/people.yml`, set `photo: hafez.jpg` for that person.

### Tips

- In `.yml` files, indentation matters: use spaces, not tabs, and keep the same
  indentation as the example entries.
- If the site stops updating after a change, open the **Actions** tab on GitHub
  to see the error message, then fix the file that was last changed.

## Previewing locally (optional)

```bash
gem install jekyll
jekyll serve
```

Then open <http://localhost:4000>.

## Files

```
_config.yml          site settings
_data/               content: people, publications, news, research, menu
_layouts/            page templates
_includes/           header, footer, logo, person card
assets/css/main.css  styles
assets/js/           menu and the soliton plot on the home page
index.html           home page
research.html, people.html, publications.html, news.html, join.html, contact.html
```
