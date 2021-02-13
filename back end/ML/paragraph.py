from sklearn.feature_extraction.text import TfidfTransformer
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfVectorizer
import pandas as pd
import numpy as np
import pickle
import re

import sys

def preprocess(sentence):
    sentence = re.sub(r'[^\w\s]', '', sentence)
    sentence = re.sub(r'[^\x00-\x7f]',r'', sentence)
    sentence = sentence.lower()
    return(sentence)

def tfidftransform(data):
    #Load transformer
    transformer = TfidfTransformer()
    loaded_vec = CountVectorizer(decode_error="replace",vocabulary=pickle.load(open("./ML/feature.pkl", "rb")))
    test_vector = transformer.fit_transform(loaded_vec.fit_transform(np.array(data)))
    return(test_vector)

# load the model from disk
model = pickle.load(open("./ML/finalized_model.sav", 'rb'))

def give_stats(model, paragraph):
    sentences = paragraph.split(".")
    new = []
    for sentence in sentences:
        if len(sentence.split()) > 60:
            new = new + sentence.split(",")
    sentences = sentences + new
    sentences = [preprocess(i) for i in sentences]
    test = tfidftransform(sentences)
    result = model.predict(test)
    happy_ratio = round((sum(result)/ len(sentences)), 2)
    return(happy_ratio)


if __name__=="__main__":
    paragraph = sys.argv[1]
    happy = give_stats(model, paragraph)
    print(happy)