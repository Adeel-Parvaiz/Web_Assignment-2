export function speakCommentary(text) {
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);

  utterance.rate   = 1.05; 
  utterance.pitch  = 1.1;   
  utterance.volume = 1.0;  

  const voices = window.speechSynthesis.getVoices();
  const englishVoice = voices.find(v => v.lang.startsWith('en'));
  if (englishVoice) utterance.voice = englishVoice;

  window.speechSynthesis.speak(utterance);
}
