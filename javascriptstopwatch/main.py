#!/usr/bin/env python
#
# Programed by JAEYOON LEE 
# SITE: http://sw.jaeyoon.org
# EMAIL: lee@jaeyoon.org
#

import os
#import cgi
import datetime
#import urllib
#import wsgiref.handlers

from google.appengine.api import users
from google.appengine.ext import db
from google.appengine.ext import webapp
from google.appengine.ext.webapp import util
from google.appengine.ext.webapp import template
from google.appengine.runtime import DeadlineExceededError

class IndexHandler(webapp.RequestHandler):
    def get(self):
        try:
            date = datetime.datetime.now()

            index_val = {
                    'date' : date.strftime("%H:%M")
            }
            path = os.path.join(os.path.dirname(__file__), 'index.html')
            self.response.out.write(template.render(path, index_val))

        except DeadlineExceededError:
            self.response.clear()
            self.response.set_status(500)
            self.response.out.write("This operation could not be completed in time...")

def main():
    application = webapp.WSGIApplication([
                                            ('/', IndexHandler),
                ], debug=True)

    util.run_wsgi_app(application)


if __name__ == '__main__':
    main()
