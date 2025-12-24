import React from 'react';

const TopScholarships = () => {
  const list = [
    { title: "STEM Pioneers Grant", amount: "$15,000", provider: "TechCorp Global", tag: "Engineering", color: "text-blue-600 bg-blue-50" },
    { title: "Global Leaders Award", amount: "$10,000", provider: "Unity Foundation", tag: "Social", color: "text-green-600 bg-green-50" },
    { title: "Future Artists Fund", amount: "$5,000", provider: "Creative Arts Council", tag: "Design", color: "text-purple-600 bg-purple-50" },
    { title: "Medical Excellence", amount: "$25,000", provider: "Healthcare Plus", tag: "Medical", color: "text-red-600 bg-red-50" },
  ];

  return (
    <section className="py-20 px-4 bg-[#f7f7f7]">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold text-text-main-light mb-2">Editor's Choice</h2>
            <p className="text-black/50 font-medium">Verified opportunities with high success rates.</p>
          </div>
          <button className="hidden md:block text-[#137fec] cursor-pointer font-bold hover:underline">See all (4+)</button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {list.map((item, i) => (
            <div key={i} className="group p-6 rounded-2xl border border-border-light hover:border-primary/50 transition-all hover:shadow-xl cursor-pointer bg-white">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold mb-6 ${item.color}`}>
                {item.title[0]}
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-text-secondary-light block mb-1">{item.provider}</span>
              <h3 className="text-lg font-bold text-text-main-light mb-4 group-hover:text-primary transition-colors">{item.title}</h3>
              <div className="flex items-center justify-between pt-4 border-t border-border-light">
                <span className="text-primary font-extrabold text-lg">{item.amount}</span>
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${item.color}`}>{item.tag}</span>
              </div>
            </div>
          ))}
        </div>
        <button className='flex m-auto mt-10 rounded-full border cursor-pointer  transition-all duration-200 ease-out
                            transform active:scale-95 shadow-xl px-10 py-3 text-[#137fec]'>View All Scholarships</button>
      </div>
      
    </section>
  );
};

export default TopScholarships;