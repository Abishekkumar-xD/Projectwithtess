import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload as UploadIcon, 
  File, 
  X, 
  CheckCircle,
  AlertCircle,
  Loader2,
  FileAudio,
  FileVideo,
  Clock
} from 'lucide-react';
import { TessaMessage } from '../components/Tessa';

interface UploadFile {
  id: string;
  file: File;
  progress: number;
  status: 'uploading' | 'processing' | 'completed' | 'error';
  duration?: string;
}

const Upload: React.FC = () => {
  const [uploadFiles, setUploadFiles] = useState<UploadFile[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = (files: File[]) => {
    const validTypes = ['audio/mpeg', 'audio/wav', 'audio/mp3', 'video/mp4', 'video/quicktime'];
    const validFiles = files.filter(file => validTypes.some(type => file.type.includes(type.split('/')[1])));
    
    if (validFiles.length === 0) {
      alert('Please upload audio (.mp3, .wav) or video (.mp4, .mov) files only.');
      return;
    }

    const newFiles: UploadFile[] = validFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      progress: 0,
      status: 'uploading',
      duration: '0:00'
    }));

    setUploadFiles(prev => [...prev, ...newFiles]);

    // Simulate upload progress
    newFiles.forEach((uploadFile, index) => {
      simulateUpload(uploadFile.id, index);
    });
  };

  const simulateUpload = (fileId: string, index: number) => {
    const interval = setInterval(() => {
      setUploadFiles(prev => prev.map(file => {
        if (file.id === fileId) {
          const newProgress = Math.min(file.progress + Math.random() * 10, 100);
          if (newProgress >= 100) {
            clearInterval(interval);
            // Simulate processing
            setTimeout(() => {
              setUploadFiles(prev => prev.map(f => 
                f.id === fileId 
                  ? { ...f, status: 'processing', duration: `${Math.floor(Math.random() * 60) + 5}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}` }
                  : f
              ));
              
              // Complete processing
              setTimeout(() => {
                setUploadFiles(prev => prev.map(f => 
                  f.id === fileId ? { ...f, status: 'completed' } : f
                ));
                
                if (index === 0) {
                  setShowCelebration(true);
                  setTimeout(() => setShowCelebration(false), 3000);
                }
              }, 2000 + Math.random() * 3000);
            }, 500);
            
            return { ...file, progress: 100, status: 'uploading' };
          }
          return { ...file, progress: newProgress };
        }
        return file;
      }));
    }, 200);
  };

  const removeFile = (fileId: string) => {
    setUploadFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const getFileIcon = (file: File) => {
    if (file.type.includes('audio')) return FileAudio;
    if (file.type.includes('video')) return FileVideo;
    return File;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="p-6 pb-20 md:pb-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-gray-900 dark:text-white mb-2"
          >
            Upload Sales Calls
          </motion.h1>
          <p className="text-gray-600 dark:text-gray-400">
            Upload your sales recordings for AI-powered analysis
          </p>
        </div>

        {/* Tessa's Message */}
        <TessaMessage>
          Ready to dissect some sales calls! 🔍 Drop your files here and I'll put on my detective glasses. 
          Supported formats: MP3, WAV, MP4, MOV. Let's see what stories these calls tell!
        </TessaMessage>

        {/* Upload Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div
            className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all ${
              dragActive
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                : 'border-gray-300 dark:border-dark-700 hover:border-primary-400 dark:hover:border-primary-600'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              id="file-upload"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleFileInput}
              multiple
              accept=".mp3,.wav,.mp4,.mov,audio/*,video/*"
            />
            
            <motion.div
              animate={dragActive ? { scale: 1.05 } : { scale: 1 }}
              className="space-y-4"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto">
                <UploadIcon className="w-8 h-8 text-white" />
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {dragActive ? 'Drop files here!' : 'Drag & drop your sales calls'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  or click to browse files
                </p>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gradient-to-r from-primary-500 to-cyan-500 text-white px-6 py-3 rounded-lg font-medium hover:from-primary-600 hover:to-cyan-600 transition-all"
                >
                  Choose Files
                </motion.button>
              </div>
              
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Supports: MP3, WAV, MP4, MOV • Max size: 500MB per file
              </div>
            </div>
          </div>
        </motion.div>

        {/* File List */}
        <AnimatePresence>
          {uploadFiles.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-700 overflow-hidden"
            >
              <div className="p-6 border-b border-gray-200 dark:border-dark-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Upload Queue ({uploadFiles.length})
                </h3>
              </div>
              
              <div className="divide-y divide-gray-200 dark:divide-dark-700">
                {uploadFiles.map((uploadFile) => {
                  const FileIcon = getFileIcon(uploadFile.file);
                  return (
                    <motion.div
                      key={uploadFile.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="p-6 hover:bg-gray-50 dark:hover:bg-dark-700/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-100 dark:bg-dark-700 rounded-lg flex items-center justify-center flex-shrink-0">
                          <FileIcon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                              {uploadFile.file.name}
                            </p>
                            <button
                              onClick={() => removeFile(uploadFile.id)}
                              className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-2">
                            <span>{formatFileSize(uploadFile.file.size)}</span>
                            {uploadFile.duration && (
                              <>
                                <span>•</span>
                                <div className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  <span>{uploadFile.duration}</span>
                                </div>
                              </>
                            )}
                          </div>
                          
                          {/* Progress Bar */}
                          <div className="w-full bg-gray-200 dark:bg-dark-600 rounded-full h-2 mb-2">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${uploadFile.progress}%` }}
                              className="h-2 bg-gradient-to-r from-primary-500 to-cyan-500 rounded-full"
                            />
                          </div>
                          
                          {/* Status */}
                          <div className="flex items-center gap-2">
                            {uploadFile.status === 'uploading' && (
                              <>
                                <Loader2 className="w-4 h-4 text-primary-500 animate-spin" />
                                <span className="text-sm text-primary-600 dark:text-primary-400">
                                  Uploading... {Math.round(uploadFile.progress)}%
                                </span>
                              </>
                            )}
                            {uploadFile.status === 'processing' && (
                              <>
                                <Loader2 className="w-4 h-4 text-cyan-500 animate-spin" />
                                <span className="text-sm text-cyan-600 dark:text-cyan-400">
                                  Processing with AI... This might take a moment ⚡
                                </span>
                              </>
                            )}
                            {uploadFile.status === 'completed' && (
                              <>
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                <span className="text-sm text-green-600 dark:text-green-400">
                                  Audit complete! Ready for review 🎉
                                </span>
                              </>
                            )}
                            {uploadFile.status === 'error' && (
                              <>
                                <AlertCircle className="w-4 h-4 text-red-500" />
                                <span className="text-sm text-red-600 dark:text-red-400">
                                  Upload failed. Please try again.
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success Celebration */}
        <AnimatePresence>
          {showCelebration && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
            >
              <div className="bg-white dark:bg-dark-800 rounded-2xl p-8 shadow-2xl border border-gray-200 dark:border-dark-700 text-center">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.5, repeat: 3 }}
                  className="text-6xl mb-4"
                >
                  🎉
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Upload Successful!
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Tessa is analyzing your calls now
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Upload;