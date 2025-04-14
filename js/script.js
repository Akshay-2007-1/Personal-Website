// User Interaction Tracking Script
document.addEventListener('DOMContentLoaded', function() {
    const timestamp = new Date().toISOString();
    console.log(`${timestamp}, view, page-${window.location.pathname}`);
    
    // Track all click events
    document.addEventListener('click', function(event) {
        // Get the clicked element
        const element = event.target;
        
        const currentTimestamp = new Date().toISOString();
        
        // Get element details
        const tagName = element.tagName;
        let eventObject = tagName.toLowerCase();
        
        // Determine the event object type more specifically
        if (tagName === 'IMG') {
            eventObject = 'image';
        } else if (tagName === 'A') {
            eventObject = 'link';
        } else if (tagName === 'BUTTON') {
            eventObject = 'button';
        } else if (element.className.includes('nav')) {
            eventObject = 'navigation';
        } else if (element.className.includes('btn')) {
            eventObject = 'button';
        } else if (element.className.includes('card')) {
            eventObject = 'card';
        } else if (element.className.includes('gallery')) {
            eventObject = 'gallery';
        } else if (tagName === 'INPUT') {
            eventObject = 'form-field';
        } else if (tagName === 'IFRAME') {
            eventObject = 'video';
        }
        
        // Log the click event with new format
        console.log(`${currentTimestamp}, click, ${eventObject}`);
    });
    
    // Track page visibility changes
    document.addEventListener('visibilitychange', function() {
        const currentTimestamp = new Date().toISOString();
        if (document.visibilityState === 'hidden') {
            console.log(`${currentTimestamp}, view-end, page-${window.location.pathname}`);
        } else {
            console.log(`${currentTimestamp}, view-return, page-${window.location.pathname}`);
        }
    });
    
    // Track page unload
    window.addEventListener('beforeunload', function() {
        const currentTimestamp = new Date().toISOString();
        console.log(`${currentTimestamp}, view-end, page-${window.location.pathname}`);
        
        // Calculate time spent on page
        const timeSpent = Math.round((new Date() - performance.timing.navigationStart) / 1000);
        console.log(`${currentTimestamp}, time-spent, ${timeSpent}-seconds`);
    });
    
    // Track scrolling
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        
        scrollTimeout = setTimeout(function() {
            const currentTimestamp = new Date().toISOString();
            const scrollPercentage = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
            console.log(`${currentTimestamp}, scroll, ${scrollPercentage}-percent`);
        }, 300);
    });
    
    // Log page load complete
    window.addEventListener('load', function() {
        const currentTimestamp = new Date().toISOString();
        console.log(`${currentTimestamp}, load-complete, page-${window.location.pathname}`);
        console.log(`${currentTimestamp}, load-time, ${(performance.now() / 1000).toFixed(2)}-seconds`);
    });
});
