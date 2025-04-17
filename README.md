# AI-Powered Subtitle Sync Tool

This web-based tool allows users to synchronize subtitles with audio or video files. The tool automatically syncs subtitles based on speech-to-text results or lets users manually adjust the timing through a simple drag-and-sync feature. It also provides a language detection system to identify the language of uploaded subtitle files.

## Features
- **Automatic Subtitle Sync**: Sync subtitles with audio/video using speech recognition (Web Speech API or offline model).
- **Manual Sync**: Drag and drop subtitles to adjust timings.
- **Waveform Visualization**: View and interact with audio/video waveforms.
- **Subtitle Preview**: Preview synced subtitles and adjust them as needed.
- **Language Auto-Detection**: Automatically detect the language of subtitles using the `franc` language detection library.
- **Export Subtitles**: Export the synchronized subtitles as `.srt` files.

## Technologies Used
- **Frontend**:
  - HTML5, CSS3, JavaScript (Vanilla)
  - [WaveSurfer.js](https://wavesurfer-js.org/): To render the audio waveform
  - [Franc](https://github.com/wooorm/franc): For language detection
- **Libraries**:
  - Web Speech API (for speech recognition)
  - HTML5 File API (for uploading files)

## Getting Started

To run the project locally, follow these steps:

### Prerequisites
- **Browser**: A modern browser like Chrome, Firefox, or Edge (supporting Web Speech API).
- **Local Server**: If you want to run it locally on your machine, you can use any static file server (e.g., VS Code Live Server extension or Python's HTTP server).

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/AI-Powered-Subtitle-Sync-Tool.git
   cd AI-Powered-Subtitle-Sync-Tool

2. **Open the Project**:

```Open index.html directly in your browser or use a local server to view it.
Usage
Upload Video/Audio:
--Click on the Upload Video/Audio button to upload your media file (MP4, MP3, WAV, etc.).

Upload Subtitle:
--Upload the subtitle file (.srt or .txt format) containing the raw subtitles (without timestamps).

Auto-Sync:
--The tool will automatically sync the subtitle with the audio based on speech recognition.

Manual Sync:
--If the timing isn't perfect, click and drag the subtitle items to adjust them.

Export Subtitles:
--Once you're satisfied with the sync, click on the "Export" button to download the synced subtitle in .srt format.

Deployment
--You can deploy the project using GitHub Pages or Vercel. Just push the code to your GitHub repository, and set it up on the hosting service.

Contributing
--Feel free to fork the repository and submit pull requests. We welcome improvements and new features. If you find any issues, please open an issue on the GitHub repository.
