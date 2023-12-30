let audioContext;

function initAudioContext() {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    document.removeEventListener('click', initAudioContext);
}

document.addEventListener('click', initAudioContext);

function playSound(note) {
    if (!audioContext) {
        console.error('Audio context not initialized. Make sure to click on the page to start audio context.');
        return;
    }

    const audio = new Audio();
    const source = audioContext.createMediaElementSource(audio);
    const gainNode = audioContext.createGain();
    
    source.connect(gainNode);
    gainNode.connect(audioContext.destination);

    audio.src = 'key.mp3'; // Updated path to key.mp3

    const pitchMap = {
        'C': 1.0,
        'Db': 1.05946,
        'D': 1.12246,
        'Eb': 1.18921,
        'E': 1.25992
        // Add more notes and their pitch adjustments
    };

    gainNode.gain.setValueAtTime(1, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.5);

    const pitch = pitchMap[note] || 1.0;
    source.detune.value = 1200 * Math.log2(pitch);

    audio.play();
}
