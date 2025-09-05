
import React from 'react';

const QuickStats: React.FC = () => {
    return (
        <div className=" m-2 p-8 bg-[var(--rich-navy)] rounded-md flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Left Section */}
            <div className="flex-1">
                <h3 className=" text-center text-3xl font-bold text-white mb-2">Quick Stats</h3>
                <p className=" text-center text-[var(--muted-lavender-gray)] mb-4">See how the community is growing.</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-white">
                    <div className="text-center">
                        <p className="text-3xl font-bold">1.2M</p>
                        <p className="text-sm text-[var(--muted-lavender-gray)]">Stories</p>
                    </div>
                    <div className="text-center">
                        <p className="text-3xl font-bold">500k</p>
                        <p className="text-sm text-[var(--muted-lavender-gray)]">Writers</p>
                    </div>
                    <div className="text-center">
                        <p className="text-3xl font-bold">10M+</p>
                        <p className="text-sm text-[var(--muted-lavender-gray)]">Reads</p>
                    </div>
                    <div className="text-center">
                        <p className="text-3xl font-bold">25k</p>
                        <p className="text-sm text-[var(--muted-lavender-gray)]">Daily Readers</p>
                    </div>
                </div>
            </div>

            {/* Divider (Only on md+) */}
            <div className="border-l border-[var(--deep-slate-blue)] h-24 hidden md:block"></div>

            {/* Right Section */}
            <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-bold text-white mb-2">Join our Discord Community!</h3>
                <p className="text-[var(--muted-lavender-gray)] mb-4">
                    Chat with authors, participate in events, and get sneak peeks of upcoming stories.
                </p>
                <button className=" hover:cursor-pointer bg-[var(--midnight-blue)] text-white font-bold py-3 px-6 rounded-md">
                    Join Discord
                </button>
            </div>
        </div>
    );
};

export default QuickStats;
