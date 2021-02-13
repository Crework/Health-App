from sklearn.feature_extraction.text import TfidfTransformer
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
import pandas as pd
import numpy as np
import pickle


emotion_dict = {'happy': 1, 'sad': 0}
def read_data(url):
    train = pd.read_csv(url)
    for index, row in train.iterrows():
        emotion = row['Emotion']
        train.loc[index, 'Emotion'] = emotion_dict[emotion]
    return(train)


train = read_data("https://raw.githubusercontent.com/ishantjuyal/Emotions-Detection/main/Data/Emotions_merged.csv")

Y = train['Emotion']
Y = np.array(Y).astype('int')
X = np.array(train['Text'])

from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, Y, test_size=0.2)


corpus = np.array(X)
vectorizer = CountVectorizer(decode_error="replace")
vec_train = vectorizer.fit_transform(corpus)
#Save vectorizer.vocabulary_
pickle.dump(vectorizer.vocabulary_,open("feature.pkl","wb"))

#Load it later
transformer = TfidfTransformer()
loaded_vec = CountVectorizer(decode_error="replace",vocabulary=pickle.load(open("feature.pkl", "rb")))
tfidf = transformer.fit_transform(loaded_vec.fit_transform(np.array(X_test)))


from sklearn.linear_model import LogisticRegression
clf = LogisticRegression(max_iter = 400)

clf.fit(vec_train, Y)


y_pred = clf.predict(tfidf)
y_test = np.array(y_test)


from sklearn.metrics import classification_report
from sklearn.metrics import accuracy_score
from sklearn.metrics import confusion_matrix

print("Accuracy score for training set:")
print(accuracy_score(np.array(Y), clf.predict(vec_train)))

print("\nAccuracy score for test set:")
print(accuracy_score(y_test, y_pred))

print("\nConfusion Matrix for test set:")
print(confusion_matrix(y_test, y_pred))

print("\nClassification Report for test set:")
print(classification_report(y_test, y_pred))

filename = 'finalized_model.sav'
pickle.dump(clf, open(filename, 'wb'))
 
# some time later...
 
# load the model from disk
# loaded_model = pickle.load(open(filename, 'rb'))
# result = loaded_model.score(X_test, Y_test)
# print(result)