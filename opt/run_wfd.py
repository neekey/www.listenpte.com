import json
from polly import text_to_voice

# ====== read sentences from JSON
sentences = json.load(open('src/app/config/wfd.json'))
print(len(sentences))

# ====== text to voice ======


def save_voice(number, response_list):
    result = []
    for idx, response in enumerate(response_list):
        data = response.get('AudioStream').read()
        pathname = str(number) + '_' + str(idx) + '.mp3'
        filename = 'data/wfd/' + pathname
        f = open(filename, 'wb')
        f.write(data)
        f.close()
        print('built: ' + filename)
        result.append(pathname)
    return result

wfd_result = []

for index, sentence in enumerate(sentences):
    response_list = text_to_voice(str(sentence))
    pathnames = save_voice(index, response_list)
    sent_ret = dict(
      sentence=sentence,
      audioURLs=pathnames
    )
    wfd_result.append(sent_ret)
    print(sent_ret)

with open('data/wfd/data.json', 'w') as outfile:
    json.dump(wfd_result, outfile)
