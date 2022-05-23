const pagespeedForm = document.getElementById( 'check-pagespeed' );
const pagespeedBtn = document.getElementById( 'check-pagespeed-btn' );
const liveFeedback = document.getElementById( 'live-feedback' );
const desktopResultDiv = document.getElementById('desktop-result');
const mobileResultDiv = document.getElementById('mobile-result');
const url1 = document.getElementById( 'url-1' );
const url2 = document.getElementById( 'url-2' );
const url3 = document.getElementById( 'url-3' );
const urlElements = [url1, url2, url3];

// Check if PageSpeed tester is on the page
if ( pagespeedForm ) {
    // Check for submit event
    pagespeedForm.addEventListener('submit', (e) => {
        // Prevent default
        e.preventDefault();

        // Disable button to prevent stacking events
        pagespeedBtn.disabled = true;

        // Return if none of the inputs has a value
        if ( ! url1.value && ! url2.value && ! url3.value ) {
            pagespeedBtn.disabled = false;
            liveFeedback.innerHTML = "<p>Provide URLs to test.</p>";
            pagespeedBtn.disabled = false;
            return;
        }

        // Update live feedback
        liveFeedback.innerHTML = "<p>Testing...</p>";

        // Store all urls, and hide the inputs
        let urls = [];

        urlElements.forEach((el) => {
            if ( el.value !== '' ) urls.push(el.value);
            el.style.display = "none";
        });

        // Store the API key and base urls
        const apiKey = "YOUR API KEY";
        const desktopBaseUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?key=${apiKey}&category=ACCESSIBILITY&category=PERFORMANCE&url=`;
        const mobileBaseUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?key=${apiKey}&strategy=MOBILE&category=ACCESSIBILITY&category=PERFORMANCE&url=`;

        // Prepare the result divs
        desktopResultDiv.innerHTML += `<h3 style="font-weight: bold; text-decoration: underline;">Desktop</h3>`;
        mobileResultDiv.innerHTML += `<h3 style="font-weight: bold; text-decoration: underline;">Mobiel</h3>`;

        // Remove the button
        pagespeedBtn.style.display = "none";

        // Fetch the desktop results for each url
        Promise.all(
            urls.map(url => fetch(`${desktopBaseUrl + url}`))
        ).then(responses =>
            Promise.all(responses.map(res => res.json()))
        ).then(data => {
            // If data comes in, empty the feedback
            liveFeedback.innerHTML = "";
            // Loop over the data for each url
            data.forEach((response, index) => {
                // Retrieve the scores from the response
                const result = response.lighthouseResult;
                const performanceScore = result.categories.performance.score;
                const accessibilityScore = result.categories.accessibility.score;
                // Update the result div
                desktopResultDiv.innerHTML += `<p><strong>${urls[index]}</strong> scores <strong>${performanceScore * 100} out of 100<strong> on performance, and <strong>${accessibilityScore * 100} out of 100<strong> on accessibility.</p>`;
            });
        }).catch(err => {
            console.error(err);
            liveFeedback.innerHTML = "<p>Something went wrong, contact a developer.</p>";
        });

        // Fetch the mobile results for each url
        Promise.all(
            urls.map(url => fetch(`${mobileBaseUrl + url}`))
        ).then(responses =>
            Promise.all(responses.map(res => res.json()))
        ).then(data => {
            // If data comes in, empty the feedback
            liveFeedback.innerHTML = "";
            // Loop over the data for each url
            data.forEach((response, index) => {
                // Retrieve the scores from the response
                const result = response.lighthouseResult;
                const performanceScore = result.categories.performance.score;
                const accessibilityScore = result.categories.accessibility.score;
                // Update the result div
                mobileResultDiv.innerHTML += `<p><strong>${urls[index]}</strong> scores <strong>${performanceScore * 100} out of 100<strong> on performance, and <strong>${accessibilityScore * 100} out of 100<strong> on accessibility.</p>`;
            });
        }).catch(err => {
            console.error(err);
            liveFeedback.innerHTML = "<p>Something went wrong, contact a developer.</p>";
        });
    });
}