import React, { useState } from 'react';

const DeveloperProblems = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedCategories, setSelectedCategories] = useState(['Data Structures', 'Dynamic Programming']);

  const problems = [
    { id: 1, name: 'Two Sum', tags: ['Arrays', 'Hash Table'], difficulty: 'Easy', solved: '1.2M', completed: true },
    { id: 2, name: 'Valid Parentheses', tags: ['Stack', 'String'], difficulty: 'Easy', solved: '840K', completed: false },
    { id: 3, name: 'Merge k Sorted Lists', tags: ['Linked List', 'Divide and Conquer'], difficulty: 'Hard', solved: '320K', completed: false },
    { id: 4, name: 'Longest Substring Without Repeating Characters', tags: ['Hash Table', 'Sliding Window'], difficulty: 'Medium', solved: '950K', completed: true },
    { id: 5, name: 'LRU Cache', tags: ['Design', 'Linked List'], difficulty: 'Medium', solved: '410K', completed: false },
  ];

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Easy': return 'bg-emerald-100 text-emerald-800';
      case 'Medium': return 'bg-amber-100 text-amber-800';
      case 'Hard': return 'bg-rose-100 text-rose-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-gray-900 mb-4">Coding Labs</h1>
        <p className="text-gray-600 max-w-2xl text-sm sm:text-lg">Sharpen your architectural precision through curated algorithmic challenges. Master the foundations of scalable software.</p>
      </div>

      {/* Filters & Stats Bento */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        {/* Progress Card */}
        <div className="md:col-span-1 bg-gray-100 rounded-xl p-6 flex flex-col justify-between">
          <div>
            <span className="text-xs font-black text-green-600 tracking-widest uppercase mb-1 block">Your Progress</span>
            <div className="text-3xl font-black text-gray-900">142/500</div>
          </div>
          <div className="w-full bg-gray-300 h-2.5 rounded-full mt-4 overflow-hidden">
            <div className="bg-green-600 h-full w-[28%]"></div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="md:col-span-3 bg-white rounded-xl p-8 shadow-sm flex flex-wrap items-center gap-3">
          <button className="px-6 py-2.5 bg-green-600 text-white rounded-full font-semibold text-sm shadow-md hover:bg-green-700 transition" onClick={() => setSelectedDifficulty('All')}>
            All Problems
          </button>
          <button 
            className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-colors ${selectedDifficulty === 'Easy' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            onClick={() => setSelectedDifficulty('Easy')}
          >
            Easy
          </button>
          <button 
            className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-colors ${selectedDifficulty === 'Medium' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            onClick={() => setSelectedDifficulty('Medium')}
          >
            Medium
          </button>
          <button 
            className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-colors ${selectedDifficulty === 'Hard' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            onClick={() => setSelectedDifficulty('Hard')}
          >
            Hard
          </button>

          {/* Divider */}
          <div className="h-8 w-px bg-gray-300 mx-2"></div>

          {/* Category Tags */}
          <div className="flex gap-2">
            <span className="px-4 py-2.5 bg-blue-100 text-blue-700 rounded-lg text-xs font-bold flex items-center gap-2">
              📊 Data Structures
            </span>
            <span className="px-4 py-2.5 bg-blue-100 text-blue-700 rounded-lg text-xs font-bold flex items-center gap-2">
              ⚡ Dynamic Programming
            </span>
          </div>
        </div>
      </div>

      {/* Problem List Table */}
      <div className="bg-white rounded-2xl overflow-x-auto shadow-md border border-gray-200">
        {/* Table Header */}
        <div className="grid grid-cols-12 px-8 py-4 border-b border-gray-200 bg-gray-50 min-w-[720px]">
          <div className="col-span-1 text-xs uppercase tracking-widest font-bold text-gray-600">Status</div>
          <div className="col-span-6 text-xs uppercase tracking-widest font-bold text-gray-600">Problem Name</div>
          <div className="col-span-2 text-xs uppercase tracking-widest font-bold text-gray-600">Difficulty</div>
          <div className="col-span-2 text-right text-xs uppercase tracking-widest font-bold text-gray-600">Solved Count</div>
          <div className="col-span-1"></div>
        </div>

        {/* Table body */}
        <div className="divide-y divide-gray-200 min-w-[720px]">
          {problems.map((problem) => (
            <div key={problem.id} className="grid grid-cols-12 px-8 py-6 items-center hover:bg-gray-50 transition-colors group cursor-pointer">
              {/* Status */}
              <div className="col-span-1">
                {problem.completed ? (
                  <span className="text-2xl text-green-600">✓</span>
                ) : (
                  <span className="text-2xl text-gray-400">○</span>
                )}
              </div>

              {/* Problem Name */}
              <div className="col-span-6">
                <h3 className="font-bold text-lg text-gray-900 group-hover:text-green-600 transition-colors">{problem.name}</h3>
                <div className="flex gap-2 mt-1">
                  {problem.tags.map((tag, idx) => (
                    <span key={idx} className="text-xs text-gray-600 font-medium">{tag}</span>
                  ))}
                </div>
              </div>

              {/* Difficulty */}
              <div className="col-span-2">
                <span className={`px-3 py-1 ${getDifficultyColor(problem.difficulty)} rounded-full text-xs font-bold uppercase tracking-wider`}>
                  {problem.difficulty}
                </span>
              </div>

              {/* Solved Count */}
              <div className="col-span-2 text-right">
                <span className="text-gray-900 font-semibold">{problem.solved}</span>
              </div>

              {/* Arrow */}
              <div className="col-span-1 text-right">
                <span className="text-gray-400 group-hover:translate-x-1 transition-transform inline-block">→</span>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="px-8 py-6 flex items-center justify-between bg-gray-50 border-t border-gray-200">
          <span className="text-sm text-gray-600">Showing 1 to 5 of 500 problems</span>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-100 transition-colors">Previous</button>
            <button className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-sm font-bold text-gray-900 hover:bg-gray-200 transition-colors">1</button>
            <button className="px-4 py-2 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-100 transition-colors">2</button>
            <button className="px-4 py-2 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-100 transition-colors">3</button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-100 transition-colors">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperProblems;
