import urllib
import json
import os
import sys

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



def main():
    if len(sys.argv) == 2:
        host, port = sys.argv[1].split(':')
        port = int(port)
    else:
        host, port = 'localhost', 8080
    bottle.run(host=host, port=port)

if __name__ == '__main__':
    main()
