import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateSecretWord = async (category: string): Promise<{ word: string, emoji: string }> => {
  try {
    let extraInstruction = "";
    
    // Check if the category is countries (by ID or common names) to enforce flag emojis
    if (category === 'countries' || category.toLowerCase().includes('país') || category.toLowerCase().includes('pais')) {
       extraInstruction = "IMPORTANTE: Como la categoría es geográfica/países, el emoji DEBE ser la bandera oficial correspondiente al país generado.";
    }
    // Check if category is football/futbolistas to enforce player names
    else if (category === 'football' || category.toLowerCase().includes('futbol') || category.toLowerCase().includes('fútbol') || category.toLowerCase().includes('soccer')) {
        extraInstruction = "IMPORTANTE: La categoría es 'Futbolistas'. Genera ÚNICAMENTE el nombre de un jugador de fútbol famoso y reconocido mundialmente (actual o leyenda). NO devuelvas objetos genéricos como 'balón' o 'gol'. Ejemplos válidos: 'Lionel Messi', 'Cristiano Ronaldo', 'Diego Maradona', 'Kylian Mbappé'.";
    }

    // Prompt explicitly asks for Spanish output
    const prompt = `Genera un sustantivo único, popular y fácil de adivinar relacionado con la categoría: "${category}". 
    Debe ser una instancia específica, no un término amplio. Por ejemplo, si la categoría es 'Animales', devuelve 'León' o 'Pingüino'.
    El idioma DEBE ser ESPAÑOL.
    También devuelve un solo emoji que represente mejor la palabra.
    ${extraInstruction}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            word: {
              type: Type.STRING,
              description: "La palabra secreta en Español."
            },
            emoji: {
                type: Type.STRING,
                description: "Un emoji que representa la palabra (ej: la bandera si es un país)."
            }
          },
          required: ["word", "emoji"]
        }
      }
    });

    const json = JSON.parse(response.text || '{}');
    return {
        word: json.word || 'Lionel Messi',
        emoji: json.emoji || '⚽'
    };
  } catch (error) {
    console.error("Gemini API Error:", error);
    // Update fallbacks to include a footballer just in case
    const fallbacks = [
        { word: 'Lionel Messi', emoji: '🇦🇷' },
        { word: 'Cristiano Ronaldo', emoji: '🇵🇹' },
        { word: 'Guitarra', emoji: '🎸' },
        { word: 'Pizza', emoji: '🍕' },
        { word: 'Japón', emoji: '🇯🇵' }
    ];
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  }
};