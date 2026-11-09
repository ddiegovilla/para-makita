const cover = document.querySelector('#cover');
const letter = document.querySelector('#letter');
const video = document.querySelector('#memory');
const openButton = document.querySelector('#openLetter');
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
let busy = false;
video.muted = false;
video.defaultMuted = false;
video.volume = 1;
function playWithSound() {
  video.muted = false;
  return video.play();
}
// Browsers may require a gesture before audible playback is allowed.
playWithSound().catch(() => {});
function openLetter() {
  if (busy || !letter.hidden) return;
  // If autoplay was blocked, the first tap starts the actual video with audio.
  if (video.paused) {
    playWithSound().catch(() => {});
    return;
  }
  busy = true;
  cover.classList.add('turning');
  setTimeout(() => {
    cover.hidden = true;
    cover.classList.remove('turning', 'arriving');
    letter.hidden = false;
    letter.classList.add('arriving');
    window.scrollTo(0, 0);
    document.querySelector('#letterTitle').focus({ preventScroll: true });
    busy = false;
  }, reduced ? 0 : 850);
}
function back() {
  if (busy) return;
  letter.hidden = true;
  letter.classList.remove('arriving');
  cover.hidden = false;
  cover.classList.add('arriving');
  window.scrollTo(0, 0);
  if (video.paused) playWithSound().catch(() => {});
  openButton.focus({ preventScroll: true });
}
// Keep the same video playing, including its audio, while the letter is open.
openButton.addEventListener('click', openLetter);
document.querySelector('#back').addEventListener('click', back);
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !letter.hidden) back();
});
