import sys
sentence = sys.argv[1]
# sentence = "Happy"

def sentence_translator(sentence):
    for x in range(10):
        pass

    if (len(sentence) > 100): 
        return 0.8
    else: 
        return 0.2

print(sentence_translator(sentence))