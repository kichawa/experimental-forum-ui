import urllib
import json
import os
import sys
import time

import bottle


BASE_URL = 'http://archlinux.pl/api/v1'
ROOT_DIR = os.path.abspath(os.path.dirname(__file__))
STATIC_DIR = os.path.join(ROOT_DIR, 'static')


class Cache(object):
    "Simple memory cache"
    def __init__(self):
        self.mem = {}

    def get(self, key):
        val = self.mem.get(key)
        if val:
            if val[0] > time.time():
                return val[1]
            self.mem.pop(key)
        return None

    def set(self, key, value, timeout=3600):
        self.mem[key] = (int(time.time()) + timeout, value)


cache = Cache()

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
    resp = cache.get(url)
    if not resp:
        resource = urllib.urlopen(url)
        resp = json.loads(resource.read())
        cache.set(url, resp, 60 * 5)
    return resp

def main():
    if len(sys.argv) == 2:
        host, port = sys.argv[1].split(':')
        port = int(port)
    else:
        host, port = 'localhost', 8080
    bottle.run(host=host, port=port)

if __name__ == '__main__':
    main()
