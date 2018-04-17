import json
from lib.polly import text_to_voice

# ====== read sentences from JSON
sentences = json.load(open('wfd.json'))
print(len(sentences))

# ====== text to voice ======


def save_voice(number, response_list):
    for idx, response in enumerate(response_list):
        data = response.get('AudioStream').read()
        filename = 'data/' + str(number) + '_' + str(idx) + '.mp3'
        f = open(filename, 'wb')
        f.write(data)
        f.close()
        print('built: ' + filename)

for index, sentence in enumerate(sentences):
    response_list = text_to_voice(str(sentence))
    save_voice(index, response_list)
