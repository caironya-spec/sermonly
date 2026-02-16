import React, { useState } from 'react';
import { Header } from './components/Header';
import { SermonInput } from './components/SermonInput';
import { SummaryControls } from './components/SummaryControls';
import { SummaryResult } from './components/SummaryResult';
import { Footer } from './components/Footer';
import { summarizeSermon } from './services/geminiService';
import { AlertCircle, Sparkles, ArrowRight } from 'lucide-react';

const App: React.FC = () => {
  const [sermonText, setSermonText] = useState<string>('');
  const [summaryLength, setSummaryLength] = useState<number>(400);
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSummarize = async () => {
    if (!sermonText.trim()) {
      setError('요약할 설교문 내용을 입력해주세요.');
      return;
    }
    
    if (sermonText.length < 50) {
       setError('설교문이 너무 짧습니다. 좀 더 긴 내용을 입력해주세요.');
       return;
    }

    setLoading(true);
    setError(null);
    setSummary(null);

    try {
      const result = await summarizeSermon(sermonText, summaryLength);
      setSummary(result);
    } catch (err: any) {
      console.error(err);
      setError(err.message || '요약 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSermonText('');
    setSummary(null);
    setError(null);
    setSummaryLength(400);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-10 max-w-6xl">
        <div className="text-center mb-10 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3 tracking-tight">
            복잡한 설교, <span className="text-brand-600">핵심만 깊이있게</span>
          </h2>
          <p className="text-slate-500 text-lg">AI가 전하는 은혜로운 요약 서비스를 경험해보세요.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Input and Controls */}
          <div className="lg:col-span-5 flex flex-col space-y-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            
            {/* Step 1 Card */}
            <div className="glass-card rounded-3xl shadow-xl shadow-slate-200/50 p-6 md:p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-brand-100/50">
              <div className="flex items-center mb-5">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-100 text-brand-700 font-bold text-sm mr-3">1</span>
                <h3 className="text-lg font-bold text-slate-800">설교문 입력</h3>
              </div>
              <SermonInput 
                value={sermonText} 
                onChange={setSermonText} 
                disabled={loading}
              />
            </div>

            {/* Step 2 Card */}
            <div className="glass-card rounded-3xl shadow-xl shadow-slate-200/50 p-6 md:p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-brand-100/50">
               <div className="flex items-center mb-5">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-100 text-brand-700 font-bold text-sm mr-3">2</span>
                <h3 className="text-lg font-bold text-slate-800">길이 설정</h3>
              </div>
              <SummaryControls 
                length={summaryLength} 
                onChange={setSummaryLength} 
                disabled={loading}
              />
            </div>

            {/* Action Button */}
            <button
              onClick={handleSummarize}
              disabled={loading || !sermonText.trim()}
              className={`group w-full py-5 px-6 rounded-2xl font-bold text-white text-lg shadow-lg transition-all duration-300 transform hover:-translate-y-1
                ${loading || !sermonText.trim() 
                  ? 'bg-slate-300 cursor-not-allowed shadow-none' 
                  : 'bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 hover:shadow-brand-500/30'
                }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  묵상하며 요약 중...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Sparkles className="w-5 h-5 text-brand-100" />
                  요약 시작하기
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </button>
            
             {error && (
              <div className="bg-red-50/80 backdrop-blur-sm border border-red-100 text-red-600 px-5 py-4 rounded-2xl flex items-start gap-3 animate-pulse">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}
          </div>

          {/* Right Column: Result */}
          <div className="lg:col-span-7 flex flex-col h-full animate-slide-up" style={{ animationDelay: '0.2s' }}>
             <div className="glass-card rounded-3xl shadow-xl shadow-slate-200/50 p-1 border-0 h-full min-h-[600px] flex flex-col bg-white/60">
                <div className="p-6 md:p-8 flex flex-col h-full bg-white rounded-[1.3rem] border border-white/50">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-100 text-brand-700 font-bold text-sm mr-3">3</span>
                      <h3 className="text-lg font-bold text-slate-800">요약 결과</h3>
                    </div>
                    {summary && (
                      <button 
                        onClick={handleReset}
                        className="px-3 py-1.5 text-xs font-medium text-slate-500 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
                      >
                        새로 만들기
                      </button>
                    )}
                  </div>
                  <SummaryResult 
                    summary={summary} 
                    loading={loading} 
                  />
                </div>
             </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;