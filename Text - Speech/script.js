const msg = new SpeechSynthesisUtterance();
        let voices = [];
        const languagesDropdown = document.querySelector('[name="language"]');
        const voicesDropdown = document.querySelector('[name="voice"]');
        const options = document.querySelectorAll('[type="range"], [name="text"]');
        const speakButton = document.querySelector('#speak');
        const stopButton = document.querySelector('#stop');
        const volumeSlider = document.querySelector('[name="volume"]');

        // Function to populate voices based on selected language
        function populateVoices() {
            voices = speechSynthesis.getVoices();
            const selectedLanguage = languagesDropdown.value;

            // Filter voices based on selected language
            const filteredVoices = voices.filter(voice => voice.lang.startsWith(selectedLanguage));

            // Handle case where no voices are available for the selected language
            if (filteredVoices.length > 0) {
                voicesDropdown.innerHTML = filteredVoices
                    .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
                    .join('');
                msg.voice = filteredVoices[0]; // Set the default voice
            } else {
                voicesDropdown.innerHTML = `<option value="">No voices available for this language</option>`;
                msg.voice = voices[0]; // Fallback to system default voice
            }
        }

        // Preprocess text to convert emojis and special characters to more readable text
        function preprocessText(text) {
            const emojiMap = {
                "💻": "laptop",
                "😊": "smiling face",
                "🚀": "rocket",
                "🙏": "folded hands",  // Example for Indian culture
                "🌸": "cherry blossom", // Popular in Japanese culture
                "❤️": "heart",
                "🔥": "fire",
                // Add more emojis as needed
            };
            return text.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{2300}-\u{23FF}\u{2B50}\u{2764}]/gu, (match) => emojiMap[match] || match);
        }

        // Set the selected voice
        function setVoice() {
            msg.voice = voices.find(voice => voice.name === this.value);
            toggle();
        }

        // Play the speech
        function toggle(startOver = true) {
            speechSynthesis.cancel();  // Cancel any ongoing speech
            msg.text = preprocessText(document.querySelector('[name="text"]').value); // Preprocess text
            if (startOver) {
                speechSynthesis.speak(msg);  // Speak the current message
            }
        }

        // Update the speech properties (rate, pitch, etc.)
        function setOption() {
            msg[this.name] = this.value;
            toggle();
        }

        // Adjust the volume dynamically
        function setVolume() {
            msg.volume = volumeSlider.value;
            toggle();
        }

        // Set event listeners
        speechSynthesis.addEventListener('voiceschanged', populateVoices);
        languagesDropdown.addEventListener('change', populateVoices);
        voicesDropdown.addEventListener('change', setVoice);
        options.forEach(option => option.addEventListener('input', setOption));
        speakButton.addEventListener('click', toggle);
        stopButton.addEventListener('click', () => speechSynthesis.cancel());
        volumeSlider.addEventListener('input', setVolume);

        // Initialize the voices dropdown once the voices are loaded
        populateVoices();