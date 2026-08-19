const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');
const year = document.getElementById('year');

menuBtn?.addEventListener('click', () => nav.classList.toggle('open'));
nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
if (year) year.textContent = new Date().getFullYear();
