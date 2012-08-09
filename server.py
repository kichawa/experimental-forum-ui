import urllib
import json
import os

import bottle


BASE_URL = 'http://archlinux.pl/api/v1'
ROOT_DIR = os.path.abspath(os.path.dirname(__file__))
STATIC_DIR = os.path.join(ROOT_DIR, 'static')

CACHE = {}


@bottle.route('/')
def index():
    with open('index.html') as fd:
        return fd.read()

@bottle.route('/static/<path:path>')
def static(path):
    return bottle.static_file(path, root=STATIC_DIR)

@bottle.route('/api/<path:re:.*>')
def proxy(path):
    uri = bottle.request.url.split('/', 5)[-1]
    url = os.path.join(BASE_URL, uri)
    if url not in CACHE:
        resource = urllib.urlopen(url)
        CACHE[url] = json.loads(resource.read())
    return CACHE[url]


bottle.run(host='localhost', port=8080)
