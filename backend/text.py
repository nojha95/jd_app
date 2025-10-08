from openai import OpenAI

YOUR_API_KEY = "."

messages = [

    {
        "role": "user",
        "content": (
            "tell me about achyut dubey working at axtria search in linkdin"
        ),
    },
]

client = OpenAI(api_key=YOUR_API_KEY, base_url="https://api.perplexity.ai")


# chat completion with streaming
response = client.chat.completions.create(
    model="pplx-70b-online",
    messages=messages,
    stream=False,
)

print(response.choices[0].message.content)
