import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("api here");

export async function getMovieRecommendations(
  genre?: string,
  mood?: string,
  year?: string,
  language?: string
) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `Act as a movie expert. I need 5 movie recommendations 
    ${genre ? `in the ${genre} genre` : ""} 
    ${mood ? `that have a ${mood} mood` : ""} 
    ${year ? `from the ${year} era` : ""}
    ${language ? `in ${language} language` : ""}. 
    Return the response ONLY as a JSON array with exactly this format for each movie:
    [
      {
        "title": "Movie Title",
        "year": "Year",
        "plot": "Brief plot summary (max 200 characters)",
        "rating": "IMDb rating (e.g., 8.5)"
      }
    ]
    Do not include any other text or explanation, only the JSON array.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Clean the response text to ensure valid JSON
    const cleanedText = text.replace(/```json\n?|\n?```/g, '').trim();
    
    try {
      return JSON.parse(cleanedText);
    } catch (parseError) {
      console.error("Failed to parse JSON:", cleanedText);
      return [];
    }
  } catch (error) {
    console.error("Error getting movie recommendations:", error);
    return [];
  }
}