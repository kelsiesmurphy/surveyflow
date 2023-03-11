import { SetStateAction, useState } from "react";
import { pricing } from "../../constants/pricing";
import { check } from "../../assets/index.js";
import { Link } from "react-router-dom";

const Pricing = () => {
  const [pricingPlan, setPricingPlan] = useState("monthly");

  const handlePlanChange = (planType: SetStateAction<string>) => {
    setPricingPlan(planType);
  };

  return (
    <div
      id="pricing"
      className="flex flex-wrap justify-center gap-6 px-4 py-20"
    >
      <div className="flex max-w-screen-xl flex-1 flex-wrap justify-between gap-6">
        <div className="flex max-w-md flex-col gap-6">
          <h2 className="text-4xl font-medium text-slate-800">Pricing plans</h2>
          <p className="text-lg font-light text-slate-500">
            Simple, transparent pricing that grows with you. Try our free plan,
            or go straight to our Business plan.
          </p>
          <div className="flex flex-wrap gap-2 rounded-lg border border-slate-100 bg-slate-50 p-2">
            <button
              onClick={() => handlePlanChange("monthly")}
              className={
                pricingPlan === "monthly"
                  ? "text-md h-11 flex-1 cursor-pointer rounded-md bg-white font-medium text-slate-700 drop-shadow transition-all"
                  : "text-md h-11 flex-1 cursor-pointer rounded-md bg-transparent font-medium text-slate-500 transition-all"
              }
            >
              Monthly Billing
            </button>
            <button
              onClick={() => handlePlanChange("yearly")}
              className={
                pricingPlan === "yearly"
                  ? "text-md h-11 flex-1 cursor-pointer rounded-md bg-white font-medium text-slate-700 drop-shadow transition-all"
                  : "text-md h-11 flex-1 cursor-pointer rounded-md bg-transparent font-medium text-slate-500 transition-all"
              }
            >
              Annual Billing <span>Save 20%</span>
            </button>
          </div>
        </div>
        <div className="flex flex-1 flex-wrap justify-center gap-6">
          {pricing.map((pricing) => (
            <div
              key={pricing.id}
              className="flex min-h-[572px] min-w-[288px] max-w-sm flex-col justify-between rounded-2xl border border-slate-300 py-8 px-8 pt-12 shadow-sm"
            >
              <div className="space-y-4 text-center">
                <h3 className="text-4xl font-medium text-slate-800">
                  {pricingPlan === "yearly"
                    ? pricing.annualPrice
                    : pricing.price}
                </h3>
                <h4 className="text-xl font-medium text-slate-700">
                  {pricing.name}
                </h4>
                <p className="text-lg font-light text-slate-500">
                  {pricing.content}
                </p>
                <ul className="space-y-4 pt-4 text-left">
                  {pricing.benefits.map((benefit, index) => (
                    <li
                      key={index}
                      className="flex gap-3 text-lg font-light text-slate-600"
                    >
                      <img src={check} />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href="/signup"
                className="rounded-lg border border-sky-600 bg-sky-600 px-4 py-2 text-center align-middle font-medium text-white shadow-sm transition hover:border-sky-700 hover:bg-sky-700"
              >
                Get started
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
