import { landingField, landingDisciplines, landingFounding } from './landing.mjs';
import { mkdirSync, writeFileSync } from 'node:fs';
import { sections } from './content.mjs';
const [fieldnotes, city] = sections.work.entries;
const delivery = {
  slug: 'local-commerce', title: 'Hajiganj Local Commerce', status: 'Concept',
  summary: 'A neighborhood delivery network for restaurants, home kitchens, and local riders.',
  body: [
    'The concept starts with a compact delivery area in Hajiganj. Restaurants and home kitchens can bring their menus online while a small rider team handles the handoff to customers.',
    'The first pilot would test three things: whether menus stay accurate, how quickly shops can prepare orders, and which delivery areas a small rider team can reliably serve.',
    'The product direction includes merchant video previews and ordering for nearby communities. The pilot would guide which features ship first.'
  ]
};
const sales = {
  slug: 'sales-workflows', title: 'AI Sales Employee', status: 'Concept',
  summary: 'An AI-assisted workspace for researching leads and reviewing personalized outreach.',
  body: [
    'A team starts by describing its business, audience, offer, and campaign goal. The proposed workspace brings research, qualification, personalization, and replies into one sequence.',
    'The review screen would show where each prospect detail came from and let an operator edit the outreach before sending. That gives the team a way to catch inaccurate or irrelevant claims.',
    'The first prototype would focus on a small batch of prospects and test whether the research and drafts save time during a real review.'
  ]
};
const work = [city, fieldnotes, delivery, sales];
const tags = ['Civic technology', 'Workflow tools', 'Local commerce', 'Applied AI'];
const colors = ['civic', 'tools', 'commerce', 'ai'];
const nav = [['Company','/company/'],['Ventures','/ventures/'],['Work','/work/'],['Journal','/journal/'],['Partners','/partners/']];
const brand = '<a class="brand" href="/" aria-label="OOYI home"><span class="mark" aria-hidden="true"></span>OOYI<span class="branddot">.</span></a>';
const pill = (label, href, secondary = false) => `<a class="button ${secondary ? 'secondary' : ''}" href="${href}">${label}<span aria-hidden="true">↗</span></a>`;
const eyebrow = (label) => `<p class="eyebrow"><i></i>${label}</p>`;
const intro = (label,title,description) => `<section class="page-intro">${eyebrow(label)}<h1>${title}</h1><p class="lede">${description}</p></section>`;
const heading = (label,title,description) => `<div class="section-heading">${eyebrow(label)}<h2>${title}</h2><p>${description}</p></div>`;
const callout = () => `<section class="callout reveal">${eyebrow('OPEN FOR COLLABORATION')}<h2>Have a workflow<br>worth building for?</h2><p>Tell us what your team does today and where you want it to work better.</p>${pill('Build a project brief','/contact/')}</section>`;
const graphic = (index) => {
  const icons = ['<path d="M50 70 27 47c-12-13 7-31 23-13 16-18 35 0 23 13Z"/><path d="M30 50h10l6-9 8 15 5-6h12"/>','<rect x="28" y="27" width="44" height="48" rx="8"/><path d="m37 41 3 3 5-6m-8 17 3 3 5-6m7-11h11M52 55h11"/>','<path d="M25 50 50 35l25 15-25 15Zm0 0v13l25 15 25-15V50M50 65v13m-13-35 25 15"/>','<circle cx="50" cy="50" r="10"/><path d="M50 40V26m0 48V60M40 50H26m48 0H60m-3-7 11-11M32 68l11-11m14 0 11 11M32 32l11 11"/>'];
  return `<div class="art ${colors[index]}" aria-hidden="true"><span>OOYI / 0${index+1}</span><svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2"><circle cx="50" cy="50" r="47" opacity=".25"/><circle cx="50" cy="50" r="38" opacity=".3"/>${icons[index]}</svg><small>✦</small></div>`;
};
const card = (entry,index) => `<a class="project reveal" data-status="${entry.status}" href="/work/${entry.slug}/">${graphic(index)}<div class="cardcopy"><div class="meta">${tags[index]} <span>${entry.status}</span></div><h3>${entry.title}<b aria-hidden="true">↗</b></h3><p>${entry.summary}</p></div></a>`;
const journal = [...sections.journal.entries, {
  slug:'what-to-test-in-a-delivery-pilot', title:'What to test in a delivery pilot', status:'Product note',
  summary:'A practical starting point for testing neighborhood delivery in Hajiganj.',
  body:['Begin with a handful of merchants and a delivery zone that riders already know. Use the same order log across the pilot so it is easy to identify where orders stall.',
    'Record the time an order was accepted, when it was ready, and when it reached the customer. Separate travel time from preparation time before adjusting delivery estimates.',
    'Review menu availability and cancellations with each merchant. Ask customers and riders where instructions were unclear, then fix the most common handoff issue before expanding the zone.']
}];
const notes = () => `<div class="notes">${journal.map((e,i)=>`<a class="note reveal" href="/journal/${e.slug}/"><span class="index">0${i+1}</span><div><p class="micro">${e.status}</p><h3>${e.title}</h3><p>${e.summary}</p></div><b aria-hidden="true">↗</b></a>`).join('')}</div>`;
const steps = () => `<div class="steps reveal">${[
  ['Discover','Observe the workflow and identify where people lose time or context.'],
  ['Prototype','Build one usable flow around the hardest part of the problem.'],
  ['Pilot','Test with the people who would use it and document what changes.'],
  ['Improve','Use those findings to decide what to fix and what to build next.']
].map(([t,d],i)=>`<article><span>0${i+1} /</span><h3>${t}</h3><p>${d}</p></article>`).join('')}</div>`;
const hero = `<section class="hero">
  <div class="hero-inner">
    <div class="hero-copy">${eyebrow('INDEPENDENT TECHNOLOGY COMPANY · BANGLADESH')}
      <h1>We build products<br>for <em>real life.</em></h1>
      <p>OOYI is an independent technology company building web, mobile, and AI products from Bangladesh. Our work starts with the details people run into every day.</p>
      <div class="actions">${pill('Explore our work','/work/')}${pill('Enter the Signal Field','#signal',true)}</div>
    </div>
    <div class="system" aria-label="Explore OOYI's portfolio">
      <div class="orbital" aria-hidden="true"><div class="ring ring-one"></div><div class="ring ring-two"></div><div class="ring ring-three"></div><div class="ring ring-four"></div><div class="core"><span class="mark"></span></div><span class="cross">+</span></div>
      <a class="float f1" href="/work/city-sheba/"><span class="tile">✚</span><span><strong>City Sheba</strong><small>Civic technology</small></span><b>↗</b></a>
      <a class="float f2" href="/work/local-commerce/"><span class="tile">◈</span><span><strong>Local Commerce</strong><small>Delivery concept</small></span><b>↗</b></a>
      <a class="float f3" href="/work/fieldnotes/"><span class="tile">≋</span><span><strong>Fieldnotes</strong><small>Working prototype</small></span><b>↗</b></a>
      <a class="float f4" href="/work/sales-workflows/"><span class="tile">✦</span><span><strong>AI Sales Employee</strong><small>AI concept</small></span><b>↗</b></a>
    </div>
  </div>
  <div class="hero-bottom"><span><i></i> THE OOYI PORTFOLIO</span><div>WEB PRODUCTS <b>✦</b> MOBILE APPS <b>✦</b> APPLIED AI</div><a href="#signal">SCROLL TO EXPLORE ↓</a></div>
</section>`;
const home = hero + `<div class="reading-progress" aria-hidden="true"></div><div class="wrap">${landingField}
<section id="selected" class="section">
  ${heading('02 / SELECTED WORK','See the work at each stage.','Explore a working prototype, an app in development, and the concepts we’re shaping.')}
  <div class="projects">${work.map(card).join('')}</div>
</section>${landingDisciplines}${landingFounding}
<section class="section">
  ${heading('05 / HOW WE BUILD','From first question to first pilot.','We narrow an idea into something people can try, then use their feedback to decide what to build next.')}${steps()}
</section><section class="section">${heading('06 / BUILD JOURNAL','The decisions behind the work','Why we keep original notes attached to tasks, share an API across platforms, and start delivery pilots with a small zone.')}${notes()}</section>${callout()}</div>`;
const wrap = (inner) => `<div class="wrap">${inner}</div>`;
const section = (inner) => `<section class="section">${inner}</section>`;

function page(path,title,description,body) {
  const links = nav.map(([name,url])=>`<a href="${url}" ${path.startsWith(url) ? 'aria-current="page"' : ''}>${name}</a>`).join('');
  const dir = `dist${path}`;
  mkdirSync(dir,{recursive:true});
  writeFileSync(`${dir}index.html`,`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="${description}"><meta name="theme-color" content="#0b2015"><title>${title}</title><link rel="icon" href="/mark.svg"><link rel="stylesheet" href="/style.css"><script src="/app.js" defer></script></head><body>
    <a class="skip" href="#main">Skip to content</a>
    <div class="shell"><header class="header">${brand}<button class="menu" aria-expanded="false" aria-controls="primary">Menu ☰</button><nav id="primary" aria-label="Main navigation">${links}</nav><div class="head-cta">${pill('Work with us','/contact/')}</div></header>
    <main id="main">${body}</main>
    <footer class="footer"><div class="footer-top"><div>${brand}<p>An independent technology company<br>building from Bangladesh.</p></div><nav aria-label="Footer">${links}<a href="/contact/">Contact</a></nav></div><div class="footer-bottom"><span>© ${new Date().getFullYear()} OOYI</span><a href="#main">Back to top ↑</a></div></footer>
    </div></body></html>`);
}
page('/','OOYI — Technology Company & Ventures','OOYI builds web, mobile and AI products from Bangladesh. Explore the portfolio, journal and ways to collaborate.',home);
page('/company/','Company — OOYI','The people and approach behind OOYI.',intro('THE COMPANY','Built in Bangladesh.<br><em>Designed for everyday use.</em>','OOYI is an independent technology company founded by Obayed and Yasin. It gives each product its own identity and the team a shared way of building.')+wrap(
  section(heading('OUR STORY','Starting with what we know','Local services in Hajiganj gave us a starting point: how do residents find a blood donor quickly, and how could neighborhood businesses coordinate delivery? These are different problems. Both reward spending time with the people doing the work.')+
  '<div class="founders"><article><p class="micro">CO-FOUNDER</p><h3>Obayed</h3><p>Full-stack web and mobile development.</p></article><article><p class="micro">CO-FOUNDER</p><h3>Yasin</h3><p>Co-founded OOYI with Obayed in Bangladesh.</p></article></div>')+
  section(heading('HOW WE WORK','Small tests before bigger commitments','Our process gives each venture space to learn at its own pace.')+steps())+callout()));
