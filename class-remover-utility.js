/**
 * ClassRemoverUtility - Remove specified CSS classes from DOM elements
 * 
 * Designed for Tampermonkey userscripts to eliminate annoying classes
 * that prevent text selection, copying, or other user interactions.
 * 
 * @author SterlingJF
 * @version 0.1.0
 * @license MIT
 */

window.ClassRemoverUtility = (function() {
    'use strict';
    
    /**
     * Remove specified classes from all matching DOM elements
     * 
     * @param {string[]} classesToRemove - Array of class names to remove
     * @param {Object} options - Configuration options
     * @param {string} options.logLevel - Logging verbosity: 'silent', 'info', 'verbose'
     * @param {boolean} options.watchDynamic - Monitor for dynamically added content
     * @param {number} options.observerDelay - Delay before re-scanning after DOM changes (ms)
     * @returns {Object} - { removed: number, performRemoval: function }
     */
    function removeClasses(classesToRemove, options = {}) {
        const config = {
            logLevel: 'info',
            watchDynamic: true,
            observerDelay: 100,
            ...options
        };
        
        function performRemoval() {
            if (config.logLevel !== 'silent') {
                console.log('🔧 ClassRemover targeting:', classesToRemove);
            }
            
            let totalRemoved = 0;
            
            classesToRemove.forEach(className => {
                const elements = document.querySelectorAll(`.${className}`);
                
                if (elements.length > 0) {
                    if (config.logLevel === 'verbose') {
                        console.log(`🎯 Found ${elements.length} elements with "${className}"`);
                    }
                    
                    elements.forEach((element, index) => {
                        if (config.logLevel === 'verbose') {
                            console.log(`  ${index + 1}. ${element.tagName}: ${element.className}`);
                        }
                        element.classList.remove(className);
                        totalRemoved++;
                    });
                }
            });
            
            if (config.logLevel !== 'silent' && totalRemoved > 0) {
                console.log(`✅ Removed ${totalRemoved} class instances`);
            }
            
            return totalRemoved;
        }
        
        const initialCount = performRemoval();
        
        // Watch for content added after page load
        if (config.watchDynamic && document.body) {
            const observer = new MutationObserver(mutations => {
                const hasNewElements = mutations.some(mutation => 
                    mutation.type === 'childList' && mutation.addedNodes.length > 0
                );
                
                if (hasNewElements) {
                    setTimeout(performRemoval, config.observerDelay);
                }
            });
            
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
            
            if (config.logLevel === 'verbose') {
                console.log('👀 Dynamic content observer started');
            }
        }
        
        return {
            removed: initialCount,
            performRemoval
        };
    }
    
    return { removeClasses };
})();
