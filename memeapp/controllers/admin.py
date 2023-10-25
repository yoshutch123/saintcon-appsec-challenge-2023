import os

from flask import Blueprint, redirect, render_template, g, request

not_settings = set(dir())
from memeapp.conf.config import *

settings = set(dir()) - not_settings - {"not_settings"}

bp = Blueprint("admin", __name__)


@bp.route("/admin", methods=["GET"])
def index():
    # If user is unauthenticated and coming from localhost, allow
    # If user is authenticated and is admin and coming from localhost, allow
    if g.user and not g.user.is_admin and request.remote_addr != '127.0.0.1':
        return redirect("/home")

    c = {
        'PEPPER': eval('PEPPER'),
        'BCRYPT_ROUNDS': eval('BCRYPT_ROUNDS'),
        'SECRET_KEY': eval('SECRET_KEY'),
        'DEBUG': eval('DEBUG'),
        'SESSION_EXPIRY': eval('SESSION_EXPIRY')
        }

    return render_template("admin.html", environ=os.environ, user=g.user, settings=c)
    # return render_template("admin.html", environ=os.environ, user=g.user,
    #                        settings={name: eval(name) for name in settings if not name.startswith("__")})
