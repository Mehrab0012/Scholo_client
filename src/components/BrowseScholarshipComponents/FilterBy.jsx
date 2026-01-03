import React from 'react';

const FilterSection = ({ title, children, isOpen }) => {
    return (
        <details className="group" open={isOpen}>
            <summary className="flex cursor-pointer items-center justify-between py-2 list-none">
                <p className="text-[#111418] text-sm font-semibold">{title}</p>
            </summary>
            <div className="py-2 flex flex-col gap-2 pl-1">
                {children}
            </div>
        </details>
    );
};

export const FilterBy = ({ filters, setFilters }) => {
    
    const handleCheckboxChange = (section, value) => {
        setFilters(prev => {
            const currentList = prev[section];
            const newList = currentList.includes(value)
                ? currentList.filter(item => item !== value)
                : [...currentList, value];
            return { ...prev, [section]: newList };
        });
    };

    return (
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col gap-3">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Filter By</span>

            <FilterSection title="Major / Field" isOpen={true}>
                {['Computer Science', 'Engineering', 'Business & Finance', 'Arts & Humanities'].map((field) => (
                    <label key={field} className="flex items-center gap-3 cursor-pointer group/item">
                        <input
                            type="checkbox"
                            checked={filters.category.includes(field)}
                            onChange={() => handleCheckboxChange('category', field)}
                            className="size-4 rounded border-gray-300 text-[#137fec]"
                        />
                        <span className="text-gray-500 text-sm">{field}</span>
                    </label>
                ))}
            </FilterSection>


        </div>
    );
};