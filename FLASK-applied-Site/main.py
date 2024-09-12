from flask import *
import json, random, os

app = Flask(__name__, static_folder="static")


BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATA_FILE = os.path.join(BASE_DIR, "data", "/quizes.json")

quiz_no = 0;

def load_questions():
    with open("./static/data/quizes.json", "r") as file:
        return json.load(file)


def get_random_questions(data, num_questions=3):
    return random.sample(data, min(len(data), num_questions))


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/about3")
def about():
    return render_template("about3.html")


@app.route("/description")
def description():
    return render_template("article_desc.html")

@app.route("/resources")
def resources():
    return render_template("resources.html")


@app.route("/games")
def games():
    return render_template("games.html")


@app.route("/article")
def article():
    return render_template('article.html')

@app.route("/quiz")
def quiz():
    return render_template("quiz.html")



@app.route("/quiz_questions", methods=['POST'])
def quiz_questions():
    quiz_no = request.json.get("quiz_no")  # Retrieve quiz_no from JSON body
    questions = load_questions()[quiz_no - 1]["questions"]
    random_questions = get_random_questions(questions)
    print(random_questions[random.randrange(0, 3)])
    return jsonify(random_questions)


@app.route("/spin-the-wheel")
def spin_the_wheel():
    return render_template("spin_the_wheel.html")

@app.route("/quiz_route", methods=["POST"])
def quiz_route():   
    quiz_no = request.form['quiz_no']
    print(request.form)
    return render_template("quiz_page.html", quiz_no = request.form['quiz_no'], quiz_title=request.form['quiz_title'])

@app.route("/contact")
def contact():
    return render_template("contact.html")

if __name__ == "__main__":
    app.run(debug=True)