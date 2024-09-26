document
  .getElementById("submitButton")
  .addEventListener("click", async function () {
    const inputText = document.getElementById("inputText").value;
    const scrollTime = document.getElementById("scrollTime").value || 20; // Default to 20 seconds
    const autoScroll = document.querySelector(
      'input[name="autoScroll"]:checked'
    ).value;

    // Check if inputText is empty
    if (!inputText) {
      alert("Please enter text to scroll!");
      return;
    }

    // Save the input data to sessionStorage for potential future use
    sessionStorage.setItem("scrollText", inputText);
    sessionStorage.setItem("scrollTime", scrollTime);
    sessionStorage.setItem("autoScroll", autoScroll);

    const encodedText = encodeURIComponent(inputText);
    const originalUrl = `https://patorjk.com/misc/scrollingtext/timewaster.php?text=${encodedText}&autoscroll=${autoScroll}&duration=${scrollTime}`;
    const corsProxyUrl = `https://cors-anywhere.herokuapp.com/${originalUrl}`;

    try {
      const response = await fetch(corsProxyUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const htmlContent = await response.text(); // Use .text() instead of .json() to handle HTML

      // Render the response directly into the scrollContent container
      const scrollContainer = document.getElementById("scrollContent");
      scrollContainer.innerHTML = htmlContent;

      // If auto scroll is enabled, scroll the container over the specified time
      if (autoScroll === "ON") {
        autoScrollContent(scrollContainer, scrollTime);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Failed to fetch data. Please try again.");
    }
  });

// Function to scroll the content automatically over the specified scroll time
function autoScrollContent(container, scrollTime) {
  const totalHeight = container.scrollHeight - container.clientHeight; // Total scrollable height
  const scrollPerMs = totalHeight / (scrollTime * 1000); // Pixels to scroll per millisecond

  let scrollPosition = 0;
  const startScroll = performance.now();

  function step(timestamp) {
    const elapsed = timestamp - startScroll; // Elapsed time
    scrollPosition = elapsed * scrollPerMs; // Calculate new scroll position
    container.scrollTop = scrollPosition; // Scroll the container

    if (scrollPosition < totalHeight) {
      requestAnimationFrame(step); // Continue scrolling until the end
    }
  }

  requestAnimationFrame(step); // Start the scrolling animation
}
