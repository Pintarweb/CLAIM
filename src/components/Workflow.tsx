import React from 'react';

const Workflow: React.FC = () => {
  const problems = [
    {
      title: "💸 \"Are we overpaying claims?\"",
      description: "Without hard evidence, you're relying on estimated distances and potentially bloated expenses."
    },
    {
      title: "😵 \"Why is finance always chasing receipts?\"",
      description: "Lost thermal receipts and delayed submissions create end-of-month bottlenecks and reconciliation nightmares."
    },
    {
      title: "⚠️ \"What happens if LHDN audits us?\"",
      description: "Missing documentation or improper logs expose your business to compliance risks and penalties."
    },
    {
      title: "👁️ \"Are my staff actually going where they say?\"",
      description: "Lack of visibility into actual routes taken leaves you questioning the validity of every submitted claim."
    }
  ];

  return (
    <section className="bg-slate-50 border-y border-slate-100 py-24">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
            If You Manage Field Claims, You're Facing This
          </h2>
          <p className="text-xl text-slate-600 font-medium max-w-3xl mx-auto">
            These aren't just annoyances—they are direct leaks in your company's profitability and compliance.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-16">
          {problems.map((problem, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-center text-center hover:shadow-md transition-shadow">
              <h3 className="text-2xl font-bold text-slate-900 mb-3">{problem.title}</h3>
              <p className="text-slate-600 font-medium">{problem.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-emerald-600 text-white py-10 px-8 rounded-3xl text-center max-w-4xl mx-auto shadow-2xl">
          <h3 className="text-2xl md:text-3xl font-black">
            Most companies don't have a claim problem.<br />
            <span className="text-emerald-200">They have a control problem.</span>
          </h3>
        </div>
      </div>
    </section>
  );
};

export default Workflow;
