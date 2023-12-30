let audioContext;
let bufferSource;

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

    const pitchMap = {
        'C': 1.0,
        'Db': 1.05946,
        'D': 1.12246,
        'Eb': 1.18921,
        'E': 1.25992
        // Add more notes and their pitch adjustments
    };

    const pitch = pitchMap[note] || 1.0;

    if (bufferSource) {
        bufferSource.stop();
        bufferSource.disconnect();
    }

    bufferSource = audioContext.createBufferSource();

    const gainNode = audioContext.createGain();
    const audioBuffer = audioContext.createBuffer(1, 1, audioContext.sampleRate);
    
    bufferSource.buffer = audioBuffer;
    bufferSource.connect(gainNode);
    gainNode.connect(audioContext.destination);

    gainNode.gain.setValueAtTime(1, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.5);

    bufferSource.playbackRate.setValueAtTime(pitch, audioContext.currentTime);
    bufferSource.detune.setValueAtTime(0, audioContext.currentTime);

    bufferSource.start();
}
