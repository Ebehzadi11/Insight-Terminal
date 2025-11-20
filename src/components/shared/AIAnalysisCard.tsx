import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, Loader2 } from 'lucide-react';

interface AIAnalysisCardProps {
  title: string;
  description: string;
  onGenerate: () => Promise<string>;
}

export default function AIAnalysisCard({ title, description, onGenerate }: AIAnalysisCardProps) {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await onGenerate();
      setAnalysis(result);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to generate analysis. Please try again.';
      setError(errorMessage);
      console.error('Error generating analysis:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6 bg-card border-border">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <Sparkles className="h-6 w-6 text-primary" />
      </div>

      {error && (
        <div className="mb-4 p-3 bg-destructive/10 border border-destructive/50 rounded-lg">
          <p className="text-destructive text-sm">{error}</p>
        </div>
      )}

      {!analysis ? (
        <Button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Generating Analysis...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4 mr-2" />
              Generate AI Analysis
            </>
          )}
        </Button>
      ) : (
        <div className="space-y-4">
          <div className="bg-muted/50 rounded-lg p-4 border border-border">
            <p className="text-foreground text-sm leading-relaxed whitespace-pre-line">{analysis}</p>
          </div>
          <Button
            onClick={handleGenerate}
            variant="outline"
            size="sm"
            disabled={loading}
            className="border-border text-foreground hover:bg-accent"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Regenerating...
              </>
            ) : (
              'Regenerate Analysis'
            )}
          </Button>
        </div>
      )}
    </Card>
  );
}
