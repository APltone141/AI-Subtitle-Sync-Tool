// Sync subtitles with audio using timestamps generated by speech-to-text
function syncSubtitlesWithAudio(subtitles, waveform, speechData) {
    // Assuming `speechData` contains words and their corresponding start times
    let syncedSubtitles = subtitles.map(subtitle => {
        const startTime = findTimestampForSubtitle(subtitle.text, speechData);
        subtitle.start = startTime;
        subtitle.end = calculateEndTime(startTime, subtitle.text);
        return subtitle;
    });

    return syncedSubtitles;
}

// Find the timestamp for a specific subtitle based on speech data
function findTimestampForSubtitle(subtitleText, speechData) {
    for (let i = 0; i < speechData.length; i++) {
        if (speechData[i].word.includes(subtitleText)) {
            return speechData[i].startTime; // Use the start time of the word that matches the subtitle text
        }
    }
    return 0; // Default timestamp if not found
}

// Calculate the end time of the subtitle based on its length
function calculateEndTime(startTime, subtitleText) {
    const wordCount = subtitleText.split(' ').length;
    const averageWordDuration = 0.5; // Average word duration in seconds (can be adjusted)
    return startTime + (wordCount * averageWordDuration);
}

// Export the function for external use
export { syncSubtitlesWithAudio };