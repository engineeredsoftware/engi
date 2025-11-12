import React from 'react';
import { PaymentElement } from '@stripe/react-stripe-js';

const MarketingSetupForm = () => {
  return (
    <form className="space-y-4">
      <PaymentElement />
      <button className="w-full bg-brand-purple-glow-subtle text-brand-purple-bright border border-brand-purple-glow rounded-md px-4 py-2 hover:bg-brand-purple-glow hover:text-white transition-all duration-300">
        Submit
      </button>
    </form>
  );
};

export default MarketingSetupForm;
