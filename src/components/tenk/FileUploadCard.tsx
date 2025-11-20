import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, FileText, CheckCircle } from 'lucide-react';

export default function FileUploadCard() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setUploadedFile(files[0].name);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setUploadedFile(files[0].name);
    }
  };

  return (
    <Card className="p-6 bg-slate-800 border-slate-700">
      <h3 className="text-lg font-semibold text-slate-100 mb-4">Upload 10-K Filing</h3>
      
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragging
            ? 'border-blue-500 bg-blue-500/10'
            : 'border-slate-600 hover:border-slate-500'
        }`}
      >
        {uploadedFile ? (
          <div className="flex flex-col items-center gap-3">
            <CheckCircle className="h-12 w-12 text-green-400" />
            <div>
              <p className="text-slate-100 font-medium">{uploadedFile}</p>
              <p className="text-sm text-slate-400 mt-1">File uploaded successfully</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setUploadedFile(null)}
              className="mt-2 border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              Upload Different File
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <Upload className="h-12 w-12 text-slate-400" />
            <div>
              <p className="text-slate-100 font-medium">Drop your 10-K file here</p>
              <p className="text-sm text-slate-400 mt-1">or click to browse</p>
            </div>
            <label htmlFor="file-upload">
              <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700" asChild>
                <span>
                  <FileText className="h-4 w-4 mr-2" />
                  Select File
                </span>
              </Button>
            </label>
            <input
              id="file-upload"
              type="file"
              accept=".pdf,.txt,.html"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
        )}
      </div>
    </Card>
  );
}
