import React, { useState } from 'react';
import { ChevronRight, Lightbulb, ArrowLeft, ArrowRight } from 'lucide-react';

const steps = [
  { title: "Welcome", component: "welcome" },
  { title: "Insight", component: "insight" },
  { title: "Awareness", component: "awareness" },
  { title: "Reframe", component: "reframe" },
  { title: "Next Step", component: "nextstep" },
  { title: "Results", component: "results" }
];

const questions = {
  insight: [
    "When do you first remember feeling this way?",
    "Was there a moment or event that shaped this belief?",
    "Who else in your life might have reinforced this belief?"
  ],
  awareness: [
    "What do you avoid doing because of this belief?",
    "How does this belief affect your motivation or emotions?",
    "What do you miss out on by holding on to it?"
  ],
  reframe: [
    "What would someone who cares about you say instead?",
    "When has this belief been proven wrong?",
    "If you were 10% more self-compassionate, how would you rewrite this belief?"
  ],
  nextstep: [
    "What’s a small action you could take this week to test this reframe?",
    "What would ‘1% braver’ look like in this area?",
    "How will you remind yourself of this new perspective?"
  ]
};

const SelfLimitingBeliefsTool = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState({ insight: {}, awareness: {}, reframe: {}, nextstep: {} });

  const handleInputChange = (section, index, value) => {
    setResponses((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [index]: value
      }
    }));
  };

  const renderQuestions = (section) => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 text-center">{section.charAt(0).toUpperCase() + section.slice(1)}</h2>
      {questions[section].map((q, idx) => (
        <div key={idx} className="bg-white p-4 rounded-lg border border-gray-200">
          <label className="block text-sm font-medium text-gray-700 mb-2">{q}</label>
          <input
            type="text"
            value={responses[section][idx] || ''}
            onChange={(e) => handleInputChange(section, idx, e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
        </div>
      ))}
    </div>
  );

  const renderStep = () => {
    const component = steps[currentStep].component;
    switch (component) {
      case 'welcome':
        return (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto">
              <Lightbulb className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Explore What Holds You Back</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              This tool helps you name and gently challenge beliefs that might be limiting your growth.
            </p>
            <ul className="space-y-2 text-blue-700 text-left max-w-xl mx-auto bg-blue-50 p-6 rounded-lg">
              <li className="flex items-start"><ChevronRight className="w-5 h-5 mt-1 mr-2" />Discover the root of self-limiting beliefs</li>
              <li className="flex items-start"><ChevronRight className="w-5 h-5 mt-1 mr-2" />Explore their impact on your life and choices</li>
              <li className="flex items-start"><ChevronRight className="w-5 h-5 mt-1 mr-2" />Craft healthier perspectives and actions</li>
            </ul>
          </div>
        );
      case 'insight':
      case 'awareness':
      case 'reframe':
      case 'nextstep':
        return renderQuestions(component);
      case 'results':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center text-gray-800">Summary of Your Reflections</h2>
            {Object.entries(responses).map(([section, entries]) => (
              <div key={section} className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-lg text-gray-700 mb-2">{section.charAt(0).toUpperCase() + section.slice(1)}</h3>
                {Object.entries(entries).map(([idx, val]) => (
                  <p key={idx} className="text-gray-800 mb-1">- {val}</p>
                ))}
              </div>
            ))}
            <div className='bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded'>
              <p className='text-sm text-yellow-800'>
                This tool is meant to raise awareness. If anything here feels emotionally heavy or unsettling, you’re not alone. Please pause, take a breath, and consider reaching out to a counsellor or therapist.
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <div className="flex justify-between mb-2 text-sm text-gray-600">
          <span>Step {currentStep + 1} of {steps.length}</span>
          <span>{Math.round(((currentStep + 1) / steps.length) * 100)}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 h-2 rounded-full">
          <div
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        {renderStep()}
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
          className="flex items-center px-6 py-3 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Previous
        </button>

        <button
          onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
          className="flex items-center px-6 py-3 text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg hover:from-purple-600 hover:to-pink-600"
        >
          {currentStep === steps.length - 1 ? 'Finish' : 'Next'} <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default SelfLimitingBeliefsTool;
Upgrade to full version with Insight → Awareness → Reframe → Next Step → Results
