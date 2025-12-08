
'use client';

import { Check } from 'lucide-react';

const processSteps = [
  {
    phase: '01',
    title: 'Initiation',
    steps: [
      { number: '01', name: 'Intake & Requirements' },
      { number: '02', name: 'Proposal' },
      { number: '03', name: 'Contract' },
      { number: '04', name: 'First Payment' },
    ],
  },
  {
    phase: '02',
    title: 'Design & Align',
    steps: [
      { number: '05', name: 'Prototype (Sprint 1)' },
      { number: '06', name: 'Prototype Revision' },
    ],
  },
  {
    phase: '03',
    title: 'Production',
    steps: [
      { number: '07', name: 'Full Build' },
      { number: '08', name: 'Final Revision' },
    ],
  },
  {
    phase: '04',
    title: 'Launch',
    steps: [
      { number: '09', name: 'Final Payment' },
      { number: '10', name: 'Launch' },
      { number: '11', name: 'Post-Launch Support' },
    ],
  },
];

export function ProcessGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 text-white">
      {processSteps.map((phase, index) => (
        <div
          key={phase.phase}
          className={`
            p-8
            ${index === 0 ? 'md:border-r md:border-b' : ''}
            ${index === 1 ? 'md:border-b' : ''}
            ${index === 2 ? 'md:border-r' : ''}
             border-neutral-800
          `}
        >
          <h3 className="font-headline text-3xl font-bold">{phase.phase}</h3>
          <p className="mt-2 text-xl font-semibold text-neutral-300">{phase.title}</p>
          <div className="relative mt-8 border-l border-neutral-700">
            {phase.steps.map((step, stepIndex) => (
              <div key={step.number} className="relative py-4 pl-8">
                <div className="absolute -left-[13px] top-1/2 -translate-y-1/2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {step.number}
                </div>
                <p className="ml-4 text-neutral-200">{step.name}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
