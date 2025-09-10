import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Navbar } from '@/components/Navbar';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Plus, Eye, Share2, Trash2, Edit } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Listing {
  id: string;
  title: string;
  description: string;
  hashtags: string[];
  suggestedPrice: string;
  category: string;
  material: string;
  size: string;
  status: 'draft' | 'published';
  createdAt: string;
  photoUrl?: string | null;
}

const Listings = () => {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [listings, setListings] = useState<Listing[]>([]);
  const [activeTab, setActiveTab] = useState('all');

  // Redirect if not authenticated
  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  useEffect(() => {
    const savedListings = JSON.parse(localStorage.getItem('savedListings') || '[]');
    setListings(savedListings);
  }, []);

  const filteredListings = listings.filter(listing => {
    if (activeTab === 'all') return true;
    if (activeTab === 'drafts') return listing.status === 'draft';
    if (activeTab === 'published') return listing.status === 'published';
    return true;
  });

  const publishListing = (id: string) => {
    const updatedListings = listings.map(listing => 
      listing.id === id ? { ...listing, status: 'published' as const } : listing
    );
    setListings(updatedListings);
    localStorage.setItem('savedListings', JSON.stringify(updatedListings));
    
    toast({
      title: t('common.success'),
      description: 'Listing published successfully!'
    });
  };

  const deleteListing = (id: string) => {
    const updatedListings = listings.filter(listing => listing.id !== id);
    setListings(updatedListings);
    localStorage.setItem('savedListings', JSON.stringify(updatedListings));
    
    toast({
      title: t('common.success'),
      description: 'Listing deleted successfully!'
    });
  };

  const copyCaption = (listing: Listing) => {
    const caption = `${listing.title}\n\n${listing.description}\n\n${listing.hashtags.join(' ')}\n\nPrice: ${listing.suggestedPrice}`;
    
    navigator.clipboard.writeText(caption).then(() => {
      toast({
        title: t('common.success'),
        description: t('common.copied')
      });
    });
  };

  const shareToWhatsApp = (listing: Listing) => {
    const caption = `${listing.title}\n\n${listing.description}\n\n${listing.hashtags.join(' ')}\n\nPrice: ${listing.suggestedPrice}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(caption)}`;
    window.open(whatsappUrl, '_blank');
  };

  const EmptyState = () => (
    <div className="text-center py-16">
      <div className="w-24 h-24 bg-gradient-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
        <Plus className="h-12 w-12 text-primary" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{t('listings.none')}</h3>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
        Start by uploading your first product photo and let AI create amazing listings for you.
      </p>
      <Button variant="gradient" size="lg" asChild>
        <Link to="/add-product" className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          {t('listings.createFirst')}
        </Link>
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">{t('listings.my')}</h1>
            <p className="text-muted-foreground mt-1">
              Manage your product listings and track performance
            </p>
          </div>
          <Button variant="gradient" asChild>
            <Link to="/add-product" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              {t('nav.newListing')}
            </Link>
          </Button>
        </div>

        {listings.length === 0 ? (
          <EmptyState />
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="all">All ({listings.length})</TabsTrigger>
              <TabsTrigger value="drafts">
                {t('listings.drafts')} ({listings.filter(l => l.status === 'draft').length})
              </TabsTrigger>
              <TabsTrigger value="published">
                {t('listings.published')} ({listings.filter(l => l.status === 'published').length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="space-y-6">
              {filteredListings.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    No {activeTab === 'all' ? '' : activeTab} listings found.
                  </p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredListings.map((listing) => (
                    <Card key={listing.id} className="shadow-md hover:shadow-lg transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between mb-2">
                          <Badge variant={listing.status === 'draft' ? 'secondary' : 'default'}>
                            {listing.status === 'draft' ? t('common.draft') : t('common.published')}
                          </Badge>
                          <div className="text-xs text-muted-foreground">
                            {new Date(listing.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                        
                        {listing.photoUrl && (
                          <div className="relative">
                            <img 
                              src={listing.photoUrl} 
                              alt={listing.title}
                              className={cn(
                                "w-full h-40 object-cover rounded-md",
                                listing.status === 'draft' && "draft-blur"
                              )}
                            />
                            {listing.status === 'draft' && (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <Badge variant="secondary" className="bg-white/90">
                                  {t('common.draft')}
                                </Badge>
                              </div>
                            )}
                          </div>
                        )}
                        
                        <CardTitle className="text-lg leading-tight">{listing.title}</CardTitle>
                      </CardHeader>
                      
                      <CardContent className="pt-0">
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {listing.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-1 mb-3">
                          {listing.hashtags.slice(0, 3).map((tag, index) => (
                            <span key={index} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                              {tag}
                            </span>
                          ))}
                          {listing.hashtags.length > 3 && (
                            <span className="text-xs text-muted-foreground">
                              +{listing.hashtags.length - 3} more
                            </span>
                          )}
                        </div>
                        
                        <div className="text-lg font-bold text-primary mb-4">
                          {listing.suggestedPrice}
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => copyCaption(listing)}
                            className="flex-1"
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            Copy
                          </Button>
                          
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => shareToWhatsApp(listing)}
                            className="flex-1"
                          >
                            <Share2 className="h-3 w-3 mr-1" />
                            Share
                          </Button>
                          
                          {listing.status === 'draft' && (
                            <Button
                              size="sm"
                              variant="default"
                              onClick={() => publishListing(listing.id)}
                              className="w-full mt-2"
                            >
                              {t('listings.publish')}
                            </Button>
                          )}
                          
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => deleteListing(listing.id)}
                            className="w-full mt-2"
                          >
                            <Trash2 className="h-3 w-3 mr-1" />
                            {t('common.delete')}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
};

export default Listings;