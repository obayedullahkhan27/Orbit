export const chapters = [
  { name: 'Civic technology', title: 'When someone needs blood, the search should start closer to home.', text: 'City Sheba starts with blood donor discovery in Hajiganj. Its shared API gives the mobile and web apps a common set of rules for donor profiles.', stage: 'IN DEVELOPMENT', href: '/work/city-sheba/', project: 'City Sheba', code: 'CIVIC / 01' },
  { name: 'Workflow tools', title: 'A task can change. The original instruction should stay within reach.', text: 'Fieldnotes separates the editable task from its source. Try drafting a checklist and see what happens when you rewrite a task without losing its context.', stage: 'WORKING PROTOTYPE', href: '/work/fieldnotes/', project: 'Fieldnotes', code: 'TOOLS / 02' },
  { name: 'Local commerce', title: 'A delivery network begins at the handoff.', text: 'For Hajiganj, the first question is whether kitchens, riders, and customers can coordinate a few reliable routes. That is the premise of the local commerce pilot concept.', stage: 'CONCEPT', href: '/work/local-commerce/', project: 'Local Commerce', code: 'LOCAL / 03' },
  { name: 'Applied AI', title: 'Before AI writes the pitch, someone should be able to check the research.', text: 'The AI Sales Employee concept puts prospect evidence beside the outreach draft, so a reviewer can check the details before a message leaves their desk.', stage: 'CONCEPT', href: '/work/sales-workflows/', project: 'AI Sales Employee', code: 'AI / 04' }
];

const field = `<section class="signal-section" id="signal" aria-labelledby="signal-heading">
  <div class="section-heading reveal"><p class="eyebrow"><i></i>01 / THE SIGNAL FIELD</p>
    <h2 id="signal-heading">Start where<br><em>the friction is.</em></h2>
    <p>Four projects, each shaped by a different problem. Scroll through the stories or choose a project to see the field change.</p>
  </div>
  <div class="signal-layout">
    <div class="signal-board" data-scene="0">
      <div class="signal-bar"><span><i></i> OOYI / SIGNAL FIELD</span><span id="signal-code">${chapters[0].code}</span></div>
      <div class="signal-art">
        <span class="coordinate coordinate-a" aria-hidden="true">FIG. 01</span><span class="coordinate coordinate-b" aria-hidden="true">+ ─── +</span>
        <svg id="signal-svg" viewBox="0 0 500 400" role="presentation" aria-hidden="true">
          <defs><radialGradient id="signal-glow"><stop stop-color="currentColor" stop-opacity=".19"/><stop offset="1" stop-color="currentColor" stop-opacity="0"/></radialGradient></defs>
          <circle cx="250" cy="200" r="190" fill="url(#signal-glow)"/>
          <circle cx="250" cy="200" r="168" class="signal-orbit"/><circle cx="250" cy="200" r="183" class="signal-orbit outer-orbit"/>
          <path class="signal-axis" d="M250 20v360M50 200h400"/>
          <g id="signal-contours">${Array.from({length:25},(_,i)=>`<ellipse cx="250" cy="200" rx="${24+i*5}" ry="${18+i*4.5}" transform="rotate(${i*7} 250 200)"/>`).join('')}</g>
          <g class="signal-cross"><path d="M240 200h20m-10-10v20"/><circle cx="250" cy="200" r="20"/></g>
        </svg>
      </div>
      <div class="signal-readout"><div><span id="signal-stage">${chapters[0].stage}</span><strong id="signal-project">${chapters[0].project}</strong></div><a id="signal-link" href="${chapters[0].href}" aria-label="Open City Sheba project">↗</a></div>
      <nav class="signal-nav" aria-label="Choose a project story">${chapters.map((c,i)=>`<a href="#signal-story-${i+1}" data-signal-select="${i}" ${i===0?'aria-current="true"':''} aria-label="${c.name}">0${i+1}</a>`).join('')}</nav>
    </div>
    <div class="signal-stories">${chapters.map((c,i)=>`<article class="signal-story" id="signal-story-${i+1}" data-signal-story data-code="${c.code}" data-stage="${c.stage}" data-project="${c.project}">
      <p class="micro">0${i+1} / ${c.name}</p><h3>${c.title}</h3><p>${c.text}</p><a class="signal-story-link" href="${c.href}">Explore ${c.project} <span aria-hidden="true">↗</span></a>
    </article>`).join('')}</div>
  </div>
</section>`;

const disciplines = [
  ['01','WEB PRODUCTS','Make complex work easier to follow.','Dashboards, task tools, and shared workspaces that show people what changed and what they can do next.','/work/fieldnotes/','See the Fieldnotes prototype'],
  ['02','MOBILE APPS','Design for the moment someone needs it.','A resident looking for a blood donor has a different task from someone browsing a directory at home. Mobile flows should reflect that urgency.','/work/city-sheba/','See the City Sheba project'],
  ['03','APPLIED AI','Keep the evidence next to the output.','When software drafts a message or suggests an action, the person reviewing it needs a clear way to check the source and edit the result.','/work/sales-workflows/','See the AI Sales Employee concept']
];
export const landingField = field;
export const landingDisciplines = `<section class="section disciplines">
  <div class="section-heading reveal"><p class="eyebrow"><i></i>03 / WHAT WE BUILD</p><h2>Three ways we put software to work.</h2></div>
  <div class="discipline-list">${disciplines.map(([n,area,title,desc,href,label],i)=>`<details class="discipline reveal" ${i===0?'open':''}>
    <summary><span class="micro">${n}</span><span class="discipline-title"><small>${area}</small><strong>${title}</strong></span><span class="discipline-toggle" aria-hidden="true"></span></summary>
    <div class="discipline-body"><p>${desc}</p><a class="signal-story-link" href="${href}">${label} <span aria-hidden="true">↗</span></a></div>
  </details>`).join('')}</div>
</section>`;
export const landingFounding = `<section class="founding reveal"><div class="founding-copy"><p class="eyebrow"><i></i>04 / WHERE WE STARTED</p><h2>Hajiganj gave us our first questions.</h2><p>How do you find a blood donor when time matters? How does a neighborhood kitchen reach customers a few streets away? Obayed and Yasin started OOYI in Bangladesh to build products around questions they could investigate firsthand.</p><a class="button secondary" href="/company/">Meet the founders <span aria-hidden="true">↗</span></a></div><div class="founding-art" aria-hidden="true"><div></div><div></div><div></div><div></div><span class="map-point"></span><span class="map-label">HAJIGANJ<br><small>CHANDPUR · BANGLADESH</small></span></div></section>`;
