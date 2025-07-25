import { useCallback, useState } from 'react'
import { Upload, FileText, X, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button-custom'

interface UploadCardProps {
  title: string
  description: string
  acceptedTypes?: string
  onFileUpload?: (file: File) => void
  className?: string
}

const UploadCard = ({ 
  title, 
  description, 
  acceptedTypes = ".pdf,.doc,.docx", 
  onFileUpload,
  className = "" 
}: UploadCardProps) => {
  const [dragActive, setDragActive] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle')

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0])
    }
  }, [])

  const handleFileUpload = (file: File) => {
    setUploadStatus('uploading')
    setUploadedFile(file)
    
    // Simulate upload process
    setTimeout(() => {
      setUploadStatus('success')
      onFileUpload?.(file)
    }, 1500)
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0])
    }
  }

  const removeFile = () => {
    setUploadedFile(null)
    setUploadStatus('idle')
  }

  return (
    <div className={`glass-card p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-text-heading mb-2">{title}</h3>
      <p className="text-text-body mb-4">{description}</p>
      
      {uploadStatus === 'success' && uploadedFile ? (
        <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center space-x-3">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <div>
              <p className="font-medium text-green-800">{uploadedFile.name}</p>
              <p className="text-sm text-green-600">Upload successful</p>
            </div>
          </div>
          <button onClick={removeFile} className="text-green-600 hover:text-green-800">
            <X className="h-5 w-5" />
          </button>
        </div>
      ) : (
        <div
          className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
            dragActive 
              ? 'border-primary bg-primary/5' 
              : 'border-gray-300 hover:border-primary hover:bg-primary/5'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept={acceptedTypes}
            onChange={handleFileInput}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={uploadStatus === 'uploading'}
          />
          
          <div className="flex flex-col items-center space-y-4">
            {uploadStatus === 'uploading' ? (
              <>
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                <p className="text-primary font-medium">Uploading...</p>
              </>
            ) : (
              <>
                <div className="p-3 bg-primary/10 rounded-full">
                  <Upload className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <p className="text-lg font-medium text-text-heading">
                    Drag & drop your file here
                  </p>
                  <p className="text-text-muted">or click to browse</p>
                </div>
                <Button variant="outline" size="sm">
                  Choose File
                </Button>
                <p className="text-xs text-text-muted">
                  Supported formats: PDF, DOC, DOCX (max 10MB)
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default UploadCard