page('/ventures/','Ventures — OOYI','Explore OOYI’s product directions and venture concepts.',intro('VENTURE PORTFOLIO','Different problems.<br><em>One place to build.</em>','Our ventures span civic technology, local commerce, and applied AI. See how each idea is taking shape.')+
  wrap(section(`<div class="projects">${[0,2,3].map(i=>card(work[i],i)).join('')}</div>`)+callout()));
page('/work/','Selected Work — OOYI','Explore OOYI projects by stage, including City Sheba and Fieldnotes.',intro('SELECTED WORK','See what <em>we’re building.</em>','Explore working prototypes, products in development, and ideas we’re shaping.')+
  wrap(section(`<div class="filters" aria-label="Filter by project stage">${['All','Working prototype','In development','Concept'].map((s,i)=>`<button type="button" data-filter="${s}" aria-pressed="${i===0}">${s}</button>`).join('')}</div><p id="count" role="status">4 projects</p><div class="projects">${work.map(card).join('')}</div>`)));
for (const [index,entry] of work.entries()) {
  const body = `<section class="section detail"><div>${graphic(index)}<dl><dt>Area</dt><dd>${tags[index]}</dd><dt>Stage</dt><dd>${entry.status}</dd></dl></div><article><h2>Inside the project</h2>${entry.body.map(p=>`<p>${p.replace('Try the workspace to verify the workflow for yourself. ','')}</p>`).join('')}${entry===fieldnotes ? '<form id="notes-demo"><label for="note-input">Try the draft flow</label><textarea id="note-input" rows="4" required placeholder="Add one action per line"></textarea><button class="button">Draft tasks ↗</button><ul id="task-list" aria-live="polite"></ul></form>' : ''}${pill('All projects','/work/',true)}</article></section>`;
  page(`/work/${entry.slug}/`,`${entry.title} — OOYI`,entry.summary,intro(tags[index]+' / '+entry.status,entry.title,entry.summary)+wrap(body+callout()));
}
page('/journal/','Build Journal — OOYI','Engineering and product notes from OOYI.',intro('BUILD JOURNAL','Decisions from<br><em>the workbench.</em>','A closer look at how we prototype, make architecture choices, and plan product pilots.')+wrap(section(notes())));
for (const entry of journal) {
  page(`/journal/${entry.slug}/`,`${entry.title} — OOYI`,entry.summary,intro(entry.status,entry.title,entry.summary)+wrap(section(`<article class="reading">${entry.body.map(p=>`<p>${p.replace('Try this with a line','Try the Fieldnotes demo with a line')}</p>`).join('')}${entry===journal[0] ? pill('Try Fieldnotes','/work/fieldnotes/#notes-demo') + ' ' : ''}${pill('Back to journal','/journal/',true)}</article>`)));
}
page('/partners/','Partnerships — OOYI','Explore product pilots and local collaborations with OOYI.',intro('PARTNERSHIPS','Build with <em>OOYI.</em>','We’re interested in working with people who can help us understand and test a real workflow.')+wrap(section(`
  <div class="founders"><article><p class="micro">01 / PRODUCT PILOTS</p><h3>Test a workflow</h3><p>Bring a specific problem, a small group of participants, and a way to tell whether the product helps.</p></article><article><p class="micro">02 / LOCAL COLLABORATION</p><h3>Bring local expertise</h3><p>Help shape how a product fits a real community, from onboarding neighborhood merchants to keeping civic listings accurate.</p></article></div>`)+callout()));
page('/contact/','Project Brief — OOYI','Prepare a project brief for an OOYI collaboration.',intro('WORK WITH US','Start with <em>the problem.</em>','Put your idea into a short brief you can download and share with the OOYI team.')+wrap(section(`<form class="brief" id="brief"><label>Your name<input name="name" required autocomplete="name"></label><label>Email<input name="email" type="email" required autocomplete="email"></label><label>What are you working on?<select name="type"><option>Product pilot</option><option>Web or mobile product</option><option>Local collaboration</option><option>Other</option></select></label><label>Describe the workflow and where it gets difficult<textarea name="problem" rows="5" required></textarea></label><button class="button">Download brief ↓</button><p role="status" id="brief-status">Your brief is created in your browser.</p></form>`)));
