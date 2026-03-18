document.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('bg-audio');
  const btn = document.getElementById('play-btn');

  // Try to play (muted autoplay should succeed)
  audio.play().catch(e => console.warn('Autoplay (muted) failed:', e));

  // On first user gesture, unmute and ensure playback
  const enableAudio = () => {
    audio.muted = false;
    audio.play().catch(err => console.warn('Play after gesture failed:', err));
    document.removeEventListener('click', enableAudio);
  };
  document.addEventListener('click', enableAudio, { once: true });

  // Optional: toggle via your button
  btn.addEventListener('click', () => {
    if (audio.paused) audio.play();
    else audio.pause();
  });
});
const stageBtn = document.getElementById('stage-btn');

  if (stageBtn) {
    stageBtn.addEventListener('click', () => {
      // navigate to another page in your project
      window.location.href = 'stage.html';
      // or use: window.location.assign('/path/to/other-page.html');
    });
  }