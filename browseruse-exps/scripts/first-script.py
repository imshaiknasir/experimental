from langchain_google_genai import ChatGoogleGenerativeAI
from browser_use import Agent
from dotenv import load_dotenv
load_dotenv()

import asyncio

llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash")

prompt1 = """
You are a helpful assistant. Your task is to goto hackernews and find the top 10 trending news articles.
List the titles and URLs of these articles in a JSON format.
"""

prompt2 = """
You are a helpful assistant. Your task is to goto `dev.to` and find the top 10 trending articles on 'playwright'.
List the titles and URLs of these articles in a JSON format.
"""

async def run_agent(prompt):
    agent = Agent(llm=llm, task=prompt)
    result = await agent.run()
    print(result)

async def main():
    parallel_tasks = [
        run_agent(prompt1),
        run_agent(prompt2)
    ]
    await asyncio.gather(*parallel_tasks, return_exceptions=False)

asyncio.run(main())