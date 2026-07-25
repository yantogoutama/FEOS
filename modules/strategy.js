/* FEOS Strategy Advisor */
const FEOS_strategy = {
  init() {
    const container = document.getElementById('view-strategy');
    if (!container) return;
    container.innerHTML = `
      <div class="module-view-header">
        <h2>Strategy Advisor</h2>
        <p>Executive-level strategic planning, competitive positioning, and business transformation analysis.</p>
      </div>
      <div class="module-layout">
        <div class="form-panel">
          <h3>Strategic Context</h3>
          <form id="strategyForm">
            <div class="form-group">
              <label>Company Name <span class="required">*</span></label>
              <input type="text" name="companyName" class="form-control" placeholder="Company name">
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>Industry <span class="required">*</span></label>
                <select name="industry" class="form-control">
                  <option value="">Select</option>
                  <option value="manufacturing">Manufacturing</option>
                  <option value="technology">Technology</option>
                  <option value="retail">Retail</option>
                  <option value="finance">Financial Services</option>
                  <option value="construction">Construction</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="energy">Energy</option>
                  <option value="services">Services</option>
                </select>
              </div>
              <div class="form-group">
                <label>Company Size <span class="required">*</span></label>
                <select name="size" class="form-control">
                  <option value="">Select</option>
                  <option value="small">Small (11-50)</option>
                  <option value="medium">Medium (51-200)</option>
                  <option value="large">Large (201-1000)</option>
                  <option value="enterprise">Enterprise (1000+)</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label>Strategic Challenge <span class="required">*</span></label>
              <select name="challenge" class="form-control">
                <option value="">Select Challenge</option>
                <option value="growth">Market Expansion & Growth</option>
                <option value="competition">Intensifying Competition</option>
                <option value="transformation">Digital Transformation</option>
                <option value="diversification">Product/Market Diversification</option>
                <option value="turnaround">Business Turnaround</option>
                <option value="sustainability">Sustainability & ESG Strategy</option>
                <option value="merger">M&A / Merger Integration</option>
                <option value="innovation">Innovation & R&D</option>
              </select>
            </div>
            <div class="form-group">
              <label>Current Vision Statement</label>
              <textarea name="vision" class="form-control" rows="2" placeholder="Current company vision (if any)"></textarea>
            </div>
            <div class="form-group">
              <label>Current Mission Statement</label>
              <textarea name="mission" class="form-control" rows="2" placeholder="Current company mission (if any)"></textarea>
            </div>
            <div class="form-group">
              <label>Strategic Situation Description <span class="required">*</span></label>
              <textarea name="situation" class="form-control" rows="4" placeholder="Describe the strategic situation: market position, competitors, growth trajectory, key decisions needed..."></textarea>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>Revenue Trend</label>
                <select name="revenueTrend" class="form-control">
                  <option value="">Select</option>
                  <option value="growing">Growing >20%</option>
                  <option value="moderate">Moderate 5-20%</option>
                  <option value="stable">Stable</option>
                  <option value="declining">Declining</option>
                </select>
              </div>
              <div class="form-group">
                <label>Market Position</label>
                <select name="marketPosition" class="form-control">
                  <option value="">Select</option>
                  <option value="leader">Market Leader</option>
                  <option value="challenger">Challenger</option>
                  <option value="follower">Follower</option>
                  <option value="niche">Niche Player</option>
                  <option value="new">New Entrant</option>
                </select>
              </div>
            </div>
            <button type="button" class="btn btn-primary btn-block" onclick="FEOS_strategy.generate()">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
              Generate Strategic Recommendation
            </button>
          </form>
        </div>
        <div class="output-panel">
          <div class="output-header">
            <h3><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg> Strategic Recommendation</h3>
            <div class="output-actions" id="strategyActions" style="display:none">
              <button class="btn btn-secondary btn-sm" onclick="FEOSUtils.printReport('strategyReport')">Print</button>
              <button class="btn btn-secondary btn-sm" onclick="FEOS_strategy.exportReport()">Export</button>
            </div>
          </div>
          <div class="output-body" id="strategyOutput">
            <div class="output-placeholder">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
              <h4>Strategic Analysis Ready</h4>
              <p>Provide your strategic context to receive a comprehensive strategic recommendation with situation analysis, options, and implementation roadmap.</p>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  generate() {
    const v = FEOSUtils.validateForm('strategyForm', ['companyName','industry','size','challenge','situation']);
    if (!v.valid) { alert('Please complete all required fields: ' + v.missing.join(', ')); return; }
    const d = v.data;
    FEOSUtils.showLoading('strategyOutput', 'Analyzing Strategic Position...', 'Evaluating market dynamics and competitive landscape');
    setTimeout(() => {
      FEOSUtils.renderReport('strategyOutput', this.buildReport(d));
      document.getElementById('strategyActions').style.display = 'flex';
    }, 2000);
  },

  buildReport(d) {
    const challengeMap = {
      growth: { title: 'Market Expansion Strategy', approach: 'Aggressive growth through market penetration, market development, and strategic partnerships.', risks: 'Overextension of resources, cash flow strain, brand dilution.' },
      competition: { title: 'Competitive Positioning Strategy', approach: 'Differentiation through superior value proposition, operational excellence, and customer intimacy.', risks: 'Price wars, margin compression, competitive retaliation.' },
      transformation: { title: 'Digital Transformation Strategy', approach: 'Technology-led reinvention of business model, customer experience, and operational backbone.', risks: 'Implementation failure, talent gaps, legacy system integration.' },
      diversification: { title: 'Diversification Strategy', approach: 'Adjacent market entry and product portfolio expansion with staged investment.', risks: 'Core business neglect, unfamiliar market dynamics, resource dispersion.' },
      turnaround: { title: 'Business Turnaround Strategy', approach: 'Rapid cost restructuring, portfolio rationalization, and leadership renewal.', risks: 'Talent flight, customer attrition, stakeholder confidence loss.' },
      sustainability: { title: 'ESG-Led Strategy', approach: 'Sustainability as competitive differentiator with ESG integration across value chain.', risks: 'Greenwashing perception, compliance cost, short-term margin pressure.' },
      merger: { title: 'M&A Integration Strategy', approach: 'Synergy realization through cultural integration, process harmonization, and leadership alignment.', risks: 'Culture clash, talent retention, integration cost overruns.' },
      innovation: { title: 'Innovation-Led Strategy', approach: 'R&D investment, open innovation ecosystem, and rapid prototyping-to-market pipeline.', risks: 'R&D ROI uncertainty, market timing, intellectual property risks.' }
    };
    const c = challengeMap[d.challenge] || challengeMap.growth;
    const vision = d.vision || `To be the leading ${d.industry} company in the region, recognized for excellence, innovation, and sustainable value creation.`;
    const mission = d.mission || `To deliver superior products and services that create measurable value for customers, employees, and shareholders while maintaining the highest standards of integrity and corporate responsibility.`;

    return `
      <div class="report" id="strategyReport">
        <div class="report-header">
          <h2>Strategic Recommendation: ${c.title}</h2>
          <div class="report-meta">
            <span>&#x1F4C5; ${FEOSUtils.formatDate()}</span>
            <span>&#x1F3E2; ${FEOSUtils.escapeHtml(d.companyName)}</span>
            <span class="tag">${d.industry.toUpperCase()}</span>
          </div>
        </div>

        <div class="report-section">
          <h3>&#x1F3AF; Vision & Mission Alignment</h3>
          <p><strong>Vision:</strong> ${FEOSUtils.escapeHtml(vision)}</p>
          <p><strong>Mission:</strong> ${FEOSUtils.escapeHtml(mission)}</p>
          <p><strong>Strategic Assessment:</strong> The current vision and mission ${d.vision && d.mission ? 'provide a foundation for strategic direction but require operational translation into measurable objectives.' : 'need formal articulation and board-level validation to serve as the north star for all strategic initiatives.'}</p>
        </div>

        <div class="report-section">
          <h3>&#x1F50D; Situation Analysis</h3>
          <p><strong>Market Context:</strong> ${FEOSUtils.escapeHtml(d.companyName)} operates in the ${d.industry} sector as a ${d.marketPosition || 'growing'} player. The strategic challenge of <strong>${d.challenge}</strong> requires a fundamental reassessment of competitive positioning and resource allocation.</p>
          <p><strong>Internal Assessment:</strong> As a ${d.size} organization with ${d.revenueTrend || 'moderate'} revenue trajectory, the company has ${d.size === 'enterprise' ? 'sufficient scale to pursue ambitious strategic initiatives but must overcome organizational inertia.' : d.size === 'small' ? 'agility advantage but limited resources requiring focused, high-impact strategic bets.' : 'a balance of agility and resources, requiring disciplined prioritization.'}</p>
          <p><strong>External Environment:</strong> The ${d.industry} sector is experiencing ${d.challenge === 'transformation' ? 'rapid digital disruption requiring proactive adaptation.' : d.challenge === 'competition' ? 'intensifying competitive pressure from both established players and new entrants.' : 'significant growth opportunities for well-positioned organizations.'}</p>
        </div>

        <div class="report-section">
          <h3>&#x2696; Strategic Options Analysis</h3>
          <table class="report-table">
            <tr><th>Option</th><th>Description</th><th>Investment</th><th>Timeline</th><th>Risk Level</th></tr>
            <tr><td><strong>Option A: Aggressive Expansion</strong></td><td>Rapid market penetration with significant capital deployment, M&A activity, and geographic expansion.</td><td>High</td><td>18-36 months</td><td><span class="risk-badge risk-high">High</span></td></tr>
            <tr><td><strong>Option B: Focused Differentiation</strong></td><td>Concentrate resources on core competencies, build moats through IP/brand/customer intimacy, and defend market position.</td><td>Medium</td><td>12-24 months</td><td><span class="risk-badge risk-medium">Medium</span></td></tr>
            <tr><td><strong>Option C: Operational Excellence</strong></td><td>Optimize existing operations, reduce cost base, improve margins, and build cash reserves for future options.</td><td>Low-Medium</td><td>6-18 months</td><td><span class="risk-badge risk-low">Low</span></td></tr>
          </table>
        </div>

        <div class="report-section">
          <h3>&#x26A0; Risk & Opportunity Matrix</h3>
          <p><strong>Key Risks:</strong> ${c.risks} Additional risks include macroeconomic volatility, regulatory changes, supply chain disruption, and talent scarcity in the ${d.industry} sector.</p>
          <p><strong>Key Opportunities:</strong> Market consolidation creating acquisition targets; digital tools enabling operational leverage; ESG leadership opening premium pricing and investor access; emerging market expansion with first-mover advantages.</p>
        </div>

        <div class="report-section">
          <h3>&#x1F3C6; Recommended Strategic Direction</h3>
          <p><strong>Primary Recommendation:</strong> ${c.approach}</p>
          <p><strong>Rationale:</strong> This direction aligns with the organization's current capabilities, market position, and the imperative to address ${d.challenge}. It balances ambition with executability and creates measurable value within a 12-24 month horizon.</p>
          <p><strong>Strategic Pillars:</strong></p>
          <ul>
            <li><strong>Pillar 1 - Market Positioning:</strong> Define and communicate a differentiated value proposition that resonates with target segments and justifies premium positioning.</li>
            <li><strong>Pillar 2 - Operational Backbone:</strong> Build scalable processes, technology infrastructure, and governance that can support 2-3x current scale without proportional cost increase.</li>
            <li><strong>Pillar 3 - Talent & Culture:</strong> Attract, develop, and retain the leadership and specialist talent required to execute the strategy, with a culture of accountability and innovation.</li>
            <li><strong>Pillar 4 - Financial Architecture:</strong> Secure appropriate capital structure and funding mechanisms to support strategic investments without jeopardizing operational stability.</li>
          </ul>
        </div>

        <div class="report-section">
          <h3>&#x1F4C5; Implementation Roadmap</h3>
          <div class="plan-timeline">
            <div class="plan-phase">
              <div class="plan-phase-marker"><div class="plan-dot"></div><div class="plan-line"></div></div>
              <div class="plan-phase-content">
                <div class="plan-phase-title">Phase 1: Foundation (Months 1-3)</div>
                <div class="plan-phase-desc">Board approval of strategic plan; appoint strategy execution committee; complete baseline assessment of current capabilities; secure initial funding; communicate strategic direction to all stakeholders.</div>
              </div>
            </div>
            <div class="plan-phase">
              <div class="plan-phase-marker"><div class="plan-dot"></div><div class="plan-line"></div></div>
              <div class="plan-phase-content">
                <div class="plan-phase-title">Phase 2: Build (Months 4-9)</div>
                <div class="plan-phase-desc">Execute priority initiatives; launch pilot programs; build required capabilities (technology, talent, processes); establish governance and reporting cadence; first strategic review and course correction.</div>
              </div>
            </div>
            <div class="plan-phase">
              <div class="plan-phase-marker"><div class="plan-dot"></div><div class="plan-line"></div></div>
              <div class="plan-phase-content">
                <div class="plan-phase-title">Phase 3: Scale (Months 10-18)</div>
                <div class="plan-phase-desc">Roll out proven initiatives organization-wide; accelerate high-performing programs; divest or restructure underperforming areas; capture measurable strategic outcomes; prepare for next strategic cycle.</div>
              </div>
            </div>
            <div class="plan-phase">
              <div class="plan-phase-marker"><div class="plan-dot"></div></div>
              <div class="plan-phase-content">
                <div class="plan-phase-title">Phase 4: Optimize (Months 19-24)</div>
                <div class="plan-phase-desc">Continuous improvement of strategic execution; institutionalize lessons learned; refresh strategic plan based on market evolution; build strategic planning capability as organizational competency.</div>
              </div>
            </div>
          </div>
        </div>

        <div class="report-section">
          <h3>&#x1F4CA; Success Metrics</h3>
          <ul>
            <li><strong>Financial:</strong> Revenue growth target of ${d.revenueTrend === 'declining' ? 'return to positive growth within 12 months' : d.revenueTrend === 'growing' ? 'maintain >20% growth trajectory' : 'achieve 15-20% annual revenue growth'}; EBITDA margin improvement of 3-5 percentage points.</li>
            <li><strong>Market:</strong> Market share gain of 2-5 percentage points in core segments; Net Promoter Score improvement to >50.</li>
            <li><strong>Operational:</strong> Process efficiency improvement of 20-30%; technology adoption rate >80% across target user base.</li>
            <li><strong>People:</strong> Employee engagement score >75%; voluntary attrition reduction to <10%; leadership bench strength for all critical roles.</li>
          </ul>
        </div>
      </div>
    `;
  },

  exportReport() {
    const r = document.getElementById('strategyReport');
    if (r) FEOSUtils.exportToTxt('Strategic_Recommendation', r.innerText);
  }
};
window.FEOS_strategy = FEOS_strategy;
