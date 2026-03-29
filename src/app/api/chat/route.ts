import { GoogleGenerativeAI } from "@google/generative-ai";
import { fetchLearningHubData } from "@/actions/learningHub";
import { NextResponse } from "next/server";

// We cache the context globally so we don't spam Google Sheets on every API call.
let globalKnowledgeContext = "";

async function buildKnowledgeBase() {
  if (globalKnowledgeContext) return globalKnowledgeContext;

  const classes = ["11th", "12th"];
  const streams = ["PCM", "PCB", "ARTS", "COMMERCE"];
  let contextParts = [];

  try {
    for (const className of classes) {
      for (const streamName of streams) {
        const data = await fetchLearningHubData(className, streamName);
        if (data && data.length > 0) {
          contextParts.push(`\n--- Class: ${className}, Stream: ${streamName} ---`);
          data.forEach(ch => {
            if (ch.subject && ch.chapterName) {
              const notesRaw = ch.notes || "None";
              const pyqRaw = ch.pyqs || "None";
              const lecRaw = ch.lectures || "None";
              
              contextParts.push(
                `Subject: ${ch.subject} | Chapter: ${ch.chapterName}`
              );
              contextParts.push(
                `  Available Notes: ${notesRaw !== "None" ? "Available" : "Not yet available"}`
              );
              contextParts.push(
                `  Available PYQs: ${pyqRaw !== "None" ? "Available" : "Not yet available"}`
              );
              contextParts.push(
                `  Available Lectures: ${lecRaw !== "None" ? "Available" : "Not yet available"}`
              );
              if (ch.extraTips) contextParts.push(`  Tips: ${ch.extraTips}`);
            }
          });
        }
      }
    }
    globalKnowledgeContext = contextParts.join("\n");
  } catch (error) {
    console.error("Error building Google Sheets context for Chatbot: ", error);
  }
  return globalKnowledgeContext;
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "your_api_key_here") {
      return NextResponse.json(
        { response: "I'm currently undergoing maintenance. Please make sure to add GEMINI_API_KEY to your .env.local file to activate me." }, 
        { status: 200 } // Send 200 so the frontend can display the message normally without a crash
      );
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const knowledgeBase = await buildKnowledgeBase();

    const systemPrompt = `You are a helpful AI Mentor for B.K. Singh Classes. 
Your primary purpose is to assist students with their coursework, provide information regarding available resources (notes, past year questions, lectures), and motivate them. Use a friendly, cyber-sleek, motivating tone.
You MUST refer to the following available resources strictly when a student asks for notes, PYQs, or lectures. If a student asks for something not in this list, politely let them know it's not currently available but to stay tuned or contact the administration.

### Grounding Data (Learning Hub Resources from Google Sheets):
${knowledgeBase || "No internal resources available at this moment. You can provide general guidance."}
`;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction: systemPrompt,
    });

    let startIndex = 0;
    while (startIndex < messages.length - 1 && messages[startIndex].role !== "user") {
      startIndex++;
    }

    const formattedHistory = messages.slice(startIndex, -1).map((m: any) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }],
    }));

    const chatSession = model.startChat({
      history: formattedHistory,
    });

    const userMessage = messages[messages.length - 1].content;
    const result = await chatSession.sendMessage(userMessage);

    return NextResponse.json({ response: result.response.text() });
  } catch (err: any) {
    console.error("Chat API Route Error:", err);
    return NextResponse.json({ response: "I encountered a glitch while processing your request. Please try again." }, { status: 500 });
  }
}
