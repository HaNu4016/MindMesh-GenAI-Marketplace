import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Navbar } from '@/components/Navbar';
import { useAuth } from '@/contexts/AuthContext';
import { Camera, Zap, Globe, ArrowRight, Check } from 'lucide-react';

const Index = () => {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: Camera,
      title: t('features.aiGeneration'),
      description: t('features.aiGenerationDesc'),
    },
    {
      icon: Zap,
      title: t('features.smartPricing'),
      description: t('features.smartPricingDesc'),
    },
    {
      icon: Globe,
      title: t('features.multilingual'),
      description: t('features.multilingualDesc'),
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10"></div>
        <div className="container mx-auto px-4 py-20 md:py-32 relative">
          <div className="text-center max-w-4xl mx-auto fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
              {t('home.heroTitle')}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              {t('home.heroSubtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="gradient" size="xl" asChild>
                <Link to={isAuthenticated ? "/add-product" : "/login"} className="flex items-center gap-2">
                  {t('home.getStarted')}
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="xl">
                {t('home.learnMore')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 slide-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('home.features')}</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful AI tools to transform your product photos into compelling listings
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-card">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">{t('home.howItWorks')}</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: 1, title: t('product.uploadPhoto'), desc: 'Upload your product photo' },
              { step: 2, title: 'AI Analysis', desc: 'Our AI analyzes your product' },
              { step: 3, title: t('output.generatedListing'), desc: 'Get title, description & price' },
              { step: 4, title: t('output.copyCaption'), desc: 'Copy and share instantly' },
            ].map((item, index) => (
              <div key={index} className="text-center relative">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">
                  {item.step}
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
                {index < 3 && (
                  <ArrowRight className="hidden md:block absolute top-6 -right-4 h-4 w-4 text-muted-foreground" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 text-center relative">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to boost your sales?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of sellers using AI to create compelling product listings
          </p>
          <Button variant="secondary" size="xl" asChild className="bg-white text-primary hover:bg-white/90">
            <Link to={isAuthenticated ? "/add-product" : "/login"}>
              {t('home.getStarted')} - It's Free
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;