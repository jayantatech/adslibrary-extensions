Ads Exe

old manifest
// {
// "manifest_version": 3,
// "name": "Facebook Ads Library Chrome Extension",
// "description": "Chrome Extension to interact with the Facebook Ads Library",
// "version": "1.0",
// "options_ui": {
// "page": "options.html"
// },
// "action": {
// "default_icon": "icon.png",
// "default_popup": "popup.html"
// },
// "content_scripts": [
// {
// "matches": ["https://www.facebook.com/ads/library*"],
// "js": ["js/vendor.js", "js/content_script.js"]
// }
// ],

// "background": {
// "service_worker": "js/background.js"
// },
// "permissions": ["storage", "activeTab", "scripting"],
// "host_permissions": ["https://www.facebook.com/ads/library*"]
// }
