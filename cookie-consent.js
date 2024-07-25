(function() {
    document.addEventListener('DOMContentLoaded', function() {
        const consentBanner = document.createElement('div');
        consentBanner.className = 'cookie-banner bg-white text-black p-5 rounded-lg shadow-lg fixed bottom-5 left-5 z-50';
        consentBanner.style.backgroundColor = pluginData.bannerBackground;
        consentBanner.style.color = pluginData.bannerColor;

        consentBanner.innerHTML = `
            <div>
                <h3 class="text-lg font-bold">We use cookies</h3>
                <p class="mt-2 text-sm">
                    We use cookies to personalize content and to analyze web traffic. 
                    <a href="${pluginData.policyLink}" class="underline text-blue-600">Read more about cookies</a>
                </p>
                <div class="btn-section mt-4">
                    <button id="acceptCookies" class="btn-accept px-4 py-2 rounded text-sm font-medium mr-2 cursor-pointer" style="background-color: ${pluginData.acceptBtnBackground}; color: white;">
                        Accept cookies
                    </button>
                    <button id="rejectCookies" class="btn-reject px-4 py-2 rounded text-sm font-medium mr-2 cursor-pointer" style="background-color: ${pluginData.rejectBtnBackground}; color: white;">
                        Reject
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(consentBanner);

        document.getElementById('acceptCookies').addEventListener('click', function() {
            localStorage.setItem('cookieConsent', 'accepted');
            consentBanner.style.display = 'none';
            activateTracking();
        });

        document.getElementById('rejectCookies').addEventListener('click', function() {
            localStorage.setItem('cookieConsent', 'rejected');
            consentBanner.style.display = 'none';
        });

        function activateTracking() {
            if (pluginData.analyticsCode) {
                let script = document.createElement('script');
                script.setAttribute('src', `https://www.googletagmanager.com/gtag/js?id=${pluginData.analyticsCode}`);
                document.head.appendChild(script);
                let inlineScript = document.createElement('script');
                inlineScript.text = `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${pluginData.analyticsCode}');
                `;
                document.head.appendChild(inlineScript);
            }
            if (pluginData.facebookPixelCode) {
                let script = document.createElement('script');
                script.text = `
                    !function(f,b,e,v,n,t,s)
                    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                    n.queue=[];t=b.createElement(e);t.async=!0;
                    t.src=v;s=b.getElementsByTagName(e)[0];
                    s.parentNode.insertBefore(t,s)}(window, document,'script',
                    'https://connect.facebook.net/en_US/fbevents.js');
                    fbq('init', '${pluginData.facebookPixelCode}');
                    fbq('track', 'PageView');
                `;
                document.head.appendChild(script);
                let noscript = document.createElement('noscript');
                noscript.setAttribute('height', '1');
                noscript.setAttribute('width', '1');
                noscript.setAttribute('style', 'display:none');
                noscript.setAttribute('src', `https://www.facebook.com/tr?id=${pluginData.facebookPixelCode}&ev=PageView&noscript=1`);
                document.head.appendChild(noscript);
            }
        }

        if (localStorage.getItem('cookieConsent') === 'accepted') {
            activateTracking();
        }
    });
})();
