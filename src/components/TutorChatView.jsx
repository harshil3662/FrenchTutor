import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff, Volume2, Languages, Sparkles, RefreshCw, MessageSquare, MapPin, CheckCircle2, ChevronDown } from 'lucide-react';
import { ROLEPLAY_SCENARIOS } from '../data/scenariosData.js';
import { speakFrench, startFrenchSpeechRecognition, isSpeechRecognitionSupported, playChime } from '../utils/audioUtils.js';

export const TutorChatView = ({
  activeLevel,
  audioSpeed,
  onAwardXp,
}) => {
  const [selectedScenario, setSelectedScenario] = useState(ROLEPLAY_SCENARIOS[0]);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingRecognizer, setRecordingRecognizer] = useState(null);
  const [showTranslations, setShowTranslations] = useState({});
  const messagesEndRef = useRef(null);

  // Initialize messages when scenario changes
  useEffect(() => {
    const starterId = `msg-start-${selectedScenario.id}`;
    setMessages([
      {
        id: starterId,
        role: 'tutor',
        content: selectedScenario.starterMessage,
        translation: selectedScenario.starterTranslation,
        feedback: {
          grammarTip: `Conseil : Répondez poliment en utilisant "Bonjour" et des formules de politesse (s'il vous plaît).`,
          vocabularyHighlight: selectedScenario.suggestedPhrases.slice(0, 2).map((p) => `${p.french} (${p.english})`),
        },
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    setShowTranslations({ [starterId]: false });
  }, [selectedScenario]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend) => {
    const text = (textToSend || inputText).trim();
    if (!text || isLoading) return;

    const userMessageId = `user-${Date.now()}`;
    const userMsg = {
      id: userMessageId,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newHistory.map((m) => ({ role: m.role, content: m.content })),
          scenario: `${selectedScenario.frenchTitle} - ${selectedScenario.location} (${selectedScenario.description})`,
          level: activeLevel,
          userGoal: 'Conversational fluency and grammatical confidence in French',
        }),
      });

      if (!response.ok) {
        throw new Error('Server returned an error');
      }

      const data = await response.json();
      const tutorMsgId = `tutor-${Date.now()}`;
      const tutorMsg = {
        id: tutorMsgId,
        role: 'tutor',
        content: data.reply || 'Très bien ! Continuons notre échange.',
        translation: data.translation || 'Very well! Let us continue our exchange.',
        feedback: data.feedback,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, tutorMsg]);
      onAwardXp(15);
      playChime('correct');

      // Auto-play tutor voice
      speakFrench(tutorMsg.content, audioSpeed);
    } catch (error) {
      console.error('Chat error:', error);
      // Fallback message
      const fallbackMsg = {
        id: `tutor-fb-${Date.now()}`,
        role: 'tutor',
        content: "C'est très bien ! Vous vous exprimez avec clarté. Que souhaitez-vous ajouter ?",
        translation: "That's very good! You express yourself with clarity. What would you like to add?",
        feedback: {
          grammarTip: "Astuce : Continuez à utiliser des phrases complètes pour développer vos automatismes.",
          vocabularyHighlight: ["Bravo ! (Well done!)"],
        },
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleVoiceRecording = () => {
    if (isRecording) {
      recordingRecognizer?.stop();
      setIsRecording(false);
      return;
    }

    if (!isSpeechRecognitionSupported()) {
      alert("Speech recognition is not supported in this browser. Please type your message.");
      return;
    }

    const recognizer = startFrenchSpeechRecognition(
      (transcript) => {
        setInputText(transcript);
      },
      (error) => {
        console.warn('Speech recognition error:', error);
        setIsRecording(false);
      },
      () => {
        setIsRecording(false);
      }
    );

    if (recognizer) {
      setRecordingRecognizer(recognizer);
      setIsRecording(true);
    }
  };

  const toggleTranslation = (msgId) => {
    setShowTranslations((prev) => ({
      ...prev,
      [msgId]: !prev[msgId],
    }));
  };

  return (
    <div id="tutor-chat-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Left Sidebar: Scenarios & Objectives */}
      <div className="lg:col-span-1 space-y-4">
        {/* Scenario Picker */}
        <div className="bg-white border border-[#E8E2D9] rounded-3xl p-5 shadow-sm space-y-3">
          <div className="flex items-center space-x-2 text-[#34342E] font-bold text-sm font-serif">
            <MapPin className="w-4 h-4 text-[#5A5A40]" />
            <h3>Immersion Scenarios</h3>
          </div>

          <div className="space-y-2">
            {ROLEPLAY_SCENARIOS.map((sc) => {
              const isSelected = sc.id === selectedScenario.id;
              return (
                <button
                  key={sc.id}
                  id={`scenario-btn-${sc.id}`}
                  onClick={() => setSelectedScenario(sc)}
                  className={`w-full text-left p-3 rounded-2xl transition-all cursor-pointer flex items-center space-x-3 border ${
                    isSelected
                      ? 'bg-[#FAF3EE] border-[#D98E73]/50 text-[#34342E] shadow-xs'
                      : 'bg-[#F5F5F0] border-[#E8E2D9] text-[#525248] hover:bg-[#EAE6DF] hover:text-[#34342E]'
                  }`}
                >
                  <span className="text-2xl flex-shrink-0">{sc.icon}</span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold truncate text-[#34342E] font-serif">{sc.frenchTitle}</p>
                    <p className="text-[11px] text-[#7A7A6A] truncate">{sc.title}</p>
                    <span className="inline-block mt-1 text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#F0ECE1] text-[#5A5A40] border border-[#5A5A40]/15">
                      Level {sc.level}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Current Scenario Info & Objectives */}
        <div className="bg-white border border-[#E8E2D9] rounded-3xl p-5 shadow-sm space-y-3">
          <div className="flex items-center space-x-2.5">
            <span className="text-3xl">{selectedScenario.character.avatar}</span>
            <div>
              <h4 className="text-xs font-bold text-[#34342E] font-serif">{selectedScenario.character.name}</h4>
              <p className="text-[11px] text-[#5A5A40] font-semibold">{selectedScenario.character.role}</p>
            </div>
          </div>
          <p className="text-xs text-[#525248] italic leading-relaxed">{selectedScenario.description}</p>

          <div className="pt-2 border-t border-[#E8E2D9]">
            <h5 className="text-[11px] font-bold uppercase tracking-wider text-[#7A7A6A] mb-2">
              Conversation Goals
            </h5>
            <ul className="space-y-1.5 text-xs text-[#525248]">
              {selectedScenario.recommendedObjectives.map((obj, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#5A7A5A] flex-shrink-0 mt-0.5" />
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="lg:col-span-3 bg-white border border-[#E8E2D9] rounded-3xl flex flex-col h-[78vh] shadow-sm overflow-hidden">
        {/* Chat Header */}
        <div className="px-6 py-4 bg-[#F5F5F0]/90 border-b border-[#E8E2D9] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <span className="text-3xl">{selectedScenario.character.avatar}</span>
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#5A7A5A] border-2 border-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-sm font-bold text-[#34342E] font-serif">Émile — French AI Tutor</h3>
                <span className="bg-[#EEF4EE] text-[#3A5A3A] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#5A7A5A]/20">
                  Online
                </span>
              </div>
              <p className="text-xs text-[#7A7A6A]">
                Setting: <span className="text-[#34342E] font-semibold">{selectedScenario.frenchTitle}</span> • {selectedScenario.location}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              const starterId = `msg-start-${selectedScenario.id}-${Date.now()}`;
              setMessages([
                {
                  id: starterId,
                  role: 'tutor',
                  content: selectedScenario.starterMessage,
                  translation: selectedScenario.starterTranslation,
                  feedback: {
                    grammarTip: `Tip: Respond politely in French using greetings and courteous expressions.`,
                  },
                  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                },
              ]);
            }}
            className="p-2 text-[#7A7A6A] hover:text-[#34342E] hover:bg-[#EAE6DF] rounded-xl text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Reset conversation"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline font-semibold">Reset</span>
          </button>
        </div>

        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-[#FAF7F2]/60">
          {messages.map((msg) => {
            const isUser = msg.role === 'user';
            const isTranslated = showTranslations[msg.id];

            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1`}
              >
                <div
                  className={`max-w-2xl rounded-2xl p-4 shadow-xs ${
                    isUser
                      ? 'bg-[#5A5A40] text-white rounded-br-xs'
                      : 'bg-white text-[#34342E] border border-[#E8E2D9] rounded-bl-xs'
                  }`}
                >
                  {/* French content */}
                  <p className="text-sm sm:text-base leading-relaxed">{msg.content}</p>

                  {/* English Translation Toggle */}
                  {msg.translation && (
                    <div className="mt-2 pt-2 border-t border-[#E8E2D9]">
                      {isTranslated ? (
                        <p className="text-xs text-[#7A7A6A] italic font-serif">{msg.translation}</p>
                      ) : null}
                      <button
                        onClick={() => toggleTranslation(msg.id)}
                        className={`flex items-center gap-1 text-[11px] font-semibold mt-1 transition-colors cursor-pointer ${
                          isUser ? 'text-white/80 hover:text-white' : 'text-[#5A5A40] hover:text-[#3E3E2C]'
                        }`}
                      >
                        <Languages className="w-3 h-3" />
                        <span>{isTranslated ? 'Hide translation' : 'Show translation'}</span>
                      </button>
                    </div>
                  )}

                  {/* Audio Speaker & Actions */}
                  {!isUser && (
                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#E8E2D9]/60 text-xs text-[#7A7A6A]">
                      <button
                        onClick={() => speakFrench(msg.content, audioSpeed)}
                        className="flex items-center gap-1.5 text-[#5A5A40] hover:text-[#3E3E2C] font-bold cursor-pointer"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Listen</span>
                      </button>
                      <span className="text-[10px] text-[#7A7A6A]">{msg.timestamp}</span>
                    </div>
                  )}
                </div>

                {/* AI Tutor Feedback Pill / Correction for user mistakes */}
                {msg.feedback && (msg.feedback.correction || msg.feedback.betterAlternative || msg.feedback.grammarTip) && (
                  <div className="max-w-2xl bg-[#FAF3EE] border border-[#D98E73]/40 rounded-2xl p-4 text-xs text-[#5C382A] space-y-1.5 mt-1 animate-in fade-in shadow-xs">
                    <div className="flex items-center space-x-1.5 font-bold text-[#9C4B2E]">
                      <Sparkles className="w-3.5 h-3.5 text-[#D98E73]" />
                      <span className="font-serif">Émile's Pedagogical Feedback</span>
                    </div>

                    {msg.feedback.correction && (
                      <p>
                        <strong className="text-[#C05C54]">Correction:</strong> {msg.feedback.correction}
                      </p>
                    )}

                    {msg.feedback.betterAlternative && (
                      <p>
                        <strong className="text-[#5A7A5A]">More Natural Phrasing:</strong> {msg.feedback.betterAlternative}
                      </p>
                    )}

                    {msg.feedback.grammarTip && (
                      <p className="text-[#525248]">
                        <strong>💡 Language Tip:</strong> {msg.feedback.grammarTip}
                      </p>
                    )}

                    {msg.feedback.vocabularyHighlight && msg.feedback.vocabularyHighlight.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {msg.feedback.vocabularyHighlight.map((voc, i) => (
                          <span
                            key={i}
                            className="bg-white text-[#9C4B2E] border border-[#D98E73]/30 text-[10px] font-semibold px-2 py-0.5 rounded-md"
                          >
                            {voc}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-center space-x-2 text-[#7A7A6A] text-xs p-3 bg-white border border-[#E8E2D9] rounded-2xl w-max shadow-xs">
              <div className="w-2 h-2 rounded-full bg-[#5A5A40] animate-pulse" />
              <div className="w-2 h-2 rounded-full bg-[#5A5A40] animate-pulse delay-150" />
              <div className="w-2 h-2 rounded-full bg-[#5A5A40] animate-pulse delay-300" />
              <span className="text-[#34342E] font-medium ml-1">Émile is typing in French...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Quick Response Chips */}
        <div className="px-4 py-2 bg-[#F5F5F0] border-t border-[#E8E2D9] overflow-x-auto no-scrollbar flex space-x-2">
          {selectedScenario.suggestedPhrases.map((phrase, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(phrase.french)}
              className="text-xs bg-white hover:bg-[#FAF3EE] hover:border-[#D98E73]/50 text-[#5A5A40] hover:text-[#9C4B2E] border border-[#DCDCCF] px-3.5 py-1.5 rounded-full whitespace-nowrap transition-all flex items-center space-x-1.5 cursor-pointer font-medium shadow-xs"
            >
              <span>💬 {phrase.french}</span>
            </button>
          ))}
        </div>

        {/* Chat Input Bar */}
        <div className="p-4 bg-white border-t border-[#E8E2D9] flex items-center space-x-2">
          {/* Speech-to-Text Button */}
          <button
            id="mic-record-btn"
            onClick={handleToggleVoiceRecording}
            className={`p-3 rounded-2xl border transition-all cursor-pointer ${
              isRecording
                ? 'bg-[#D98E73] text-white border-[#D98E73] animate-pulse shadow-md shadow-[#D98E73]/30'
                : 'bg-[#F5F5F0] text-[#5A5A40] border-[#DCDCCF] hover:text-[#34342E] hover:bg-[#EAE6DF]'
            }`}
            title={isRecording ? 'Stop recording' : 'Speak French (Microphone)'}
          >
            {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          {/* Text Input */}
          <input
            id="tutor-chat-input"
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={
              isRecording ? 'Listening to your French speech...' : 'Type your message in French...'
            }
            className="flex-1 bg-[#F5F5F0] border border-[#DCDCCF] focus:border-[#5A5A40] rounded-2xl px-4 py-3 text-sm text-[#34342E] focus:outline-none placeholder-[#7A7A6A]"
          />

          {/* Send Button */}
          <button
            id="send-message-btn"
            disabled={!inputText.trim() || isLoading}
            onClick={() => handleSendMessage()}
            className="p-3 bg-[#5A5A40] hover:bg-[#4A4A35] disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-2xl font-bold shadow-sm transition-all cursor-pointer"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
