import sys
from krwordrank.word import summarize_with_keywords

def getKeywords(texts):
    print(summarize_with_keywords(texts, min_count=10))

if __name__ == '__main__':
    getKeywords(sys.argv[1].split(';'))