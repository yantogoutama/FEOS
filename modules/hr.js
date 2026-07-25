/* FEOS HR Business Advisor */
const FEOS_hr = {
  init() {
    const container = document.getElementById('view-hr');
    if (!container) return;
    container.innerHTML = `
      <div class="module-view-header">
        <h2>HR Business Advisor</h2>
        <p>Transform HR from administrative function into strategic business partner with organization design and talent management.</p>
      </div>
      <div class="module-layout">
        <div class="form-panel">
          <h3>HR Context</h3>
          <form id="hrForm">
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
                  <option value="services">Services</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div class="form-group">
                <label>Total Employees <span class="required">*</span></label>
                <select name="employeeCount" class="form-control">
                  <option value="">Select</option>
                  <option value="1-10">1-10</option>
                  <option value="11-50">11-50</option>
                  <option value="51-200">51-200</option>
                  <option value="201-500">201-500</option>
                  <option value="500+">500+</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label>HR Challenge <span class="required">*</span></label>
              <select name="challenge" class="form-control">
                <option value="">Select Challenge</option>
                <option value="talent">Talent Acquisition & Retention</option>
                <option value="performance">Performance Management</option>
                <option value="engagement">Employee Engagement</option>
                <option value="orgdesign">Organization Design</option>
                <option value="manpower">Manpower Planning</option>
                <option value="industrial">Industrial Relations</option>
                <option value="compensation">Compensation & Benefits</option>
                <option value="culture">Culture Transformation</option>
              </select>
            </div>
            <div class="form-group">
              <label>Current HR Function <span class="required">*</span></label>
              <select name="hrFunction" class="form-control">
                <option value="">Select</option>
                <option value="none">No Dedicated HR</option>
                <option value="admin">Administrative HR</option>
                <option value="operational">Operational HR</option>
                <option value="strategic">Strategic HR Partner</option>
                <option value="center">Shared Service / HRBP Model</option>
              </select>
            </div>
            <div class="form-group">
              <label>Current Situation <span class="required">*</span></label>
              <textarea name="situation" class="form-control" rows="4" placeholder="Describe the HR challenge: turnover rates, engagement issues, organizational structure problems, talent gaps..."></textarea>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>Turnover Rate</label>
                <select name="turnover" class="form-control">
                  <option value="unknown">Unknown</option>
                  <option value="low">< 5%</option>
                  <option value="moderate">5-10%</option>
                  <option value="high">10-20%</option>
                  <option value="critical">> 20%</option>
                </select>
              </div>
              <div class="form-group">
                <label>Have Job Descriptions?</label>
                <select name="hasJD" class="form-control">
                  <option value="no">No</option>
                  <option value="partial">Partial</option>
                  <option value="yes">Yes, comprehensive</option>
                </select>
              </div>
            </div>
            <button type="button" class="btn btn-primary btn-block" onclick="FEOS_hr.generate()">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
              Generate HR Strategic Recommendation
            </button>
          </form>
        </div>
        <div class="output-panel">
          <div class="output-header">
            <h3><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> HR Strategic Recommendation</h3>
            <div class="output-actions" id="hrActions" style="display:none">
              <button class="btn btn-secondary btn-sm" onclick="FEOSUtils.printReport('hrReport')">Print</button>
              <button class="btn btn-secondary btn-sm" onclick="FEOS_hr.exportReport()">Export</button>
            </div>
          </div>
          <div class="output-body" id="hrOutput">
            <div class="output-placeholder">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
              <h4>HR Analysis Ready</h4>
              <p>Provide your HR context to receive a strategic recommendation covering root cause, business impact, and implementation plan.</p>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  generate() {
    const v = FEOSUtils.validateForm('hrForm', ['companyName','industry','employeeCount','challenge','hrFunction','situation']);
    if (!v.valid) { alert('Please complete all required fields: ' + v.missing.join(', ')); return; }
    const d = v.data;
    FEOSUtils.showLoading('hrOutput', 'Analyzing HR Strategic Position...', 'Evaluating talent architecture and organizational design');
    setTimeout(() => {
      FEOSUtils.renderReport('hrOutput', this.buildReport(d));
      document.getElementById('hrActions').style.display = 'flex';
    }, 2000);
  },

  buildReport(d) {
    const challengeMap = {
      talent: { issue: 'Critical talent gaps and high attrition threatening operational continuity and growth capacity.', solution: 'Implement talent acquisition strategy with employer branding, structured interview process, and competitive total rewards. Build talent pipeline through university partnerships and internal development programs.' },
      performance: { issue: 'Performance management system is absent or ineffective, creating unclear expectations and inequitable rewards.', solution: 'Deploy OKR-based performance management with quarterly reviews, 360-degree feedback, and clear differentiation between high/medium/low performers.' },
      engagement: { issue: 'Employee engagement is declining, evidenced by absenteeism, turnover, and reduced discretionary effort.', solution: 'Conduct engagement survey, establish employee voice mechanisms, redesign recognition programs, and address systemic pain points identified by workforce.' },
      orgdesign: { issue: 'Organizational structure is misaligned with business strategy, creating role confusion and decision bottlenecks.', solution: 'Conduct organization design review using McKinsey 7S or Galbraith Star Model. Redesign reporting lines, spans of control, and decision rights.' },
      manpower: { issue: 'Workforce planning is reactive, leading to overstaffing in some areas and critical shortages in others.', solution: 'Implement workforce analytics and manpower planning model aligned with business forecast. Build scenario planning for growth, contraction, and transformation.' },
      industrial: { issue: 'Industrial relations are strained with union issues, compliance gaps, or workplace conflict.', solution: 'Establish constructive dialogue mechanisms, ensure full compliance with UU Cipta Kerja, build management-union partnership, and implement grievance procedures.' },
      compensation: { issue: 'Compensation structure is uncompetitive or inequitable, driving talent flight and demotivation.', solution: 'Conduct compensation benchmarking, redesign pay structure with clear grading, implement performance-based variable pay, and ensure internal equity.' },
      culture: { issue: 'Organizational culture does not support strategic objectives or desired employee behaviors.', solution: 'Define target culture attributes, align leadership behaviors, redesign rituals and symbols, and measure culture through regular pulse surveys.' }
    };
    const c = challengeMap[d.challenge] || challengeMap.talent;
    const hrMaturity = d.hrFunction === 'strategic' || d.hrFunction === 'center' ? 'Mature' : d.hrFunction === 'operational' ? 'Developing' : 'Nascent';

    return `
      <div class="report" id="hrReport">
        <div class="report-header">
          <h2>HR Strategic Recommendation</h2>
          <div class="report-meta">
            <span>&#x1F4C5; ${FEOSUtils.formatDate()}</span>
            <span>&#x1F3E2; ${FEOSUtils.escapeHtml(d.companyName)}</span>
            <span class="tag">HR Maturity: ${hrMaturity}</span>
          </div>
        </div>

        <div class="report-section">
          <h3>&#x1F4CB; Executive Summary</h3>
          <p><strong>${FEOSUtils.escapeHtml(d.companyName)}</strong> faces a significant HR challenge in the area of <strong>${d.challenge}</strong>. With ${d.employeeCount} employees in the ${d.industry} sector, the current HR function operates at a <strong>${hrMaturity}</strong> maturity level. The situation described indicates ${c.issue} This has direct implications for business performance, operational risk, and organizational scalability.</p>
        </div>

        <div class="report-section">
          <h3>&#x1F50D; Current Issue Analysis</h3>
          <p><strong>Primary Issue:</strong> ${c.issue}</p>
          <p><strong>HR Function Maturity:</strong> The HR function currently operates as a ${d.hrFunction === 'none' ? 'non-existent entity, with HR tasks distributed among operations or finance personnel without strategic oversight.' : d.hrFunction === 'admin' ? 'purely administrative function focused on payroll, attendance, and basic compliance, with no strategic workforce planning capability.' : d.hrFunction === 'operational' ? 'operational function managing recruitment, training, and employee relations, but lacking strategic partnership with business leaders.' : 'strategic partner with established HR business partner model and workforce analytics capability.'}</p>
          <p><strong>Workforce Data:</strong> ${d.turnover === 'critical' || d.turnover === 'high' ? 'Turnover rates are concerning and indicate systemic issues with engagement, management quality, or compensation competitiveness.' : d.turnover === 'unknown' ? 'Absence of turnover tracking is itself a governance gap preventing data-driven HR decisions.' : 'Turnover appears manageable but requires monitoring and benchmarking against industry norms.'} ${d.hasJD === 'no' ? 'The absence of formal job descriptions creates role ambiguity, complicates performance management, and exposes the organization to legal risk in employment disputes.' : d.hasJD === 'partial' ? 'Partial job descriptions indicate incomplete HR infrastructure that needs comprehensive documentation.' : 'Comprehensive job descriptions provide a foundation for performance management and compensation structure.'}</p>
        </div>

        <div class="report-section">
          <h3>&#x1F332; Root Cause Analysis</h3>
          <p>The root cause of the ${d.challenge} challenge can be traced to ${d.hrFunction === 'none' || d.hrFunction === 'admin' ? 'the absence of strategic HR leadership and investment. HR has been treated as a cost center rather than a strategic enabler, resulting in reactive, transactional people management.' : 'insufficient integration of HR strategy with business strategy. HR initiatives are not aligned with organizational objectives, creating misallocation of people investments.'} Additionally, ${d.hasJD === 'no' ? 'the lack of foundational HR infrastructure (job descriptions, competency frameworks, grading systems) prevents systematic talent management.' : 'while foundational documents exist, they are not actively used to drive talent decisions, performance management, or development planning.'}</p>
        </div>

        <div class="report-section">
          <h3>&#x1F4C8; Business Impact</h3>
          <ul>
            <li><strong>Financial Impact:</strong> ${d.turnover === 'critical' ? 'Estimated annual cost of turnover at 50-100% of annual payroll due to replacement costs, lost productivity, and knowledge drain.' : d.turnover === 'high' ? 'Estimated annual cost of turnover at 25-40% of affected roles' payroll.' : 'Turnover costs are contained but opportunity costs from talent gaps may be significant.'}</li>
            <li><strong>Operational Impact:</strong> Key positions remain unfilled or filled by underqualified candidates, creating service quality issues, customer complaints, and operational delays.</li>
            <li><strong>Growth Impact:</strong> ${d.challenge === 'talent' || d.challenge === 'manpower' ? 'Growth initiatives are constrained by inability to attract, develop, and retain required talent at required pace.' : 'Organizational capability gaps prevent execution of strategic initiatives and digital transformation.'}</li>
            <li><strong>Risk Impact:</strong> ${d.challenge === 'industrial' ? 'Elevated risk of strikes, legal disputes, and regulatory sanctions under UU Cipta Kerja.' : 'Knowledge concentration risk, compliance exposure in employment practices, and reputational risk as employer brand deteriorates.'}</li>
          </ul>
        </div>

        <div class="report-section">
          <h3>&#x1F3AF; HR Strategic Solution</h3>
          <p><strong>Immediate Actions (0-30 days):</strong></p>
          <ul>
            <li>${c.solution}</li>
            <li>Audit all employment contracts and HR documentation for compliance with Indonesian labor law (UU Cipta Kerja).</li>
            <li>Establish HR metrics dashboard with monthly reporting to executive team.</li>
          </ul>
          <p><strong>Medium-Term Actions (1-6 months):</strong></p>
          <ul>
            <li>Develop comprehensive job grading and compensation structure benchmarked against industry standards.</li>
            <li>Implement HRIS system for attendance, payroll, and employee data management.</li>
            <li>Launch leadership development program for managers and supervisors.</li>
            <li>Establish employee engagement survey with action planning process.</li>
          </ul>
          <p><strong>Long-Term Actions (6-18 months):</strong></p>
          <ul>
            <li>Transition HR function to strategic business partner model with HRBP assignments to business units.</li>
            <li>Build talent pipeline with succession plans for all critical roles (C-suite, department heads, technical specialists).</li>
            <li>Implement learning management system and competency-based development framework.</li>
            <li>Establish employer brand and EVP (Employee Value Proposition) for competitive talent attraction.</li>
          </ul>
        </div>

        <div class="report-section">
          <h3>&#x1F4C5; Implementation Plan</h3>
          <div class="plan-timeline">
            <div class="plan-phase">
              <div class="plan-phase-marker"><div class="plan-dot"></div><div class="plan-line"></div></div>
              <div class="plan-phase-content">
                <div class="plan-phase-title">Phase 1: Stabilize (Month 1)</div>
                <div class="plan-phase-desc">Emergency compliance audit; address immediate industrial relations issues; appoint/interim HR leader; establish basic HR metrics tracking.</div>
              </div>
            </div>
            <div class="plan-phase">
              <div class="plan-phase-marker"><div class="plan-dot"></div><div class="plan-line"></div></div>
              <div class="plan-phase-content">
                <div class="plan-phase-title">Phase 2: Structure (Months 2-4)</div>
                <div class="plan-phase-desc">Complete job descriptions and grading; implement HRIS; launch performance management system; conduct compensation benchmarking.</div>
              </div>
            </div>
            <div class="plan-phase">
              <div class="plan-phase-marker"><div class="plan-dot"></div></div>
              <div class="plan-phase-content">
                <div class="plan-phase-title">Phase 3: Transform (Months 5-12)</div>
                <div class="plan-phase-desc">Deploy strategic HR initiatives; talent pipeline development; culture transformation; HR analytics and predictive workforce planning.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  exportReport() {
    const r = document.getElementById('hrReport');
    if (r) FEOSUtils.exportToTxt('HR_Strategic_Recommendation', r.innerText);
  }
};
window.FEOS_hr = FEOS_hr;
