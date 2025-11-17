'use client';

import { useState, useEffect, useRef } from 'react';
import { useDiagnosisStore } from '@/lib/store/diagnosis';
import { Send, Loader2, AlertCircle, Wrench } from 'lucide-react';
import type { ChatRequest, ChatResponse, Message } from '@/lib/types/diagnosis';

export default function DiagnosisChat() {
  const [inputMessage, setInputMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const {
    currentSession,
    addMessage,
    setLoading,
    setError,
    error,
    updateDiagnosis,
  } = useDiagnosisStore();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentSession?.conversation]);

  useEffect(() => {
    if (currentSession && currentSession.conversation.length === 1) {
      // Auto-send first message to get AI's initial response
      sendInitialMessage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSession?.id]);

  const sendInitialMessage = async () => {
    if (!currentSession) return;

    setIsSending(true);
    setLoading(true);
    setError(null);

    try {
      const request: ChatRequest = {
        sessionId: currentSession.id,
        message: currentSession.initialSymptoms,
        vehicle: currentSession.vehicle,
        conversationHistory: currentSession.conversation,
      };

      const response = await fetch('/api/diagnosis/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from AI');
      }

      const data: ChatResponse = await response.json();
      addMessage(data.message);

      if (data.status === 'diagnosed' && data.diagnosis) {
        updateDiagnosis(data.diagnosis);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSending(false);
      setLoading(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || !currentSession || isSending) return;

    const userMessage: Message = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      role: 'user',
      content: inputMessage,
      timestamp: new Date(),
    };

    addMessage(userMessage);
    setInputMessage('');
    setIsSending(true);
    setLoading(true);
    setError(null);

    try {
      const request: ChatRequest = {
        sessionId: currentSession.id,
        message: inputMessage,
        vehicle: currentSession.vehicle,
        conversationHistory: [...currentSession.conversation, userMessage],
      };

      const response = await fetch('/api/diagnosis/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get response from AI');
      }

      const data: ChatResponse = await response.json();
      addMessage(data.message);

      if (data.status === 'diagnosed' && data.diagnosis) {
        updateDiagnosis(data.diagnosis);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSending(false);
      setLoading(false);
    }
  };

  if (!currentSession) {
    return (
      <div className="flex items-center justify-center h-96 text-gray-400">
        <div className="text-center">
          <Wrench className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p>No active diagnosis session</p>
        </div>
      </div>
    );
  }

  const displayMessages = currentSession.conversation.filter(
    (msg) => msg.role !== 'system'
  );

  return (
    <div className="flex flex-col h-[600px] bg-gray-900 rounded-lg border border-gray-800">
      {/* Vehicle Info Header */}
      <div className="px-6 py-4 border-b border-gray-800">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Wrench className="w-4 h-4" />
          <span>
            {currentSession.vehicle.year} {currentSession.vehicle.make}{' '}
            {currentSession.vehicle.model}
          </span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {displayMessages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-3 ${
                message.role === 'user'
                  ? 'bg-amber-600 text-white'
                  : 'bg-gray-800 text-gray-100'
              }`}
            >
              <div className="whitespace-pre-wrap">{message.content}</div>
              <div
                className={`text-xs mt-2 ${
                  message.role === 'user'
                    ? 'text-amber-200'
                    : 'text-gray-500'
                }`}
              >
                {new Date(message.timestamp).toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}

        {isSending && (
          <div className="flex justify-start">
            <div className="bg-gray-800 text-gray-100 rounded-lg px-4 py-3">
              <Loader2 className="w-5 h-5 animate-spin" />
            </div>
          </div>
        )}

        {error && (
          <div className="flex justify-center">
            <div className="bg-red-900/20 border border-red-800 text-red-400 rounded-lg px-4 py-3 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSendMessage} className="px-6 py-4 border-t border-gray-800">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your response or additional details..."
            disabled={isSending}
            className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-amber-500 focus:border-transparent disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!inputMessage.trim() || isSending}
            className="px-6 py-3 bg-amber-600 hover:bg-amber-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center gap-2"
          >
            {isSending ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
