from nltk.corpus import stopwords
from wordcloud import WordCloud
from PIL import Image
import contractions
import numpy as np
import re
import sys

"""
for installing libraries -

pip install wordcloud
pip install nltk
pip install Pillow (for PIL)
pip install contractions
"""

# Mask is the shape of the cloud
mask = np.array(Image.open('./word cloud/mask_for_wordcloud.jpg'))
stop_words = stopwords.words('english')

text = sys.argv[1]
'''
"""
I’ve been struggling with some mild depression for the last 3-4 months because I recently broke up with my girlfriend of about a year and we were living together. So on top of breaking up, I had to find a new place to live, which I did thankfully. Things were looking up. I was dating a little again but still struggling with my love for her and how to deal with it and move on. I don’t have many friends were I live, all my friends live in bigger cities than me.

I’m a band director at a small school and I lost a student earlier this year to a car accident which was very rough because this student was a friend of mine and she was a good flute player. I thought I had coped with it and finally dealt with the grief. Two days ago, one of my young kids, about 12 years old, shot himself. Idk what to feel. COVID precautions all year have made me feel numb to death and disease but this doesn’t make me feel anything other than I miss him. He was such a goofy little kid and it makes me so mad I couldn’t have stopped it from happening. I wish I would’ve talked to him. Something... I don’t know what to feel. Mainly, I ask here if there are any other people that have gone through this or do you also have stories to help a teacher get through this?
"""
'''

sentence = text.replace('\n', '')
sentence = contractions.fix(sentence)
sentence = re.sub(r'[^\w\s]', '', sentence).lower()

words = sentence.split()

if 'depression' in words:
    words += ['depression']*5
if 'suicide' in words:
    words += ['suicide']*5
if 'suicidal' in words:
    words += ['suicidal']*5

sentence = ' '.join(words)

wordcloud = WordCloud(width = 800, height = 800,
                      background_color = 'white',
                      mask = mask,
                      stopwords = stop_words,
                      min_font_size = 10).generate(sentence)

file_name = './word cloud/data/'+ sys.argv[2] +'.png'
wordcloud.to_file(file_name)