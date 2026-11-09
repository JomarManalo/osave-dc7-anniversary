(function () {
  "use strict";

  const S = window.SITE || {};
  const $ = (sel, root = document) => root.querySelector(sel);
  const el = (tag, cls, text) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  };
  const store = {
    get(key, fallback) {
      try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* storage unavailable */ }
    }
  };
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const start = new Date(S.eventStart);
  const end = new Date(S.eventEnd || S.eventStart);
  const ordinal = (n) => {
    const s = ["th", "st", "nd", "rd"], v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  };
  const yearsLabel = S.years ? `${ordinal(S.years)} Anniversary` : "Anniversary";

  /* ---------- Simple bindings ---------- */
  document.querySelectorAll("[data-text]").forEach((node) => {
    const value = S[node.dataset.text];
    if (value != null) node.textContent = value;
  });
  document.querySelectorAll("[data-src]").forEach((img) => {
    const value = S[img.dataset.src];
    if (value) img.src = value;
  });
  document.title = `${S.brand} ${S.site} · ${yearsLabel}`;
  $("#rsvp").hidden = S.showRsvp === false;
  $("#wishes").hidden = S.showMessages === false;
  if (S.years) {
    $("#heroYears").textContent = `${ordinal(S.years)} Year`;
    $("#heroYears").hidden = false;
  }

  const dateLong = new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" }).format(start);
  const weekday = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(start);
  const timeShort = new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit" }).format(start);
  $("#heroDate").textContent = dateLong;

  /* ---------- Confetti ---------- */
  const confettiBox = $("#confetti");
  const confettiColors = ["#e30613", "#ffc60b", "#b8000b", "#ffe066", "#ffffff"];
  function addConfetti(count, burst) {
    if (reducedMotion) return;
    for (let i = 0; i < count; i++) {
      const c = el("span");
      c.style.left = Math.random() * 100 + "%";
      c.style.background = confettiColors[i % confettiColors.length];
      c.style.width = 6 + Math.random() * 8 + "px";
      c.style.height = 10 + Math.random() * 10 + "px";
      c.style.animationDuration = 5 + Math.random() * 6 + "s";
      c.style.animationDelay = (burst ? Math.random() * 0.8 : Math.random() * 10) + "s";
      if (burst) c.style.animationIterationCount = "1";
      confettiBox.appendChild(c);
      if (burst) c.addEventListener("animationend", () => c.remove());
    }
  }
  addConfetti(window.innerWidth < 600 ? 24 : 44, false);

  /* ---------- Opening screen ---------- */
  const opening = $("#opening");
  const music = $("#bgMusic");
  const musicBtn = $("#musicBtn");

  function openInvite() {
    opening.classList.add("is-open");
    document.body.classList.remove("is-locked");
    addConfetti(60, true);
    playMusic();
    setTimeout(() => {
      opening.classList.add("is-gone");
      if (S.music) musicBtn.hidden = false;
    }, 1300);
  }
  $("#openBtn").addEventListener("click", openInvite);

  /* ---------- Music ---------- */
  if (S.music) music.src = S.music;
  function playMusic() {
    if (!S.music) return;
    music.play().then(() => setMusicState(true)).catch(() => setMusicState(false));
  }
  function setMusicState(playing) {
    musicBtn.classList.toggle("is-playing", playing);
    musicBtn.setAttribute("aria-label", playing ? "Pause music" : "Play music");
  }
  musicBtn.addEventListener("click", () => {
    if (music.paused) playMusic();
    else { music.pause(); setMusicState(false); }
  });

  /* ---------- Countdown ---------- */
  const cd = { d: $("#cdDays"), h: $("#cdHours"), m: $("#cdMins"), s: $("#cdSecs") };
  const pad = (n) => String(n).padStart(2, "0");
  function tick() {
    const diff = start - new Date();
    if (isNaN(diff)) return;
    if (diff <= 0) {
      $("#countdownGrid").hidden = true;
      $("#countdownDone").hidden = false;
      clearInterval(timer);
      return;
    }
    const sec = Math.floor(diff / 1000);
    cd.d.textContent = pad(Math.floor(sec / 86400));
    cd.h.textContent = pad(Math.floor((sec % 86400) / 3600));
    cd.m.textContent = pad(Math.floor((sec % 3600) / 60));
    cd.s.textContent = pad(sec % 60);
  }
  const timer = setInterval(tick, 1000);
  tick();

  /* ---------- Photo helper ---------- */
  function photo(src, label, tag = "div") {
    const box = el(tag, "photo");
    if (src) {
      const img = el("img");
      img.src = src;
      img.alt = label || "";
      img.loading = "lazy";
      box.appendChild(img);
    } else {
      box.textContent = label || "Photo";
    }
    return box;
  }

  /* ---------- Journey timeline ---------- */
  const timeline = $("#timeline");
  (S.story || []).forEach((item) => {
    const li = el("li", "timeline__item");
    const text = el("div", "timeline__text");
    text.append(el("span", "timeline__year", item.year), el("h3", null, item.title), el("p", null, item.text));
    li.append(text, photo(item.photo, `${item.year} photo`));
    timeline.appendChild(li);
  });

  /* ---------- Program ---------- */
  const programList = $("#programList");
  (S.program || []).forEach((item) => {
    const li = el("li", "program__item");
    const body = el("div");
    body.append(el("h3", null, item.title), el("p", null, item.text));
    li.append(el("div", "program__time", item.time), body);
    programList.appendChild(li);
  });

  /* ---------- Venue ---------- */
  const v = S.venue || {};
  $("#venueName").textContent = v.name;
  $("#venueAddress").textContent = v.address;
  $("#venueWhen").textContent = `${weekday}, ${dateLong} · ${timeShort}`;
  const q = encodeURIComponent(v.mapQuery || v.address || "");
  $("#mapFrame").src = `https://maps.google.com/maps?q=${q}&z=14&output=embed`;
  $("#directionsBtn").href = `https://www.google.com/maps/dir/?api=1&destination=${q}`;

  /* ---------- Add to calendar (.ics) ---------- */
  const icsDate = (d) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const icsEscape = (s) => String(s || "").replace(/[\\,;]/g, (m) => "\\" + m).replace(/\n/g, "\\n");
  $("#calendarBtn").addEventListener("click", () => {
    const ics = [
      "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//DC7 Anniversary//EN", "BEGIN:VEVENT",
      `UID:${icsDate(start)}-dc7-anniversary@invite`,
      `DTSTAMP:${icsDate(new Date())}`,
      `DTSTART:${icsDate(start)}`,
      `DTEND:${icsDate(end)}`,
      `SUMMARY:${icsEscape(`${S.brand} ${S.site} ${yearsLabel}`)}`,
      `LOCATION:${icsEscape(`${v.name}, ${v.address}`)}`,
      `DESCRIPTION:${icsEscape(S.theme)}`,
      "END:VEVENT", "END:VCALENDAR"
    ].join("\r\n");
    const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
    const a = el("a");
    a.href = url;
    a.download = "dc7-anniversary.ics";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });

  /* ---------- Dress code ---------- */
  const dc = S.dressCode || {};
  $("#dressTitle").textContent = dc.title;
  $("#dressText").textContent = dc.text;
  (dc.colors || []).forEach((c) => {
    const sw = el("span");
    sw.style.background = c;
    sw.title = c;
    $("#swatches").appendChild(sw);
  });

  /* ---------- Gallery + lightbox ---------- */
  const lightbox = $("#lightbox");
  const lightboxImg = $("#lightboxImg");
  (S.gallery || []).forEach((src, i) => {
    const tile = photo(src, `Photo ${i + 1}`, src ? "button" : "div");
    if (src) {
      tile.type = "button";
      tile.setAttribute("aria-label", `Open photo ${i + 1}`);
      tile.addEventListener("click", () => {
        lightboxImg.src = src;
        lightbox.hidden = false;
      });
    }
    $("#galleryGrid").appendChild(tile);
  });
  const closeLightbox = () => { lightbox.hidden = true; lightboxImg.src = ""; };
  $("#lightboxClose").addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !lightbox.hidden) closeLightbox(); });

  /* ---------- Sending to Google Sheets (optional) ---------- */
  function send(type, data) {
    if (!S.rsvpEndpoint) return Promise.resolve();
    const body = new URLSearchParams({ type, ...data, submittedAt: new Date().toISOString() });
    return fetch(S.rsvpEndpoint, { method: "POST", mode: "no-cors", body });
  }

  /* ---------- RSVP ---------- */
  $("#rsvpDeadline").textContent = S.rsvpDeadline;
  const deptSelect = $("#departmentSelect");
  (S.departments || []).forEach((d) => deptSelect.appendChild(new Option(d, d)));

  const form = $("#rsvpForm");
  const thanks = $("#rsvpThanks");
  const errorBox = $("#rsvpError");

  function showThanks(data) {
    $("#rsvpThanksText").textContent = data.attending === "Yes"
      ? `See you on ${dateLong}, ${data.name}! Wear your red and yellow.`
      : `We'll miss you, ${data.name}. Thanks for letting us know.`;
    form.hidden = true;
    thanks.hidden = false;
  }
  function showError(msg) {
    errorBox.textContent = msg;
    errorBox.hidden = false;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    data.name = (data.name || "").trim();
    if (!data.name) return showError("Please enter your name.");
    if (!data.department) return showError("Please select your department.");
    if (!data.attending) return showError("Please let us know if you can attend.");
    errorBox.hidden = true;

    const btn = form.querySelector("button[type=submit]");
    btn.disabled = true;
    btn.textContent = "Sending…";
    try {
      await send("rsvp", data);
      store.set("rsvp", data);
      showThanks(data);
      if (data.attending === "Yes") addConfetti(40, true);
    } catch {
      showError("Something went wrong. Please try again.");
    } finally {
      btn.disabled = false;
      btn.textContent = "Send RSVP";
    }
  });

  $("#rsvpAgain").addEventListener("click", () => {
    thanks.hidden = true;
    form.hidden = false;
  });

  const savedRsvp = store.get("rsvp", null);
  if (savedRsvp) {
    Object.entries(savedRsvp).forEach(([k, val]) => {
      const field = form.elements[k];
      if (field) field.value = val; // works for inputs, selects and radio groups
    });
    showThanks(savedRsvp);
  }

  /* ---------- Messages wall ---------- */
  const wishList = $("#wishList");
  function renderWish(w, prepend) {
    const card = el("figure", "wish");
    card.append(el("p", null, `“${w.text}”`), el("cite", null, `— ${w.name}`));
    prepend ? wishList.prepend(card) : wishList.appendChild(card);
  }
  const myWishes = store.get("wishes", []);
  [...myWishes].reverse().concat(S.sampleWishes || []).forEach((w) => renderWish(w));

  $("#wishForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const f = e.target;
    const w = { name: f.name.value.trim(), text: f.text.value.trim() };
    if (!w.name || !w.text) return;
    myWishes.push(w);
    store.set("wishes", myWishes);
    renderWish(w, true);
    send("wish", w);
    f.reset();
  });

  /* ---------- Reveal on scroll ---------- */
  const targets = document.querySelectorAll(".reveal, .timeline__item, .program__item");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    targets.forEach((t) => io.observe(t));
  } else {
    targets.forEach((t) => t.classList.add("is-visible"));
  }
})();
