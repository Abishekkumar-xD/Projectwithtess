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
  Clock,
  Sparkles,
  Zap,
  Coffee
} from 'lucide-react';
import { TessaInsightBubble, TessaAvatar } from '../components/TessaAvatar';
import { GlassCard } from '../components/GlassCard';

interface UploadFile {
  id: string;
  file: File;
  progress: number;
  status: 'uploading' | 'processing' | 'completed' | 'error';
  duration?: string;
  waveform?: number[];
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
      duration: '0:00',
      waveform: Array.from({ length: 20 }, () => Math.random() * 100)
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
          const newProgress = Math.min(file.progress + Math.random() * 8, 100);
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
                  setTimeout(() => setShowCelebration(false), 4000);
                }
              }, 3000 + Math.random() * 4000);
            }, 800);
            
            return { ...file, progress: 100, status: 'uploading' };
          }
          return { ...file, progress: newProgress };
        }
        return file;
      }));
    }, 150);
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

  const getTessaComment = (file: UploadFile) => {
    if (file.status === 'uploading') {
      return "Getting this ready for analysis... 📤";
    }
    if (file.status === 'processing') {
      if (file.duration && file.duration.includes('1:')) {
        return "This is a marathon call! Grab some coffee ☕";
      }
      return "Sharpening my detective skills for this one! 🔍";
    }
    if (file.status === 'completed') {
      return "All done! Ready for your review 🎉";
    }
    return "Hmm, this one's giving me trouble 😅";
  };

  return (
    <div className="p-6 pb-20 md:pb-6 space-y-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-2">
            Upload Sales Calls
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Drop your recordings and let Tessa work her magic
          </p>
        </motion.div>

        {/* Tessa's Message */}
        <TessaInsightBubble type="tip">
          <strong>Ready to dissect some sales calls!</strong> 🕵️‍♀️ Drop your files here and I'll put on my detective glasses. 
          I support MP3, WAV, MP4, and MOV files up to 500MB each. 
          <div className="mt-2 text-xs opacity-75">
            <em>Pro tip: The longer the call, the more insights I can uncover! Bring on those marathon sessions 🏃‍♀️</em>
          </div>
        </TessaInsightBubble>

        {/* Upload Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <GlassCard 
            className={`relative p-12 text-center transition-all duration-300 ${
              dragActive
                ? 'border-primary-500 bg-primary-50/50 dark:bg-primary-900/20 scale-[1.02]'
                : 'hover:border-primary-400 dark:hover:border-primary-600'
            }`}
            hover={false}
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
              className="space-y-6"
            >
              <motion.div 
                className="w-20 h-20 bg-gradient-to-br from-primary-500 to-accent-500 rounded-3xl flex items-center justify-center mx-auto shadow-2xl"
                animate={dragActive ? { rotate: [0, 5, -5, 0] } : {}}
                transition={{ duration: 0.5 }}
              >
                <UploadIcon className="w-10 h-10 text-white" />
              </motion.div>
              
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {dragActive ? '🎯 Drop files here!' : '📁 Drag & drop your sales calls'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  or click to browse files
                </p>
                
                <motion.button
                  className="bg-gradient-to-r from-primary-500 to-accent-500 text-white px-8 py-4 rounded-2xl font-semibold hover:from-primary-600 hover:to-accent-600 transition-all shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Choose Files
                  </div>
                </motion.button>
              </div>
              
              <div className="flex items-center justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <FileAudio className="w-4 h-4" />
                  <span>MP3, WAV</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileVideo className="w-4 h-4" />
                  <span>MP4, MOV</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  <span>Max 500MB</span>
                </div>
              </div>
            </motion.div>
          </GlassCard>
        </motion.div>

        {/* File List */}
        <AnimatePresence>
          {uploadFiles.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <GlassCard className="overflow-hidden">
                <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    📤 Upload Queue ({uploadFiles.length})
                  </h3>
                </div>
                
                <div className="divide-y divide-gray-200/50 dark:divide-gray-700/50">
                  {uploadFiles.map((uploadFile) => {
                    const FileIcon = getFileIcon(uploadFile.file);
                    return (
                      <motion.div
                        key={uploadFile.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="p-6 hover:bg-white/40 dark:hover:bg-gray-800/40 transition-all duration-300"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-14 h-14 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                            <FileIcon className="w-7 h-7 text-gray-600 dark:text-gray-400" />
                          </div>
                          
                          <div className="flex-1 min-w-0 space-y-3">
                            <div className="flex items-center justify-between">
                              <div className="flex-1 min-w-0">
                                <h4 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                                  {uploadFile.file.name}
                                </h4>
                                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mt-1">
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
                              </div>
                              
                              <motion.button
                                onClick={() => removeFile(uploadFile.id)}
                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <X className="w-5 h-5" />
                              </motion.button>
                            </div>
                            
                            {/* Waveform Visualization */}
                            {uploadFile.status === 'processing' && uploadFile.waveform && (
                              <div className="flex items-end gap-1 h-8">
                                {uploadFile.waveform.map((height, index) => (
                                  <motion.div
                                    key={index}
                                    className="bg-gradient-to-t from-primary-500 to-accent-500 rounded-full"
                                    style={{ width: '3px' }}
                                    animate={{ height: `${height}%` }}
                                    transition={{ 
                                      duration: 0.5, 
                                      delay: index * 0.1,
                                      repeat: Infinity,
                                      repeatType: "reverse"
                                    }}
                                  />
                                ))}
                              </div>
                            )}
                            
                            {/* Progress Bar */}
                            <div className="space-y-2">
                              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${uploadFile.progress}%` }}
                                  className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
                                  transition={{ duration: 0.3 }}
                                />
                              </div>
                              
                              {/* Status */}
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  {uploadFile.status === 'uploading' && (
                                    <>
                                      <Loader2 className="w-4 h-4 text-primary-500 animate-spin" />
                                      <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                                        Uploading... {Math.round(uploadFile.progress)}%
                                      </span>
                                    </>
                                  )}
                                  {uploadFile.status === 'processing' && (
                                    <>
                                      <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                      >
                                        <Sparkles className="w-4 h-4 text-accent-500" />
                                      </motion.div>
                                      <span className="text-sm font-medium text-accent-600 dark:text-accent-400">
                                        Tessa's analyzing... This might take a moment ⚡
                                      </span>
                                    </>
                                  )}
                                  {uploadFile.status === 'completed' && (
                                    <>
                                      <CheckCircle className="w-4 h-4 text-success-500" />
                                      <span className="text-sm font-medium text-success-600 dark:text-success-400">
                                        Audit complete! Ready for review 🎉
                                      </span>
                                    </>
                                  )}
                                  {uploadFile.status === 'error' && (
                                    <>
                                      <AlertCircle className="w-4 h-4 text-red-500" />
                                      <span className="text-sm font-medium text-red-600 dark:text-red-400">
                                        Upload failed. Please try again.
                                      </span>
                                    </>
                                  )}
                                </div>
                                
                                <span className="text-xs text-gray-500 dark:text-gray-400 italic">
                                  "{getTessaComment(uploadFile)}"
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </GlassCard>
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
              <GlassCard className="p-8 text-center max-w-md">
                <motion.div
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 0.6, repeat: 2 }}
                  className="text-6xl mb-4"
                >
                  🎉
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Upload Successful!
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Tessa is putting on her detective glasses and analyzing your calls now
                </p>
                <div className="mt-4 flex items-center justify-center gap-2 text-sm text-primary-600 dark:text-primary-400">
                  <Coffee className="w-4 h-4" />
                  <span>Perfect time for a coffee break!</span>
                </div>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Enhanced Tessa */}
      <TessaAvatar 
        mood="working" 
        message="Drop those files and watch me work my magic! I'm ready to uncover all the insights 🔍✨"
      />
    </div>
  );
};

export default Upload;