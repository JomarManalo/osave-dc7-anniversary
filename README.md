# Anniversary invitation site

A one-page invitation site. It uses plain HTML, CSS and JavaScript, with no build step.

## Sections
1. **Opening screen:** an anniversary emblem. Tapping it slides the curtains open and starts the music.
2. **Hero:** the big anniversary number, the hosts and the date.
3. **Countdown** to the event.
4. **Our story:** a timeline of milestones with photos.
5. **Program:** the schedule for the evening.
6. **Venue:** a Google Maps embed, a "Get directions" link and an "Add to calendar" (.ics) download.
7. **Dress code** with color swatches.
8. **Then & now:** a photo gallery with a lightbox.
9. **RSVP form:** saves to a Google Sheet once one is connected.
10. **Wishes wall:** guest messages.

## Personalise it
Edit **`config.js`**. Names, date, story, program, venue, colors, photos, music and contact details all come from there.

- **Photos:** put the files in an `images/` folder and list them in `config.js`, e.g. `"images/2016.jpg"`.
- **Music:** put an mp3 in `audio/` and set `music: "audio/song.mp3"`.
- **Colors:** change the tokens at the top of `styles.css` (`--ink`, `--gold`, `--cream`, …).

## Collect RSVPs in Google Sheets
Follow the steps at the top of `google-apps-script.gs`, then paste the web-app URL into `rsvpEndpoint` in `config.js`.
Until you do, RSVPs and wishes are saved only in each visitor's own browser, so you won't see them.

## Preview locally
Open `index.html` in a browser. Or serve the folder:

```bash
npx serve .
```

## Publish
Upload the folder to any static host, such as Netlify (drag and drop), Vercel, GitHub Pages or Cloudflare Pages.
