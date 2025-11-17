import { NextRequest, NextResponse } from 'next/server';
import type { ChatRequest, ChatResponse, Message } from '@/lib/types/diagnosis';
import { getCharmUrl } from '@/lib/data/vehicles';

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages';

const SYSTEM_PROMPT = `You are an expert automotive diagnostic assistant with deep knowledge of vehicle repair and maintenance. Your role is to help users diagnose vehicle problems using a systematic, professional approach.

Knowledge Base:
- You have access to information equivalent to the Operation CHARM database (charm.li), which contains 50,000+ repair manuals for vehicles from 1982-2013
- You understand automotive systems: engine, transmission, electrical, braking, suspension, cooling, fuel, exhaust, etc.
- You know common failure modes, diagnostic procedures, and repair techniques

Diagnostic Methodology:
1. GATHER INFORMATION: Ask clarifying questions about symptoms, when they occur, and related conditions
2. NARROW DOWN: Use responses to identify likely systems/components involved
3. SYSTEMATIC DIAGNOSIS: Guide through logical diagnostic steps
4. PROVIDE SOLUTIONS: Offer repair recommendations with safety warnings

Communication Style:
- Ask ONE clear question at a time
- Use simple language, explain technical terms
- Always consider safety first
- Be honest about difficulty level and when professional help is needed
- Reference charm.li manual sections when appropriate

Important Guidelines:
- Never guess - if you need more information, ask
- Always warn about safety risks (electrical, fuel, structural, etc.)
- Recommend professional help for complex/dangerous repairs
- Provide estimated difficulty: beginner, intermediate, advanced, or professional-only
- Consider multiple potential causes, ordered by likelihood

When diagnosis is complete, provide:
- Most likely causes (ranked by probability)
- Recommended diagnostic tests to confirm
- Repair procedures overview
- Tools and parts needed
- Estimated difficulty and time
- Safety warnings
- Link to relevant charm.li manual section`;

export async function POST(request: NextRequest) {
  try {
    if (!ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: 'API key not configured. Please add ANTHROPIC_API_KEY to your environment variables.' },
        { status: 500 }
      );
    }

    const body: ChatRequest = await request.json();
    const { message, vehicle, conversationHistory } = body;

    // Build context about the vehicle
    const vehicleContext = `Vehicle: ${vehicle.year} ${vehicle.make} ${vehicle.model}${
      vehicle.engine ? ` (${vehicle.engine})` : ''
    }${vehicle.transmission ? ` with ${vehicle.transmission}` : ''}`;

    const charmUrl = getCharmUrl(vehicle);

    // Convert conversation history to Anthropic format
    const messages = [
      ...conversationHistory
        .filter((msg) => msg.role !== 'system')
        .map((msg) => ({
          role: msg.role === 'assistant' ? 'assistant' : 'user',
          content: msg.content,
        })),
      {
        role: 'user',
        content: message,
      },
    ];

    // Call Anthropic API
    const response = await fetch(ANTHROPIC_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 2048,
        system: `${SYSTEM_PROMPT}\n\n${vehicleContext}\n\nRelevant repair manual: ${charmUrl}`,
        messages,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Anthropic API error:', errorText);
      return NextResponse.json(
        { error: 'Failed to get AI response' },
        { status: response.status }
      );
    }

    const data = await response.json();
    const assistantMessage = data.content[0]?.text || 'I apologize, but I could not generate a response.';

    // Create response message
    const responseMessage: Message = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      role: 'assistant',
      content: assistantMessage,
      timestamp: new Date(),
    };

    // Determine if we should provide diagnosis or continue gathering info
    const lowerContent = assistantMessage.toLowerCase();
    const isDiagnosisComplete =
      lowerContent.includes('most likely') &&
      (lowerContent.includes('cause') || lowerContent.includes('issue')) &&
      (lowerContent.includes('recommend') || lowerContent.includes('repair'));

    const chatResponse: ChatResponse = {
      message: responseMessage,
      status: isDiagnosisComplete ? 'diagnosed' : 'gathering-info',
    };

    return NextResponse.json(chatResponse);
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
