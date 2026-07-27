"use client";

import React, { useRef, useState } from "react";
import { useInView } from "framer-motion";
import { Mail, Phone, CheckCircle } from "lucide-react";
import { CONTACT_INFO } from "@/lib/constants";

export default function Contact() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const tempErrors: typeof errors = {};
    if (!name.trim()) tempErrors.name = "Name is required";
    if (!email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = "Please enter a valid email address";
    }
    if (!message.trim()) tempErrors.message = "Message cannot be empty";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setName("");
      setEmail("");
      setMessage("");
    }, 1200);
  };

  return (
    <section
      id="contact"
      ref={containerRef}
      className={`relative py-32 px-6 max-w-3xl mx-auto z-10 text-center select-none bg-transparent ${
        isInView ? "animate-fade-rise" : "opacity-0"
      }`}
    >
      {/* Title & Subtext */}
      <h2 className="text-4xl sm:text-5xl font-display font-bold text-white leading-tight">
        Let&apos;s build something great.
      </h2>
      <p className="text-muted-foreground text-lg mt-4 font-medium font-body">
        Tell us about your project and we&apos;ll get back to you within a day.
      </p>

      {/* Form Container */}
      <div className="rounded-2xl p-8 md:p-10 mt-12 bg-white/[0.02] border border-white/10 shadow-2xl backdrop-blur-md">
        {isSubmitted ? (
          <div className="flex flex-col items-center justify-center py-10 gap-4">
            <div className="w-14 h-14 rounded-full bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400 mb-2">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold font-display text-white">Message Sent!</h3>
            <p className="text-sm text-muted-foreground max-w-sm font-body">
              Thank you for reaching out. We will review your project details and get back to you shortly.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="mt-6 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors duration-300"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-left font-body">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors({ ...errors, name: undefined });
                }}
                className={`w-full px-5 py-4 rounded-xl border bg-black/40 text-white focus:outline-none transition-all duration-300 ${
                  errors.name ? "border-red-500/40 focus:border-red-500" : "border-white/10 focus:border-cyan-400/40"
                }`}
                placeholder="John Doe"
              />
              {errors.name && <span className="text-xs text-red-400 font-medium">{errors.name}</span>}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors({ ...errors, email: undefined });
                }}
                className={`w-full px-5 py-4 rounded-xl border bg-black/40 text-white focus:outline-none transition-all duration-300 ${
                  errors.email ? "border-red-500/40 focus:border-red-500" : "border-white/10 focus:border-cyan-400/40"
                }`}
                placeholder="john@example.com"
              />
              {errors.email && <span className="text-xs text-red-400 font-medium">{errors.email}</span>}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  if (errors.message) setErrors({ ...errors, message: undefined });
                }}
                className={`w-full px-5 py-4 rounded-xl border bg-black/40 text-white focus:outline-none resize-none transition-all duration-300 ${
                  errors.message ? "border-red-500/40 focus:border-red-500" : "border-white/10 focus:border-cyan-400/40"
                }`}
                placeholder="Describe your project, timeline, and goals..."
              />
              {errors.message && <span className="text-xs text-red-400 font-medium">{errors.message}</span>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-4 py-4 rounded-xl font-bold text-sm uppercase tracking-wider text-white border border-cyan-400/40 hover:bg-cyan-400/10 hover:scale-[1.01] transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        )}
      </div>

      {/* Contact Details & Social Links Block */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-x-12 gap-y-6 mt-16 text-sm text-muted-foreground select-none">
        {/* Email */}
        <a 
          href={`mailto:${CONTACT_INFO.email}`} 
          className="flex items-center gap-2 hover:text-white transition-colors duration-300"
        >
          <Mail className="w-4.5 h-4.5 text-cyan-400" />
          {CONTACT_INFO.email}
        </a>

        {/* Phone */}
        <a 
          href={`tel:${CONTACT_INFO.phone}`} 
          className="flex items-center gap-2 hover:text-white transition-colors duration-300"
        >
          <Phone className="w-4.5 h-4.5 text-cyan-400" />
          {CONTACT_INFO.phone}
        </a>

        {/* Social Links Row */}
        <div className="flex gap-4 items-center">
          <a
            href={CONTACT_INFO.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors duration-300"
            aria-label="GitHub"
          >
            <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.164 22 16.418 22 12c0-5.523-4.478-10-10-10z" />
            </svg>
          </a>
          <a
            href={CONTACT_INFO.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors duration-300"
            aria-label="LinkedIn"
          >
            <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>
          <a
            href={CONTACT_INFO.twitterUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors duration-300"
            aria-label="Twitter"
          >
            <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
