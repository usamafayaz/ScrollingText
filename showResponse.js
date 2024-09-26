document.addEventListener('DOMContentLoaded', function () {
    const scrollContent = document.getElementById('scrollContent');
    const apiResponse = sessionStorage.getItem('apiResponse');
    const autoScroll = sessionStorage.getItem('autoScroll') === 'on';
    const scrollTime = parseInt(sessionStorage.getItem('scrollTime'), 10) * 1000 || 20000;

    // Insert the API response HTML into the scrollContent div
    scrollContent.innerHTML = apiResponse;

    if (autoScroll) {
        const responseContainer = document.getElementById('responseContainer');
        const scrollHeight = scrollContent.scrollHeight;
        const clientHeight = responseContainer.clientHeight;

        let startTime = null;

        function scrollStep(timestamp) {
            if (!startTime) startTime = timestamp;

            const elapsedTime = timestamp - startTime;
            const progress = Math.min(elapsedTime / scrollTime, 1);

            responseContainer.scrollTop = progress * (scrollHeight - clientHeight);

            if (progress < 1) {
                requestAnimationFrame(scrollStep);
            }
        }

        requestAnimationFrame(scrollStep);
    }
});
