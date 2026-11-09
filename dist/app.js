const menu = document.querySelector('.menu');
const nav = document.querySelector('#primary');
menu.addEventListener('click', () => {
  menu.setAttribute('aria-expanded', String(nav.classList.toggle('open')));
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && nav.classList.contains('open')) {
    nav.classList.remove('open');
    menu.setAttribute('aria-expanded', 'false');
    menu.focus();
  }
});

if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.classList.add('has-motion');
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('shown');
        observer.unobserve(entry.target);
      }
    }
  });
  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
}

const filters = [...document.querySelectorAll('[data-filter]')];
const projects = [...document.querySelectorAll('.project[data-status]')];
for (const filter of filters) {
  filter.addEventListener('click', () => {
    for (const option of filters) option.setAttribute('aria-pressed', String(option === filter));
    for (const project of projects) {
      project.hidden = filter.dataset.filter !== 'All' && filter.dataset.filter !== project.dataset.status;
    }
    const count = projects.filter((project) => !project.hidden).length;
    document.querySelector('#count').textContent = count + (count === 1 ? ' project' : ' projects');
  });
}

const brief = document.querySelector('#brief');
brief?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(brief);
  const content = ['OOYI project brief', '', 'Name: ' + data.get('name'), 'Email: ' + data.get('email'), 'Area: ' + data.get('type'), '', data.get('problem')].join('\n');
  const url = URL.createObjectURL(new Blob([content], { type: 'text/plain' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = 'OOYI-project-brief.txt';
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  document.querySelector('#brief-status').textContent = 'Brief ready. Share the downloaded file with your OOYI contact.';
});

const demo = document.querySelector('#notes-demo');
demo?.addEventListener('submit', (event) => {
  event.preventDefault();
  const tasks = document.querySelector('#note-input').value.split('\n').map((line) => line.trim()).filter(Boolean);
  const list = document.querySelector('#task-list');
  list.replaceChildren();
  for (const task of tasks) {
    const item = document.createElement('li');
    const label = document.createElement('label');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.setAttribute('aria-label', 'Mark task complete');
    const text = document.createElement('input');
    text.type = 'text';
    text.value = task;
    text.setAttribute('aria-label', 'Edit draft task');
    const source = document.createElement('small');
    source.textContent = 'Source: ' + task;
    label.append(checkbox, text);
    item.append(label, source);
    list.append(item);
  }
});

const signal = document.querySelector('.signal-section');
if (signal) {
  const board = signal.querySelector('.signal-board');
  const stories = [...signal.querySelectorAll('[data-signal-story]')];
  const selectors = [...signal.querySelectorAll('[data-signal-select]')];
  const contours = signal.querySelector('#signal-contours');
  const progress = document.querySelector('.reading-progress');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const paths = [...contours.children].map((ellipse) => {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    ellipse.replaceWith(path);
    return path;
  });

  let active = -1;
  let sceneFrame;
  let scrollFrame;
  let rendered;
  let pinnedTarget;

  // Project four distinct fields onto a common set of points for a continuous morph.
  function createField(scene) {
    return paths.map((_, index) => {
      const radius = 19 + index * 5.7;
      const angleOffset = index * .026;
      return Array.from({ length: 73 }, (_, point) => {
        const angle = point * Math.PI / 36;
        const wave = Math.sin(angle * (scene + 2) + angleOffset * (scene + 2));
        const ripple = Math.cos(angle * 3 - index * .11);
        const width = radius * (1 + wave * [.11, .16, .19, .24][scene] + ripple * .075);
        const x = width * Math.cos(angle + angleOffset);
        const y = width * Math.sin(angle + angleOffset) * [.79, .68, .76, .88][scene];
        const tilt = [.28, -.52, .53, -.23][scene];
        return [
          250 + x * Math.cos(tilt) - y * Math.sin(tilt),
          200 + x * Math.sin(tilt) + y * Math.cos(tilt)
        ];
      });
    });
  }

  const fields = stories.map((_, index) => createField(index));
  function draw(points) {
    rendered = points;
    paths.forEach((path, index) => {
      const segments = points[index].map(([x, y], point) => (point === 0 ? 'M' : 'L') + x.toFixed(1) + ' ' + y.toFixed(1));
      path.setAttribute('d', segments.join('') + 'Z');
    });
  }

  function select(index) {
    if (index === active) return;
    active = index;
    const story = stories[index];
    const link = board.querySelector('#signal-link');
    board.dataset.scene = String(index);
    board.querySelector('#signal-code').textContent = story.dataset.code;
    board.querySelector('#signal-stage').textContent = story.dataset.stage;
    board.querySelector('#signal-project').textContent = story.dataset.project;
    link.href = story.querySelector('a').href;
    link.setAttribute('aria-label', 'Open ' + story.dataset.project + ' project');
    selectors.forEach((selector, position) => {
      if (position === index) selector.setAttribute('aria-current', 'true');
      else selector.removeAttribute('aria-current');
    });

    cancelAnimationFrame(sceneFrame);
    const destination = fields[index];
    if (!rendered || motion.matches) {
      draw(destination);
      return;
    }
    const origin = rendered;
    const started = performance.now();
    function transition(now) {
      const elapsed = Math.min(1, Math.max(0, (now - started) / 670));
      const blend = 1 - (1 - elapsed) ** 3;
      draw(origin.map((ring, row) => ring.map((point, col) =>
        point.map((value, axis) => value + (destination[row][col][axis] - value) * blend)
      )));
      if (elapsed < 1) sceneFrame = requestAnimationFrame(transition);
    }
    sceneFrame = requestAnimationFrame(transition);
  }

  function updateScroll() {
    scrollFrame = undefined;
    const height = document.documentElement.scrollHeight - innerHeight;
    progress.style.setProperty('--progress', String(height > 0 ? Math.min(1, scrollY / height) : 0));
    const compact = matchMedia('(max-width: 720px) and (min-height: 581px)').matches;
    const threshold = compact ? board.getBoundingClientRect().bottom + 45 : innerHeight * .43;
    let index = 0;
    stories.forEach((story, position) => {
      if (story.getBoundingClientRect().top <= threshold) index = position;
    });
    if (pinnedTarget !== undefined && pinnedTarget !== index) return;
    pinnedTarget = undefined;
    select(index);
  }

  function scheduleScroll() {
    if (scrollFrame === undefined) scrollFrame = requestAnimationFrame(updateScroll);
  }

  for (const selector of selectors) {
    selector.addEventListener('click', () => {
      pinnedTarget = Number(selector.dataset.signalSelect);
      select(pinnedTarget);
    });
  }
  // Resume scroll-driven selection when the visitor takes over from an anchor jump.
  for (const event of ['wheel', 'touchstart', 'keydown']) {
    window.addEventListener(event, () => { pinnedTarget = undefined; }, { passive: true });
  }
  addEventListener('scroll', scheduleScroll, { passive: true });
  addEventListener('resize', scheduleScroll, { passive: true });
  motion.addEventListener('change', () => {
    cancelAnimationFrame(sceneFrame);
    draw(fields[active]);
  });
  select(0);
  scheduleScroll();
}
