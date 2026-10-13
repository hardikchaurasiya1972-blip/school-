import React from 'react';
import { Quote, Sparkles } from 'lucide-react';

export const StageQuotesRibbon: React.FC = () => {
  const quotes = [
    {
      text: "A teacher affects eternity; he can never tell where his influence stops.",
      author: "Henry Adams • Stage Motto",
    },
    {
      text: "Teachers plant the seeds of knowledge that will grow forever.",
      author: "Teacher's Day Chronicle",
    },
    {
      text: "Though you wrote in chalk, you brightened our lives.",
      author: "Student Council Blackboard Tribute",
    },
    {
      text: "Truth & Diligence",
      author: "Sacred Heart Convent School Motto",
    },
  ];

  return (
    <section className="relative bg-gradient-to-r from-[#3F0E19] via-[#5A1626] to-[#3F0E19] text-[#FAF7F2] py-8 border-y-2 border-[#C69238]/40 shadow-inner overflow-hidden">
      {/* Background glow & subtle motif */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#E8BD6D_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
      <div className="absolute -top-12 left-1/4 w-72 h-72 bg-[#C69238]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 right-1/4 w-72 h-72 bg-[#C69238]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quotes.map((item, index) => (
            <div
              key={index}
              className="relative p-5 rounded-2xl bg-white/[0.04] backdrop-blur-xs border border-white/10 hover:border-[#E8BD6D]/40 transition-all duration-300 group flex flex-col justify-between"
            >
              <div className="flex items-start gap-2.5 mb-2.5">
                <Quote className="w-5 h-5 text-[#E8BD6D] shrink-0 opacity-70 group-hover:opacity-100 transition-opacity" />
                <p className="font-cormorant italic text-base sm:text-lg text-white/95 leading-snug">
                  &ldquo;{item.text}&rdquo;
                </p>
              </div>
              <div className="flex items-center gap-2 pt-2 border-t border-white/10 mt-auto">
                <Sparkles className="w-3 h-3 text-[#E8BD6D]/80" />
                <span className="font-cinzel text-[11px] text-[#E8BD6D] tracking-wider font-semibold">
                  {item.author}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
