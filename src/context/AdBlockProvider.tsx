import { createContext, useContext } from 'react'

import type { ReactNode } from 'react'

const adDomains = [
  'doubleclick.net',
  'googlesyndication.com',
  'adservice.google.com',
  'ads.pubmatic.com',
  'taboola.com',
  'outbrain.com',
  'revcontent.com',
  'adnxs.com',
]

const injectedAdBlockScript = `
(function() {
  try {
    console.log('Enhanced ad blocking script started');
    
    // Blokir popup dan window baru yang mencurigakan
    const originalOpen = window.open;
    window.open = function(url, name, features) {
      // Izinkan popup untuk video player
      if (url && (url.includes('video') || url.includes('player') || url.includes('stream'))) {
        return originalOpen.call(this, url, name, features);
      }
      // Blokir popup iklan
      if (url && (url.includes('ads') || url.includes('banner') || url.includes('popup'))) {
        console.log('Blocked ad popup:', url);
        return null;
      }
      return originalOpen.call(this, url, name, features);
    };
    
    // Blokir redirect yang mencurigakan
    const originalAssign = window.location.assign;
    const originalReplace = window.location.replace;
    
    window.location.assign = function(url) {
      if (url && (url.includes('ads') || url.includes('banner') || url.includes('popup'))) {
        console.log('Blocked ad redirect:', url);
        return;
      }
      return originalAssign.call(this, url);
    };
    
    window.location.replace = function(url) {
      if (url && (url.includes('ads') || url.includes('banner') || url.includes('popup'))) {
        console.log('Blocked ad redirect:', url);
        return;
      }
      return originalReplace.call(this, url);
    };
    
    // Blokir popup dialog yang mencurigakan
    const originalAlert = window.alert;
    const originalConfirm = window.confirm;
    const originalPrompt = window.prompt;
    
    window.alert = function(message) {
      if (message && (message.includes('ads') || message.includes('banner') || message.includes('popup'))) {
        console.log('Blocked ad alert:', message);
        return;
      }
      return originalAlert.call(this, message);
    };
    
    window.confirm = function(message) {
      if (message && (message.includes('ads') || message.includes('banner') || message.includes('popup'))) {
        console.log('Blocked ad confirm:', message);
        return false;
      }
      return originalConfirm.call(this, message);
    };
    
    window.prompt = function(message) {
      if (message && (message.includes('ads') || message.includes('banner') || message.includes('popup'))) {
        console.log('Blocked ad prompt:', message);
        return null;
      }
      return originalPrompt.call(this, message);
    };
    
    // Blokir click pada elemen iklan
    document.addEventListener('click', function(e) {
      const target = e.target;
      const href = target.href || target.getAttribute('href') || '';
      const onclick = target.getAttribute('onclick') || '';
      
      // Blokir link iklan
      if (href && (href.includes('ads') || href.includes('banner') || href.includes('popup') || 
                   href.includes('doubleclick') || href.includes('googlesyndication'))) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Blocked ad link click:', href);
        return false;
      }
      
      // Blokir onclick yang mencurigakan
      if (onclick && (onclick.includes('window.open') && onclick.includes('ads')) || 
                   (onclick.includes('location') && onclick.includes('ads'))) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Blocked ad onclick:', onclick);
        return false;
      }
    }, true);
    
    // Blokir touch events pada elemen iklan
    document.addEventListener('touchstart', function(e) {
      const target = e.target;
      const href = target.href || target.getAttribute('href') || '';
      
      if (href && (href.includes('ads') || href.includes('banner') || href.includes('popup'))) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Blocked ad touch:', href);
        return false;
      }
    }, true);
    
    // Hapus elemen iklan yang mencurigakan
    function removeAds() {
      // Hapus iframe iklan
      const iframes = document.querySelectorAll('iframe');
      iframes.forEach(iframe => {
        const src = iframe.src || '';
        if (src && (src.includes('ads') || src.includes('banner') || src.includes('popup') ||
                   src.includes('doubleclick') || src.includes('googlesyndication'))) {
          iframe.remove();
          console.log('Removed ad iframe:', src);
        }
      });
      
      // Hapus link iklan
      const links = document.querySelectorAll('a');
      links.forEach(link => {
        const href = link.href || '';
        if (href && (href.includes('ads') || href.includes('banner') || href.includes('popup') ||
                   href.includes('doubleclick') || href.includes('googlesyndication'))) {
          link.remove();
          console.log('Removed ad link:', href);
        }
      });
      
      // Hapus button iklan
      const buttons = document.querySelectorAll('button');
      buttons.forEach(button => {
        const onclick = button.getAttribute('onclick') || '';
        if (onclick && (onclick.includes('window.open') && onclick.includes('ads')) || 
                     (onclick.includes('location') && onclick.includes('ads'))) {
          button.remove();
          console.log('Removed ad button:', onclick);
        }
      });
      
      // Hapus banner click-to-start yang spesifik
      const allElements = document.querySelectorAll('*');
      allElements.forEach(element => {
        const text = element.textContent || '';
        const style = element.style.cssText || '';
        
        // Deteksi banner berdasarkan teks dan style
        if ((text.includes('Klik Di Mana Saja untuk Memulai Film') || 
             text.includes('Terima kasih sudah mengklik') ||
             text.includes('THIS PLAYER CONTAINS ADS') ||
             text.includes('Click Anywhere to Start')) &&
            (style.includes('background') || style.includes('rgba') || 
             style.includes('position') || style.includes('z-index'))) {
          element.remove();
          console.log('Removed click-to-start banner:', text.substring(0, 50));
        }
      });
      
      // Hapus elemen dengan style yang mencurigakan (overlay banners) - JANGAN hapus kontrol pemutar (Lanjutkan/Play)
      const suspiciousElements = document.querySelectorAll('div[style*="background"], div[style*="position"], div[style*="z-index"]');
      suspiciousElements.forEach(element => {
        const text = (element.textContent || '').trim();
        const isPlayerControl = /lanjutkan|continue|resume|putar|play(video)?|tonton lagi/i.test(text) ||
          (element.querySelector && element.querySelector('button, [role="button"], .play, [class*="play"]'));
        if (isPlayerControl) return; // jangan hapus kontrol pemutar (tombol Lanjutkan dll)
        const style = element.style.cssText || '';
        // Deteksi overlay banner berdasarkan style dan posisi
        if ((style.includes('position: fixed') || style.includes('position: absolute')) &&
            (style.includes('background') || style.includes('rgba')) &&
            (style.includes('z-index') || style.includes('top') || style.includes('left'))) {
          const hasAdText = text.includes('Klik Di Mana Saja') || text.includes('Terima kasih sudah mengklik') ||
            text.includes('THIS PLAYER CONTAINS ADS') || text.includes('Click Anywhere to Start') ||
            text.includes('ads') || text.includes('iklan') || text.includes('banner');
          if (hasAdText && !isPlayerControl) {
            element.remove();
            console.log('Removed suspicious overlay banner');
          }
        }
      });
    }
    
    // Jalankan pembersihan setiap 2 detik
    setInterval(removeAds, 2000);
    
    // Observer untuk mendeteksi elemen baru (banner iklan saja) - JANGAN hapus overlay Lanjutkan/Play
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        mutation.addedNodes.forEach(function(node) {
          if (node.nodeType === 1) {
            const element = node;
            const text = (element.textContent || '').trim();
            const isPlayerControl = /lanjutkan|continue|resume|putar|play(video)?|tonton lagi/i.test(text) ||
              (element.querySelector && element.querySelector('button, [role="button"], .play, [class*="play"]'));
            if (isPlayerControl) return;
            const style = element.style.cssText || '';
            var isAdBanner = (text.includes('Klik Di Mana Saja untuk Memulai Film') ||
                 text.includes('Terima kasih sudah mengklik') ||
                 text.includes('THIS PLAYER CONTAINS ADS') ||
                 text.includes('Click Anywhere to Start')) &&
                (style.includes('background') || style.includes('rgba') || style.includes('position') || style.includes('z-index'));
            if (isAdBanner) {
              element.remove();
              console.log('Removed newly added click-to-start banner');
            }
          }
        });
      });
    });
    
    // Mulai observasi perubahan DOM
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    // Blokir form submission iklan
    document.addEventListener('submit', function(e) {
      const form = e.target;
      const action = form.action || '';
      if (action && (action.includes('ads') || action.includes('banner') || action.includes('popup'))) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Blocked ad form submission:', action);
        return false;
      }
    }, true);
    
    // Blokir context menu pada elemen iklan
    document.addEventListener('contextmenu', function(e) {
      const target = e.target;
      const href = target.href || target.getAttribute('href') || '';
      if (href && (href.includes('ads') || href.includes('banner') || href.includes('popup'))) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Blocked ad context menu:', href);
        return false;
      }
    }, true);
    
    // Blokir keyboard events pada elemen iklan
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        const target = e.target;
        const href = target.href || target.getAttribute('href') || '';
        if (href && (href.includes('ads') || href.includes('banner') || href.includes('popup'))) {
          e.preventDefault();
          e.stopPropagation();
          console.log('Blocked ad keyboard event:', href);
          return false;
        }
      }
    }, true);

    // CSS hanya untuk elemen iklan yang jelas (JANGAN sembunyikan overlay kontrol video / Lanjutkan)
    var style = document.createElement('style');
    style.innerHTML = 'iframe[src*="ads"], iframe[src*="doubleclick"], iframe[src*="googlesyndication"], img[src*="ads"], [id*="google_ads"], [class*="google_ads"], [id*="doubleclick"], [class*="doubleclick"], [id*="ad-container"], [class*="ad-container"] { display:none !important; opacity:0 !important; visibility:hidden !important; }';
    document.head.appendChild(style);

    console.log('Enhanced ad blocking script loaded');
  } catch(e) {
    console.log('Error in ad blocking script:', e);
  }
})();
`

type AdBlockContextType = {
  injectedScript: string
  adDomains: string[]
  shouldBlockRequest: (url: string) => boolean
}

const AdBlockContext = createContext<AdBlockContextType | undefined>(undefined)

export const AdBlockProvider = ({ children }: { children: ReactNode }) => {
  const shouldBlockRequest = (url: string) => {
    return adDomains.some((domain) => url.includes(domain))
  }

  return (
    <AdBlockContext.Provider
      value={{
        injectedScript: injectedAdBlockScript,
        adDomains,
        shouldBlockRequest,
      }}
    >
      {children}
    </AdBlockContext.Provider>
  )
}

export const useAdBlock = () => {
  const context = useContext(AdBlockContext)
  if (!context)
    throw new Error('useAdBlock must be used within AdBlockProvider')
  return context
}
