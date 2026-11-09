/*
  ============================================================
  EDIT THIS FILE to personalise the site.
  Everything shown on the page comes from here.
  Items marked  // TODO  are still placeholders.
  ============================================================
*/
window.SITE = {
  // ---- Basics ------------------------------------------------
  brand: "O!Save",
  site: "DC 7 San Leonardo",
  logo: "images/logo.jpg",
  poster: "images/poster.jpg",
  title: "Anniversary",
  theme: "Stronger Together, Growing Bigger!",

  // Which anniversary, e.g. 1 → shows "1st Anniversary". Use null to hide the number.
  years: 1,

  intro:
    "One year ago, DC 7 San Leonardo shipped its very first delivery. Twelve months, " +
    "countless trucks and one amazing team later, we're celebrating our 1st anniversary — " +
    "and the people who keep O!Save stores stocked and our communities saving.",

  // Event start/end (ISO format, +08:00 = Philippine time)
  eventStart: "2026-11-27T08:00:00+08:00", // TODO confirm start time
  eventEnd: "2026-11-27T17:00:00+08:00",   // TODO confirm end time
  rsvpDeadline: "November 20, 2026",       // TODO

  // ---- Our journey timeline ---------------------------------
  // TODO replace with real milestones and photos (e.g. "images/opening-day.jpg")
  story: [
    { year: "Day 1", title: "DC 7 opens its doors", text: "Where it all started in San Leonardo, Nueva Ecija.", photo: "" },
    { year: "Month 1", title: "Our first delivery run", text: "The first trucks roll out to O!Save stores.", photo: "" },
    { year: "Mid-year", title: "Finding our rhythm", text: "A short line about a big achievement or challenge the team overcame.", photo: "" },
    { year: "Year 1", title: "Stronger together", text: "One year, one team — and we're just getting started.", photo: "" }
  ],

  // ---- Program ----------------------------------------------
  // TODO replace with the real schedule
  program: [
    { time: "8:00 AM", title: "Registration", text: "Sign in, claim your anniversary kit and take photos at the booth." },
    { time: "9:00 AM", title: "Opening Program", text: "Prayer, national anthem and welcome remarks." },
    { time: "10:00 AM", title: "Look Back & Recognition", text: "A short video of our journey and service awards for our teammates." },
    { time: "12:00 PM", title: "Lunch", text: "Boodle fight together." },
    { time: "1:30 PM", title: "Team Games", text: "Department vs department — bring your A-game." },
    { time: "3:30 PM", title: "Raffle & Closing", text: "Prizes, group photo and closing remarks." }
  ],

  // ---- Venue ------------------------------------------------
  venue: {
    name: "O!Save Trading DC7 San Leonardo",
    address: "Km 101 Maharlika Hwy, Magpapalayok, San Leonardo, Nueva Ecija",
    // Exact pin (lat,lng) from https://maps.app.goo.gl/otTJ5sRjkG6dXBes7
    mapQuery: "15.373303,120.9397287"
  },

  // ---- Dress code -------------------------------------------
  dressCode: {
    title: "Wear Red & Yellow",
    text: "Show your O!Save pride — company shirt or anything red and yellow. Comfortable shoes for the games!",
    colors: ["#e30613", "#b8000b", "#ffc60b", "#ffffff"]
  },

  // ---- Gallery ----------------------------------------------
  // Add photos to /images and list them here. Empty strings show a placeholder tile.
  gallery: ["images/poster.jpg", "", "", "", "", ""],

  // ---- Messages shown before anyone writes one ---------------
  sampleWishes: [
    { name: "A proud teammate", text: "Happy 1st anniversary, DC 7! Proud to be part of this team from the start." },
    { name: "Warehouse crew", text: "Stronger together, growing bigger — here's to many more years!" }
  ],

  // ---- Background music (optional) --------------------------
  // e.g. "audio/song.mp3". Leave empty to hide the music button.
  music: "",

  // ---- Show / hide sections ---------------------------------
  showRsvp: false,      // RSVP form
  showMessages: false,  // "Messages for DC 7" wall

  // ---- RSVP storage (optional) ------------------------------
  // Paste your Google Apps Script web-app URL here (see README.md).
  // While empty, RSVPs and messages are only saved in the visitor's own browser.
  rsvpEndpoint: "",

  // Departments shown in the RSVP form
  departments: ["Receiving", "Warehouse / Inventory", "Dispatch & Logistics", "Admin & HR", "Finance", "Maintenance", "Security", "Other"],

  // ---- Contact ----------------------------------------------
  contact: "For questions, contact the DC 7 HR / Admin office." // TODO
};
