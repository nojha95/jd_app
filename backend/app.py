from quart import Quart, render_template, request,jsonify,send_from_directory,session,redirect,url_for
from time import time
import jd_cv_match as match
import tempfile
import PyPDF2
import json
from pathlib import Path

app = Quart(__name__)
app.secret_key = '4ec42e0f4a56e99e7a315fab323a10a27f14182ef73cb01d2b86d4fc2e4a5306'
valid_user = {'username': 'dbhasker', 'password': 'DBhasker#2@23'}

@app.route('/')
async def index():
    if is_auth():
        return await send_from_directory("static", "index.html")
    return redirect(url_for('login_temp'))

@app.route("/favicon.ico")
def favicon():
    if is_auth():
        return  send_from_directory("static", "favicon.ico")
    else:
        return "ok"


@app.route("/assets/<path:path>")
async def assets(path):
    if is_auth():
        return await send_from_directory(Path(__file__).resolve().parent / "static" / "assets", path)

@app.route('/login')
async def login_temp():
    if is_auth():
        return redirect(url_for('index'))
    return await render_template('login.html', error="")

@app.route('/login', methods=['POST'])
async def login():
    form_data = await request.form
    username = form_data['username']
    password = form_data['password']

    # Check if the entered credentials match the valid user
    if username == valid_user['username'] and password == valid_user['password']:
        # Redirect to a success page if login is successful
        session['user_name'] = "user"
        return redirect(url_for('index'))
    else:
        # Redirect to the login page with an error message if login fails
        return await render_template('login.html' , error="Incorrect username or Password")

@app.route('/logout',methods=['GET'])
def logout():
    session.clear()
    return "ok"


@app.route('/match', methods=['POST'])
async def submit():
    if is_auth():
        form_data = await request.form
        files = await request.files
        jdFile = files['jd-file']
        cvFile = files['cv-file']
        jdName = form_data.get('jdName')
        personName = form_data.get('personName')
        print(jdFile.name)
        #jdtext = extractText(jdFile)
        #matchResponse = match.call_openai(extractText(jdFile),extractText(cvFile))
        matchResponse = "<b>JD & CV Match percentage:</b> 60%\n<b>JD & CV Comparison summary:</b> The candidate has extensive experience in sales, marketing, and P&L management, which aligns well with the job requirements. However, the JD specifically mentions experience in Ad Sales and Brand Management, which are not highlighted in the candidate's resume.\n<b>Resume key highlights:</b> \n- 17+ years of experience in Sales, Strategic Planning, Marketing, and Business Development.\n- Proven track record in maximizing revenue, profits, and EBITA through effective cost management.\n- Strong background in Media, Life Insurance, and Banking sectors.\n- Demonstrated achievements in achieving targets and implementing successful business strategies.\n<b>Strengths and Weaknesses of resume based on job description:</b> \nStrengths: \n- Extensive experience in managing large P&Ls, team management, and sales operations.\n- Proven track record of increasing revenues and profitability in previous roles.\n- Strong educational background with an MBA and Masters in Economics.\n- Demonstrated leadership skills and ability to work under pressure to meet deadlines.\nWeaknesses:\n- Lack of specific experience in Ad Sales and Brand Management as mentioned in the JD.\n- The resume could benefit from more concrete examples of brand management and external representation abilities.\n- Limited mention of team size management compared to the requirement of handling 4++ direct reports.\n<b>A set of interview questions:</b>\n1. Can you provide a specific example where you successfully led a team to achieve significant revenue growth in a challenging market?\n2. How do you approach developing and implementing sales and marketing strategies in a new industry or sector?\n3. Can you speak about a time when you had to represent your organization externally and the outcome of that representation?\n4. How do you prioritize and manage large P&Ls to ensure profitability and cost-effectiveness?\n5. In what ways have you demonstrated high stability and achievement in your past leadership roles?\n6. How do you stay motivated during challenging times and maintain a high level of aggression in achieving targets?\n<b>Personalized suggestions for future learning pathways:</b>\n- Consider taking courses or certifications in Ad Sales and Brand Management to align with the specific requirements of the job.\n- Enhance networking and relationship-building skills to further strengthen external representation abilities.\n- Focus on showcasing examples of successfully leading diverse teams and motivating individuals to drive results.\n- Develop a deeper understanding of diverse industries like Media, FMCG, Hospitality, and Retail to broaden your market knowledge.\n<b>Culture fit:</b> \nThe candidate's involvement in scouting, leadership training programs, and numerous accolades demonstrate strong interpersonal skills, leadership qualities, and a proactive attitude, aligning well with the company's values of being result-oriented, emotionally connected, and a trendsetter. Additionally, the candidate's track record of achieving targets and fostering a dynamic environment indicates a strong cultural fit with a focus on achieving excellence."
        return jsonify({"answer":matchResponse}),200
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