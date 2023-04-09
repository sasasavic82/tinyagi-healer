import { Configuration, OpenAIApi } from "openai";

export type HealingOptions = {
    code: string;
    error: string;
}

export type HealResponse = {
    arguments: string[];
    function: string;
}

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
    organization: process.env.OPENAI_ORGANIZATION_ID
});

const openai = new OpenAIApi(config);

// void async function main() {
//     try {
//         const response = await openai.listEngines();
//         console.log(response.data);
//     } catch(e) {
//         console.error(e);
//     }
// }();


export const callOpenAI = async (prompt: string): Promise<string | undefined> => {
    try {
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: prompt}],
            max_tokens: 2000,
            temperature: 0.7,
            stop: undefined,
            n: 1
        });
        return response.data.choices ? response.data.choices[0].message?.content.trim() : undefined
    } catch(e) {
        console.error(e);
        throw e;
    }
};

export const tinyAgiHeal = async (options: HealingOptions): Promise<HealResponse> => {
    let prompt = `
    You are worlds greatest most sophisticated code fixing automated system. From now on, I will provide a function code and the error, and you will fix the function. The format that will be provided is:

    >> Code:
    <code goes here>
    
    >> Error:
    <error goes here>
    
    You will only respond with the new modified Code. The issue is:
    
    >> Code:
    ${options.code}

    >> Error:
    ${options.error}
 `;

    let response: string | undefined = await callOpenAI(prompt);

    if (!response)
        throw new Error("No response from OpenAI");

    return {
        arguments: getArguments(response),
        function: getFunction(response)
    }
}

export const getArguments = (response: string): string[] => response.match(/\(([^)]+)\)/)?.[1].split(",").map(arg => arg.trim()) || [];
export const getFunction = (response: string): string => response.match(/(?<={)[\s\S]*(?=})/)?.[0].trim() || ""; 
