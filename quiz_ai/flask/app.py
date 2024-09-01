from flask import Flask, render_template, request, jsonify
import ollama
import re
app = Flask(__name__)

# Function to generate quiz using LLaMA
def generate_quiz(topic):
    desiredModel = "llama3.1:8b"
    response = ollama.chat(model=desiredModel, messages=[
        {
            'role': 'system',
            'content': 'You are a quiz generator. Generate quizzes with one question and four options. Mark the correct option. and only give question abcd options and a correct only give anything else beside it don\'t mention question no or anything also provide the answer at the end but without marking only A, B, C, D '
        },
        {
            'role': 'user',
            'content': f'Create a quiz on {topic}.'
        }
    ])
    return response['message']['content']

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/quiz_page')
def quiz_page():
    return render_template('quiz_page.html')

@app.route('/generate_quiz', methods=['POST'])
def quiz():
    topic = request.form['topic']
    quiz = generate_quiz(topic)
    
    return jsonify({'quiz': quiz,
                    'quiz_question': extract_question(quiz),
                    'correct_option': extract_answer(quiz),
                    'options': extract_option(quiz)
                    })

if __name__ == '__main__':
    app.run(debug=True)


def extract_question(text):
    # Regular expression to match everything before the answer options
    question = re.match(r'(.*?)[""]?A\)', text, re.DOTALL)
    if question:
        return question.group(1).strip()
    else:
        return None
    
def extract_answer(text):
    answer_match = re.search(r'Answer:\s([A-D])', text)
    if answer_match:
        return answer_match.group(1)
    else:
        return None

def extract_option(text):W
    options = re.findall(r'([A-D])\)\s(.*?)(?=\n|$)', text)
    options_dict = {key: value for key, value in options}
    return options_dict