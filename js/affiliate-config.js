/* ============================================================
   BLUSHLESS — Affiliate & Shop Configuration
   Centralized retailer links with affiliate tracking.

   HOW TO USE:
   1. Replace placeholder affiliate IDs with your real ones
   2. Each product maps to comparable products on real retailers
   3. Links auto-generate with your affiliate tags
   4. Commission rates noted per platform

   AFFILIATE PROGRAMS TO JOIN:
   - Amazon Associates: https://affiliate-program.amazon.com (~1-3% beauty)
   - Sephora (Rakuten): https://www.rakuten.com/r/sephora (~5%)
   - Ulta (CJ Affiliate): https://www.cj.com (~2-5%)
   - Nordstrom (Rakuten): https://www.rakuten.com/r/nordstrom (~2-5%)
   - Dermstore (ShareASale): https://www.shareasale.com (~5-15%)
   ============================================================ */

var BlushlessShop = (function () {
    'use strict';

    // ==================== AFFILIATE IDS ====================
    // Replace these with your actual affiliate/associate IDs
    var affiliateIds = {
        amazon: 'blushless-20',          // Amazon Associates tag
        sephora: 'blushless',            // Rakuten/Sephora publisher ID
        ulta: 'blushless',               // CJ Affiliate publisher ID
        nordstrom: 'blushless',          // Rakuten/Nordstrom publisher ID
        dermstore: 'blushless',          // ShareASale affiliate ID
        beautylish: 'blushless',         // Beautylish affiliate ID
        cultbeauty: 'blushless'          // Cult Beauty affiliate ID
    };

    // ==================== RETAILER METADATA ====================
    var retailers = {
        amazon: {
            name: 'Amazon',
            icon: 'amazon',
            color: '#FF9900',
            baseUrl: 'https://www.amazon.com',
            tagParam: 'tag',
            commission: '1-3%',
            shipping: 'Free with Prime'
        },
        sephora: {
            name: 'Sephora',
            icon: 'sephora',
            color: '#000000',
            baseUrl: 'https://www.sephora.com',
            tagParam: 'om_mmc',
            commission: '~5%',
            shipping: 'Free over $35'
        },
        ulta: {
            name: 'Ulta Beauty',
            icon: 'ulta',
            color: '#E4002B',
            baseUrl: 'https://www.ulta.com',
            tagParam: 'cmpid',
            commission: '2-5%',
            shipping: 'Free over $35'
        },
        nordstrom: {
            name: 'Nordstrom',
            icon: 'nordstrom',
            color: '#1B1B1B',
            baseUrl: 'https://www.nordstrom.com',
            tagParam: 'cm_mmc',
            commission: '2-5%',
            shipping: 'Free shipping & returns'
        },
        dermstore: {
            name: 'Dermstore',
            icon: 'dermstore',
            color: '#2D2D2D',
            baseUrl: 'https://www.dermstore.com',
            tagParam: 'affid',
            commission: '5-15%',
            shipping: 'Free over $50'
        }
    };

    // ==================== PRODUCT CATALOG ====================
    // Each Blushless product maps to comparable real products
    // Update these URLs with actual product links + your affiliate tags
    var products = {
        'architecture-palette': {
            name: 'The Architecture Palette',
            blushlessPrice: '$68',
            category: 'Contour & Sculpt',
            retailers: [
                {
                    platform: 'sephora',
                    productName: 'Contour & Sculpt Palette',
                    url: '#sephora-link',
                    price: '$68.00',
                    badge: 'Best Match',
                    inStock: true
                },
                {
                    platform: 'nordstrom',
                    productName: 'Architecture Sculpt Palette',
                    url: '#nordstrom-link',
                    price: '$68.00',
                    badge: 'Free Returns',
                    inStock: true
                },
                {
                    platform: 'amazon',
                    productName: 'Architecture Palette — Sculpt Kit',
                    url: '#amazon-link',
                    price: '$68.00',
                    badge: 'Prime Eligible',
                    inStock: true
                },
                {
                    platform: 'ulta',
                    productName: 'The Architecture Palette',
                    url: '#ulta-link',
                    price: '$68.00',
                    badge: null,
                    inStock: true
                }
            ]
        },
        'matte-authority-lips': {
            name: 'Matte Authority Lips',
            blushlessPrice: '$34',
            category: 'Lip Color',
            retailers: [
                {
                    platform: 'sephora',
                    productName: 'Matte Authority Lipstick',
                    url: '#sephora-link',
                    price: '$34.00',
                    badge: 'Best Seller',
                    inStock: true
                },
                {
                    platform: 'ulta',
                    productName: 'Matte Authority Lips',
                    url: '#ulta-link',
                    price: '$34.00',
                    badge: null,
                    inStock: true
                },
                {
                    platform: 'nordstrom',
                    productName: 'Authority Matte Lip Color',
                    url: '#nordstrom-link',
                    price: '$34.00',
                    badge: 'Free Returns',
                    inStock: true
                },
                {
                    platform: 'amazon',
                    productName: 'Matte Authority Lips — 7 Shades',
                    url: '#amazon-link',
                    price: '$34.00',
                    badge: 'Prime Eligible',
                    inStock: true
                }
            ]
        },
        'brow-control': {
            name: 'Brow Control System',
            blushlessPrice: '$24 — $42',
            category: 'Brow',
            retailers: [
                {
                    platform: 'sephora',
                    productName: 'Brow Control Micro-Pencil',
                    url: '#sephora-link',
                    price: '$24.00',
                    badge: 'Starts at',
                    inStock: true
                },
                {
                    platform: 'ulta',
                    productName: 'Brow Control Full System',
                    url: '#ulta-link',
                    price: '$42.00',
                    badge: 'Complete Set',
                    inStock: true
                },
                {
                    platform: 'amazon',
                    productName: 'Brow Control — Precision Pencil',
                    url: '#amazon-link',
                    price: '$24.00',
                    badge: 'Prime Eligible',
                    inStock: true
                },
                {
                    platform: 'dermstore',
                    productName: 'Brow Control Sculpting Pomade',
                    url: '#dermstore-link',
                    price: '$28.00',
                    badge: null,
                    inStock: true
                }
            ]
        },
        'shadow-structure': {
            name: 'Shadow Structure Kits',
            blushlessPrice: '$52',
            category: 'Eye Shadow',
            retailers: [
                {
                    platform: 'sephora',
                    productName: 'Shadow Structure Kit',
                    url: '#sephora-link',
                    price: '$52.00',
                    badge: 'Editor Pick',
                    inStock: true
                },
                {
                    platform: 'nordstrom',
                    productName: 'Shadow Structure Palette',
                    url: '#nordstrom-link',
                    price: '$52.00',
                    badge: 'Free Returns',
                    inStock: true
                },
                {
                    platform: 'amazon',
                    productName: 'Shadow Structure — 7 Shades',
                    url: '#amazon-link',
                    price: '$52.00',
                    badge: 'Prime Eligible',
                    inStock: true
                },
                {
                    platform: 'ulta',
                    productName: 'Shadow Structure Kits',
                    url: '#ulta-link',
                    price: '$52.00',
                    badge: null,
                    inStock: true
                }
            ]
        },
        'complexion-clarity': {
            name: 'Complexion Clarity Line',
            blushlessPrice: '$38 — $89',
            category: 'Foundation',
            retailers: [
                {
                    platform: 'sephora',
                    productName: 'Complexion Clarity Foundation',
                    url: '#sephora-link',
                    price: '$38.00',
                    badge: '42 Shades',
                    inStock: true
                },
                {
                    platform: 'ulta',
                    productName: 'Complexion Clarity Full Set',
                    url: '#ulta-link',
                    price: '$89.00',
                    badge: 'Complete System',
                    inStock: true
                },
                {
                    platform: 'nordstrom',
                    productName: 'Complexion Clarity Foundation',
                    url: '#nordstrom-link',
                    price: '$38.00',
                    badge: 'Free Returns',
                    inStock: true
                },
                {
                    platform: 'dermstore',
                    productName: 'Complexion Clarity Line',
                    url: '#dermstore-link',
                    price: '$38.00',
                    badge: 'Expert Picks',
                    inStock: true
                }
            ]
        }
    };

    // ==================== LINK BUILDER ====================
    function buildAffiliateUrl(platform, baseProductUrl) {
        var retailer = retailers[platform];
        var tag = affiliateIds[platform];
        if (!retailer || !tag) return baseProductUrl;

        var separator = baseProductUrl.indexOf('?') > -1 ? '&' : '?';
        return baseProductUrl + separator + retailer.tagParam + '=' + tag;
    }

    // ==================== PUBLIC API ====================
    return {
        affiliateIds: affiliateIds,
        retailers: retailers,
        products: products,
        buildAffiliateUrl: buildAffiliateUrl,

        getProduct: function (slug) {
            return products[slug] || null;
        },

        getRetailer: function (platform) {
            return retailers[platform] || null;
        },

        getRetailerLinks: function (slug) {
            var product = products[slug];
            if (!product) return [];
            return product.retailers.map(function (r) {
                return {
                    platform: r.platform,
                    retailerName: retailers[r.platform].name,
                    retailerColor: retailers[r.platform].color,
                    productName: r.productName,
                    url: buildAffiliateUrl(r.platform, r.url),
                    price: r.price,
                    badge: r.badge,
                    inStock: r.inStock,
                    shipping: retailers[r.platform].shipping,
                    commission: retailers[r.platform].commission
                };
            });
        },

        // Track click events (integrate with analytics)
        trackClick: function (productSlug, platform) {
            if (typeof gtag === 'function') {
                gtag('event', 'affiliate_click', {
                    product: productSlug,
                    retailer: platform,
                    event_category: 'shop'
                });
            }
            if (typeof fbq === 'function') {
                fbq('track', 'InitiateCheckout', {
                    content_name: productSlug,
                    content_category: platform
                });
            }
        }
    };
})();
