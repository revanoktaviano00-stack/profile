document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('video');
    const pNodes = Array.from(document.querySelectorAll('#lyrics p'));
    const lines = pNodes.map(p => ({
        el: p,
        start: parseFloat(p.dataset.start) || 0,
        end: parseFloat(p.dataset.end) || Infinity
    }));

    function updateActive() {
        const t = video.currentTime;
        let activeIndex = -1;
        for (let i = 0; i < lines.length; i++) {
            if (t >= lines[i].start && t < lines[i].end) {
                activeIndex = i;
                break;
            }
        }
        lines.forEach((ln, idx) => ln.el.classList.toggle('active', idx === activeIndex));
        // Removed automatic scrolling to avoid moving the view unexpectedly.
        // If you want a button to jump to the active line, I can add one.
    }


    video.addEventListener('timeupdate', updateActive);

    // Help autoplay in browsers by muting and attempting to play.
    // If user wants sound, they can unmute manually.
    try {
        const playPromise = video.play();
        if (playPromise && typeof playPromise.then === 'function') {
            playPromise.catch((err) => { console.warn('Autoplay prevented by browser:', err); });
        }
    } catch (e) {
        console.warn('Error attempting to play video:', e);
    }

    // Ensure user clicks will unmute and play the video (useful when autoplay with sound is blocked).
    document.addEventListener('click', () => {
        try {
            if (video) {
                video.muted = false;
                video.play().catch(() => {});
            }
        } catch (err) {
            console.warn('Error playing on user click:', err);
        }
    });
});
