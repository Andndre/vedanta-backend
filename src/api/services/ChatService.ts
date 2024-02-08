import "dotenv/config";

const assistantId = "65c4216b44b93cf9525c43f0";

async function loginChatAnonymous() {
  const response = await fetch("https://huggingface.co/chat/conversation", {
    headers: {
      accept: "*/*",
      "accept-language": "id, en-US;q=0.9,en;q=0.8",
      "content-type": "application/json",
      "sec-ch-ua": '"Not A(Brand";v="99", "Brave";v="121", "Chromium";v="121"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Linux"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "sec-gpc": "1",
      Referer: "https://huggingface.co/chat",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    },
    body: `{"model":"mistralai/Mixtral-8x7B-Instruct-v0.1","assistantId":"${assistantId}"}`,
    method: "POST",
  });

  const conversationId = ((await response.json()) as { conversationId: string })
    .conversationId;
  const cookie = response.headers
    .get("Set-Cookie")
    ?.split(" ")[0]
    .slice(0, -1) as string;

  return { conversationId, cookie };
}

function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

async function chat(conversationId: string, cookie: string, message: string) {
  const id = generateUUID();
  const response = await fetch(
    `https://huggingface.co/chat/conversation/${conversationId}`,
    {
      headers: {
        accept: "*/*",
        "accept-language": "id, en-US;q=0.9,en;q=0.8",
        "content-type": "application/json",
        "sec-ch-ua":
          '"Not A(Brand";v="99", "Brave";v="121", "Chromium";v="121"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Linux"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "sec-gpc": "1",
        cookie: cookie,
        Referer: `https://huggingface.co/chat/conversation/${conversationId}`,
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
      body: JSON.stringify({
				inputs: message,
				id,
				is_entry: false,
				is_continue: false,
				web_search: false,
				files: []
			}),
      method: "POST",
    }
  );

  return response;
}

export async function query(message: string, conversationId?: string, cookie?: string) {
	if (!conversationId || !cookie) {
		const result = await loginChatAnonymous();
		conversationId = result.conversationId;
		cookie = result.cookie;
	}

  const chatResponse = await chat(conversationId!, cookie!, message);
	console.log(chatResponse);
  const stream = chatResponse.body;
  const reader = stream?.getReader()!;
	const pump = async (): Promise<string> => {
		const { done, value } = await reader.read();
		if (done) return 'Terjadi kesalahan. silahakan coba lagi.';
		const chunk = new TextDecoder().decode(value);
		if (chunk && chunk.trim()) {
			if (chunk.startsWith("{\"type\":\"finalAnswer\"")) {
				const obj = JSON.parse(chunk);
				return obj.text.trim();
			} else {
				// abaikan streams lainnya
			}
		}
		return pump();
	}
	
	return { text: await pump(), conversationId, cookie };
}

export async function sendMessage(message: string) {
  const { text } = await query(message);
  return {
		text
	};
}
