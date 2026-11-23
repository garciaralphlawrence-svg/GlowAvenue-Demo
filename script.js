(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const MSGR = 'https://m.me/GlowAvenueQC';
  const PHONE = '09686540714';

  /* ===== Treatments (as named in Glow Avenue's own Facebook posts) ===== */
  const CATS = [
    { tag: 'SKIN', title: 'Facials', img: 'woman3', desc: 'Relaxing, results-focused facials for clearer, smoother skin.', items: [
      ['Glow Ave. Facial Signature', 'Diamond peel with ultrasonic treatment on a 10-in-1 machine'],
      ['Premium Hydra Facial', 'Deep cleansing and hydration for a fresh, healthy glow'],
      ['Facials for acne-prone skin', 'The right facial can help manage acne']] },
    { tag: 'BRIGHTENING', title: 'Gluta & Whitening', img: 'bottle', desc: 'Brighter, healthier-looking skin, gradually and safely.', items: [
      ['Gluta sessions', 'Done by trained professionals'],
      ['Glutathione drip', 'Nurse-assisted IV drip'],
      ['Whitening laser', 'Including whitening for underarms']] },
    { tag: 'HAIR REMOVAL', title: 'Smooth skin', img: 'device', desc: 'Explore hair-removal options with personal care, thoughtfully discussed.', items: [
      ['Pico Ice Diode', 'Hair removal with whitening for underarms'],
      ['Intense Pulsed Light (IPL Magneto)', 'Underarm, face, full arms, full legs, chest or back']] },
    { tag: 'LIFTING & BODY', title: 'Body contouring', img: 'body', desc: 'Your goals, your pace: body-care options with personal guidance.', items: [
      ['12D HIFU', 'Full-face lifting and tightening'],
      ['Body contouring & wellness', 'Start with a consultation about your goals']] },
    { tag: 'AESTHETICS', title: 'Doctor-led options', img: 'notebook', desc: 'Explore aesthetic care with clarity: personal, professional, consultation-led.', items: [
      ['Aesthetic consultation', 'Start with the questions that matter to you'],
      ['Doctor-led treatments', 'Planned around your goals after assessment']] },
    { tag: 'SELF-CARE', title: 'Lashes & nails', img: 'still', desc: 'Small details, a more polished you. Beauty moments for your kind of glow.', items: [
      ['Lash services', 'Beauty and self-care'],
      ['Manicure & pedicure', 'Nail care to finish your glow day']] }
  ];
  const ALL = CATS.flatMap(c => c.items.map(([n, d]) => ({ n, d, cat: c.title })));
  $('#cats').innerHTML = CATS.map(c => `<article class="cat reveal"><div class="ph"><img src="assets/img/${c.img}.webp" alt="${esc(c.title)}" loading="lazy"><span>${esc(c.tag)}</span></div>
    <div class="bd"><h3>${esc(c.title)}</h3><p>${esc(c.desc)}</p><ul>${c.items.map(([n, d]) => `<li><span>${esc(n)}<small>${esc(d)}</small></span></li>`).join('')}</ul>
    <div class="row"><small>Rates by message</small><button class="mini-btn" data-book="${esc(c.items[0][0])}">Book this</button></div></div></article>`).join('');

  const mq = ['Glow Ave. Facial Signature', 'Premium Hydra Facial', 'Gluta Sessions', 'Whitening Laser', 'Pico Ice Diode', 'IPL Magneto', '12D HIFU', 'Body Contouring', 'Lash Services', 'Manicure & Pedicure'];
  $('#marquee').innerHTML = [...mq, ...mq].map(t => `<span>${esc(t)}</span>`).join('');

  /* ===== Open now (Mon–Sat 12NN–9PM, Manila time) ===== */
  const manila = () => { const p = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Manila', weekday: 'short', hour: 'numeric', hour12: false }).formatToParts(new Date()); return { day: p.find(x => x.type === 'weekday').value, hr: +p.find(x => x.type === 'hour').value % 24 }; };
  const setOpen = () => {
    const { day, hr } = manila(), el = $('#openNow');
    const open = day !== 'Sun' && hr >= 12 && hr < 21;
    el.classList.toggle('on', open);
    el.textContent = open ? 'Open now · until 9PM' : day === 'Sun' ? 'Closed Sundays · opens Mon 12NN' : hr < 12 ? 'Opens today at 12NN' : 'Closed now · opens 12NN';
  };
  setOpen(); setInterval(setOpen, 60000);

  /* ===== Nav ===== */
  const nav = $('#nav'), bar = $('.progress span'), burger = $('#burger'), links = $('#links');
  const onScroll = () => { nav.classList.toggle('solid', scrollY > 30); const h = document.documentElement.scrollHeight - innerHeight; bar.style.width = (h > 0 ? scrollY / h * 100 : 0) + '%'; };
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
  const closeNav = () => { links.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); document.body.style.overflow = ''; };
  burger.addEventListener('click', () => { const o = !links.classList.contains('open'); links.classList.toggle('open', o); burger.setAttribute('aria-expanded', String(o)); document.body.style.overflow = o ? 'hidden' : ''; });
  $$('a, button', links).forEach(a => a.addEventListener('click', closeNav));

  /* ===== Glow Finder ===== */
  const CON = [
    ['Dull, uneven skin', 'Brighten and even out your tone.', ['Glow Ave. Facial Signature', 'Gluta sessions', 'Whitening laser']],
    ['Acne & breakouts', 'The right facial can help manage acne and improve your skin.', ['Facials for acne-prone skin', 'Premium Hydra Facial']],
    ['Blackheads & large pores', 'A deep clean for clearer-looking skin.', ['Premium Hydra Facial', 'Glow Ave. Facial Signature']],
    ['Dark underarms', 'Targeted brightening for underarms.', ['Pico Ice Diode', 'Whitening laser']],
    ['Unwanted hair', 'Smooth skin with fewer razor days.', ['Pico Ice Diode', 'Intense Pulsed Light (IPL Magneto)']],
    ['Sagging, fine lines', 'Lift and firm with a plan made for you.', ['12D HIFU', 'Premium Hydra Facial', 'Aesthetic consultation']],
    ['Body contouring', 'Care for the body you live in.', ['Body contouring & wellness', '12D HIFU']],
    ['Tired, need a boost', 'Glow from the inside out.', ['Glutathione drip', 'Gluta sessions']],
    ['Just pamper me', 'Make room for self-care.', ['Lash services', 'Manicure & pedicure', 'Glow Ave. Facial Signature']],
    ['Not sure yet', 'Begin with a conversation tailored to you.', ['Aesthetic consultation']]
  ];
  const out = $('#finderOut');
  const empty = () => { out.innerHTML = `<div class="empty"><img src="assets/img/emblem.png" alt="">Choose a concern to see your matches.</div>`; };
  $('#concerns').innerHTML = CON.map((c, i) => `<button class="concern" aria-pressed="false" data-c="${i}">${esc(c[0])}</button>`).join('');
  $('#concerns').addEventListener('click', e => {
    const b = e.target.closest('[data-c]'); if (!b) return;
    const was = b.getAttribute('aria-pressed') === 'true';
    $$('.concern').forEach(x => x.setAttribute('aria-pressed', 'false'));
    if (was) return empty();
    b.setAttribute('aria-pressed', 'true');
    const [t, why, refs] = CON[+b.dataset.c];
    out.innerHTML = `<h3>${esc(t)}</h3><p class="why">${esc(why)}</p>` + refs.map(n => ALL.find(x => x.n === n)).map(it =>
      `<div class="pick"><div><b>${esc(it.n)}</b><small>${esc(it.d)} · ${esc(it.cat)}</small></div><button data-book="${esc(it.n)}">Book this</button></div>`).join('') +
      `<p class="note">Suggestions only. Your Glow Avenue team confirms the right treatment during your consultation.</p>`;
  });
  empty();

  /* ===== FAQ (from their "FAQ Tuesday" post) ===== */
  const FAQ = [
    ['Is facial treatment painful?', 'Most facial treatments are comfortable and relaxing. Some procedures may cause mild tingling, but nothing too intense.'],
    ['Can I get a facial if I have acne?', "Yes! In fact, the right facial can help manage acne and improve your skin's condition."],
    ['Is Gluta safe?', 'When conducted properly by trained professionals, Gluta sessions are generally safe and commonly chosen for skin brightening. They work best with consistency, sun protection and proper skincare.'],
    ['How much are your treatments?', 'Rates and current promos are shared by message. Send a DM on Facebook or Instagram, or call 0968 654 0714.'],
    ['When are you open?', 'Monday to Saturday, 12:00 NN to 9:00 PM. Closed every Sunday, but our DMs stay open for inquiries and bookings.'],
    ['Where are you located?', 'JMBG Bldg, #20 Shorthorn St., Project 8, Quezon City 1106.']
  ];
  $('#faqList').innerHTML = FAQ.map(([q, a], i) => `<details class="reveal"${i === 0 ? ' open' : ''}><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('');

  /* ===== Reveal ===== */
  if ('IntersectionObserver' in window && !reduce) {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12, rootMargin: '0px 0px -40px 0px' });
    $$('.reveal').forEach(el => io.observe(el));
  } else $$('.reveal').forEach(el => el.classList.add('in'));

  /* ===== Booking ===== */
  const modal = $('#book'), svc = $('#bkSvc');
  svc.innerHTML = '<option value="">Choose a treatment…</option><option>Consultation (not sure yet)</option>' + CATS.map(c => `<optgroup label="${esc(c.title)}">` + c.items.map(([n]) => `<option>${esc(n)}</option>`).join('') + '</optgroup>').join('');
  let cur = 0, date = null, time = null, viewM = new Date(); viewM.setDate(1);
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const maxD = new Date(today); maxD.setDate(maxD.getDate() + 60);
  const SLOTS = ['12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'];
  const fmtD = d => d.toLocaleDateString('en-PH', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  const renderCal = () => {
    const y = viewM.getFullYear(), m = viewM.getMonth(), first = new Date(y, m, 1).getDay(), days = new Date(y, m + 1, 0).getDate();
    const prevOk = new Date(y, m, 1) > today, nextOk = new Date(y, m + 1, 1) <= maxD;
    let h = `<div class="cal-h"><button data-m="-1" ${prevOk ? '' : 'disabled'} aria-label="Previous month">‹</button>${viewM.toLocaleDateString('en-PH', { month: 'long', year: 'numeric' })}<button data-m="1" ${nextOk ? '' : 'disabled'} aria-label="Next month">›</button></div><div class="cal-g">`;
    h += ['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => `<span>${d}</span>`).join('') + '<i></i>'.repeat(first);
    for (let d = 1; d <= days; d++) { const dt = new Date(y, m, d), off = dt < today || dt > maxD || dt.getDay() === 0; h += `<button data-d="${d}" ${off ? 'disabled' : ''} class="${date && +dt === +date ? 'sel' : ''}" aria-label="${fmtD(dt)}${dt.getDay() === 0 ? ' (closed)' : ''}">${d}</button>`; }
    $('#cal').innerHTML = h + '</div>';
  };
  $('#cal').addEventListener('click', e => {
    const m = e.target.closest('[data-m]'); if (m && !m.disabled) { viewM.setMonth(viewM.getMonth() + +m.dataset.m); renderCal(); return; }
    const d = e.target.closest('[data-d]'); if (d && !d.disabled) { date = new Date(viewM.getFullYear(), viewM.getMonth(), +d.dataset.d); renderCal(); clearErr(); }
  });
  $('#slots').innerHTML = SLOTS.map(s => `<button data-s="${s}">${s}</button>`).join('');
  $('#slots').addEventListener('click', e => { const b = e.target.closest('[data-s]'); if (!b) return; time = b.dataset.s; $$('#slots button').forEach(x => x.classList.toggle('sel', x === b)); clearErr(); });
  const clearErr = () => $$('.err', modal).forEach(x => x.remove());
  const err = (el, t) => { clearErr(); const p = document.createElement('p'); p.className = 'err'; p.textContent = t; el.after(p); };
  const msgText = () => {
    const l = ['Hi Glow Avenue! I’d like to book an appointment.', '', 'Treatment: ' + svc.value];
    if (date) l.push('Preferred date: ' + fmtD(date)); if (time) l.push('Preferred time: ' + time);
    l.push('Name: ' + $('#bkName').value.trim(), 'Mobile: ' + $('#bkPhone').value.trim());
    const n = $('#bkNote').value.trim(); if (n) l.push('My goals: ' + n);
    l.push('', 'May I also ask for your current rates? Thank you!'); return l.join('\n');
  };
  const show = i => {
    cur = i; $$('.step', modal).forEach(s => s.hidden = +s.dataset.step !== i); $$('#dots li').forEach((l, k) => l.classList.toggle('on', k <= i));
    $('#bkBack').style.visibility = i ? 'visible' : 'hidden'; $('#bkNext').style.display = i === 3 ? 'none' : ''; $('#bkNext').textContent = i === 2 ? 'Review' : 'Next';
    if (i === 1) renderCal();
    if (i === 3) { const t = msgText(); $('#bkMsg').textContent = t; $('#sendSms').href = 'sms:' + PHONE + '?&body=' + encodeURIComponent(t); $('#sendMail').href = 'mailto:glowavenueqc@gmail.com?subject=' + encodeURIComponent('Booking request – ' + svc.value) + '&body=' + encodeURIComponent(t); $('#copied').textContent = ''; }
  };
  $('#bkNext').addEventListener('click', () => {
    if (cur === 0 && !svc.value) return err(svc.parentElement, 'Please choose a treatment (or “Consultation”).');
    if (cur === 1 && (!date || !time)) return err($('#slots'), 'Please pick a date and a time.');
    if (cur === 2) { if ($('#bkName').value.trim().length < 2) return err($('#bkName').parentElement, 'Please enter your name.'); if (!/^[0-9+()\s-]{7,20}$/.test($('#bkPhone').value.trim())) return err($('#bkPhone').parentElement, 'Please enter a valid mobile number.'); }
    clearErr(); show(cur + 1);
  });
  $('#bkBack').addEventListener('click', () => { clearErr(); show(Math.max(0, cur - 1)); });
  $('#sendMsgr').addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(msgText()); $('#copied').textContent = 'Copied! Paste it in the Messenger chat that just opened.'; } catch { $('#copied').textContent = 'Opening Messenger. Copy the message above and paste it there.'; }
    window.open(MSGR, '_blank', 'noopener');
  });
  $('#sendIcs').addEventListener('click', () => {
    if (!date || !time) return;
    const [hm, ap] = time.split(' '); let [hh] = hm.split(':').map(Number); if (ap === 'PM' && hh !== 12) hh += 12;
    const p = n => String(n).padStart(2, '0'), d = `${date.getFullYear()}${p(date.getMonth() + 1)}${p(date.getDate())}`;
    const ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Glow Avenue//Booking//EN', 'BEGIN:VEVENT', 'UID:' + Date.now() + '@glowavenue', 'DTSTAMP:' + new Date().toISOString().replace(/[-:]/g, '').slice(0, 15) + 'Z',
      `DTSTART;TZID=Asia/Manila:${d}T${p(hh)}0000`, `DTEND;TZID=Asia/Manila:${d}T${p(hh + 1)}0000`, 'SUMMARY:Glow Avenue – ' + svc.value.replace(/[,;]/g, ' '),
      'LOCATION:JMBG Bldg\\, #20 Shorthorn St.\\, Project 8\\, Quezon City', 'DESCRIPTION:Requested schedule – wait for Glow Avenue to confirm. 0968 654 0714', 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' })); a.download = 'glow-avenue-visit.ics'; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  });
  let lastFocus = null;
  const openBook = pre => { lastFocus = document.activeElement; closeChat(); if (pre) { const o = [...svc.options].find(o => o.value === pre) || [...svc.options].find(o => o.value && o.value.toLowerCase().includes(pre.toLowerCase())); if (o) svc.value = o.value; } modal.hidden = false; document.body.style.overflow = 'hidden'; show(0); svc.focus(); };
  const closeBook = () => { modal.hidden = true; document.body.style.overflow = ''; lastFocus?.focus?.(); };
  document.addEventListener('click', e => { const b = e.target.closest('[data-book]'); if (b) { e.preventDefault(); openBook(b.dataset.book); } });
  modal.addEventListener('click', e => { if (e.target === modal || e.target.closest('[data-close]')) closeBook(); });

  /* ===== Ask Glow Avenue (keyword assistant) ===== */
  const chat = $('#chat'), log = $('#chatLog');
  const say = (h, who = 'bot') => { const d = document.createElement('div'); d.className = 'bub ' + who; if (who === 'me') d.textContent = h; else d.innerHTML = h; log.appendChild(d); log.scrollTop = log.scrollHeight; };
  const BOOK = ` <a href="#" data-book>Book a consultation</a> or message us on <a href="${MSGR}" target="_blank" rel="noopener">Messenger</a>.`;
  const KB = [
    [/hour|open|close|sunday|linggo|time|bukas|sarado|oras/, () => `We're open <b>Monday to Saturday, 12:00 NN to 9:00 PM</b>. Closed every Sunday, but our DMs stay open for bookings. Holiday schedules are posted on Facebook.`],
    [/where|address|location|saan|map|direction|project 8|shorthorn|park/, () => `We're at <b>JMBG Bldg, #20 Shorthorn St., Project 8, Quezon City</b>. <a href="https://maps.google.com/?q=20+Shorthorn+St,+Project+8,+Quezon+City" target="_blank" rel="noopener">Open in Google Maps</a>.`],
    [/price|how much|magkano|cost|rate|promo|package|discount|mura/, () => `Rates and current promos are shared by message so you always get the latest. Message us on <a href="${MSGR}" target="_blank" rel="noopener">Messenger</a>, Instagram (@glowavenue_qc) or call <a href="tel:+639686540714">0968 654 0714</a>.`],
    [/contact|phone|number|call|\btext\b|email|instagram|\big\b|messenger/, () => `Call or text <a href="tel:+639686540714">0968 654 0714</a>, email <a href="mailto:glowavenueqc@gmail.com">glowavenueqc@gmail.com</a>, or DM us on Facebook or Instagram (@glowavenue_qc).`],
    [/book|appoint|reserve|sched|pa-book/, () => `Easy: share your goal, choose your day, and we confirm by message.` + BOOK],
    [/hydra|blackhead|pore/, () => `Our <b>Premium Hydra Facial</b> clears out blackheads and large pores, smooths rough texture, softens fine lines, brightens dark spots and adds a fresh, healthy glow.` + BOOK],
    [/pain|masakit|hurt|tingl/, () => `Most facial treatments are comfortable and relaxing. Some procedures may cause mild tingling, but nothing too intense.`],
    [/acne|pimple|tigyawat/, () => `Yes, you can get a facial with acne. The right facial can help manage acne and improve your skin's condition.` + BOOK],
    [/gluta|drip|whiten|white|iv\b|brighten/, () => `We offer <b>Gluta sessions</b>, a nurse-assisted <b>glutathione drip</b> and <b>whitening laser</b>. Done properly by trained professionals, Gluta is generally safe. It brightens gradually (not overnight!) and works best with sun protection and good skincare.`],
    [/facial|signature|diamond|peel/, () => `Our facials include the <b>Glow Ave. Facial Signature</b> (diamond peel with ultrasonic treatment on a 10-in-1 machine), the <b>Premium Hydra Facial</b>, and facials for acne-prone skin.`],
    [/hair|laser|diode|ipl|magneto|underarm|kili|brazil|shave/, () => `For hair removal we have <b>Pico Ice Diode</b> (with whitening for underarms) and <b>IPL Magneto</b> for underarm, face, full arms, full legs, chest or back.`],
    [/hifu|lift|sag|tight|contour|body|fat|slim/, () => `For lifting we offer <b>12D HIFU</b> (full face), plus body contouring and wellness options. Start with a consultation about your goals.`],
    [/doctor|derma|nurse|licensed|safe/, () => `Glow Avenue offers doctor-led aesthetic options, and IV drips are nurse-assisted. Every plan starts with a consultation.`],
    [/lash|nail|mani|pedi/, () => `Yes! We do <b>lash services</b> and <b>manicure & pedicure</b>, perfect to finish your glow day.`],
    [/hi|hello|good|kumusta|hey/, () => `Hi! ✨ Ask me about treatments, hours, location or how to book.`]
  ];
  const QUICK = ['Hours', 'Location', 'Prices', 'Hydra facial', 'Is Gluta safe?', 'Hair removal', 'Book'];
  $('#chatQuick').innerHTML = QUICK.map(t => `<button data-q="${t}">${t}</button>`).join('');
  const answer = t => { say(t, 'me'); const hit = KB.find(([re]) => re.test(t.toLowerCase())); setTimeout(() => say(hit ? hit[1]() : `I'm not sure about that one. Our team can answer on <a href="${MSGR}" target="_blank" rel="noopener">Messenger</a> or at <a href="tel:+639686540714">0968 654 0714</a>.`), 350); };
  let greeted = false;
  const openChat = () => { chat.hidden = false; if (!greeted) { greeted = true; say('Hi, welcome to Glow Avenue! ✨ I can help with treatments, hours and booking.'); } $('#chatIn').focus(); };
  function closeChat() { chat.hidden = true; }
  document.addEventListener('click', e => { if (e.target.closest('[data-chat]')) { e.preventDefault(); openChat(); } });
  chat.addEventListener('click', e => { if (e.target.closest('.x')) closeChat(); const b = e.target.closest('[data-q]'); if (b) answer(b.dataset.q); });
  $('#chatForm').addEventListener('submit', e => { e.preventDefault(); const v = $('#chatIn').value.trim(); if (!v) return; $('#chatIn').value = ''; answer(v); });
  addEventListener('keydown', e => { if (e.key === 'Escape') { if (!modal.hidden) closeBook(); else if (!chat.hidden) closeChat(); else closeNav(); } });
})();
