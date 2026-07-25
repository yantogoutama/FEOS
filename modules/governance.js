/* FEOS Governance Advisor */
const FEOS_governance = {
  init() {
    const container = document.getElementById('view-governance');
    if (!container) return;
    container.innerHTML = `
      <div class="module-view-header">
        <h2>Governance Advisor</h2>
        <p>Build strong corporate governance through structure analysis, authority delegation, and accountability systems.</p>
      </div>
      <div class="module-layout">
        <div class="form-panel">
          <h3>Governance Profile</h3>
          <form id="governanceForm">
            <div class="form-group">
              <label>Company Name <span class="required">*</span></label>
              <input type="text" name="companyName" class="form-control" placeholder="Company name">
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>Legal Structure <span class="required">*</span></label>
                <select name="legalStructure" class="form-control">
                  <option value="">Select</option>
                  <option value="pt">PT (Perseroan Terbatas)</option>
                  <option value="tbk">PT Tbk (Public Company)</option>
                  <option value="cv">CV</option>
                  <option value="yayasan">Yayasan</option>
                  <option value="koperasi">Koperasi</option>
                  <option value="other">Other</option>
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
              <label>Board Composition <span class="required">*</span></label>
              <select name="boardComp" class="form-control">
                <option value="">Select</option>
                <option value="none">No Formal Board</option>
                <option value="founder">Founder/Owner Only</option>
                <option value="family">Family Members</option>
                <option value="mixed">Mixed (Internal + External)</option>
                <option value="independent">Majority Independent</option>
              </select>
            </div>
            <div class="form-group">
              <label>Decision-Making Style <span class="required">*</span></label>
              <select name="decisionStyle" class="form-control">
                <option value="">Select</option>
                <option value="autocratic">Founder/CEO Autocratic</option>
                <option value="consultative">Consultative</option>
                <option value="consensus">Consensus-Based</option>
                <option value="delegated">Delegated with Clear Authority</option>
                <option value="unclear">Unclear / Ad-hoc</option>
              </select>
            </div>
            <div class="form-group">
              <label>Governance Challenge <span class="required">*</span></label>
              <select name="challenge" class="form-control">
                <option value="">Select</option>
                <option value="board">Board Effectiveness</option>
                <option value="authority">Authority & Decision Rights</option>
                <option value="accountability">Accountability Gaps</option>
                <option value="transparency">Transparency & Reporting</option>
                <option value="compliance">Regulatory Compliance</option>
                <option value="succession">Leadership Succession</option>
                <option value="family">Family Business Governance</option>
              </select>
            </div>
            <div class="form-group">
              <label>Current Governance Situation <span class="required">*</span></label>
              <textarea name="situation" class="form-control" rows="4" placeholder="Describe current governance structure, decision-making issues, board dynamics, and accountability gaps..."></textarea>
            </div>
            <div class="form-group">
              <label>Have Governance Documents?</label>
              <select name="hasDocs" class="form-control">
                <option value="no">No formal documents</option>
                <option value="partial">Partial / Outdated</option>
                <option value="yes">Yes, comprehensive</option>
              </select>
            </div>
            <button type="button" class="btn btn-primary btn-block" onclick="FEOS_governance.generate()">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
              Generate Governance Improvement Plan
            </button>
          </form>
        </div>
        <div class="output-panel">
          <div class="output-header">
            <h3><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> Governance Improvement Plan</h3>
            <div class="output-actions" id="governanceActions" style="display:none">
              <button class="btn btn-secondary btn-sm" onclick="FEOSUtils.printReport('governanceReport')">Print</button>
              <button class="btn btn-secondary btn-sm" onclick="FEOS_governance.exportReport()">Export</button>
            </div>
          </div>
          <div class="output-body" id="governanceOutput">
            <div class="output-placeholder">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              <h4>Governance Analysis Ready</h4>
              <p>Provide your governance profile to receive a comprehensive improvement plan addressing board effectiveness, accountability, and decision-making frameworks.</p>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  generate() {
    const v = FEOSUtils.validateForm('governanceForm', ['companyName','legalStructure','size','boardComp','decisionStyle','challenge','situation']);
    if (!v.valid) { alert('Please complete all required fields: ' + v.missing.join(', ')); return; }
    const d = v.data;
    FEOSUtils.showLoading('governanceOutput', 'Analyzing Governance Framework...', 'Evaluating board effectiveness and accountability structures');
    setTimeout(() => {
      FEOSUtils.renderReport('governanceOutput', this.buildReport(d));
      document.getElementById('governanceActions').style.display = 'flex';
    }, 2000);
  },

  buildReport(d) {
    const governanceScores = {
      transparency: d.hasDocs === 'yes' ? 75 : d.hasDocs === 'partial' ? 50 : 25,
      accountability: d.decisionStyle === 'delegated' ? 80 : d.decisionStyle === 'consultative' ? 65 : d.decisionStyle === 'consensus' ? 60 : 30,
      responsibility: d.boardComp === 'independent' ? 85 : d.boardComp === 'mixed' ? 70 : d.boardComp === 'family' ? 40 : 35,
      independence: d.boardComp === 'independent' ? 90 : d.boardComp === 'mixed' ? 60 : 20,
      control: d.hasDocs === 'yes' && d.decisionStyle === 'delegated' ? 80 : 50
    };
    const avgScore = Math.round(Object.values(governanceScores).reduce((a,b)=>a+b,0)/5);
    const riskLevel = avgScore < 40 ? 'Critical' : avgScore < 60 ? 'High' : avgScore < 75 ? 'Medium' : 'Low';
    const riskClass = avgScore < 40 ? 'risk-critical' : avgScore < 60 ? 'risk-high' : avgScore < 75 ? 'risk-medium' : 'risk-low';

    const challengeMap = {
      board: 'Board composition lacks independence and diversity, limiting effective oversight and strategic guidance.',
      authority: 'Decision-making authority is concentrated or unclear, creating bottlenecks and accountability gaps.',
      accountability: 'Accountability mechanisms are weak, with no clear consequence management or performance linkage.',
      transparency: 'Information flow to board and stakeholders is insufficient, limiting informed decision-making.',
      compliance: 'Regulatory compliance framework is reactive rather than systematic, creating legal exposure.',
      succession: 'Leadership succession is not planned, creating operational continuity risk and talent flight.',
      family: 'Family dynamics interfere with professional governance, creating conflict of interest and talent barriers.'
    };

    return `
      <div class="report" id="governanceReport">
        <div class="report-header">
          <h2>Governance Improvement Plan</h2>
          <div class="report-meta">
            <span>&#x1F4C5; ${FEOSUtils.formatDate()}</span>
            <span>&#x1F3E2; ${FEOSUtils.escapeHtml(d.companyName)}</span>
            <span class="risk-badge ${riskClass}">${riskLevel} Governance Risk</span>
          </div>
        </div>

        <div class="report-section">
          <h3>&#x1F4CB; Executive Summary</h3>
          <p>The governance assessment of <strong>${FEOSUtils.escapeHtml(d.companyName)}</strong> reveals a <strong>${riskLevel}</strong> governance maturity level with an overall score of <strong>${avgScore}/100</strong>. The primary governance challenge is <strong>${d.challenge}</strong>, which poses material risk to organizational sustainability, stakeholder confidence, and regulatory compliance. ${avgScore < 60 ? 'Immediate governance reform is required to prevent escalation of risk and potential regulatory or legal consequences.' : 'Targeted improvements in specific governance dimensions will strengthen the organization's governance posture and support sustainable growth.'}</p>
        </div>

        <div class="report-section">
          <h3>&#x1F4CA; Governance Assessment Framework</h3>
          <table class="report-table">
            <tr><th>Dimension</th><th>Score</th><th>Status</th><th>Assessment</th></tr>
            <tr><td><strong>Transparency</strong></td><td>${governanceScores.transparency}/100</td><td><span class="risk-badge ${governanceScores.transparency < 50 ? 'risk-high' : governanceScores.transparency < 75 ? 'risk-medium' : 'risk-low'}">${governanceScores.transparency < 50 ? 'Weak' : governanceScores.transparency < 75 ? 'Developing' : 'Strong'}</span></td><td>${governanceScores.transparency < 50 ? 'Information disclosure and reporting mechanisms are inadequate.' : 'Basic transparency exists but formalization needed.'}</td></tr>
            <tr><td><strong>Accountability</strong></td><td>${governanceScores.accountability}/100</td><td><span class="risk-badge ${governanceScores.accountability < 50 ? 'risk-high' : governanceScores.accountability < 75 ? 'risk-medium' : 'risk-low'}">${governanceScores.accountability < 50 ? 'Weak' : governanceScores.accountability < 75 ? 'Developing' : 'Strong'}</span></td><td>${governanceScores.accountability < 50 ? 'No clear accountability framework or consequence management.' : 'Accountability partially defined but inconsistently enforced.'}</td></tr>
            <tr><td><strong>Responsibility</strong></td><td>${governanceScores.responsibility}/100</td><td><span class="risk-badge ${governanceScores.responsibility < 50 ? 'risk-high' : governanceScores.responsibility < 75 ? 'risk-medium' : 'risk-low'}">${governanceScores.responsibility < 50 ? 'Weak' : governanceScores.responsibility < 75 ? 'Developing' : 'Strong'}</span></td><td>${governanceScores.responsibility < 50 ? 'Roles and responsibilities are ambiguous or overlapping.' : 'Responsibility matrix exists but needs refinement.'}</td></tr>
            <tr><td><strong>Independence</strong></td><td>${governanceScores.independence}/100</td><td><span class="risk-badge ${governanceScores.independence < 50 ? 'risk-high' : governanceScores.independence < 75 ? 'risk-medium' : 'risk-low'}">${governanceScores.independence < 50 ? 'Weak' : governanceScores.independence < 75 ? 'Developing' : 'Strong'}</span></td><td>${governanceScores.independence < 50 ? 'Board lacks independent directors; oversight compromised.' : 'Some independence but majority still affiliated.'}</td></tr>
            <tr><td><strong>Control</strong></td><td>${governanceScores.control}/100</td><td><span class="risk-badge ${governanceScores.control < 50 ? 'risk-high' : governanceScores.control < 75 ? 'risk-medium' : 'risk-low'}">${governanceScores.control < 50 ? 'Weak' : governanceScores.control < 75 ? 'Developing' : 'Strong'}</span></td><td>${governanceScores.control < 50 ? 'Internal controls and audit functions are inadequate.' : 'Controls exist but coverage and effectiveness gaps remain.'}</td></tr>
          </table>
        </div>

        <div class="report-section">
          <h3>&#x1F50D; Key Findings</h3>
          <ul>
            <li><strong>Board Effectiveness:</strong> ${challengeMap[d.challenge] || 'Governance structure requires optimization to support strategic oversight.'}</li>
            <li><strong>Decision Architecture:</strong> The current ${d.decisionStyle} decision-making style ${d.decisionStyle === 'autocratic' || d.decisionStyle === 'unclear' ? 'creates single points of failure and limits organizational scalability.' : 'provides a foundation but requires formalization of authority limits and escalation protocols.'}</li>
            <li><strong>Documentary Foundation:</strong> ${d.hasDocs === 'no' ? 'Absence of governance documents (Board Charter, Authority Matrix, Code of Conduct) creates legal and operational vulnerability.' : d.hasDocs === 'partial' ? 'Existing governance documents are partial or outdated, creating gaps in coverage and compliance.' : 'Governance documentation is comprehensive but requires regular review and updating.'}</li>
            <li><strong>Regulatory Alignment:</strong> As a ${d.legalStructure === 'tbk' ? 'publicly listed company, OJK governance requirements (POJK) must be fully implemented including independent board majority, audit committee, and whistleblower system.' : d.legalStructure === 'pt' ? 'PT structure requires compliance with UU PT No. 40/2007 provisions on GMS, board duties, and shareholder rights.' : 'organization, governance best practices should be adopted even where not legally mandated.'}</li>
          </ul>
        </div>

        <div class="report-section">
          <h3>&#x1F4A1; Governance Improvement Recommendations</h3>
          <ul>
            ${d.boardComp !== 'independent' && d.boardComp !== 'mixed' ? '<li><strong>Board Restructuring:</strong> Appoint at least 2 independent commissioners/directors with relevant industry and governance expertise. Establish board committees (Audit, Nomination, Remuneration).' : ''}
            <li><strong>Authority Matrix (RACI):</strong> Develop and approve a comprehensive authority matrix defining decision rights by category (financial, operational, HR, strategic) and by organizational level.</li>
            <li><strong>Board Charter:</strong> Formalize board charter defining roles, responsibilities, meeting frequency, evaluation criteria, and director independence requirements.</li>
            <li><strong>Code of Conduct & Ethics:</strong> Implement organization-wide code of conduct with whistleblower mechanism, conflict of interest disclosure, and ethics training.</li>
            <li><strong>Performance Governance:</strong> Link executive compensation to balanced scorecard metrics with clawback provisions for governance failures.</li>
            <li><strong>Internal Audit Function:</strong> ${d.size === 'enterprise' || d.size === 'large' ? 'Establish independent internal audit function reporting directly to Audit Committee with annual audit plan covering all critical processes.' : 'Engage external audit firm for periodic governance audits and control assessments.'}</li>
            <li><strong>Succession Planning:</strong> Develop board and C-suite succession plans with identified candidates, development plans, and emergency succession protocols.</li>
          </ul>
        </div>

        <div class="report-section">
          <h3>&#x1F4C5; Implementation Roadmap</h3>
          <div class="plan-timeline">
            <div class="plan-phase">
              <div class="plan-phase-marker"><div class="plan-dot"></div><div class="plan-line"></div></div>
              <div class="plan-phase-content">
                <div class="plan-phase-title">Phase 1: Foundation (Months 1-2)</div>
                <div class="plan-phase-desc">Board resolution to adopt governance reform; appoint governance committee; conduct governance gap assessment; draft board charter and authority matrix; begin independent director search.</div>
              </div>
            </div>
            <div class="plan-phase">
              <div class="plan-phase-marker"><div class="plan-dot"></div><div class="plan-line"></div></div>
              <div class="plan-phase-content">
                <div class="plan-phase-title">Phase 2: Formalization (Months 3-5)</div>
                <div class="plan-phase-desc">Approve and implement board charter and authority matrix; appoint independent directors; establish audit and nomination committees; launch code of conduct and ethics program.</div>
              </div>
            </div>
            <div class="plan-phase">
              <div class="plan-phase-marker"><div class="plan-dot"></div></div>
              <div class="plan-phase-content">
                <div class="plan-phase-title">Phase 3: Optimization (Months 6-12)</div>
                <div class="plan-phase-desc">Conduct first board effectiveness evaluation; implement succession planning; establish quarterly governance reporting; continuous improvement based on regulatory updates and best practices.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  exportReport() {
    const r = document.getElementById('governanceReport');
    if (r) FEOSUtils.exportToTxt('Governance_Improvement_Plan', r.innerText);
  }
};
window.FEOS_governance = FEOS_governance;
