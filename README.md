What is it?
===========

It's an reExperimental forum interface.

Why?
====

There's
[only one approach to present forum interface](http://punbb.informer.com/forums/)
and I completly do not agree that it's the best way to display data for small
traffic forum. I'm sure there's a way of providing the same functionality in
much simplier, cleaner and faster way.


Development
-----------

Most of the code is being executed on client side. But there's a small python
proxy server required.

How to run application?
=======================

UI needs a data. The whole concept was born out of frustration with
[polish Arch Linux forum](http://archlinux.pl/forum/) interface.

Because of CSRF, the API has to come from the same domain that the page is
being loaded from. That's why the proxy. To run it, just type::

    $ python2 server.py [<host>:<port>]
