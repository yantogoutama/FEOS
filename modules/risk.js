/* FEOS Risk Advisor */
const FEOS_risk = {
  init() {
    const container = document.getElementById('view-risk');
    if (!container) return;
    container.innerHTML = `
      <div class="module-view-header">
        <h2>Risk Advisor</h2>
        <p>Enterprise Risk Management covering strategic, operational, financial, legal, and reputational risks.</p>
      </div>
      <div class="module-layout">
        <div class="form-panel">
          <h3>Risk Context</h3>
          <form id="riskForm">
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
                  <option value="services">Services</option>
                </select>
              </div>
              <div class="form-group">
                <label>Company Size <span class="required">*</span></label>
                <select name="size" class="form-control">
                  <option value="">Select</option>
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                  <option value="enterprise">Enterprise</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label>Primary Risk Concern <span class="required">*</span></label>
              <select name="concern" class="form-control">
                <option value="">Select Concern</option>
                <option value="strategic">Strategic Risk</option>
                <option value="operational">Operational Risk</option>
                <option value="financial">Financial Risk</option>
                <option value="people">People Risk</option>
                <option value="legal">Legal & Compliance Risk</option>
                <option value="reputation">Reputational Risk</option>
                <option value="technology">Technology & Cyber Risk</option>
                <option value="comprehensive">Comprehensive ERM Review</option>
              </select>
            </div>
            <div class="form-group">
              <label>Risk Situation Description <span class="required">*</span></label>
              <textarea name="situation" class="form-control" rows="4" placeholder="Describe the risk situation: what happened, what could happen, current controls, and executive concerns..."></textarea>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>Have Risk Register?</label>
                <select name="hasRegister" class="form-control">
                  <option value="no">No</option>
                  <option value="partial">Partial / Informal</option>
                  <option value="yes">Yes, formal ERM</option>
                </select>
              </div>
              <div class="form-group">
                <label>Have Risk Committee?</label>
                <select name="hasCommittee" class="form-control">
                  <option value="no">No</option>
                  <option value="informal">Informal</option>
                  <option value="yes">Yes, formal</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label>Recent Risk Events</label>
              <textarea name="events" class="form-control" rows="2" placeholder="Any recent risk events, near-misses, or incidents (optional)"></textarea>
            </div>
            <button type="button" class="btn btn-primary btn-block" onclick="FEOS_risk.generate()">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
              Generate Risk Register & Assessment
            </button>
          </form>
        </div>
        <div class="output-panel">
          <div class="output-header">
            <h3><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg> Enterprise Risk Register</h3>
            <div class="output-actions" id="riskActions" style="display:none">
              <button class="btn btn-secondary btn-sm" onclick="FEOSUtils.printReport('riskReport')">Print</button>
              <button class="btn btn-secondary btn-sm" onclick="FEOS_risk.exportReport()">Export</button>
            </div>
          </div>
          <div class="output-body" id="riskOutput">
            <div class="output-placeholder">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/></svg>
              <h4>Risk Assessment Ready</h4>
              <p>Provide your risk context to receive a comprehensive Enterprise Risk Register with impact, probability, and mitigation strategies.</p>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  generate() {
    const v = FEOSUtils.validateForm('riskForm', ['companyName','industry','size','concern','situation']);
    if (!v.valid) { alert('Please complete all required fields: ' + v.missing.join(', ')); return; }
    const d = v.data;
    FEOSUtils.showLoading('riskOutput', 'Building Enterprise Risk Register...', 'Assessing impact, probability, and mitigation across risk categories');
    setTimeout(() => {
      FEOSUtils.renderReport('riskOutput', this.buildReport(d));
      document.getElementById('riskActions').style.display = 'flex';
    }, 2000);
  },

  buildReport(d) {
    const risks = this.generateRisks(d);
    const maturity = d.hasRegister === 'yes' && d.hasCommittee === 'yes' ? 'Mature' : d.hasRegister === 'yes' || d.hasCommittee === 'yes' ? 'Developing' : 'Nascent';
    const criticalCount = risks.filter(r => r.level === 'Critical').length;
    const highCount = risks.filter(r => r.level === 'High').length;

    return `
      <div class="report" id="riskReport">
        <div class="report-header">
          <h2>Enterprise Risk Register</h2>
          <div class="report-meta">
            <span>&#x1F4C5; ${FEOSUtils.formatDate()}</span>
            <span>&#x1F3E2; ${FEOSUtils.escapeHtml(d.companyName)}</span>
            <span class="tag">ERM Maturity: ${maturity}</span>
          </div>
        </div>

        <div class="report-section">
          <h3>&#x1F4CB; Executive Risk Summary</h3>
          <p>The Enterprise Risk Management assessment for <strong>${FEOSUtils.escapeHtml(d.companyName)}</strong> identifies <strong>${criticalCount}</strong> critical risks and <strong>${highCount}</strong> high risks requiring immediate executive attention. The organization's ERM maturity is assessed as <strong>${maturity}</strong>. ${maturity === 'Nascent' ? 'The absence of formal risk management infrastructure creates significant exposure across all risk categories.' : maturity === 'Developing' ? 'Partial risk management exists but lacks integration and board-level oversight.' : 'Strong risk management foundation with opportunity for continuous improvement and emerging risk scanning.'}</p>
        </div>

        <div class="report-section">
          <h3>&#x1F6A8; Risk Register</h3>
          <table class="report-table">
            <tr><th>Risk Category</th><th>Risk Description</th><th>Impact</th><th>Probability</th><th>Risk Level</th><th>Mitigation Strategy</th></tr>
            ${risks.map(r => `
              <tr>
                <td><strong>${r.category}</strong></td>
                <td>${r.description}</td>
                <td>${r.impact}</td>
                <td>${r.probability}</td>
                <td><span class="risk-badge ${r.level === 'Critical' ? 'risk-critical' : r.level === 'High' ? 'risk-high' : r.level === 'Medium' ? 'risk-medium' : 'risk-low'}">${r.level}</span></td>
                <td>${r.mitigation}</td>
              </tr>
            `).join('')}
          </table>
        </div>

        <div class="report-section">
          <h3>&#x1F4A1; Risk Mitigation Priorities</h3>
          <ul>
            <li><strong>Immediate (0-30 days):</strong> Address all Critical risks with emergency controls. ${d.hasCommittee === 'no' ? 'Establish Risk Management Committee with board representation.' : 'Convene Risk Committee for emergency review of critical items.'} ${d.hasRegister === 'no' ? 'Create formal risk register with quarterly review cadence.' : ''}</li>
            <li><strong>Short-Term (1-3 months):</strong> Implement controls for all High risks. Conduct risk awareness training for management. Establish risk reporting to board with monthly dashboard.</li>
            <li><strong>Medium-Term (3-12 months):</strong> Build integrated ERM framework with risk appetite statement, risk tolerance thresholds, and stress testing. Implement risk management software for tracking and reporting.</li>
          </ul>
        </div>

        <div class="report-section">
          <h3>&#x1F4C5; ERM Implementation Roadmap</h3>
          <div class="plan-timeline">
            <div class="plan-phase">
              <div class="plan-phase-marker"><div class="plan-dot"></div><div class="plan-line"></div></div>
              <div class="plan-phase-content">
                <div class="plan-phase-title">Phase 1: Foundation (Months 1-2)</div>
                <div class="plan-phase-desc">Board resolution on ERM; appoint Chief Risk Officer or risk lead; conduct risk inventory workshop; establish risk register; define risk appetite statement.</div>
              </div>
            </div>
            <div class="plan-phase">
              <div class="plan-phase-marker"><div class="plan-dot"></div><div class="plan-line"></div></div>
              <div class="plan-phase-content">
                <div class="plan-phase-title">Phase 2: Integration (Months 3-6)</div>
                <div class="plan-phase-desc">Embed risk assessment in strategic planning and capital allocation; implement risk controls; establish KRIs (Key Risk Indicators); conduct scenario planning and stress testing.</div>
              </div>
            </div>
            <div class="plan-phase">
              <div class="plan-phase-marker"><div class="plan-dot"></div></div>
              <div class="plan-phase-content">
                <div class="plan-phase-title">Phase 3: Optimization (Months 7-12)</div>
                <div class="plan-phase-desc">Continuous risk monitoring; emerging risk scanning; annual risk assessment refresh; ERM maturity assessment; integration with internal audit and compliance functions.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  generateRisks(d) {
    const baseRisks = [
      { category: 'Strategic', description: 'Market disruption from new competitors or business model innovation', impact: 'High', probability: 'Medium', level: 'High', mitigation: 'Continuous market scanning, innovation pipeline, strategic partnerships, agile pivot capability' },
      { category: 'Strategic', description: 'Failure to execute digital transformation strategy', impact: 'High', probability: d.industry === 'technology' ? 'Low' : 'Medium', level: d.industry === 'technology' ? 'Medium' : 'High', mitigation: 'Dedicated digital transformation office, phased implementation, change management, technology partnerships' },
      { category: 'Operational', description: 'Supply chain disruption affecting production/service delivery', impact: 'High', probability: d.industry === 'manufacturing' || d.industry === 'retail' ? 'High' : 'Medium', level: d.industry === 'manufacturing' || d.industry === 'retail' ? 'Critical' : 'High', mitigation: 'Dual sourcing strategy, safety stock, supplier diversification, supply chain visibility tools' },
      { category: 'Operational', description: 'Key process failure or quality control breakdown', impact: 'High', probability: 'Medium', level: 'High', mitigation: 'ISO certification, process automation, quality management system, root cause analysis protocol' },
      { category: 'Financial', description: 'Cash flow crisis from receivables collection or revenue decline', impact: 'Critical', probability: d.size === 'small' ? 'High' : 'Medium', level: d.size === 'small' ? 'Critical' : 'High', mitigation: 'Working capital optimization, credit insurance, diversified revenue streams, credit facility arrangements' },
      { category: 'Financial', description: 'Currency fluctuation or interest rate exposure', impact: 'Medium', probability: 'Medium', level: 'Medium', mitigation: 'Hedging strategy, natural hedging through local sourcing, fixed-rate financing where possible' },
      { category: 'People', description: 'Loss of key leadership or technical talent', impact: 'High', probability: d.size === 'small' ? 'High' : 'Medium', level: d.size === 'small' ? 'Critical' : 'High', mitigation: 'Succession planning, knowledge management, retention programs, employment contracts with notice periods' },
      { category: 'People', description: 'Labor dispute or union action', impact: 'High', probability: d.industry === 'manufacturing' ? 'Medium' : 'Low', level: d.industry === 'manufacturing' ? 'High' : 'Medium', mitigation: 'Constructive labor relations, compliance with UU Cipta Kerja, grievance mechanisms, management training' },
      { category: 'Legal', description: 'Regulatory non-compliance resulting in fines or sanctions', impact: 'High', probability: d.hasRegister === 'no' ? 'High' : 'Medium', level: d.hasRegister === 'no' ? 'Critical' : 'High', mitigation: 'Compliance management system, regular legal audits, regulatory update monitoring, compliance training' },
      { category: 'Legal', description: 'Contract dispute or litigation with customers/suppliers', impact: 'Medium', probability: 'Medium', level: 'Medium', mitigation: 'Standardized contract templates, legal review of major contracts, dispute resolution clauses, insurance coverage' },
      { category: 'Reputational', description: 'Negative publicity from product failure or service incident', impact: 'High', probability: 'Low', level: 'Medium', mitigation: 'Crisis communication plan, product liability insurance, quality assurance, proactive stakeholder engagement' },
      { category: 'Reputational', description: 'Data breach or privacy violation', impact: 'High', probability: d.industry === 'technology' || d.industry === 'finance' ? 'Medium' : 'Low', level: d.industry === 'technology' || d.industry === 'finance' ? 'High' : 'Medium', mitigation: 'Cybersecurity framework, data protection policy, incident response plan, regular penetration testing' },
      { category: 'Technology', description: 'Cyber attack or ransomware', impact: 'Critical', probability: d.industry === 'technology' || d.industry === 'finance' ? 'High' : 'Medium', level: d.industry === 'technology' || d.industry === 'finance' ? 'Critical' : 'High', mitigation: 'Multi-layer security, backup and recovery, employee awareness training, cyber insurance, SOC monitoring' },
      { category: 'Technology', description: 'Legacy system failure or obsolescence', impact: 'High', probability: 'Medium', level: 'High', mitigation: 'Technology roadmap, system modernization plan, cloud migration strategy, vendor support contracts' }
    ];
    return baseRisks;
  },

  exportReport() {
    const r = document.getElementById('riskReport');
    if (r) FEOSUtils.exportToTxt('Enterprise_Risk_Register', r.innerText);
  }
};
window.FEOS_risk = FEOS_risk;
