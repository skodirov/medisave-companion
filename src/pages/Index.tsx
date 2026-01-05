import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { Button } from '@/components/ui/button';
import { Search, Pill, TrendingDown, Shield, Sparkles } from 'lucide-react';

const Index: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Search,
      title: 'Search Brands',
      description: 'Find your branded medicine',
    },
    {
      icon: TrendingDown,
      title: 'See Savings',
      description: 'Compare generic alternatives',
    },
    {
      icon: Sparkles,
      title: 'AI Insights',
      description: 'Understand equivalence easily',
    },
  ];

  return (
    <MobileLayout>
      <div className="px-6 pt-12 pb-8">
        {/* Hero Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-primary shadow-primary mb-6">
            <Pill className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-extrabold text-foreground mb-3">
            MediSave
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Find affordable generic alternatives to expensive branded medicines
          </p>
        </div>

        {/* CTA Button */}
        <Button
          size="lg"
          className="w-full mb-10"
          onClick={() => navigate('/search')}
        >
          <Search className="w-5 h-5" />
          Start Searching
        </Button>

        {/* Features */}
        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            How it works
          </h2>
          <div className="space-y-3">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="flex items-center gap-4 p-4 rounded-2xl bg-card border-2 border-border animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Badge */}
        <div className="mt-10 flex items-center justify-center gap-2 text-muted-foreground">
          <Shield className="w-4 h-4" />
          <span className="text-xs">Always consult your pharmacist or doctor</span>
        </div>
      </div>
    </MobileLayout>
  );
};

export default Index;
