// Game section colors
const GAME_COLORS = {
  'Bleu':            '#4878d4',
  'Rouge':           '#d44848',
  'Diamant':         '#9a8fd4',
  'Platine':         '#a8b0c8',
  'Heartgold':       '#d4aa40',
  'Or ':             '#d4aa40',
  'Blanc 2':         '#7878a0',
  'Blanc':           '#9898b8',
  'X':               '#3a58c4',
  'Rubis':           '#c43848',
  'Soleil':          '#e89820',
  "Let's go Evoli":  '#f0c838',
  "Let's go Pikachu":'#e8c020',
  'Bouclier':        '#3858cc',
  'Arceus':          '#5a8860',
  'Brillant':        '#68a8f0',
  'Ecarlate':        '#d83838',
};

function colorForSection(h2Text) {
  for (const [key, color] of Object.entries(GAME_COLORS)) {
    if (h2Text.includes(key)) return color;
  }
  return '#c8a44a';
}

// Apply section colors
document.querySelectorAll('section').forEach(section => {
  const h2 = section.querySelector('h2');
  if (!h2) return;
  const color = colorForSection(h2.textContent);
  section.style.setProperty('--section-color', color);
  // Also propagate to child h3 sub-headers
  section.querySelectorAll('h3').forEach(h3 => {
    h3.style.borderLeftColor = color;
  });
});

// Extract pokemon name from popup h3
function getPokemonName(li) {
  const h3 = li.querySelector('.popup h3');
  return h3 ? h3.textContent.trim() : '';
}

// Set data-name on each card
document.querySelectorAll('section > ul > li').forEach(li => {
  const name = getPokemonName(li);
  if (name) li.setAttribute('data-name', name);
});

// Create global tooltip
const tip = document.createElement('div');
tip.id = 'pkmn-tip';
document.body.appendChild(tip);

let currentSection = null;

function positionTip(e) {
  const W = window.innerWidth;
  const H = window.innerHeight;
  const tw = 305;
  const th = tip.offsetHeight || 250;
  const pad = 16;

  let x = e.clientX + 22;
  let y = e.clientY - 20;

  if (x + tw + pad > W) x = e.clientX - tw - 22;
  if (y + th + pad > H) y = H - th - pad;
  if (y < pad) y = pad;
  if (x < pad) x = pad;

  tip.style.left = x + 'px';
  tip.style.top  = y + 'px';
}

document.querySelectorAll('section > ul > li').forEach(li => {
  const popup = li.querySelector('.popup');
  if (!popup) return;

  const section = li.closest('section');
  const color = section ? getComputedStyle(section).getPropertyValue('--section-color').trim() : '#c8a44a';

  li.addEventListener('mouseenter', e => {
    tip.style.setProperty('--tip-color', color);
    tip.innerHTML = popup.innerHTML;
    tip.style.display = 'block';
    // Re-trigger animation
    tip.style.animation = 'none';
    void tip.offsetWidth;
    tip.style.animation = '';
    positionTip(e);
  });

  li.addEventListener('mousemove', positionTip);

  li.addEventListener('mouseleave', () => {
    tip.style.display = 'none';
  });
});
