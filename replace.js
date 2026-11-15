const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'artifacts/my-visit-prep/src/pages/Home.tsx');
let content = fs.readFileSync(filePath, 'utf8');

const original = `      {/* ── Main ── */}
      <main className="flex-1 w-full max-w-2xl mx-auto px-4 sm:px-5 py-8 sm:py-10">

        {/* Hero */}
        <section className="no-print mb-7 sm:mb-8" aria-labelledby="hero-heading">
          <h1
            id="hero-heading"
            className="text-2xl sm:text-4xl font-bold text-foreground leading-tight mb-2"
            data-testid="text-hero-heading"
          >
            {t.ui.heroHeading}
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            {t.ui.heroDescription}
          </p>
        </section>

        {/* Back link — condition pages only */}
        {initialConditionId && (
          <div className="no-print mb-5">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              data-testid="link-all-conditions"
            >
              ← All conditions
            </Link>
          </div>
        )}

        {/* Tip box */}
        <div
          className="no-print mb-7 flex gap-3 rounded-xl bg-accent border border-accent-foreground/10 px-4 py-4"
          role="note"
          data-testid="tip-box"
        >
          <svg className="flex-shrink-0 w-5 h-5 text-accent-foreground mt-0.5" fill="none" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 2a7 7 0 017 7c0 2.5-1.3 4.7-3.3 6L15 17H9l-.3-2.1C6.6 13.7 5 11.5 5 9a7 7 0 017-7zm-1 15h2v2h-2v-2z" fill="currentColor" fillOpacity="0.7"/>
          </svg>
          <p className="text-sm leading-relaxed text-accent-foreground">
            {t.ui.tip}
          </p>
        </div>

        {/* Visit type selector */}
        <section className="no-print mb-7 sm:mb-8" data-testid="visit-type-selector">
          <span className="block text-base font-semibold text-foreground mb-3">
            {t.ui.visitTypeLabel}
          </span>
          <div className="grid grid-cols-2 gap-3">
            {(["first", "followup"] as const).map((vt) => {
              const active = visitType === vt;
              return (
                <button
                  key={vt}
                  type="button"
                  onClick={() => {
                    setVisitType(vt);
                    trackEvent("visit_type_selected", {
                      visit_type: vt,
                      language: lang,
                    });
                  }}
                  aria-pressed={active}
                  data-testid={\`button-visit-\${vt}\`}
                  className={\`
                    rounded-xl border-2 px-4 py-3 text-sm font-semibold text-center
                    focus:outline-none focus:ring-2 focus:ring-primary/30
                    transition-colors touch-manipulation
                    \${
                      active
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-card text-foreground border-border hover:border-primary/50"
                    }
                  \`}
                >
                  {vt === "first" ? t.ui.visitTypeFirst : t.ui.visitTypeFollowup}
                </button>
              );
            })}
          </div>
        </section>

        {/* Condition selector */}
        <section className="no-print mb-7 sm:mb-8" aria-labelledby="select-label">
          <label
            id="select-label"
            htmlFor="condition-select"
            className="block text-base font-semibold text-foreground mb-3"
          >
            {t.ui.conditionSelectLabel}
          </label>
          <StyledSelect
            id="condition-select"
            testId="select-condition"
            value={selectedId}
            onChange={handleConditionChange}
            ariaLabel={t.ui.conditionSelectLabel}
          >
            <option value="" disabled>{t.ui.conditionSelectPlaceholder}</option>
            {[
              ...t.conditions.map((c) => ({ id: c.id, label: c.label })),
              ...customTopics.map((ct) => ({ id: ct.id, label: ct.label })),
            ]
              .sort((a, b) => a.label.localeCompare(b.label, lang))
              .map((o) => (
                <option key={o.id} value={o.id}>{o.label}</option>
              ))}
          </StyledSelect>

          {!topicInputOpen ? (
            <button
              type="button"
              onClick={() => setTopicInputOpen(true)}
              className="
                mt-3 inline-block px-4 py-2 rounded-xl text-sm font-semibold
                border border-primary/40 bg-card text-primary
                hover:border-primary hover:bg-accent
                focus:outline-none focus:ring-2 focus:ring-primary/30
                transition-colors
              "
              data-testid="button-topic-not-listed"
            >
              My topic isn&apos;t listed
            </button>
          ) : (
            <form
              className="mt-3"
              onSubmit={(e) => {
                e.preventDefault();
                void handleGenerateCustomTopic(topicQuery);
              }}
            >
              <label
                htmlFor="custom-topic-input"
                className="block text-sm font-medium text-foreground mb-2"
              >
                What would you like to talk to your doctor about?
              </label>
              <div className="flex gap-2">
                <input
                  id="custom-topic-input"
                  type="text"
                  value={topicQuery}
                  onChange={(e) => setTopicQuery(e.target.value)}
                  maxLength={200}
                  autoFocus
                  disabled={topicLoading}
                  className="
                    flex-1 px-3 py-2 rounded-xl border border-border bg-card
                    text-sm text-foreground placeholder:text-muted-foreground
                    focus:outline-none focus:ring-2 focus:ring-primary/30
                  "
                  data-testid="input-custom-topic"
                />
                <button
                  type="submit"
                  disabled={!topicQuery.trim() || topicLoading}
                  className="
                    px-4 py-2 rounded-xl text-sm font-semibold
                    bg-primary text-primary-foreground
                    disabled:opacity-50 disabled:cursor-not-allowed
                    hover:bg-primary/90 transition-colors
                  "
                  data-testid="button-submit-custom-topic"
                >
                  {topicLoading ? t.ui.aiPanelLoading : t.ui.aiPanelButton}
                </button>
              </div>
              {topicError && (
                <p className="mt-2 text-sm text-destructive" role="alert">
                  {t.ui.aiPanelError}
                </p>
              )}
            </form>
          )}

        </section>`;

