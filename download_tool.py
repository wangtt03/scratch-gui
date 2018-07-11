import json
import urllib

from pprint import pprint

assets_file = ['backdrops.json', 'costumes.json', 'sounds.json', 'sprites.json']
for file in assets_file:
    with open('src/lib/libraries/' + file) as f:
        rdata = json.load(f)

    for key in rdata:
        urlstring = key["md5"]
        testfile = urllib.URLopener()
        testfile.retrieve('https://cdn.assets.scratch.mit.edu/internalapi/asset/'+urlstring+'/get/', '/Users/tiantianwang/Downloads/scratchAssets/' + urlstring)
