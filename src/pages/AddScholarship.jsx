import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import useRole from '../hooks/useRole';
import Loader from '../components/Loader/Loader';
import Unauthorized from '../components/Unauthorized/Unauthorized';

const ScholarshipForm = () => {

    const {role, isReloading} = useRole([]);
    const today = new Date().toISOString().split('T')[0];

    const { register, control, handleSubmit, setValue } = useForm({
        defaultValues: {
            title: "",
            provider: "",
            category: "",
            type: "",
            level: "",
            amount: "",
            fee: "",
            frequency: "",
            deadline: "",
            descriptionRaw: "",
            eligibilityRaw: "",
            requirements: [{ name: "", description: "" }]
        }
    });

    const { fields: reqFields, append: appendReq, remove: removeReq } = useFieldArray({
        control,
        name: "requirements"
    });

    const onSubmit = (data) => {
        const formattedData = {
            ...data,
            description: data.descriptionRaw.split('\n').filter(line => line.trim() !== ""),
            eligibility: data.eligibilityRaw.split('\n').filter(line => line.trim() !== ""),
        };

        delete formattedData.descriptionRaw;
        delete formattedData.eligibilityRaw;

        console.log("Submitted Scholarship Data:", formattedData);
        alert("Scholarship data has been logged to the console!");
    };

    const inputBase = "w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-slate-700 bg-slate-50/50 placeholder:text-slate-400";
    const labelBase = "block text-sm font-semibold text-slate-800 mb-2 ml-1";
    const sectionCard = "bg-white p-8 rounded-2xl border border-slate-100 shadow-sm mb-6";

    if(isReloading) return <Loader></Loader>
    if(role !== 'admi') return <Unauthorized></Unauthorized>
    return (
        <div className="min-h-screen bg-slate-50 pt-28 pb-20 px-6">
            <div className="max-w-4xl mx-auto">

                <div className="mb-10">
                    <h1 className="text-3xl font-bold text-slate-900">Add New Scholarship</h1>
                    <p className="text-slate-500 mt-2">Fill out the details below to publish your scholarship.</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                    {/* General Information */}
                    <div className={sectionCard}>
                        <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                            <span className="w-2 h-6 bg-indigo-600 rounded-full"></span>
                            General Information
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className={labelBase}>Scholarship Title</label>
                                <input {...register("title")} placeholder="e.g. Global Future Leaders Scholarship" className={inputBase} required />
                            </div>
                            <div>
                                <label className={labelBase}>Provider Name</label>
                                <input {...register("provider")} placeholder="e.g. Stanford University" className={inputBase} required />
                            </div>
                            <div>
                                <label className={labelBase}>Scholarship Type</label>
                                <select {...register("type")} className={inputBase} required>
                                    <option value="">Select Type</option>
                                    <option value="Merit-based">Merit-based</option>
                                    <option value="Need-based">Need-based</option>
                                    <option value="Research-based">Research-based</option>
                                </select>
                            </div>
                            <div>
                                <label className={labelBase}>Academic Level</label>
                                <select {...register("level")} className={inputBase} required>
                                    <option value="">Select Level</option>
                                    <option value="Beginner">Beginner (High School)</option>
                                    <option value="Intermediate">Intermediate (Undergraduate)</option>
                                    <option value="Advanced">Advanced (Graduate)</option>
                                </select>
                            </div>
                            <div>
                                <label className={labelBase}>Frequency</label>
                                <select {...register("frequency")} className={inputBase} required>
                                    <option value="">Select Frequency</option>
                                    <option value="yearly">Yearly</option>
                                    <option value="one-time">One-time</option>
                                    <option value="monthly">Monthly</option>
                                </select>
                            </div>
                            <div>
                                <label className={labelBase}>Category</label>
                                <select {...register("category")} className={inputBase} required>
                                    <option value="">Select Category</option>
                                    <option value="Engineering">Engineering</option>
                                    <option value="one-Medicine">Medicine</option>
                                    <option value="Others">Others</option>
                                </select>
                            </div>
                            <div>
                                <label className={labelBase}>Scholarship Amount ($)</label>
                                <input type="number" {...register("amount")} placeholder="10000" className={inputBase} min={1} required />
                            </div>
                            <div>
                                <label className={labelBase}>Application Fee ($)</label>
                                <input type="number" {...register("fee")} placeholder="25" className={inputBase} min={0} required />
                            </div>
                            <div>
                                <label className={labelBase}>Application Deadline</label>
                                <input type="date" min={today} {...register("deadline")} className={`${inputBase} cursor-pointer`} required />
                            </div>
                        </div>
                    </div>

                    {/* Details & Eligibility */}
                    <div className={sectionCard}>
                        <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                            <span className="w-2 h-6 bg-indigo-600 rounded-full"></span>
                            Details & Eligibility
                        </h2>

                        <div className="space-y-8">
                            <div>
                                <label className={labelBase}>Scholarship Description</label>
                                <p className="text-xs text-slate-500 mb-3 ml-1">
                                    Tip: Press <kbd className="font-sans font-bold text-indigo-600">Enter</kbd> will be ignored.
                                </p>
                                <textarea
                                    {...register("descriptionRaw", {
                                        setValueAs: (value) => value.replace(/\r?\n|\r/g, ' ')
                                    })}
                                    placeholder="Tell us about the scholarship purpose..."
                                    className={`${inputBase} min-h-[150px] leading-relaxed py-4`}
                                    rows="5"
                                    required
                                />
                            </div>

                            <div>
                                <label className={labelBase}>Eligibility Criteria</label>
                                <p className="text-xs text-slate-500 mb-3 ml-1">Tip: Type each requirement on a <span className="font-bold text-indigo-600 underline">new line</span>.</p>
                                <textarea
                                    {...register("eligibilityRaw")}
                                    placeholder="e.g. Minimum GPA of 3.5&#10;Currently enrolled full-time&#10;Major in Engineering"
                                    className={`${inputBase} min-h-[150px] leading-relaxed py-4 font-mono text-sm`}
                                    rows="5"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Submission Requirements */}
                    <div className={sectionCard}>
                        <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                            <span className="w-2 h-6 bg-indigo-600 rounded-full"></span>
                            Submission Requirements
                        </h2>

                        <div className="space-y-4">
                            {reqFields.map((field, index) => (
                                <div key={field.id} className="p-5 border border-slate-100 rounded-2xl bg-slate-50/50 relative group transition-all hover:bg-white hover:shadow-md">
                                    <button type="button" onClick={() => removeReq(index)} className="absolute top-4 right-4 text-slate-300 hover:text-red-500 transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path d="M6 18L18 6M6 6l12 12" /></svg>
                                    </button>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-[10px] font-bold text-indigo-600 uppercase tracking-[0.1em] mb-1 block ml-1">Document Name</label>
                                            <input {...register(`requirements.${index}.name`)} placeholder="e.g. Personal Essay" className="w-full bg-white px-4 py-2.5 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm" required />
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-bold text-indigo-600 uppercase tracking-[0.1em] mb-1 block ml-1">Short Instruction</label>
                                            <input {...register(`requirements.${index}.description`)} placeholder="e.g. Max 500 words" className="w-full bg-white px-4 py-2.5 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm" required />
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => appendReq({ name: "", description: "" })}
                                className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-500 font-semibold hover:border-indigo-400 hover:text-indigo-600 hover:bg-indigo-50/30 transition-all"
                            >
                                + Add Another Document Requirement
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end pt-4">
                        <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-14 py-4 rounded-2xl font-bold shadow-xl shadow-indigo-200 transition-all hover:scale-[1.02] active:scale-95">
                            Add Scholarship
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ScholarshipForm;
