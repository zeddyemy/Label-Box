'''
This package contains the base API routes for the Flask application.

It includes routes for authentication, payments, items, item interactions, location, profile, referral, religions, stats, e.t.c

A Flask blueprint named 'api' is created to group these routes, and it is registered under the '/api' URL prefix.

@author: Emmanuel Olowu
@link: https://github.com/zeddyemy
'''
from flask import Blueprint, render_template

api_bp: Blueprint = Blueprint('api', __name__, url_prefix='/api')

from . import auth, projects, tasks, annotations, stats

# from . import (error_handlers, auth, payment, items, item_interactions, location, social_profile, social_platforms, task, task_performance, profile, referral, religions, stats, banks, notification, settings, transactions, social_auth, pricing, task_option)

@api_bp.route("/", methods=['GET'])
def index():
    return render_template('api/index.jinja-html')
