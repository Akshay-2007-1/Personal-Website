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

document.addEventListener('DOMContentLoaded', function() {
    const analyzeBtn = document.getElementById('analyzeBtn');
    
    if (analyzeBtn) {
        analyzeBtn.addEventListener('click', analyzeText);
    }
    
    function analyzeText() {
        const text = document.getElementById('textInput').value;
        
        if (!text.trim()) {
            alert('Please enter some text to analyze');
            return;
        }
        
        // Log the analysis start timestamp
        const timestamp = new Date().toISOString();
        console.log(`${timestamp}, text-analysis, started`);
        
        // Perform all analyses
        analyzeBasicStats(text);
        analyzePronouns(text);
        analyzePrepositions(text);
        analyzeIndefiniteArticles(text);
        
        // Log the analysis completion
        const endTimestamp = new Date().toISOString();
        console.log(`${endTimestamp}, text-analysis, completed`);
    }
    
    function analyzeBasicStats(text) {
        // Count characters (excluding spaces)
        const letters = text.replace(/[^a-zA-Z]/g, '').length;
        
        // Count words
        const words = text.trim().split(/\s+/).length;
        
        // Count spaces
        const spaces = text.split(' ').length - 1;
        
        // Count newlines
        const newlines = text.split('\n').length - 1;
        
        // Count special symbols (non-alphanumeric, non-space characters)
        const specialSymbols = text.replace(/[a-zA-Z0-9\s]/g, '').length;
        
        // Display results
        const basicStatsElement = document.getElementById('basicStats');
        basicStatsElement.innerHTML = `
            <table class="stats-table">
                <tr><th>Metric</th><th>Count</th></tr>
                <tr><td>Letters</td><td>${letters}</td></tr>
                <tr><td>Words</td><td>${words}</td></tr>
                <tr><td>Spaces</td><td>${spaces}</td></tr>
                <tr><td>Newlines</td><td>${newlines}</td></tr>
                <tr><td>Special Symbols</td><td>${specialSymbols}</td></tr>
            </table>
        `;
        
        // Log the results
        const timestamp = new Date().toISOString();
        console.log(`${timestamp}, basic-stats, letters-${letters}-words-${words}-spaces-${spaces}-newlines-${newlines}-special-${specialSymbols}`);
    }
    
    function analyzePronouns(text) {
        // Define a list of common pronouns
        const pronounsList = {
            personal: ['i', 'me', 'my', 'mine', 'myself', 'you', 'your', 'yours', 'yourself', 
                      'he', 'him', 'his', 'himself', 'she', 'her', 'hers', 'herself',
                      'it', 'its', 'itself', 'we', 'us', 'our', 'ours', 'ourselves',
                      'they', 'them', 'their', 'theirs', 'themselves'],
            relative: ['who', 'whom', 'whose', 'which', 'that'],
            interrogative: ['what', 'which', 'who', 'whom', 'whose'],
            demonstrative: ['this', 'that', 'these', 'those'],
            indefinite: ['any', 'anybody', 'anyone', 'anything', 'each', 'either', 'everybody', 
                        'everyone', 'everything', 'neither', 'nobody', 'no one', 'nothing',
                        'one', 'somebody', 'someone', 'something', 'both', 'few', 'many', 
                        'several', 'all', 'some', 'most']
        };
        
        // Tokenize the text (convert to lowercase and split by non-alphanumeric characters)
        const words = text.toLowerCase().match(/\b\w+\b/g) || [];
        
        // Count pronouns by category
        const pronounCounts = {};
        
        // Initialize counts
        for (const category in pronounsList) {
            pronounsList[category].forEach(pronoun => {
                pronounCounts[pronoun] = 0;
            });
        }
        
        // Count occurrences
        words.forEach(word => {
            if (pronounCounts.hasOwnProperty(word)) {
                pronounCounts[word]++;
            }
        });
        
        // Group by category for display
        const categoryResults = {};
        for (const category in pronounsList) {
            categoryResults[category] = {};
            pronounsList[category].forEach(pronoun => {
                if (pronounCounts[pronoun] > 0) {
                    categoryResults[category][pronoun] = pronounCounts[pronoun];
                }
            });
        }
        
        // Display results
        const pronounStatsElement = document.getElementById('pronounStats');
        let html = '';
        
        for (const category in categoryResults) {
            const pronouns = Object.keys(categoryResults[category]);
            if (pronouns.length > 0) {
                html += `<h4>${category.charAt(0).toUpperCase() + category.slice(1)} Pronouns</h4>`;
                html += '<table class="stats-table"><tr><th>Pronoun</th><th>Count</th></tr>';
                
                pronouns.forEach(pronoun => {
                    html += `<tr><td>${pronoun}</td><td>${categoryResults[category][pronoun]}</td></tr>`;
                });
                
                html += '</table>';
            }
        }
        
        if (html === '') {
            html = '<p>No pronouns found in the text.</p>';
        }
        
        pronounStatsElement.innerHTML = html;
        
        // Log the results
        const timestamp = new Date().toISOString();
        console.log(`${timestamp}, pronoun-analysis, completed`);
    }
    
    function analyzePrepositions(text) {
        // Define a list of common prepositions
        const prepositions = [
            'about', 'above', 'across', 'after', 'against', 'along', 'among', 'around',
            'at', 'before', 'behind', 'below', 'beneath', 'beside', 'between', 'beyond',
            'by', 'down', 'during', 'except', 'for', 'from', 'in', 'inside', 'into',
            'like', 'near', 'of', 'off', 'on', 'onto', 'out', 'outside', 'over', 
            'past', 'since', 'through', 'throughout', 'to', 'toward', 'towards', 'under', 
            'underneath', 'until', 'up', 'upon', 'with', 'within', 'without'
        ];
        
        // Tokenize the text (convert to lowercase and split by non-alphanumeric characters)
        const words = text.toLowerCase().match(/\b\w+\b/g) || [];
        
        // Count prepositions
        const prepositionCounts = {};
        prepositions.forEach(prep => {
            prepositionCounts[prep] = 0;
        });
        
        words.forEach(word => {
            if (prepositions.includes(word)) {
                prepositionCounts[word]++;
            }
        });
        
        // Filter out prepositions with zero count
        const foundPrepositions = Object.keys(prepositionCounts)
            .filter(prep => prepositionCounts[prep] > 0)
            .sort((a, b) => prepositionCounts[b] - prepositionCounts[a]);
        
        // Display results
        const prepositionStatsElement = document.getElementById('prepositionStats');
        
        if (foundPrepositions.length > 0) {
            let html = '<table class="stats-table"><tr><th>Preposition</th><th>Count</th></tr>';
            
            foundPrepositions.forEach(prep => {
                html += `<tr><td>${prep}</td><td>${prepositionCounts[prep]}</td></tr>`;
            });
            
            html += '</table>';
            prepositionStatsElement.innerHTML = html;
        } else {
            prepositionStatsElement.innerHTML = '<p>No prepositions found in the text.</p>';
        }
        
        // Log the results
        const timestamp = new Date().toISOString();
        console.log(`${timestamp}, preposition-analysis, completed`);
    }
    
    function analyzeIndefiniteArticles(text) {
        // Define the indefinite articles
        const articles = ['a', 'an'];
        
        // For "a" vs "an" context analysis
        const followingA = {};
        const followingAn = {};
        
        // Tokenize the text into words with context
        const words = text.toLowerCase().match(/\b\w+\b/g) || [];
        
        // Count articles
        let aCount = 0;
        let anCount = 0;
        
        // Analyze each word in context
        for (let i = 0; i < words.length - 1; i++) {
            if (words[i] === 'a') {
                aCount++;
                const nextWord = words[i+1];
                followingA[nextWord] = (followingA[nextWord] || 0) + 1;
            } 
            else if (words[i] === 'an') {
                anCount++;
                const nextWord = words[i+1];
                followingAn[nextWord] = (followingAn[nextWord] || 0) + 1;
            }
        }
        
        // Display results
        const articleStatsElement = document.getElementById('articleStats');
        
        let html = '<table class="stats-table"><tr><th>Article</th><th>Count</th></tr>';
        html += `<tr><td>a</td><td>${aCount}</td></tr>`;
        html += `<tr><td>an</td><td>${anCount}</td></tr>`;
        html += '</table>';
        
        // Show some examples of usage context if available
        if (aCount > 0 || anCount > 0) {
            html += '<h4>Usage Examples</h4>';
            
            if (aCount > 0) {
                html += '<h5>"A" followed by:</h5>';
                const aFollowed = Object.keys(followingA)
                    .sort((a, b) => followingA[b] - followingA[a])
                    .slice(0, 5);
                
                if (aFollowed.length > 0) {
                    html += '<ul>';
                    aFollowed.forEach(word => {
                        html += `<li>"a ${word}" (${followingA[word]} times)</li>`;
                    });
                    html += '</ul>';
                }
            }
            
            if (anCount > 0) {
                html += '<h5>"An" followed by:</h5>';
                const anFollowed = Object.keys(followingAn)
                    .sort((a, b) => followingAn[b] - followingAn[a])
                    .slice(0, 5);
                
                if (anFollowed.length > 0) {
                    html += '<ul>';
                    anFollowed.forEach(word => {
                        html += `<li>"an ${word}" (${followingAn[word]} times)</li>`;
                    });
                    html += '</ul>';
                }
            }
        }
        
        articleStatsElement.innerHTML = html;
        
        // Log the results
        const timestamp = new Date().toISOString();
        console.log(`${timestamp}, article-analysis, a-${aCount}-an-${anCount}`);
    }
});
