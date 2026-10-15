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
  const chatContainerRef = useRef(null);
  const isInitialMount = useRef(true);

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
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = 0;
    }
  }, [selectedScenario]);

  // Only scroll the internal messages container on new messages, never the window
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
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
        <div className="bg-white border border-[#E6DCC8] rounded-3xl p-5 shadow-sm space-y-3">
          <div className="flex items-center space-x-2 text-[#1B2433] font-bold text-sm font-serif">
            <MapPin className="w-4 h-4 text-[#1F3A5F]" />
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
                      ? 'bg-[#FCF0EE] border-[#C23B3B]/50 text-[#1B2433] shadow-xs'
                      : 'bg-[#F7F2E7] border-[#E6DCC8] text-[#1F3A5F] hover:bg-[#E9E2D2] hover:text-[#1B2433]'
                  }`}
                >
                  <span className="text-2xl flex-shrink-0">{sc.icon}</span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold truncate text-[#1B2433] font-serif">{sc.frenchTitle}</p>
                    <p className="text-[11px] text-[#5F6B7A] truncate">{sc.title}</p>
                    <span className="inline-block mt-1 text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#F2EBDC] text-[#1F3A5F] border border-[#1F3A5F]/15">
                      Level {sc.level}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Current Scenario Info & Objectives */}
        <div className="bg-white border border-[#E6DCC8] rounded-3xl p-5 shadow-sm space-y-3">
          <div className="flex items-center space-x-2.5">
            <span className="text-3xl">{selectedScenario.character.avatar}</span>
            <div>
              <h4 className="text-xs font-bold text-[#1B2433] font-serif">{selectedScenario.character.name}</h4>
              <p className="text-[11px] text-[#1F3A5F] font-semibold">{selectedScenario.character.role}</p>
            </div>
          </div>
          <p className="text-xs text-[#1F3A5F] italic leading-relaxed">{selectedScenario.description}</p>

          <div className="pt-2 border-t border-[#E6DCC8]">
            <h5 className="text-[11px] font-bold uppercase tracking-wider text-[#5F6B7A] mb-2">
              Conversation Goals
            </h5>
            <ul className="space-y-1.5 text-xs text-[#1F3A5F]">
              {selectedScenario.recommendedObjectives.map((obj, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2F6F57] flex-shrink-0 mt-0.5" />
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="lg:col-span-3 bg-white border border-[#E6DCC8] rounded-3xl flex flex-col h-[78vh] shadow-sm overflow-hidden">
        {/* Chat Header */}
        <div className="px-6 py-4 bg-[#F7F2E7]/90 border-b border-[#E6DCC8] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <span className="text-3xl">{selectedScenario.character.avatar}</span>
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#2F6F57] border-2 border-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-sm font-bold text-[#1B2433] font-serif">Émile — French Conversation Tutor</h3>
                <span className="bg-[#E9F3EE] text-[#2F6F57] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#2F6F57]/20">
                  Online
                </span>
              </div>
              <p className="text-xs text-[#5F6B7A]">
                Setting: <span className="text-[#1B2433] font-semibold">{selectedScenario.frenchTitle}</span> • {selectedScenario.location}
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
            className="p-2 text-[#5F6B7A] hover:text-[#1B2433] hover:bg-[#E9E2D2] rounded-xl text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Reset conversation"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline font-semibold">Reset</span>
          </button>
        </div>

        {/* Messages Stream */}
        <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-[#FBF7EE]/60">
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
                      ? 'bg-[#C23B3B] text-white rounded-br-xs'
                      : 'bg-white text-[#1B2433] border border-[#E6DCC8] rounded-bl-xs'
                  }`}
                >
                  {/* French content */}
                  <p className="text-sm sm:text-base leading-relaxed">{msg.content}</p>

                  {/* English Translation Toggle */}
                  {msg.translation && (
                    <div className="mt-2 pt-2 border-t border-[#E6DCC8]">
                      {isTranslated ? (
                        <p className="text-xs text-[#5F6B7A] italic font-serif">{msg.translation}</p>
                      ) : null}
                      <button
                        onClick={() => toggleTranslation(msg.id)}
                        className={`flex items-center gap-1 text-[11px] font-semibold mt-1 transition-colors cursor-pointer ${
                          isUser ? 'text-white/80 hover:text-white' : 'text-[#1F3A5F] hover:text-[#1F3A5F]'
                        }`}
                      >
                        <Languages className="w-3 h-3" />
                        <span>{isTranslated ? 'Hide translation' : 'Show translation'}</span>
                      </button>
                    </div>
                  )}

                  {/* Audio Speaker & Actions */}
                  {!isUser && (
                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#E6DCC8]/60 text-xs text-[#5F6B7A]">
                      <button
                        onClick={() => speakFrench(msg.content, audioSpeed)}
                        className="flex items-center gap-1.5 text-[#1F3A5F] hover:text-[#1F3A5F] font-bold cursor-pointer"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Listen</span>
                      </button>
                      <span className="text-[10px] text-[#5F6B7A]">{msg.timestamp}</span>
                    </div>
                  )}
                </div>

                {/* Tutor Feedback Pill / Correction for user mistakes */}
                {msg.feedback && (msg.feedback.correction || msg.feedback.betterAlternative || msg.feedback.grammarTip) && (
                  <div className="max-w-2xl bg-[#FCF0EE] border border-[#C23B3B]/40 rounded-2xl p-4 text-xs text-[#1B2433] space-y-1.5 mt-1 animate-in fade-in shadow-xs">
                    <div className="flex items-center space-x-1.5 font-bold text-[#C23B3B]">
                      <Sparkles className="w-3.5 h-3.5 text-[#C23B3B]" />
                      <span className="font-serif">Émile's Pedagogical Feedback</span>
                    </div>

                    {msg.feedback.correction && (
                      <p>
                        <strong className="text-[#C23B3B]">Correction:</strong> {msg.feedback.correction}
                      </p>
                    )}

                    {msg.feedback.betterAlternative && (
                      <p>
                        <strong className="text-[#2F6F57]">More Natural Phrasing:</strong> {msg.feedback.betterAlternative}
                      </p>
                    )}

                    {msg.feedback.grammarTip && (
                      <p className="text-[#1F3A5F]">
                        <strong>💡 Language Tip:</strong> {msg.feedback.grammarTip}
                      </p>
                    )}

                    {msg.feedback.vocabularyHighlight && msg.feedback.vocabularyHighlight.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {msg.feedback.vocabularyHighlight.map((voc, i) => (
                          <span
                            key={i}
                            className="bg-white text-[#C23B3B] border border-[#C23B3B]/30 text-[10px] font-semibold px-2 py-0.5 rounded-md"
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
            <div className="flex items-center space-x-2 text-[#5F6B7A] text-xs p-3 bg-white border border-[#E6DCC8] rounded-2xl w-max shadow-xs">
              <div className="w-2 h-2 rounded-full bg-[#C23B3B] animate-pulse" />
              <div className="w-2 h-2 rounded-full bg-[#C23B3B] animate-pulse delay-150" />
              <div className="w-2 h-2 rounded-full bg-[#C23B3B] animate-pulse delay-300" />
              <span className="text-[#1B2433] font-medium ml-1">Émile is typing in French...</span>
            </div>
          )}
        </div>

        {/* Suggested Quick Response Chips */}
        <div className="px-4 py-2 bg-[#F7F2E7] border-t border-[#E6DCC8] overflow-x-auto no-scrollbar flex space-x-2">
          {selectedScenario.suggestedPhrases.map((phrase, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(phrase.french)}
              className="text-xs bg-white hover:bg-[#FCF0EE] hover:border-[#C23B3B]/50 text-[#1F3A5F] hover:text-[#C23B3B] border border-[#D9CFBA] px-3.5 py-1.5 rounded-full whitespace-nowrap transition-all flex items-center space-x-1.5 cursor-pointer font-medium shadow-xs"
            >
              <span>💬 {phrase.french}</span>
            </button>
          ))}
        </div>

        {/* Chat Input Bar */}
        <div className="p-4 bg-white border-t border-[#E6DCC8] flex items-center space-x-2">
          {/* Speech-to-Text Button */}
          <button
            id="mic-record-btn"
            onClick={handleToggleVoiceRecording}
            className={`p-3 rounded-2xl border transition-all cursor-pointer ${
              isRecording
                ? 'bg-[#C23B3B] text-white border-[#C23B3B] animate-pulse shadow-md shadow-[#C23B3B]/30'
                : 'bg-[#F7F2E7] text-[#1F3A5F] border-[#D9CFBA] hover:text-[#1B2433] hover:bg-[#E9E2D2]'
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
            className="flex-1 bg-[#F7F2E7] border border-[#D9CFBA] focus:border-[#1F3A5F] rounded-2xl px-4 py-3 text-sm text-[#1B2433] focus:outline-none placeholder-[#5F6B7A]"
          />

          {/* Send Button */}
          <button
            id="send-message-btn"
            disabled={!inputText.trim() || isLoading}
            onClick={() => handleSendMessage()}
            className="p-3 bg-[#C23B3B] hover:bg-[#C23B3B] disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-2xl font-bold shadow-sm transition-all cursor-pointer"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
