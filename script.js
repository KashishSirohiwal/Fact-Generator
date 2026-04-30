
const categorySelect = document.querySelector("#category"); // Dropdown
const btn = document.querySelector("#btn"); // Fetch Button
const text = document.querySelector("#text"); // To display the fact or quote text
const image = document.querySelector("#image"); // To display animal pictures
const historyList = document.querySelector("#historyList"); // Unordered list history items

let history = [];

async function handleClick() {
    // Get selected category from dropdown
    const category = categorySelect.value;
    
    text.innertextText = "Loading...";
    image.style.display = "none";

    try {
        let imageUrl = "";
        let factText = "";

        // If cat is selected, fetch cat image and fact
        if (category === "cat") {
            const [imgRes, factRes] = await Promise.all([
                fetch("https://api.thecatapi.com/v1/images/search"), // API for random cat image
                fetch("https://catfact.ninja/fact") // API for random cat fact
            ]);

            // Parse JSON responses
            const imgData = await imgRes.json();
            const factData = await factRes.json();

            imageUrl = imgData[0].url;
            factText = factData.fact;
        }

        else if (category === "dog") {
            const [imgRes, factRes] = await Promise.all([
                fetch("https://dog.ceo/api/breeds/image/random"), // API for random dog image
                fetch("https://dog-api.kinduff.com/api/facts") // API for random dog fact
            ]);

            // Parse JSON responses
            const imgData = await imgRes.json();
            const factData = await factRes.json();

            // Extract URL and fact text (note: facts is an array, take first)
            imageUrl = imgData.message;
            factText = factData.facts[0];
        }

        else {
            const quotes = [
                { q: "Life is about accepting the challenges along the way, choosing to keep moving forward, and savoring the journey.", a: "Roy T. Bennett" },
                { q: "The only way to do great work is to love what you do.", a: "Steve Jobs" },
                { q: "Innovation distinguishes between a leader and a follower.", a: "Steve Jobs" },
                { q: "Life is what happens when you're busy making other plans.", a: "John Lennon" },
                { q: "The future belongs to those who believe in the beauty of their dreams.", a: "Eleanor Roosevelt" },
                { q: "It is during our darkest moments that we must focus to see the light.", a: "Aristotle" },
                { q: "The only impossible journey is the one you never begin.", a: "Tony Robbins" },
                { q: "Success is not final, failure is not fatal.", a: "Winston Churchill" },
                { q: "Believe you can and you're halfway there.", a: "Theodore Roosevelt" },
                { q: "The best time to plant a tree was 20 years ago, the second best time is now.", a: "Chinese Proverb" }
            ];
            
            // Get a random quote
            const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

            // Format the quote text
            const quoteText = `"${randomQuote.q}" — ${randomQuote.a}`;

            // Render the quote since no image is needed
            renderData({
                image: null, // No image for quotes
                text: quoteText
            });

            // Add to history
            addToHistory({
                image: null,
                text: quoteText
            });

            // Exit early, no need for further processing
            return;
        }

        // For cat/dog, prepare data object
        const finalData = {
            image: imageUrl,
            text: factText
        };

        // Render the data to the UI
        renderData(finalData);
        // Add to history
        addToHistory(finalData);

    } catch (error) {
        // If any fetch fails
        text.innerText = "Something went wrong!";
        console.log(error);
    }
}

function renderData(finalData) {
    // Image if present, then set to show it
    if (finalData.image) {
        image.src = finalData.image;
        image.style.display = "block";
    } else {
        // Hide image if none
        image.style.display = "none";
    }

    // Update text content
    text.innerText = finalData.text;
}

function addToHistory(finalData) {
    history.push(finalData);
    
    const li = document.createElement("li");

    // Display text : Generic for animals with image, or the quote text
    if (finalData.image) {
        li.innerText = "Animal + Fact"; // Placeholder for animal facts
    } else {
        li.innerText = "Quote"; // Show quote text
    }

    // Append to history list
    historyList.appendChild(li);
}