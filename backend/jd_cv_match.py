import click
import PyPDF2
import openai
# from dotenv import load_dotenv
import tempfile
from bs4 import BeautifulSoup

# load_dotenv('.env_file')

# openai.organization = os.getenv("OPENAI_ORGANIZATION")
# openai.api_key = os.getenv("OPENAI_API_KEY")

openai.organization = 'org-LcshV1lWzSVxSJQG60J5WWF5'
openai.api_key = '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'

def call_openai(jd_text,resume_text):

    # prompt = """Act as a resume analysis expert. For the given resume and Job description always generate 6 analysis points in given order
    # 1. Resume summary.
    # 2. Resume key highlights.
    # 3. Strengths and Weaknesses of resume based on job description.
    # 4. A set of interview questions ensuring the questions are relevant and challenging to assess his/her qualifications effectively.
    # 5. Personalized suggestions for future learning pathways based on current skill set, with a focus on aligning resume with job description.
    # 6. Culture fit (Keeping in mind company's core values which are GROUND CONNECT, RESULT ORIENTED, EMOTIONAL CONNECT,
    #   ANALYTICAL and TRENDSETTER: Assess this using extra-curricular activites and intangible skills)
    # """
    prompt = """Act as a resume analysis expert. For the given resume and Job description always generate 6 analysis points in given order. Ensure that analysis points headings are wraped in HTML <b></b> tags.
    1. JD & CV Match percentage.
    2. JD & CV Comparison summary.
    3. Resume key highlights.
    4. Strengths and Weaknesses of resume based on job description.
    5. A set of interview questions ensuring the questions are relevant and challenging to assess his/her qualifications effectively.
    6. Personalized suggestions for future learning pathways based on current skill set, with a focus on aligning resume with job description.
    7. Culture fit (Keeping in mind company's core values which are GROUND CONNECT, RESULT ORIENTED, EMOTIONAL CONNECT,
      ANALYTICAL and TRENDSETTER: Assess this using extra-curricular activites and intangible skills)
    """
    
    completion = openai.chat.completions.create(
        model="gpt-3.5-turbo", 
        messages=[{"role": "system","content" : prompt},{"role": "user", "content": "Do the resume analysis for \n\n JOB DESCRIPTION - " + jd_text + " \n\n RESUME - " + resume_text}]
        )

    answer = completion.choices[0].message.content
    soup = BeautifulSoup(answer, 'html.parser')
    data_dict = {}
    for tag in soup.find_all('b'):
        key = tag.text.strip()
        value = tag.next_sibling.strip()
        data_dict[key] = value
    
    #print(answer)
    return data_dict