<script type="text/javascript">
    // Automatically execute when the page loads
    window.onload = function() {
        // Show the loading message
        document.getElementById('loading').style.display = 'block';
        document.getElementById('quizResult').style.display = 'none';

        // Preset topic
        var topic = "preset_topic_here";  // Replace with your desired topic

        // Send an AJAX request to the Flask server
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/generate_quiz', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        
        xhr.onload = function() {
            if (xhr.status === 200) {
                // Parse the JSON response
                var response = JSON.parse(xhr.responseText);
                var quiz = response.quiz;

                // Hide the loading message
                document.getElementById('loading').style.display = 'none';
                // Show the quiz 
                document.getElementById('quizContent').textContent = quiz;
                document.getElementById('quizResult').style.display = 'block';
            }
        };

        xhr.send('topic=' + encodeURIComponent(topic));
    };
</script>
