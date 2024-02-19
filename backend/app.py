from flask import Flask, render_template, request,jsonify,send_from_directory,session,redirect,url_for
from time import time
import jd_cv_match as match
import tempfile
import PyPDF2
import json
from pathlib import Path

app = Flask(__name__)
app.secret_key = '4ec42e0f4a56e99e7a315fab323a10a27f14182ef73cb01d2b86d4fc2e4a5306'
valid_user = {'username': 'dbhasker', 'password': 'DBhasker#2@23'}

@app.route('/')
def index():
    if is_auth():
        return  send_from_directory("static", "index.html")
    return redirect(url_for('login_temp'))

@app.route("/favicon.ico")
def favicon():
    if is_auth():
        return  send_from_directory("static", "favicon.ico")


@app.route("/assets/<path:path>")
def assets(path):
    if is_auth():
        return  send_from_directory(Path(__file__).resolve().parent / "static" / "assets", path)

@app.route('/login')
def login_temp():
    if is_auth():
        redirect(url_for('index'))
    return render_template('login.html', error="")

@app.route('/login', methods=['POST'])
def login():
    username = request.form['username']
    password = request.form['password']

    # Check if the entered credentials match the valid user
    if username == valid_user['username'] and password == valid_user['password']:
        # Redirect to a success page if login is successful
        session['user_name'] = "user"
        return redirect(url_for('index'))
    else:
        # Redirect to the login page with an error message if login fails
        return render_template('login.html' , error="Incorrect username or Password")

@app.route('/logout',methods=['GET'])
def logout():
    session.clear()
    return "ok"


@app.route('/match', methods=['POST'])
def submit():
    if is_auth():
        jdFile = request.files['jd-file']
        cvFile = request.files['cv-file']
        jdName = request.form.get('jdName')
        personName = request.form.get('personName')
        print(jdFile.name)
        #jdtext = extractText(jdFile)
        matchResponse = match.call_openai(extractText(jdFile),extractText(cvFile))
        matchResponse = ""
        return jsonify({"answer":json.dumps(matchResponse)}),200
    else: 
        return jsonify({"error": "unauthorized"}),400

def extractText(file):
    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp_file:
            temp_file.write(file.read())
    
    pdf_reader = PyPDF2.PdfReader(temp_file.name)

    text = ""
    for page_num in range(len(pdf_reader.pages)):
        text += pdf_reader.pages[page_num].extract_text()

    return text

def is_auth():
    if 'user_name' in session:
        return True
    else:
        return False


if __name__ == "__main__":
    app.run(debug=True)