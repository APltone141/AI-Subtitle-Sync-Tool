function parseSrtFile(srtText) {
    const subtitlePattern = /(\d+)\r?\n(\d{2}:\d{2}:\d{2},\d{3}) --> (\d{2}:\d{2}:\d{2},\d{3})\r?\n([^\r\n]+)/g;
    let result = [];
    let match;

    while ((match = subtitlePattern.exec(srtText)) !== null) {
        result.push({
            index: match[1],
            start: match[2],
            end: match[3],
            text: match[4].replace(/\r?\n/g, ' ') // Handle line breaks in subtitles
        });
    }

    return result;
}