const replacement = `      {/* ── Main ── */}
      <main className="flex-1 w-full mx-auto pb-8 sm:pb-10">

        {/* Hero */}
        <section className="no-print w-full bg-background border-b border-border/40 mb-8 pb-10 pt-8 sm:pt-12" aria-labelledby="hero-heading">
          <div className="max-w-5xl mx-auto px-4 sm:px-5">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              
              <div className="flex flex-col justify-center">
                <h1
                  id="hero-heading"
                  className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight mb-3 tracking-tight"
                  data-testid="text-hero-heading"
                >
                  Vaani
                </h1>
                <p className="text-xl sm:text-2xl font-semibold text-primary mb-3">
                  Find your voice at the doctor's office.
                </p>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg">
                  Because the best questions come before the appointment, not after.
                </p>

                <div 
                  className="bg-card rounded-2xl shadow-sm border border-border/60 p-5 sm:p-6 transition-all"
                  data-testid="hero-condition-picker-container"
                >
                  <label
                    id="select-label"
                    htmlFor="condition-select"
                    className="block text-base font-semibold text-foreground mb-4"
                  >
                    {t.ui.conditionSelectLabel}
                  </label>
                  <StyledSelect
                    id="condition-select"
                    testId="select-condition"
                    value={selectedId}
                    onChange={handleConditionChange}
                    ariaLabel={t.ui.conditionSelectLabel}
                  >
                    <option value="" disabled>{t.ui.conditionSelectPlaceholder}</option>
                    {[
                      ...t.conditions.map((c) => ({ id: c.id, label: c.label })),
                      ...customTopics.map((ct) => ({ id: ct.id, label: ct.label })),
                    ]
                      .sort((a, b) => a.label.localeCompare(b.label, lang))
                      .map((o) => (
                        <option key={o.id} value={o.id}>{o.label}</option>
                      ))}
                  </StyledSelect>

                  {!topicInputOpen ? (
                    <button
                      type="button"
                      onClick={() => setTopicInputOpen(true)}
                      className="
                        mt-4 inline-block px-4 py-2 rounded-xl text-sm font-semibold
                        border border-primary/30 bg-primary/5 text-primary
                        hover:border-secondary hover:bg-secondary hover:text-secondary-foreground
                        focus:outline-none focus:ring-2 focus:ring-secondary/30
                        transition-all duration-200
                      "
                      data-testid="button-topic-not-listed"
                    >
                      My topic isn&apos;t listed
                    </button>
                  ) : (
                    <form
                      className="mt-4 animate-in fade-in slide-in-from-top-2 duration-300"
                      onSubmit={(e) => {
                        e.preventDefault();
                        void handleGenerateCustomTopic(topicQuery);
                      }}
                    >
                      <label
                        htmlFor="custom-topic-input"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        What would you like to talk to your doctor about?
                      </label>
                      <div className="flex gap-2">
                        <input
                          id="custom-topic-input"
                          type="text"
                          value={topicQuery}
                          onChange={(e) => setTopicQuery(e.target.value)}
                          maxLength={200}
                          autoFocus
                          disabled={topicLoading}
                          className="
                            flex-1 px-3 py-2 rounded-xl border border-border bg-background
                            text-sm text-foreground placeholder:text-muted-foreground
                            focus:outline-none focus:ring-2 focus:ring-primary/30
                          "
                          data-testid="input-custom-topic"
                        />
                        <button
                          type="submit"
                          disabled={!topicQuery.trim() || topicLoading}
                          className="
                            flex-shrink-0 px-4 py-2 rounded-xl text-sm font-semibold
                            bg-primary text-primary-foreground
                            hover:bg-secondary hover:text-secondary-foreground
                            disabled:opacity-50 disabled:cursor-not-allowed
                            focus:outline-none focus:ring-2 focus:ring-primary/30
                            transition-colors touch-manipulation
                          "
                          data-testid="button-submit-custom-topic"
                        >
                          {topicLoading ? t.ui.aiPanelLoading : t.ui.aiPanelButton}
                        </button>
                      </div>
                      {topicError && (
                        <p className="mt-2 text-sm text-destructive" role="alert">
                          {t.ui.aiPanelError}
                        </p>
                      )}
                    </form>
                  )}
                </div>
              </div>

              <div className="hidden lg:block w-full">
                <img 
                  src={vaaniHeroImage} 
                  alt="" 
                  aria-hidden="true"
                  className="w-full h-auto object-cover rounded-[16px] shadow-sm border border-border/50" 
                />
              </div>

              <div className="block lg:hidden w-full mt-4">
                <img 
                  src={vaaniHeroImage} 
                  alt="" 
                  aria-hidden="true"
                  className="w-full h-auto object-cover rounded-[16px] shadow-sm border border-border/50" 
                />
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-2xl mx-auto px-4 sm:px-5">
          {/* Back link — condition pages only */}
          {initialConditionId && (
            <div className="no-print mb-5">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                data-testid="link-all-conditions"
              >
                ← All conditions
              </Link>
            </div>
          )}

          {/* Tip box */}
          <div
            className="no-print mb-7 flex gap-3 rounded-xl bg-accent border border-accent-foreground/10 px-4 py-4"
            role="note"
            data-testid="tip-box"
          >
            <svg className="flex-shrink-0 w-5 h-5 text-accent-foreground mt-0.5" fill="none" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2a7 7 0 017 7c0 2.5-1.3 4.7-3.3 6L15 17H9l-.3-2.1C6.6 13.7 5 11.5 5 9a7 7 0 017-7zm-1 15h2v2h-2v-2z" fill="currentColor" fillOpacity="0.7"/>
            </svg>
            <p className="text-sm leading-relaxed text-accent-foreground">
              {t.ui.tip}
            </p>
          </div>

          {/* Visit type selector */}
          <section className="no-print mb-7 sm:mb-8" data-testid="visit-type-selector">
            <span className="block text-base font-semibold text-foreground mb-3">
              {t.ui.visitTypeLabel}
            </span>
            <div className="grid grid-cols-2 gap-3">
              {(["first", "followup"] as const).map((vt) => {
                const active = visitType === vt;
                return (
                  <button
                    key={vt}
                    type="button"
                    onClick={() => {
                      setVisitType(vt);
                      trackEvent("visit_type_selected", {
                        visit_type: vt,
                        language: lang,
                      });
                    }}
                    aria-pressed={active}
                    data-testid={\`button-visit-\${vt}\`}
                    className={\`
                      rounded-xl border-2 px-4 py-3 text-sm font-semibold text-center
                      focus:outline-none focus:ring-2 focus:ring-primary/30
                      transition-colors touch-manipulation
                      \${
                        active
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-card text-foreground border-border hover:border-secondary hover:text-secondary"
                      }
                    \`}
                  >
                    {vt === "first" ? t.ui.visitTypeFirst : t.ui.visitTypeFollowup}
                  </button>
                );
              })}
            </div>
          </section>

          {/* Condition-specific sections wrapper */}
          <section className="no-print" aria-labelledby="select-label">
            <span id="select-label" className="sr-only">Condition configuration</span>`;

if (content.indexOf(original) !== -1) {
  content = content.replace(original, replacement);
  fs.writeFileSync(filePath, content);
  console.log('Successfully replaced content.');
} else {
  console.log('Original content not found. Writing excerpt to debug.log');
  fs.writeFileSync('debug.log', original);
  
  // write part of the file to see why it fails
  fs.writeFileSync('debug_file.log', content.substring(content.indexOf('      {/* ── Main ── */}'), content.indexOf('      {/* ── Main ── */}') + 5000));
}
