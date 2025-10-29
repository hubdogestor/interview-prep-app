// src/app/design-test/page.tsx
export default function DesignTest() {
  return (
    <div className="min-h-screen p-8">
      <div className="container mx-auto space-y-8">
        {/* Header */}
        <div className="animate-fade-in">
          <h1>Design System Test</h1>
          <p className="text-text-secondary mt-2">
            Testando todos os componentes do Groovy Funk
          </p>
        </div>

        {/* Typography */}
        <div className="card animate-slide-up">
          <h2 className="mb-4">Typography</h2>
          <div className="space-y-4">
            <h1>Heading 1 - Space Grotesk</h1>
            <h2>Heading 2 - Space Grotesk</h2>
            <h3>Heading 3 - DM Sans</h3>
            <h4>Heading 4 - DM Sans</h4>
            <p>Paragraph - Inter font for body text</p>
            <code className="font-mono">Code - JetBrains Mono</code>
          </div>
        </div>

        {/* Colors */}
        <div className="card">
          <h2 className="mb-4">Colors - Groovy Funk</h2>
          <div className="grid grid-cols-5 gap-4">
            <div className="space-y-2">
              <div className="w-full h-20 bg-brand-blue rounded-lg"></div>
              <p className="text-xs">Blue</p>
            </div>
            <div className="space-y-2">
              <div className="w-full h-20 bg-brand-green rounded-lg"></div>
              <p className="text-xs">Green</p>
            </div>
            <div className="space-y-2">
              <div className="w-full h-20 bg-brand-lime rounded-lg"></div>
              <p className="text-xs">Lime</p>
            </div>
            <div className="space-y-2">
              <div className="w-full h-20 bg-brand-orange rounded-lg"></div>
              <p className="text-xs">Orange</p>
            </div>
            <div className="space-y-2">
              <div className="w-full h-20 bg-brand-yellow rounded-lg"></div>
              <p className="text-xs">Yellow</p>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="card">
          <h2 className="mb-4">Buttons</h2>
          <div className="flex flex-wrap gap-4">
            <button className="btn btn-primary">Primary</button>
            <button className="btn btn-secondary">Secondary</button>
            <button className="btn btn-ghost">Ghost</button>
          </div>
        </div>

        {/* Badges */}
        <div className="card">
          <h2 className="mb-4">Badges</h2>
          <div className="flex flex-wrap gap-4">
            <span className="badge badge-success">Success</span>
            <span className="badge badge-warning">Warning</span>
            <span className="badge badge-error">Error</span>
            <span className="badge badge-info">Info</span>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-3 gap-6">
          <div className="card">
            <div className="metric-label">Total Balance</div>
            <div className="metric-value">$19,750</div>
            <div className="text-brand-green text-sm mt-2">↑ 11.84%</div>
          </div>
          <div className="card">
            <div className="metric-label">Total Expense</div>
            <div className="metric-value">$11,375</div>
            <div className="text-brand-orange text-sm mt-2">↑ 20.91%</div>
          </div>
          <div className="card">
            <div className="metric-label">Total Savings</div>
            <div className="metric-value">$100,000</div>
            <div className="text-brand-green text-sm mt-2">↑ 21.17%</div>
          </div>
        </div>

        {/* Inputs */}
        <div className="card">
          <h2 className="mb-4">Form Elements</h2>
          <div className="space-y-4">
            <input
              type="text"
              className="input"
              placeholder="Enter your name"
            />
            <textarea
              className="input min-h-[120px]"
              placeholder="Enter description"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}