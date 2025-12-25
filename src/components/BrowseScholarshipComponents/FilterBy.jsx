
import { IoIosArrowDown } from 'react-icons/io';

const FilterSection = ({ title, children, isOpen}) => {

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

export const FilterBy = () => {
    return (
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col gap-3">
            <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Filter By</span>
            </div>

            <FilterSection title="Major / Field" isOpen={true} >
                {['Computer Science', 'Engineering', 'Business & Finance', 'Arts & Humanities'].map((field) => (
                    <label key={field} className={`flex items-center gap-3 cursor-pointer group/item`}>
                        <input
                            type="checkbox"
                            className="size-4 rounded border-gray-300 text-[#137fec] focus:ring-0 transition-all cursor-pointer"
                            defaultChecked={field === 'Business & Finance'}
                        />
                        <span className="text-gray-500 group-hover/item:text-[#111418] text-sm">{field}</span>
                    </label>
                ))}
            </FilterSection>

            <div className="h-px bg-gray-100 w-full my-1"></div>

            <FilterSection title="Degree Level">
                {['Undergraduate', "Master's", 'PhD / Doctorate'].map((level) => (
                    <div>

                        <label key={level} className="flex items-center gap-3 cursor-pointer group/item">

                            <input
                                type="checkbox"
                                className="size-4 rounded border-gray-300 text-[#137fec] focus:ring-0 cursor-pointer"
                            />
                            <span className="text-gray-500 text-sm">{level}</span>
                        </label>
                    </div>
                ))}
            </FilterSection>

            <div className="h-px bg-gray-100 w-full my-1"></div>

            <FilterSection title="Deadline">
                {['Next 30 Days', 'Next 3 Months', 'Anytime'].map((opt) => (
                    <label key={opt} className="flex items-center gap-3 cursor-pointer group/item">
                        <input
                            type="radio"
                            name="deadline"
                            className="size-4 rounded-full border-gray-300 text-[#137fec] focus:ring-0 cursor-pointer"
                        />
                        <span className="text-gray-500 text-sm">{opt}</span>
                    </label>
                ))}
            </FilterSection>
        </div>
    );
};