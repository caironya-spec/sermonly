import { GoogleGenAI } from "@google/genai";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API KEY가 설정되지 않았습니다. Vercel 환경 변수를 확인해주세요.");
  }
  return new GoogleGenAI({ apiKey });
};

export const summarizeSermon = async (text: string, targetLength: number): Promise<string> => {
  const ai = getClient();
  
  // Create a targeted prompt for sermon summarization
  const prompt = `
    Role: 당신은 전문적인 기독교 서적 편집자이자 설교 요약 전문가입니다.
    Task: 아래 제공된 설교문 텍스트를 분석하고 한국어로 요약해주세요.
    
    Constraints:
    1. 요약문의 길이는 공백 포함 약 ${targetLength}자 내외로 작성해주세요.
    2. 핵심 성경 구절이 언급되어 있다면 문맥에 맞게 포함해주세요.
    3. 설교의 핵심 메시지와 적용점(Application)이 분명히 드러나도록 해주세요.
    4. 문체는 경어체(합니다/습니다)를 사용하여 정중하고 은혜로운 톤을 유지하세요.
    5. 불필요한 서론이나 예화는 과감히 생략하고 주제 중심으로 요약하세요.
    
    Sermon Text:
    ${text}
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.3, // Lower temperature for more focused and deterministic output
        topK: 40,
        topP: 0.95,
      }
    });

    if (response.text) {
      return response.text;
    } else {
      throw new Error("응답을 생성하지 못했습니다.");
    }
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    if (error.message?.includes('API_KEY')) {
        throw new Error("API 키 오류가 발생했습니다. 관리자에게 문의하세요.");
    }
    throw new Error("요약 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
  }
};