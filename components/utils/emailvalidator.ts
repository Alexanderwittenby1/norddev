import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, 
  dangerouslyAllowBrowser:true
})

export async function isSpamEmail(email: string): Promise<boolean> {
  const prompt = `Är detta e-postmeddelande trolig spam? Svara endast med "ja" eller "nej".\nE-post: ${email}`

  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: 'Du är en e-post-spamfilterassistent.' },
      { role: 'user', content: prompt }
    ],
    max_tokens: 100,
    temperature: 0,
  })

  const content = response.choices[0].message.content
  const answer = content ? content.trim().toLowerCase() : ''
  return answer === 'ja'
}

