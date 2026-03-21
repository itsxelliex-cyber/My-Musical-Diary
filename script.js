document.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('bg-audio');
  const audioBtn = document.getElementById('audio-btn') || document.getElementById('play-btn');
  const openBtn = document.getElementById('open-modal');
  const modalContainer = document.querySelector('.modal-container');
  const closeBtn = document.getElementById('close-modal');
  const saveBtn = document.getElementById('save-journal');
  const journal = document.getElementById('journal-text');
  const stageBtn = document.getElementById('stage-btn');

  // AUDIO
  if (audio) {
    audio.addEventListener('error', () => console.error('Audio error', audio.error));
    audio.play().catch(e => console.warn('Autoplay blocked or failed:', e));
  }

  if (audioBtn && audio) {
    audioBtn.addEventListener('click', () => {
      audio.muted = false; 
      if (audio.paused) {
        audio.play().catch(err => console.error('Play failed', err));
        audioBtn.textContent = 'Pause';
      } else {
        audio.pause();
        audioBtn.textContent = 'Play';
      }
    });
  }

  // JOURNAL
  if (journal) journal.value = localStorage.getItem('journal') || '';

  // MODAL
  const showModal = () => {
    if (!modalContainer) return;
    modalContainer.classList.add('show');
    modalContainer.setAttribute('aria-hidden', 'false');
    if (journal) journal.focus();
  };
  const hideModal = () => {
    if (!modalContainer) return;
    modalContainer.classList.remove('show');
    modalContainer.setAttribute('aria-hidden', 'true');
  };

  // events
  if (openBtn) openBtn.addEventListener('click', showModal);
  if (closeBtn) closeBtn.addEventListener('click', hideModal);
  if (modalContainer) {
    modalContainer.addEventListener('click', (e) => {
      if (e.target === modalContainer) hideModal();
    });
  }

  if (saveBtn && journal) {
    saveBtn.addEventListener('click', () => {
      localStorage.setItem('journal', journal.value);
      saveBtn.textContent = 'Saved';
      setTimeout(() => { saveBtn.textContent = 'Save'; }, 900);
    });
  }

  // close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer && modalContainer.classList.contains('show')) {
      hideModal();
    }
  });

  // NAV
  if (stageBtn) {
    stageBtn.addEventListener('click', () => { window.location.href = 'diary.html'; });
  }
});