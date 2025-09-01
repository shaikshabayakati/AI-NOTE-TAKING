

// import { GoogleGenerativeAI } from "@google/generative-ai";

// const ai = new GoogleGenerativeAI({
//   apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
// });

// async function mainAI(prompt) {
//   const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });
//   const result = await model.generateContent({
//     contents: [{ role: "user", parts: [{ text: prompt || 'just print not sufficient information just do that' }] }],
//   });
//   const text = await result.response.text();
//   console.log(text);
//   return text;
// }

// export default mainAI;
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({apiKey:process.env.NEXT_PUBLIC_GOOGLE_API_KEY,});

export async function main(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    // Fix: Provide the full Content object structure with 'role' and 'parts'.
    // This ensures the API correctly interprets your text as a 'TextPart'.
    contents: [
      {
        role: 'user', // The role of the content (e.g., 'user', 'model', 'function')
        parts: [{ text: prompt || '' }], // An array of parts, containing your text
      },
    ],
  });
  // Remember that response.text is a method that needs to be called.
    return response.candidates[0].content.parts[0].text;
}

