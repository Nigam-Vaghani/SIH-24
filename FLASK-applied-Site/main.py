from flask import Flask, render_template

app = Flask(__name__, static_folder='static')

@app.route("/")
def index():
    return render_template('index.html')

@app.route("/about3")
def about():
    return render_template('about3.html')

@app.route("/description")
def description():
    return render_template('description.html')

@app.route("/resources")
def resources():
    return render_template('resources.html')

@app.route("/games")
def games():
    return render_template('games.html')

@app.route("/quiz")
def quiz():
    return render_template('quiz.html')

@app.route("/spin-the-wheel")
def spin_the_wheel():
    return render_template('spin_the_wheel.html')

@app.route("/contact")
def contact():
    return render_template('contact.html')

if __name__ == "__main__":
    app.run(debug=True)