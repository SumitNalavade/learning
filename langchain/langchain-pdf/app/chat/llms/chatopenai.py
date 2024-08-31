from langchain.chat_models import ChatOpenAI

def build_llms(chat_args):
    return ChatOpenAI(streaming=chat_args.streaming)