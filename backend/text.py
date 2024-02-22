from openai import OpenAI

YOUR_API_KEY = "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"

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
