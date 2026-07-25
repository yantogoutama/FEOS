/* FEOS Executive Decision Assistant */
const FEOS_decision = {
  init() {
    const container = document.getElementById('view-decision');
    if (!container) return;
    container.innerHTML = `
      <div class="module-view-header">
        <h2>Executive Decision Assistant</h2>
        <p>Structured executive decision-making with problem identification, root cause analysis, options, and risk assessment.</p>
      </div>
      <div class="module-layout">
        <div class="form-panel">
          <h3>Decision Context</h3>
          <form id="decisionForm">
            <div class="form-group">
              <label>Decision Title <span class="required">*</span></label>
              <input type="text" name="decisionTitle" class="form-control" placeholder="e.g., Should we acquire Company X?">
            </div>
            <div class="form-group">
              <label>Company Name <span class="required">*</span></label>
              <input type="text" name="companyName" class="form-control" placeholder="Your company name">
            </div>
            <div class="form-group">
              <label>Decision Category <span class="required">*</span></label>
              <select name="category" class="form-control">
                <option value="">Select Category</option>
                <option value="strategic">Strategic Decision</option>
                <option value="investment">Investment / Capital Allocation</option>
                <option value="organizational">Organizational / HR</option>
                <option value="operational">Operational Decision</option>
                <option value="compliance">Compliance / Legal</option>
                <option value="crisis">Crisis / Emergency Response</option>
              </select>
            </div>
            <div class="form-group">
              <label>Problem Statement <span class="required">*</span></label>
              <textarea name="problem" class="form-control" rows="3" placeholder="Clearly state the problem or decision to be made..."></textarea>
            </div>
            <div class="form-group">
              <label>Background & Context <span class="required">*</span></label>
              <textarea name="context" class="form-control" rows="4" placeholder="Provide relevant background: market conditions, organizational situation, stakeholder positions, time pressure..."></textarea>
            </div>
            <div class="form-group">
              <label>Options Considered <span class="required">*</span></label>
              <textarea name="options" class="form-control" rows="4" placeholder="List the options you are considering (one per line or comma separated)..."></textarea>
            </div>
            <div class="form-group">
              <label>Constraints & Boundaries</label>
              <textarea name="constraints" class="form-control" rows="2" placeholder="Budget limits, regulatory constraints, timeline, stakeholder requirements..."></textarea>
            </div>
            <div class="form-group">
              <label>Decision Timeline</label>
              <select name="timeline" class="form-control">
                <option value="immediate">Immediate (within 24 hours)</option>
                <option value="short">Short-term (1-4 weeks)</option>
                <option value="medium">Medium-term (1-3 months)</option>
                <option value="strategic">Strategic (3-12 months)</option>
              </select>
            </div>
            <button type="button" class="btn btn-primary btn-block" onclick="FEOS_decision.generate()">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
              Generate Decision Analysis
            </button>
          </form>
        </div>
        <div class="output-panel">
          <div class="output-header">
            <h3><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg> Executive Decision Analysis</h3>
            <div class="output-actions" id="decisionActions" style="display:none">
              <button class="btn btn-secondary btn-sm" onclick="FEOSUtils.printReport('decisionReport')">Print</button>
              <button class="btn btn-secondary btn-sm" onclick="FEOS_decision.exportReport()">Export</button>
            </div>
          </div>
          <div class="output-body" id="decisionOutput">
            <div class="output-placeholder">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
              <h4>Decision Analysis Ready</h4>
              <p>Provide your decision context to receive a structured executive analysis with problem identification, root cause, options evaluation, and recommendation.</p>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  generate() {
    const v = FEOSUtils.validateForm('decisionForm', ['decisionTitle','companyName','category','problem','context','options']);
    if (!v.valid) { alert('Please complete all required fields: ' + v.missing.join(', ')); return; }
    const d = v.data;
    FEOSUtils.showLoading('decisionOutput', 'Analyzing Decision Framework...', 'Evaluating options, risks, and strategic implications');
    setTimeout(() => {
      FEOSUtils.renderReport('decisionOutput', this.buildReport(d));
      document.getElementById('decisionActions').style.display = 'flex';
    }, 2200);
  },

  buildReport(d) {
    const options = d.options.split(/
|,/).map(o => o.trim()).filter(o => o);
    const constraints = d.constraints || 'No specific constraints provided beyond standard business governance and regulatory requirements.';
    const timeline = d.timeline || 'short';
    const timelineLabel = { immediate: 'Immediate (24 hours)', short: 'Short-term (1-4 weeks)', medium: 'Medium-term (1-3 months)', strategic: 'Strategic (3-12 months)' }[timeline];

    return `
      <div class="report" id="decisionReport">
        <div class="report-header">
          <h2>Executive Decision Analysis</h2>
          <div class="report-meta">
            <span>&#x1F4C5; ${FEOSUtils.formatDate()}</span>
            <span>&#x1F3E2; ${FEOSUtils.escapeHtml(d.companyName)}</span>
            <span class="tag">${d.category.toUpperCase()}</span>
          </div>
          <div style="margin-top:12px; font-size:1.125rem; color:var(--text-secondary); font-weight:500;">${FEOSUtils.escapeHtml(d.decisionTitle)}</div>
        </div>

        <div class="report-section">
          <h3>&#x2753; Problem Identification</h3>
          <p><strong>Decision Statement:</strong> ${FEOSUtils.escapeHtml(d.problem)}</p>
          <p><strong>Decision Category:</strong> ${d.category} decision requiring ${timeline === 'immediate' ? 'rapid executive judgment with limited information and high time pressure.' : timeline === 'strategic' ? 'comprehensive analysis, stakeholder consultation, and board-level deliberation.' : 'structured analysis with defined evaluation criteria and stakeholder input.'}</p>
          <p><strong>Decision Timeline:</strong> ${timelineLabel}</p>
        </div>

        <div class="report-section">
          <h3>&#x1F332; Root Cause Analysis</h3>
          <p>The decision context indicates that this situation has arisen from a combination of factors:</p>
          <ul>
            <li><strong>Strategic Driver:</strong> The decision is necessitated by ${d.category === 'strategic' ? 'shifts in competitive landscape, market opportunity, or strategic repositioning requirements.' : d.category === 'investment' ? 'capital allocation priorities, growth funding requirements, or shareholder return expectations.' : d.category === 'organizational' ? 'organizational scaling challenges, talent gaps, or structural misalignment.' : d.category === 'operational' ? 'operational performance gaps, capacity constraints, or efficiency imperatives.' : d.category === 'compliance' ? 'regulatory changes, audit findings, or legal exposure requiring remediation.' : 'an unexpected event requiring immediate executive response and crisis management.'}</li>
            <li><strong>Contributing Factors:</strong> ${FEOSUtils.escapeHtml(d.context)}</li>
            <li><strong>Systemic Insight:</strong> This decision should not be evaluated in isolation. It must be assessed against the organization's strategic priorities, risk appetite, and long-term sustainability. The decision made today will shape organizational trajectory for the next 12-36 months.</li>
          </ul>
        </div>

        <div class="report-section">
          <h3>&#x1F4C8; Business Impact Assessment</h3>
          <p><strong>Financial Impact:</strong> ${d.category === 'investment' ? 'Direct capital deployment with ROI implications over 3-5 year horizon. Opportunity cost of capital must be evaluated against alternative investments.' : d.category === 'strategic' ? 'Revenue trajectory, market positioning, and competitive dynamics will be materially affected. Financial modeling required for each option.' : 'Direct P&L impact through cost, revenue, or efficiency changes. Indirect impact through risk mitigation or capability building.'}</p>
          <p><strong>Operational Impact:</strong> ${d.category === 'organizational' ? 'Organizational redesign will affect reporting relationships, decision flows, and employee morale during transition period.' : d.category === 'operational' ? 'Process changes, system modifications, and workforce adjustments will affect day-to-day operations for 3-6 months.' : 'Operational adjustments required to implement the decision, with transition risks managed through change management.'}</p>
          <p><strong>People Impact:</strong> Employee morale, retention risk, and cultural signals will be affected. Communication strategy must be carefully planned to maintain trust and engagement.</p>
          <p><strong>Governance Impact:</strong> Board notification and/or approval may be required depending on materiality thresholds. Ensure compliance with authority matrix and GMS requirements.</p>
          <p><strong>Reputational Impact:</strong> External perception among customers, investors, suppliers, and regulators must be considered. Crisis communication plan may be required.</p>
        </div>

        <div class="report-section">
          <h3>&#x2696; Options Analysis</h3>
          ${options.length > 0 ? options.map((opt, i) => `
            <div style="margin-bottom:20px; padding:16px; background:var(--bg-tertiary); border-radius:var(--radius-md); border:1px solid var(--border-subtle);">
              <div style="font-weight:600; color:var(--text-primary); margin-bottom:8px; font-size:1rem;">Option ${String.fromCharCode(65+i)}: ${FEOSUtils.escapeHtml(opt)}</div>
              <div style="color:var(--text-secondary); font-size:0.9375rem; line-height:1.6; margin-bottom:10px;">
                <strong>Pros:</strong> ${this.generatePros(d.category, opt, i)}<br><br>
                <strong>Cons:</strong> ${this.generateCons(d.category, opt, i)}<br><br>
                <strong>Risk Level:</strong> <span class="risk-badge ${i === 0 ? 'risk-medium' : i === 1 ? 'risk-low' : 'risk-high'}">${i === 0 ? 'Medium' : i === 1 ? 'Low' : 'High'}</span>
              </div>
            </div>
          `).join('') : '<p>No specific options were provided. Please define at least two options for structured analysis.</p>'}
        </div>

        <div class="report-section">
          <h3>&#x26A0; Risk Analysis</h3>
          <table class="report-table">
            <tr><th>Risk Category</th><th>Risk Description</th><th>Impact</th><th>Probability</th><th>Mitigation</th></tr>
            <tr><td><strong>Execution Risk</strong></td><td>Failure to implement the chosen option effectively due to resource constraints, resistance, or poor project management.</td><td>High</td><td>Medium</td><td>Dedicated project team, change management, executive sponsorship, milestone tracking.</td></tr>
            <tr><td><strong>Market Risk</strong></td><td>External market conditions change unfavorably after decision is made, reducing expected benefits.</td><td>High</td><td>Medium</td><td>Scenario planning, staged implementation, exit clauses, continuous market monitoring.</td></tr>
            <tr><td><strong>Financial Risk</strong></td><td>Actual costs exceed budget or expected returns fail to materialize within projected timeline.</td><td>High</td><td>Medium</td><td>Financial modeling with sensitivity analysis, budget contingency (10-15%), stage-gate funding.</td></tr>
            <tr><td><strong>People Risk</strong></td><td>Key talent departure, morale collapse, or inability to attract required skills.</td><td>Medium</td><td>Medium</td><td>Retention planning, communication strategy, talent acquisition pipeline, leadership visibility.</td></tr>
            <tr><td><strong>Regulatory Risk</strong></td><td>Unfavorable regulatory interpretation or new regulations affecting the decision outcome.</td><td>Medium</td><td>Low</td><td>Legal review, regulatory consultation, compliance monitoring, lobbying where appropriate.</td></tr>
          </table>
        </div>

        <div class="report-section">
          <h3>&#x1F3C6; Recommendation</h3>
          <div class="alert-box info" style="margin-bottom:16px;">
            <strong>Recommended Option:</strong> ${options.length > 0 ? `<strong>Option A: ${FEOSUtils.escapeHtml(options[0])}</strong>` : 'Define options to receive recommendation'}
          </div>
          <p><strong>Rationale:</strong> Based on the analysis, ${options.length > 0 ? `<strong>Option A</strong>` : 'the recommended option'} best aligns with the organization's strategic priorities, risk appetite, and resource constraints. It addresses the root cause most directly while minimizing downside exposure. The option provides the optimal balance of strategic benefit, executability, and risk-adjusted return.</p>
          <p><strong>Conditions for Proceeding:</strong></p>
          <ul>
            <li>Board approval obtained (if materiality threshold exceeded).</li>
            <li>Detailed implementation plan with budget, timeline, and resource allocation approved.</li>
            <li>Key stakeholders briefed and aligned on decision rationale and expected outcomes.</li>
            <li>Risk mitigation measures activated before implementation begins.</li>
            <li>Success metrics and review milestones defined and communicated.</li>
          </ul>
          <p><strong>Decision Reversal Triggers:</strong> If any of the following occur, the decision should be re-evaluated: (a) Material change in market conditions, (b) Regulatory barrier emerges, (c) Key assumption proves invalid, (d) Implementation costs exceed budget by >20%, (e) Stakeholder opposition becomes insurmountable.</p>
        </div>

        <div class="report-section">
          <h3>&#x1F4C5; Implementation Plan</h3>
          <div class="plan-timeline">
            <div class="plan-phase">
              <div class="plan-phase-marker"><div class="plan-dot"></div><div class="plan-line"></div></div>
              <div class="plan-phase-content">
                <div class="plan-phase-title">Decision Formalization (Days 1-3)</div>
                <div class="plan-phase-desc">Document decision rationale, obtain required approvals, communicate to key stakeholders, assign implementation owner, and establish governance structure.</div>
              </div>
            </div>
            <div class="plan-phase">
              <div class="plan-phase-marker"><div class="plan-dot"></div><div class="plan-line"></div></div>
              <div class="plan-phase-content">
                <div class="plan-phase-title">Planning & Preparation (Days 4-14)</div>
                <div class="plan-phase-desc">Develop detailed implementation plan with work breakdown structure, resource allocation, budget, risk register, and communication plan. Conduct stakeholder workshops.</div>
              </div>
            </div>
            <div class="plan-phase">
              <div class="plan-phase-marker"><div class="plan-dot"></div><div class="plan-line"></div></div>
              <div class="plan-phase-content">
                <div class="plan-phase-title">Execution (Weeks 3-12)</div>
                <div class="plan-phase-desc">Execute implementation plan with weekly steering committee reviews. Monitor KPIs, manage risks, address blockers, and communicate progress.</div>
              </div>
            </div>
            <div class="plan-phase">
              <div class="plan-phase-marker"><div class="plan-dot"></div></div>
              <div class="plan-phase-content">
                <div class="plan-phase-title">Review & Optimize (Month 4+)</div>
                <div class="plan-phase-desc">Conduct post-implementation review against success criteria. Document lessons learned. Optimize processes based on operational experience. Integrate into standard operations.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  generatePros(category, option, idx) {
    const pros = [
      'Directly addresses the core problem with clear execution path. Leverages existing organizational capabilities. Lower implementation risk due to familiarity. Faster time-to-benefit.',
      'Minimizes resource requirement and organizational disruption. Preserves optionality for future decisions. Lower financial exposure. Easier to reverse if conditions change.',
      'Maximum strategic upside if successful. Positions organization for long-term competitive advantage. Aligns with industry best practices. Strong stakeholder value creation potential.'
    ];
    return pros[idx % pros.length];
  },

  generateCons(category, option, idx) {
    const cons = [
      'Requires significant organizational change and resource commitment. Implementation complexity may delay benefits. Resistance from affected stakeholders possible.',
      'May not fully resolve the underlying problem. Could create perception of indecision or lack of ambition. Competitors may capitalize on hesitation.',
      'Highest risk profile with significant downside if unsuccessful. Requires substantial capital and talent investment. Longer time horizon before benefits realized.'
    ];
    return cons[idx % cons.length];
  },

  exportReport() {
    const r = document.getElementById('decisionReport');
    if (r) FEOSUtils.exportToTxt('Decision_Analysis', r.innerText);
  }
};
window.FEOS_decision = FEOS_decision;
