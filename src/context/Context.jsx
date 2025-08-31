import { createContext, useState } from "react";
import main from "../config/gimini.js";


export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [chatArr, setChatArr] = useState([]);

    const newChat = () => {
        setShowResult(false);
            setChatArr([]); 

    };

    const displayText = async (formattedResponse) => {
        setChatArr(prev => {
            const updated = [...prev];
            const lastChat = { ...updated[updated.length - 1] };
            lastChat.loading = false;
            updated[updated.length - 1] = lastChat;
            return updated;
        });

        const parts = formattedResponse.split(/(<pre><code[\s\S]*?<\/code><\/pre>)/g);

        for (let i = 0; i < parts.length; i++) {
            const part = parts[i];
            if (part.startsWith("<pre><code")) {
                setChatArr(prev => {
                    const updated = [...prev];
                    const lastChat = { ...updated[updated.length - 1] };
                    lastChat.displayText += part;
                    updated[updated.length - 1] = lastChat;
                    return updated;
                });
            } else {
                const words = part.split(" ");
                for (let j = 0; j < words.length; j++) {
                    if (words[j] === "") continue;
                    await new Promise(resolve => setTimeout(resolve, 50));
                    setChatArr(prev => {
                        const updated = [...prev];
                        const lastChat = { ...updated[updated.length - 1] };
                        lastChat.displayText += words[j] + " ";
                        updated[updated.length - 1] = lastChat;
                        return updated;
                    });
                }
            }
        }

        setChatArr(prev => {
            const updated = [...prev];
            const lastChat = { ...updated[updated.length - 1] };
            lastChat.resultData = formattedResponse;
            updated[updated.length - 1] = lastChat;
            return updated;
        });
      
    };

    const onSent = async (prompt) => {
        const userPrompt = prompt || input;
        setInput("");
        setShowResult(true);

        setPrevPrompts(prev => (!prev.includes(userPrompt) ? [...prev, userPrompt] : prev));
        setRecentPrompt(userPrompt);

        const newChatObj = {
            recentPrompt: userPrompt,
            resultData: "",
            displayText: "",
            loading: true,
        };

        setChatArr(prev => [...prev, newChatObj]);

        const response = await main(userPrompt);

        let responseArray = response.split("**");
        let formattedResponse = "";
        for (let i = 0; i < responseArray.length; i++) {
            formattedResponse += i % 2 === 1 ? `<b>${responseArray[i]}</b>` : responseArray[i];
        }
        formattedResponse = formattedResponse.split("*").join("<br>");

        formattedResponse = formattedResponse.replace(/```(\w*)\n([\s\S]*?)```/g, (match, lang, code) => {
            return `
        <div class="code-block">
          <div class="code-language">${lang || 'code'}</div>
          <pre><code class="language-${lang}">${code}</code></pre>
        </div>
      `;
        });

        formattedResponse = formattedResponse.replace(/`([^`]+)`/g, (match, code) => `<code>${code}</code>`);
        formattedResponse.replace(/^###### (.*)$/gm, "<h6>$1</h6>")
            .replace(/^##### (.*)$/gm, "<h5>$1</h5>")
            .replace(/^#### (.*)$/gm, "<h4>$1</h4>")
            .replace(/^### (.*)$/gm, "<h3>$1</h3>")
            .replace(/^## (.*)$/gm, "<h2>$1</h2>")
            .replace(/^# (.*)$/gm, "<h1>$1</h1>")
            // Bold & Italic
            .replace(/___(.*?)___/g, "<b><i>$1</i></b>")
            .replace(/__(.*?)__/g, "<b>$1</b>")
            .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
            .replace(/_(.*?)_/g, "<i>$1</i>")
            .replace(/\*(.*?)\*/g, "<i>$1</i>")
            // Strikethrough
            .replace(/~~(.*?)~~/g, "<s>$1</s>")
            // Inline code
            .replace(/`([^`]+)`/g, '<code class="inline">$1</code>')
            // Blockquote
            .replace(/^> (.*)$/gm, "<blockquote>$1</blockquote>")
            // Horizontal rule
            .replace(/^---$/gm, "<hr>")
            // Newlines
            .replace(/\n/g, "<br>");

        displayText(formattedResponse);
    };

    const contextValue = {
        input,
        setInput,
        recentPrompt,
        setRecentPrompt,
        prevPrompts,
        setPrevPrompts,
        showResult,
        setShowResult,
        onSent,
        newChat,
        chatArr,
        setChatArr,
    };

    return <Context.Provider value={contextValue}>{props.children}</Context.Provider>;
};

export default ContextProvider;