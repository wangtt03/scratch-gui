import json
from pprint import pprint

with open('zh.json') as f:
    rdata = json.load(f)

data = {}
for key in rdata.keys():
    data[key] = rdata[key]['message']


with open('zh2.json', 'w') as outfile:
    json.dump(data, outfile)
