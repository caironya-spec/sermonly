import React from 'react';

interface SummaryControlsProps {
  length: number;
  onChange: (length: number) => void;
  disabled: boolean;
}

export const SummaryControls: React.FC<SummaryControlsProps> = ({ length, onChange, disabled }) => {
  
  const min = 200;
  const max = 800;
  const percentage = ((length - min) / (max - min)) * 100;

  return (
    <div className="space-y-7">
      <div className="flex justify-between items-end">
        <label htmlFor="length-slider" className="text-sm font-semibold text-slate-600">
          요약 목표 길이
        </label>
        <div className="px-3 py-1 bg-brand-50 text-brand-700 rounded-lg text-lg font-bold tabular-nums border border-brand-100">
          {length}<span className="text-xs font-normal text-brand-500 ml-1">자</span>
        </div>
      </div>

      <div className="relative h-8 flex items-center group">
        <input
          id="length-slider"
          type="range"
          min={min}
          max={max}
          step={50}
          value={length}
          onChange={(e) => onChange(Number(e.target.value))}
          disabled={disabled}
          className="absolute w-full h-full opacity-0 cursor-pointer z-30"
        />
        
        {/* Track Background */}
        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden relative z-10 box-border border border-slate-200">
           {/* Filled Track */}
           <div 
             className="h-full bg-gradient-to-r from-brand-400 to-indigo-500 transition-all duration-200 ease-out"
             style={{ width: `${percentage}%` }}
           />
        </div>

        {/* Thumb */}
        <div 
          className="absolute h-6 w-6 bg-white border-4 border-indigo-500 rounded-full shadow-lg z-20 pointer-events-none transition-all duration-200 ease-out transform group-hover:scale-110"
          style={{ 
            left: `calc(${percentage}% - 12px)`
          }}
        />
      </div>

      <div className="grid grid-cols-3 text-center text-xs text-slate-400 font-medium">
        <span className="text-left">짧게 (200)</span>
        <span>중간 (500)</span>
        <span className="text-right">상세히 (800)</span>
      </div>
      
      <div className="bg-slate-50/80 p-3.5 rounded-xl border border-slate-100 text-xs text-slate-500 leading-relaxed flex gap-2">
        <span className="text-brand-500 text-lg leading-none">💡</span>
        <span>AI가 문맥을 파악하여 설정된 길이에 맞춰 핵심 내용을 요약합니다.</span>
      </div>
    </div>
  );
};