import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import icon from "../assets/logo-icon.png";

const stagger = {
  hidden: { opacity: 0, y: 10 },
  show: i => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.45, ease: "easeOut" },
  }),
};

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20 lg:py-28">
            {/* Left - text */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-xl"
            >
              <p className="inline-block px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200 font-medium text-sm mb-4">
                New • Smart Insights
              </p>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
                Understand your money — <span className="text-indigo-600 dark:text-indigo-400">smarter</span>, faster, and visually.
              </h1>

              <p className="mt-6 text-gray-600 dark:text-gray-300 text-lg">
                Money Manager turns your transactions into actionable insights. Track expenses, spot trends, and plan budgets with powerful visual reports.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:items-center">
                <Link
                  to="/signup"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-md transition"
                >
                  Start for free
                </Link>

                <Link
                  to="/dashboard"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                >
                  View Demo
                </Link>
              </div>

              {/* quick stats */}
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4">
                <motion.div
                  initial="hidden"
                  animate="show"
                  custom={0}
                  variants={stagger}
                  className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm"
                >
                  <p className="text-sm text-gray-500 dark:text-gray-300">Avg. monthly savings</p>
                  <p className="mt-2 text-xl font-semibold text-indigo-600 dark:text-indigo-400">₹12,450</p>
                </motion.div>

                <motion.div
                  initial="hidden"
                  animate="show"
                  custom={1}
                  variants={stagger}
                  className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm"
                >
                  <p className="text-sm text-gray-500 dark:text-gray-300">Expense categories</p>
                  <p className="mt-2 text-xl font-semibold text-emerald-600 dark:text-emerald-400">32</p>
                </motion.div>

                <motion.div
                  initial="hidden"
                  animate="show"
                  custom={2}
                  variants={stagger}
                  className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm"
                >
                  <p className="text-sm text-gray-500 dark:text-gray-300">Monthly trend accuracy</p>
                  <p className="mt-2 text-xl font-semibold text-yellow-600 dark:text-yellow-400">98%</p>
                </motion.div>
              </div>
            </motion.div>

            {/* Right - illustration (analytics dashboard style) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex justify-center lg:justify-end"
            >
              {/* Inline SVG illustration (simple analytics dashboard) */}
              <div className="w-full max-w-md">
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-3 w-24 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-300"></div>
                    <div className="h-3 w-10 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                  </div>

                  {/* mock chart */}
                  <svg viewBox="0 0 320 140" className="w-full h-40">
                    <defs>
                      <linearGradient id="g1" x1="0" x2="1">
                        <stop offset="0%" stopColor="#6366f1" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.9" />
                      </linearGradient>
                    </defs>
                    <rect x="0" y="0" width="320" height="140" fill="transparent" />
                    <path d="M0 120 L40 80 L80 90 L120 60 L160 70 L200 40 L240 60 L280 30 L320 50 L320 140 L0 140 Z" fill="url(#g1)" opacity="0.12" />
                    <polyline points="0,120 40,80 80,90 120,60 160,70 200,40 240,60 280,30 320,50" fill="none" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>

                  <div className="mt-5 grid grid-cols-3 gap-3">
                    <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded">
                      <p className="text-xs text-gray-500 dark:text-gray-300">Income</p>
                      <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">₹72,000</p>
                    </div>
                    <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded">
                      <p className="text-xs text-gray-500 dark:text-gray-300">Expenses</p>
                      <p className="text-sm font-medium text-red-600 dark:text-red-400">₹29,300</p>
                    </div>
                    <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded">
                      <p className="text-xs text-gray-500 dark:text-gray-300">Balance</p>
                      <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">₹42,700</p>
                    </div>
                  </div>
                </div>

                {/* small feature badges below illustration */}
                <div className="mt-4 flex gap-3 justify-between text-xs">
                  <span className="px-3 py-2 rounded-full bg-indigo-50 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200">Real-time</span>
                  <span className="px-3 py-2 rounded-full bg-emerald-50 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-200">Secure</span>
                  <span className="px-3 py-2 rounded-full bg-yellow-50 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-200">Insights</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* decorative shapes */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <svg className="hidden lg:block absolute right-0 top-0 transform translate-x-24 -translate-y-24" width="420" height="420" viewBox="0 0 420 420" fill="none">
            <circle cx="210" cy="210" r="140" fill="url(#lg1)" opacity="0.06" />
            <defs>
              <linearGradient id="lg1" x1="0" x2="1">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-6 mt-12 lg:mt-20">
        <motion.div initial="hidden" animate="show" className="grid lg:grid-cols-3 gap-8">
          {[
            {
              icon: "🛒",
              title: "Categorize Easily",
              desc: "Auto-categorize transactions and search by merchant or tag.",
            },
            {
              icon: "📈",
              title: "Visual Reports",
              desc: "Beautiful charts, monthly trends, and exportable reports.",
            },
            {
              icon: "🔒",
              title: "Bank-level Security",
              desc: "Encrypted storage and secure authentication for your privacy.",
            },
          ].map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-lg transition"
            >
              <div className="text-3xl">{f.icon}</div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">{f.title}</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* PRICING */}
      <section className="max-w-7xl mx-auto px-6 mt-16 lg:mt-24">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">Pricing built for everyone</h2>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Free */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Free</h3>
              <p className="text-indigo-600 dark:text-indigo-400 font-bold text-lg">₹0</p>
            </div>
            <p className="mt-3 text-gray-600 dark:text-gray-300">Basic tracking, 1 profile, export CSV.</p>
            <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
              <li>✅ Expense tracking</li>
              <li>✅ Category management</li>
              <li>❌ Advanced analytics</li>
            </ul>
            <Link to="/signup" className="mt-6 inline-block w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-semibold">
              Get Free
            </Link>
          </motion.div>

          {/* Pro */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="bg-gradient-to-br from-indigo-600 to-cyan-500 text-white p-6 rounded-2xl shadow-xl transform scale-100 md:scale-105"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Pro</h3>
              <p className="text-white font-bold text-lg">₹299 / mo</p>
            </div>
            <p className="mt-3 opacity-90">Everything in Free plus advanced analytics, monthly forecasts.</p>
            <ul className="mt-4 space-y-2">
              <li>✅ All Free features</li>
              <li>✅ Advanced visual analytics</li>
              <li>✅ Priority support</li>
            </ul>
            <Link to="/signup" className="mt-6 inline-block w-full text-center bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg font-semibold">
              Start Pro
            </Link>
          </motion.div>

          {/* Business */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Business</h3>
              <p className="text-indigo-600 dark:text-indigo-400 font-bold text-lg">Custom</p>
            </div>
            <p className="mt-3 text-gray-600 dark:text-gray-300">For teams and companies — invoicing & multi-user.</p>
            <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
              <li>✅ Multi-user</li>
              <li>✅ Team roles & permissions</li>
              <li>✅ Custom integrations</li>
            </ul>
            <Link to="/contact" className="mt-6 inline-block w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-semibold">
              Contact Sales
            </Link>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mt-24 bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3">
              <img src={icon} alt="logo" className="w-10 h-10 object-contain" />
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white">Money Manager</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Track smarter. Live better.</p>
              </div>
            </div>

            <div className="mt-6 text-sm text-gray-600 dark:text-gray-300">
              © {new Date().getFullYear()} Money Manager — Built with care.
            </div>
          </div>

          <div className="text-sm text-gray-700 dark:text-gray-300">
            <h5 className="font-semibold mb-3">Product</h5>
            <ul className="space-y-2">
              <li><Link to="/dashboard" className="hover:underline">Dashboard</Link></li>
              <li><Link to="/category" className="hover:underline">Categories</Link></li>
              <li><Link to="/filter" className="hover:underline">Filters</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-gray-900 dark:text-white mb-3">Subscribe</h5>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">Get monthly tips & product updates.</p>
            <form className="flex gap-2">
              <input
                aria-label="Email address"
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-3 py-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm focus:outline-none"
              />
              <button type="submit" className="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
