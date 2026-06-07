"use client";

import { useState } from "react";

const INITIAL_FORM = {
  name: "",
  business: "",
  email: "",
  phone: "",
  type: "",
  message: "",
};

function isValidEmail(email) {
  return email.includes("@") && email.includes(".") && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export default function WholesaleForm() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit() {
    setError("");

    if (!form.name.trim() || !form.business.trim() || !form.email.trim() || !form.type) {
      setError("Please fill in all required fields.");
      return;
    }

    if (!isValidEmail(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/wholesale", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(
          "Something went wrong. Please email us directly at info@tomyamyadomherbals.com"
        );
        return;
      }

      setForm(INITIAL_FORM);
      setSubmitted(true);
    } catch {
      setError(
        "Something went wrong. Please email us directly at info@tomyamyadomherbals.com"
      );
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div
        className="p-8 rounded-2xl text-center"
        style={{
          backgroundColor: "rgba(201,148,10,0.08)",
          border: "1px solid rgba(201,148,10,0.3)",
        }}
      >
        <p className="font-heading font-bold text-tiger-gold text-2xl uppercase tracking-wide mb-2">
          Thank you!
        </p>
        <p className="text-tiger-muted font-sans">
          We&rsquo;ll be in touch within 2 business days.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {[
        { id: "name",     label: "Your Name",        type: "text",  placeholder: "Full name",          required: true  },
        { id: "business", label: "Business Name",    type: "text",  placeholder: "Store or gym name",  required: true  },
        { id: "email",    label: "Email",            type: "email", placeholder: "you@business.com",   required: true  },
        { id: "phone",    label: "Phone (optional)", type: "tel",   placeholder: "+1 (000) 000-0000",  required: false },
      ].map(({ id, label, type, placeholder, required }) => (
        <div key={id}>
          <label
            htmlFor={id}
            className="block text-tiger-cream text-xs font-heading font-semibold tracking-[0.12em] uppercase mb-2"
          >
            {label}
          </label>
          <input
            id={id}
            name={id}
            type={type}
            required={required}
            value={form[id]}
            onChange={handleChange}
            placeholder={placeholder}
            className="w-full bg-tiger-surface border border-tiger-border rounded-xl px-4 py-3 text-tiger-cream text-sm font-sans placeholder:text-tiger-muted focus:border-tiger-gold focus:outline-none transition-colors duration-200"
          />
        </div>
      ))}

      <div>
        <label
          htmlFor="type"
          className="block text-tiger-cream text-xs font-heading font-semibold tracking-[0.12em] uppercase mb-2"
        >
          Business Type
        </label>
        <select
          id="type"
          name="type"
          required
          value={form.type}
          onChange={handleChange}
          className="w-full bg-tiger-surface border border-tiger-border rounded-xl px-4 py-3 text-tiger-cream text-sm font-sans focus:border-tiger-gold focus:outline-none transition-colors duration-200 cursor-pointer"
        >
          <option value="" disabled>Select business type</option>
          <option value="gym">Gym / Martial Arts Studio</option>
          <option value="smoke-shop">Smoke Shop</option>
          <option value="wellness">Wellness / Health Store</option>
          <option value="lifestyle">Lifestyle / Boutique Retail</option>
          <option value="distributor">Distributor</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-tiger-cream text-xs font-heading font-semibold tracking-[0.12em] uppercase mb-2"
        >
          Message (optional)
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={form.message}
          onChange={handleChange}
          placeholder="Tell us about your business and how you'd use Smiling Tiger"
          className="w-full bg-tiger-surface border border-tiger-border rounded-xl px-4 py-3 text-tiger-cream text-sm font-sans placeholder:text-tiger-muted focus:border-tiger-gold focus:outline-none transition-colors duration-200 resize-none"
        />
      </div>

      {error && (
        <p className="text-tiger-red text-sm font-sans">{error}</p>
      )}

      <button
        type="button"
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-tiger-gold hover:bg-tiger-gold-light disabled:opacity-60 disabled:cursor-not-allowed text-tiger-bg font-heading font-bold text-sm tracking-[0.15em] uppercase py-4 rounded-full transition-colors duration-200 cursor-pointer"
      >
        {loading ? "Submitting..." : "Submit Wholesale Application"}
      </button>
    </div>
  );
}
