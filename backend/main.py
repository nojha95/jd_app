from flask import Flask, render_template, request,jsonify
from time import time
import jd_cv_match as match
import tempfile
import PyPDF2

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('home.html')

@app.route('/match', methods=['POST'])
def submit():
    jdFile = request.files['jd-file']
    cvFile = request.files['cv-file']
    print(jdFile.name)
    #jdtext = extractText(jdFile)
    matchResponse = match.call_openai(extractText(jdFile),extractText(cvFile))

    return jsonify({"answer":matchResponse}),200

def extractText(file):
    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp_file:
            temp_file.write(file.read())
    
    pdf_reader = PyPDF2.PdfReader(temp_file.name)

    text = ""
    for page_num in range(len(pdf_reader.pages)):
        text += pdf_reader.pages[page_num].extract_text()

    return text

if __name__ == "__main__":
    app.run(debug=True)