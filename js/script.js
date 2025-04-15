window.addEventListener("load", () => {
    function identifyElement(node) {
        const tag = node.tagName;
        if (!tag) return "unknown";

        if (node.matches(".skill-set")) return "skill";
        if (tag === "IMG") return "img";
        if (tag === "A") return "anchor";
        if (tag === "P") return "text";
        if (/^H[1-6]$/.test(tag)) return "title";
        if (tag === "LI") return "list-point";
        return tag.toLowerCase();
    }

    function locateSection(targetNode) {
        const container = targetNode.closest("section");
        if (!container) return "generic-block";

        const label = container.querySelector("h2");
        if (label) return label.innerText.trim();

        if (container.hasAttribute("id")) {
            return container.getAttribute("id").trim();
        }

        return "no-label";
    }

    document.addEventListener("click", (ev) => {
        const timestamp = new Date().toLocaleString();
        const nodeType = identifyElement(ev.target);
        const sectionTitle = locateSection(ev.target);

        console.log(`[${timestamp}] event: click | element: ${nodeType} | part: ${sectionTitle}`);
    });

    const visibilityWatcher = new IntersectionObserver((observedItems) => {
        for (const item of observedItems) {
            if (item.isIntersecting) {
                const viewedTime = new Date().toLocaleString();
                const viewedType = identifyElement(item.target);
                const viewedIn = locateSection(item.target);

                console.log(`[${viewedTime}] event: view | element: ${viewedType} | part: ${viewedIn}`);
            }
        }
    }, {
        threshold: 0.1
    });

    const targets = document.querySelectorAll("section, img, p, a, .skill-set");
    targets.forEach(element => visibilityWatcher.observe(element));
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
