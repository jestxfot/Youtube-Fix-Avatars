// ==UserScript==
// @name         Youtube Fix Avatars
// @author       spiky_Spike
// @run-at       document-start
// @version      0.2
// @downloadURL  https://vknext.net/static/yt3.user.js
// @updateURL    https://vknext.net/static/yt3.user.js
// @match        *://*.youtube.com/*
// ==/UserScript==


const selectorImg = 'img[src*="yt3.ggpht.com"]'
const selectorStyle = '[style*="yt3"][style*=".ggpht"][style*=".com"]'

const getElements = (target, selector)  => [...(target.matches?.(selector) ? [target] : []), ...(target.querySelectorAll?.(selector) || [])]

function handleMutation(target) {
    for (const img of getElements(target, selectorImg)) {
        img.src = img.src.replace('yt3.ggpht.com', 'yt4.ggpht.com')
    }
    for (const element of getElements(target, selectorStyle)) {
        let slashes = element.style.cssText.split('.ggpht')[0].split('yt3')
        slashes = slashes[slashes.length - 1]
        element.style.cssText = element.style.cssText
            .replace(`yt3${slashes}.ggpht${slashes}.com`, `yt4${slashes}.ggpht${slashes}.com`)
    }
}

new MutationObserver(mutations => {
    for (const {target} of mutations) handleMutation(target)
}).observe(document, {
    childList: true, subtree: true, attributes: true
})

unsafeWindow?.addEventListener('load', () => handleMutation(document.body))
