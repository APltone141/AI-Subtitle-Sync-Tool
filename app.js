// app.js

// Global Variables
let waveSurfer;
let subtitleData = [];  // Store subtitle data including timestamps and text
let draggedWord = null;

// Initialize WaveSurfer
function initWaveSurfer(audioUrl) {
  waveSurfer = WaveSurfer.create({
    container: "#waveform",
    waveColor: "#ddd",
    progressColor: "#3e8e41",
    height: 150,
    responsive: true
  });

  waveSurfer.load(audioUrl);

  // Add event listeners for interaction
  waveSurfer.on('ready', () => {
    console.log("Waveform ready!");
  });

  waveSurfer.on('seek', () => {
    // Update the word highlights during waveform seek
    updateWordHighlights();
  });
}

// Handle Video/Audio File Upload
function handleFileUpload(event) {
  const file = event.target.files[0];
  if (file) {
    const fileUrl = URL.createObjectURL(file);
    initWaveSurfer(fileUrl);
  }
}

// Handle Subtitle File Upload
function handleSubtitleUpload(event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    const subtitleText = e.target.result;
    subtitleData = parseSubtitleFile(subtitleText);
    autoSyncSubtitles();
  };
  reader.readAsText(file);
}

// Parse Subtitle (SRT or TXT)
function parseSubtitleFile(subtitleText) {
  // Implement parsing for .srt or raw text subtitle file
  // This example assumes SRT format: start time --> text
  const subtitles = [];
  const lines = subtitleText.split('\n');
  let currentSubtitle = {};

  lines.forEach((line, index) => {
    if (line.match(/\d+/)) { // Match the index of subtitle (e.g. 1, 2, 3...)
      currentSubtitle.index = line.trim();
    } else if (line.match(/\d{2}:\d{2}:\d{2}/)) { // Match time code (e.g. 00:01:20,000 --> 00:01:22,000)
      currentSubtitle.time = line.trim();
    } else if (line.trim() !== "") { // Add text
      currentSubtitle.text = line.trim();
    } else if (line.trim() === "") {
      if (currentSubtitle.text) {
        subtitles.push(currentSubtitle);
      }
      currentSubtitle = {};
    }
  });
  
  return subtitles;
}

// Auto Sync Subtitles with Speech-to-Text
function autoSyncSubtitles() {
  // Simulating Speech-to-Text Synchronization (Web Speech API or WASM model can be used here)
  let startTime = 0;
  subtitleData.forEach((subtitle, index) => {
    // Assign start and end times based on speech recognition result
    subtitle.start = startTime;
    subtitle.end = startTime + subtitle.text.length / 10;  // Rough estimate for now
    startTime = subtitle.end;
  });
  renderSubtitles();
}

// Render Subtitles on Screen
function renderSubtitles() {
  const subtitleContainer = document.getElementById("subtitle-container");
  subtitleContainer.innerHTML = "";
  
  subtitleData.forEach(subtitle => {
    const subtitleElement = document.createElement("div");
    subtitleElement.classList.add("subtitle-item");
    subtitleElement.textContent = subtitle.text;
    subtitleElement.dataset.index = subtitle.index;
    subtitleElement.dataset.start = subtitle.start;
    subtitleElement.dataset.end = subtitle.end;

    subtitleElement.addEventListener("click", () => {
      waveSurfer.seekTo(subtitle.start / waveSurfer.getDuration());
      highlightWord(subtitle);
    });
    
    subtitleContainer.appendChild(subtitleElement);
  });
}

// Highlight Word in Waveform (Optional: Word-level highlights)
function highlightWord(subtitle) {
  const highlightDuration = subtitle.end - subtitle.start;
  const highlightTime = subtitle.start;
  waveSurfer.play(highlightTime, highlightDuration);
}

// Manual Sync: Drag and Sync Subtitles
function enableWordDrag(wordElement) {
  wordElement.addEventListener('mousedown', (e) => {
    draggedWord = wordElement;
    let initialX = e.clientX;

    function onDragMove(e) {
      const deltaX = e.clientX - initialX;
      draggedWord.style.left = `${draggedWord.offsetLeft + deltaX}px`;
      initialX = e.clientX;
    }

    function onDragEnd() {
      document.removeEventListener('mousemove', onDragMove);
      document.removeEventListener('mouseup', onDragEnd);

      // Update subtitle timestamp
      const newTimestamp = calculateTimestampFromPosition(draggedWord.offsetLeft);
      updateSubtitleTimestamp(draggedWord, newTimestamp);
    }

    document.addEventListener('mousemove', onDragMove);
    document.addEventListener('mouseup', onDragEnd);
  });
}

function calculateTimestampFromPosition(position) {
  const waveLength = waveSurfer.getDuration(); // Get the total duration of the audio/video
  return (position / waveSurfer.container.offsetWidth) * waveLength;
}

function updateSubtitleTimestamp(wordElement, timestamp) {
  const wordIndex = parseInt(wordElement.dataset.index);
  subtitleData[wordIndex].start = timestamp;
  subtitleData[wordIndex].end = timestamp + 3; // Adjust the duration to 3 seconds or whatever is needed
  renderSubtitles();
}

// Language Detection
function detectLanguage(text) {
  const lang = franc(text);
  console.log("Detected Language:", lang);
  return lang;
}

// Initialize Events
document.getElementById('video-upload').addEventListener('change', handleFileUpload);
document.getElementById('subtitle-upload').addEventListener('change', handleSubtitleUpload);

