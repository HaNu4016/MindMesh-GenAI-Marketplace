import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Navbar } from '@/components/Navbar';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Upload, Camera, Loader2, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductData {
  photo: File | null;
  category: string;
  material: string;
  size: string;
}

interface AIOutput {
  title: string;
  description: string;
  hashtags: string[];
  suggestedPrice: string;
}

const AddProduct = () => {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState<ProductData>({
    photo: null,
    category: '',
    material: '',
    size: '',
  });
  const [aiOutput, setAiOutput] = useState<AIOutput | null>(null);

  // Redirect if not authenticated
  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setProductData(prev => ({ ...prev, photo: file }));
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: 1
  });

  const categories = [
    { value: 'clothing', label: t('category.clothing') },
    { value: 'electronics', label: t('category.electronics') },
    { value: 'home', label: t('category.homeGarden') },
    { value: 'sports', label: t('category.sports') },
    { value: 'books', label: t('category.books') },
    { value: 'jewelry', label: t('category.jewelry') },
    { value: 'toys', label: t('category.toys') },
    { value: 'other', label: t('category.other') },
  ];

  const handleInputChange = (field: keyof ProductData, value: string) => {
    setProductData(prev => ({ ...prev, [field]: value }));
  };

  const generateListing = async () => {
    if (!productData.photo || !productData.category) {
      toast({
        title: t('common.error'),
        description: 'Please upload a photo and select a category',
        variant: 'destructive'
      });
      return;
    }

    setLoading(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const mockOutput: AIOutput = {
        title: `Premium ${productData.category} - High Quality`,
        description: `Beautiful ${productData.category.toLowerCase()} made with ${productData.material || 'premium materials'}. Perfect for everyday use. ${productData.size ? `Available in ${productData.size} size.` : ''} This item combines style and functionality, making it an excellent choice for anyone looking for quality and design.`,
        hashtags: [`#${productData.category}`, '#premium', '#quality', '#style', '#fashion', '#sale'],
        suggestedPrice: productData.category === 'electronics' ? '₹24,999-41,499' : 
                       productData.category === 'jewelry' ? '₹12,399-24,899' : 
                       productData.category === 'clothing' ? '₹4,099-8,249' : '₹2,449-6,599'
      };
      
      setAiOutput(mockOutput);
      setStep(2);
      setLoading(false);
      
      toast({
        title: t('common.success'),
        description: 'Listing generated successfully!'
      });
    }, 3000);
  };

  const copyCaption = () => {
    if (!aiOutput) return;
    
    const caption = `${aiOutput.title}\n\n${aiOutput.description}\n\n${aiOutput.hashtags.join(' ')}\n\nPrice: ${aiOutput.suggestedPrice}`;
    
    navigator.clipboard.writeText(caption).then(() => {
      toast({
        title: t('common.success'),
        description: t('common.copied')
      });
    });
  };

  const shareToWhatsApp = () => {
    if (!aiOutput) return;
    
    const caption = `${aiOutput.title}\n\n${aiOutput.description}\n\n${aiOutput.hashtags.join(' ')}\n\nPrice: ${aiOutput.suggestedPrice}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(caption)}`;
    window.open(whatsappUrl, '_blank');
  };

  const saveListing = () => {
    // Mock save functionality
    const savedListings = JSON.parse(localStorage.getItem('savedListings') || '[]');
    const newListing = {
      id: Date.now().toString(),
      ...productData,
      ...aiOutput,
      status: 'draft',
      createdAt: new Date().toISOString(),
      photoUrl: productData.photo ? URL.createObjectURL(productData.photo) : null,
    };
    
    savedListings.push(newListing);
    localStorage.setItem('savedListings', JSON.stringify(savedListings));
    
    toast({
      title: t('common.success'),
      description: 'Listing saved as draft!'
    });
    
    navigate('/listings');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress Indicator */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-4">
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium",
                step >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              )}>
                1
              </div>
              <div className={cn(
                "w-16 h-1 rounded",
                step >= 2 ? "bg-primary" : "bg-muted"
              )} />
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium",
                step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              )}>
                2
              </div>
            </div>
          </div>

          {step === 1 && (
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-center">{t('product.add')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Photo Upload */}
                <div className="space-y-2">
                  <Label>{t('product.uploadPhoto')}</Label>
                  <div
                    {...getRootProps()}
                    className={cn(
                      "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
                      isDragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                    )}
                  >
                    <input {...getInputProps()} />
                    {productData.photo ? (
                      <div className="space-y-2">
                        <img 
                          src={URL.createObjectURL(productData.photo)} 
                          alt="Product preview" 
                          className="mx-auto max-h-32 rounded-lg"
                        />
                        <p className="text-sm text-muted-foreground">{productData.photo.name}</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Camera className="mx-auto h-12 w-12 text-muted-foreground" />
                        <p className="text-muted-foreground">
                          {isDragActive ? 'Drop the photo here...' : t('product.dragDropPhoto')}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Category Selection */}
                <div className="space-y-2">
                  <Label>{t('product.category')}</Label>
                  <Select onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('product.selectCategory')} />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Optional Fields */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>{t('product.material')}</Label>
                    <Input
                      placeholder="e.g., Cotton, Leather, Metal"
                      value={productData.material}
                      onChange={(e) => handleInputChange('material', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{t('product.size')}</Label>
                    <Input
                      placeholder="e.g., Large, Medium, 10x15 cm"
                      value={productData.size}
                      onChange={(e) => handleInputChange('size', e.target.value)}
                    />
                  </div>
                </div>

                <Button 
                  onClick={generateListing} 
                  disabled={loading || !productData.photo || !productData.category}
                  className="w-full"
                  variant="gradient"
                  size="lg"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t('product.processing')}
                    </>
                  ) : (
                    <>
                      {t('product.generateListing')}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          )}

          {step === 2 && aiOutput && (
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-center">{t('output.generatedListing')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Photo Preview */}
                  <div className="space-y-4">
                    {productData.photo && (
                      <img 
                        src={URL.createObjectURL(productData.photo)} 
                        alt="Product" 
                        className="w-full rounded-lg shadow-md"
                      />
                    )}
                  </div>

                  {/* Generated Content */}
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">{t('output.title')}</Label>
                      <p className="text-lg font-semibold mt-1">{aiOutput.title}</p>
                    </div>

                    <div>
                      <Label className="text-sm font-medium">{t('output.description')}</Label>
                      <p className="mt-1 text-muted-foreground leading-relaxed">{aiOutput.description}</p>
                    </div>

                    <div>
                      <Label className="text-sm font-medium">{t('output.hashtags')}</Label>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {aiOutput.hashtags.map((tag, index) => (
                          <span key={index} className="bg-primary/10 text-primary px-2 py-1 rounded-md text-sm">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium">{t('output.suggestedPrice')}</Label>
                      <p className="text-xl font-bold text-primary mt-1">{aiOutput.suggestedPrice}</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button onClick={copyCaption} variant="outline" className="flex-1">
                    {t('output.copyCaption')}
                  </Button>
                  <Button onClick={shareToWhatsApp} variant="accent" className="flex-1">
                    {t('output.shareWhatsApp')}
                  </Button>
                  <Button onClick={saveListing} variant="gradient" className="flex-1">
                    {t('output.saveListing')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddProduct;