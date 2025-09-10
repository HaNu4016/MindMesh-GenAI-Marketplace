import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Navigation
      "nav.home": "Home",
      "nav.listings": "My Listings",
      "nav.newListing": "New Listing",
      "nav.profile": "Profile",
      "nav.logout": "Logout",
      "nav.login": "Login",
      "nav.signup": "Sign Up",
      
      // Home Page
      "home.heroTitle": "AI Assistant for Local Artisans",
      "home.heroSubtitle": "Transform your products into compelling listings with AI. Upload photos, get instant descriptions, and boost your sales.",
      "home.getStarted": "Get Started",
      "home.learnMore": "Learn More",
      "home.features": "Features",
      "home.howItWorks": "How It Works",
      
      // Features
      "features.aiGeneration": "AI Generation",
      "features.aiGenerationDesc": "Intelligent titles, descriptions, and hashtags generated from your product photos",
      "features.smartPricing": "Smart Pricing",
      "features.smartPricingDesc": "Get price suggestions based on category, material, and market analysis",
      "features.multilingual": "Multilingual Support",
      "features.multilingualDesc": "Switch between English, Hindi, and Marathi seamlessly",
      
      // Add Product
      "product.add": "Add Product",
      "product.uploadPhoto": "Upload Photo",
      "product.dragDropPhoto": "Drag & drop your product photo here, or click to browse",
      "product.category": "Product Category",
      "product.selectCategory": "Select Category",
      "product.material": "Material",
      "product.size": "Size",
      "product.generateListing": "Generate Listing",
      "product.processing": "Processing...",
      
      // Categories
      "category.clothing": "Clothing",
      "category.electronics": "Electronics",
      "category.homeGarden": "Home & Garden",
      "category.sports": "Sports & Outdoors",
      "category.books": "Books",
      "category.jewelry": "Jewelry",
      "category.toys": "Toys & Games",
      "category.other": "Other",
      
      // AI Output
      "output.generatedListing": "Generated Listing",
      "output.title": "Title",
      "output.description": "Description", 
      "output.hashtags": "Hashtags",
      "output.suggestedPrice": "Suggested Price",
      "output.copyCaption": "Copy Caption",
      "output.shareWhatsApp": "Share to WhatsApp",
      "output.saveListing": "Save Listing",
      "output.editListing": "Edit Listing",
      
      // Listings Page
      "listings.my": "My Listings",
      "listings.drafts": "Drafts",
      "listings.published": "Published",
      "listings.none": "No listings yet. Please add a listing.",
      "listings.createFirst": "Create Your First Listing",
      "listings.viewDetails": "View Details",
      "listings.publish": "Publish",
      
      // Auth
      "auth.welcome": "Welcome",
      "auth.email": "Email",
      "auth.password": "Password",
      "auth.confirmPassword": "Confirm Password",
      "auth.forgotPassword": "Forgot Password?",
      "auth.dontHaveAccount": "Don't have an account?",
      "auth.alreadyHaveAccount": "Already have an account?",
      
      // Common
      "common.save": "Save", 
      "common.cancel": "Cancel",
      "common.edit": "Edit",
      "common.delete": "Delete",
      "common.confirm": "Confirm",
      "common.back": "Back",
      "common.next": "Next",
      "common.loading": "Loading...",
      "common.error": "Error",
      "common.success": "Success",
      "common.copied": "Copied to clipboard!",
      "common.draft": "Draft",
      "common.published": "Published"
    }
  },
  hi: {
    translation: {
      // Navigation
      "nav.home": "होम",
      "nav.listings": "मेरी लिस्टिंग",
      "nav.newListing": "नई लिस्टिंग",
      "nav.profile": "प्रोफाइल",
      "nav.logout": "लॉगआउट",
      "nav.login": "लॉगिन",
      "nav.signup": "साइन अप",
      
      // Home Page
      "home.heroTitle": "स्थानीय कारीगरों के लिए AI सहायक",
      "home.heroSubtitle": "AI के साथ अपने उत्पादों को आकर्षक लिस्टिंग में बदलें। फोटो अपलोड करें, तुरंत विवरण पाएं, और अपनी बिक्री बढ़ाएं।",
      "home.getStarted": "शुरू करें",
      "home.learnMore": "और जानें",
      "home.features": "विशेषताएं",
      "home.howItWorks": "यह कैसे काम करता है",
      
      // Features
      "features.aiGeneration": "AI जेनरेशन",
      "features.aiGenerationDesc": "आपकी उत्पाद तस्वीरों से बुद्धिमान शीर्षक, विवरण और हैशटैग बनाए गए",
      "features.smartPricing": "स्मार्ट प्राइसिंग",
      "features.smartPricingDesc": "श्रेणी, सामग्री और बाज़ार विश्लेषण के आधार पर मूल्य सुझाव प्राप्त करें",
      "features.multilingual": "बहुभाषी समर्थन",
      "features.multilingualDesc": "अंग्रेजी, हिंदी और मराठी के बीच आसानी से स्विच करें",
      
      // Add Product
      "product.add": "उत्पाद जोड़ें",
      "product.uploadPhoto": "फोटो अपलोड करें",
      "product.dragDropPhoto": "अपनी उत्पाद फोटो यहाँ खींचें और छोड़ें, या ब्राउज़ करने के लिए क्लिक करें",
      "product.category": "उत्पाद श्रेणी",
      "product.selectCategory": "श्रेणी चुनें",
      "product.material": "सामग्री",
      "product.size": "आकार",
      "product.generateListing": "लिस्टिंग बनाएं",
      "product.processing": "प्रोसेसिंग...",
      
      // Categories
      "category.clothing": "कपड़े",
      "category.electronics": "इलेक्ट्रॉनिक्स",
      "category.homeGarden": "घर और बगीचा",
      "category.sports": "खेल और आउटडोर",
      "category.books": "किताबें",
      "category.jewelry": "गहने",
      "category.toys": "खिलौने और गेम्स",
      "category.other": "अन्य",
      
      // AI Output
      "output.generatedListing": "बनाई गई लिस्टिंग",
      "output.title": "शीर्षक",
      "output.description": "विवरण",
      "output.hashtags": "हैशटैग",
      "output.suggestedPrice": "सुझाई गई कीमत",
      "output.copyCaption": "कैप्शन कॉपी करें",
      "output.shareWhatsApp": "WhatsApp पर शेयर करें",
      "output.saveListing": "लिस्टिंग सेव करें",
      "output.editListing": "लिस्टिंग संपादित करें",
      
      // Listings Page
      "listings.my": "मेरी लिस्टिंग",
      "listings.drafts": "ड्राफ्ट",
      "listings.published": "प्रकाशित",
      "listings.none": "अभी तक कोई लिस्टिंग नहीं। कृपया एक लिस्टिंग जोड़ें।",
      "listings.createFirst": "अपनी पहली लिस्टिंग बनाएं",
      "listings.viewDetails": "विवरण देखें",
      "listings.publish": "प्रकाशित करें",
      
      // Auth
      "auth.welcome": "स्वागत है",
      "auth.email": "ईमेल",
      "auth.password": "पासवर्ड",
      "auth.confirmPassword": "पासवर्ड की पुष्टि करें",
      "auth.forgotPassword": "पासवर्ड भूल गए?",
      "auth.dontHaveAccount": "खाता नहीं है?",
      "auth.alreadyHaveAccount": "पहले से खाता है?",
      
      // Common
      "common.save": "सेव करें",
      "common.cancel": "रद्द करें",
      "common.edit": "संपादित करें",
      "common.delete": "हटाएं",
      "common.confirm": "पुष्टि करें",
      "common.back": "वापस",
      "common.next": "अगला",
      "common.loading": "लोड हो रहा है...",
      "common.error": "त्रुटि",
      "common.success": "सफलता",
      "common.copied": "क्लिपबोर्ड पर कॉपी किया गया!",
      "common.draft": "ड्राफ्ट",
      "common.published": "प्रकाशित"
    }
  },
  mr: {
    translation: {
      // Navigation
      "nav.home": "होम",
      "nav.listings": "माझ्या लिस्टिंग्स",
      "nav.newListing": "नवीन लिस्टिंग",
      "nav.profile": "प्रोफाइल",
      "nav.logout": "लॉगआउट",
      "nav.login": "लॉगिन",
      "nav.signup": "साइन अप",
      
      // Home Page
      "home.heroTitle": "स्थानिक कारागिरांसाठी एआय असिस्टंट",
      "home.heroSubtitle": "AI सह आपली उत्पादने आकर्षक लिस्टिंगमध्ये बदला. फोटो अपलोड करा, त्वरित वर्णने मिळवा आणि आपली विक्री वाढवा.",
      "home.getStarted": "सुरुवात करा",
      "home.learnMore": "अधिक जाणा",
      "home.features": "वैशिष्ट्ये",
      "home.howItWorks": "हे कसे कार्य करते",
      
      // Features
      "features.aiGeneration": "AI जनरेशन",
      "features.aiGenerationDesc": "आपल्या उत्पादन फोटोंवरून बुद्धिमान शीर्षके, वर्णने आणि हॅशटॅग तयार केले",
      "features.smartPricing": "स्मार्ट प्राइसिंग",
      "features.smartPricingDesc": "श्रेणी, साहित्य आणि बाजार विश्लेषणावर आधारित किंमत सूचना मिळवा",
      "features.multilingual": "बहुभाषिक समर्थन",
      "features.multilingualDesc": "इंग्रजी, हिंदी आणि मराठी यांच्यात सहजपणे स्विच करा",
      
      // Add Product
      "product.add": "उत्पादन जोडा",
      "product.uploadPhoto": "फोटो अपलोड करा",
      "product.dragDropPhoto": "आपला उत्पादन फोटो येथे ड्रॅग आणि ड्रॉप करा, किंवा ब्राउझ करण्यासाठी क्लिक करा",
      "product.category": "उत्पादन श्रेणी",
      "product.selectCategory": "श्रेणी निवडा",
      "product.material": "साहित्य",
      "product.size": "आकार",
      "product.generateListing": "लिस्टिंग तयार करा",
      "product.processing": "प्रक्रिया करत आहे...",
      
      // Categories
      "category.clothing": "कपडे",
      "category.electronics": "इलेक्ट्रॉनिक्स",
      "category.homeGarden": "घर आणि बाग",
      "category.sports": "खेळ आणि आउटडोअर",
      "category.books": "पुस्तके",
      "category.jewelry": "दागिने",
      "category.toys": "खेळणी आणि खेळ",
      "category.other": "इतर",
      
      // AI Output  
      "output.generatedListing": "तयार केलेली लिस्टिंग",
      "output.title": "शीर्षक",
      "output.description": "वर्णन",
      "output.hashtags": "हॅशटॅग",
      "output.suggestedPrice": "सूचित किंमत",
      "output.copyCaption": "कॅप्शन कॉपी करा",
      "output.shareWhatsApp": "WhatsApp वर शेअर करा",
      "output.saveListing": "लिस्टिंग सेव्ह करा",
      "output.editListing": "लिस्टिंग संपादित करा",
      
      // Listings Page
      "listings.my": "माझ्या लिस्टिंग्स",
      "listings.drafts": "ड्राफ्ट्स",
      "listings.published": "प्रकाशित",
      "listings.none": "अद्याप कोणत्या लिस्टिंग्स नाहीत. कृपया एक लिस्टिंग जोडा.",
      "listings.createFirst": "आपली पहिली लिस्टिंग तयार करा",
      "listings.viewDetails": "तपशील पहा",
      "listings.publish": "प्रकाशित करा",
      
      // Auth
      "auth.welcome": "स्वागत आहे",
      "auth.email": "ईमेल",
      "auth.password": "पासवर्ड",
      "auth.confirmPassword": "पासवर्डची पुष्टी करा",
      "auth.forgotPassword": "पासवर्ड विसरला?",
      "auth.dontHaveAccount": "खाते नाही?",
      "auth.alreadyHaveAccount": "आधीपासून खाते आहे?",
      
      // Common
      "common.save": "सेव्ह करा",
      "common.cancel": "रद्द करा",
      "common.edit": "संपादित करा",
      "common.delete": "हटवा",
      "common.confirm": "पुष्टी करा",
      "common.back": "मागे",
      "common.next": "पुढे",
      "common.loading": "लोड होत आहे...",
      "common.error": "त्रुटी",
      "common.success": "यश",
      "common.copied": "क्लिपबोर्डवर कॉपी केले!",
      "common.draft": "ड्राफ्ट",
      "common.published": "प्रकाशित"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;