// ...existing code...
document.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('bg-audio');
  const audioBtn = document.getElementById('audio-btn') || document.getElementById('play-btn');

  if (audio) {
    audio.play().catch(e => console.warn('Autoplay (muted) failed:', e));
  }

  if (audioBtn && audio) {
    audioBtn.addEventListener('click', () => {
      if (audio.paused) {
        audio.play().catch(err => console.error(err));
        audioBtn.textContent = 'Pause';
      } else {
        audio.pause();
        audioBtn.textContent = 'Play';
      }
    });
  }

  // modal open/close
  const openBtn = document.getElementById('open-modal');
  const modalContainer = document.querySelector('.modal-container');
  const closeBtn = document.getElementById('close-modal');

  if (openBtn && modalContainer) {
    openBtn.addEventListener('click', () => {
      modalContainer.classList.add('show');
      modalContainer.setAttribute('aria-hidden', 'false');
    });
  }

  if (closeBtn && modalContainer) {
    closeBtn.addEventListener('click', () => {
      modalContainer.classList.remove('show');
      modalContainer.setAttribute('aria-hidden', 'true');
    });
  }

  if (modalContainer) {
    modalContainer.addEventListener('click', (e) => {
      if (e.target === modalContainer) {
        modalContainer.classList.remove('show');
        modalContainer.setAttribute('aria-hidden', 'true');
      }
    });
  }

  // navigation button
  const stageBtn = document.getElementById('stage-btn');
  if (stageBtn) {
    stageBtn.addEventListener('click', () => {
      window.location.href = 'diary.html';
    });
  }
});
 const openBtn = document.getElementById('open-modal');
  const modalContainer = document.querySelector('.modal-container');
  const closeBtn = document.getElementById('close-modal');
  const saveBtn = document.getElementById('save-journal');
  const journal = document.getElementById('journal-text');

  if (journal) {
    journal.value = localStorage.getItem('journal') || '';
  }

  const hideModal = () => {
    if (modalContainer) {
      modalContainer.classList.remove('show');
      modalContainer.setAttribute('aria-hidden', 'true');
    }
  };

  if (openBtn && modalContainer) {
    openBtn.addEventListener('click', () => {
      modalContainer.classList.add('show');
      modalContainer.setAttribute('aria-hidden', 'false');
      if (journal) journal.focus();
    });
  }

  if (closeBtn && modalContainer) {
    closeBtn.addEventListener('click', hideModal);
  }

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

  // allow Esc to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer && modalContainer.classList.contains('show')) {
      hideModal();
    }
  });