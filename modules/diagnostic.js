/* FEOS Executive Diagnostic Engine */
const FEOS_diagnostic = {
  init() {
    const container = document.getElementById('view-diagnostic');
    if (!container) return;
    container.innerHTML = `
      <div class="module-view-header">
        <h2>Executive Diagnostic Engine</h2>
        <p>Analyze organizational health, management maturity, and identify strategic bottlenecks using the 7-Dimension Framework.</p>
      </div>
      <div class="module-layout">
        <div class="form-panel">
          <h3>Organization Profile</h3>
          <form id="diagnosticForm">
            <div class="form-group">
              <label>Company Name <span class="required">*</span></label>
              <input type="text" name="companyName" class="form-control" placeholder="e.g., PT Maju Jaya Indonesia">
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>Industry <span class="required">*</span></label>
                <select name="industry" class="form-control">
                  <option value="">Select Industry</option>
                  <option value="manufacturing">Manufacturing</option>
                  <option value="technology">Technology & Digital</option>
                  <option value="retail">Retail & Distribution</option>
                  <option value="finance">Financial Services</option>
                  <option value="construction">Construction & Real Estate</option>
                  <option value="healthcare">Healthcare & Pharma</option>
                  <option value="energy">Energy & Resources</option>
                  <option value="logistics">Logistics & Transportation</option>
                  <option value="services">Professional Services</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div class="form-group">
                <label>Company Size <span class="required">*</span></label>
                <select name="companySize" class="form-control">
                  <option value="">Select Size</option>
                  <option value="startup">Startup (1-10)</option>
                  <option value="small">Small (11-50)</option>
                  <option value="medium">Medium (51-200)</option>
                  <option value="large">Large (201-1000)</option>
                  <option value="enterprise">Enterprise (1000+)</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label>Years in Operation <span class="required">*</span></label>
              <select name="yearsOperation" class="form-control">
                <option value="">Select</option>
                <option value="0-2">0-2 years</option>
                <option value="3-5">3-5 years</option>
                <option value="6-10">6-10 years</option>
                <option value="11-20">11-20 years</option>
                <option value="20+">20+ years</option>
              </select>
            </div>
            <div class="form-group">
              <label>Primary Challenge <span class="required">*</span></label>
              <select name="mainChallenge" class="form-control">
                <option value="">Select Primary Challenge</option>
                <option value="growth">Scaling & Growth Management</option>
                <option value="people">Talent & People Management</option>
                <option value="process">Process & Operational Inefficiency</option>
                <option value="strategy">Strategic Direction Unclear</option>
                <option value="governance">Governance & Accountability Gaps</option>
                <option value="financial">Financial Performance Issues</option>
                <option value="compliance">Regulatory & Compliance Risk</option>
                <option value="technology">Digital Transformation</option>
                <option value="culture">Organizational Culture</option>
                <option value="leadership">Leadership Effectiveness</option>
              </select>
            </div>
            <div class="form-group">
              <label>Current Situation Description <span class="required">*</span></label>
              <textarea name="situation" class="form-control" rows="4" placeholder="Describe the current organizational situation, pain points, and what triggered this diagnostic..."></textarea>
            </div>
            <div class="form-group">
              <label>Management Structure</label>
              <select name="managementStructure" class="form-control">
                <option value="">Select Structure</option>
                <option value="flat">Flat (Minimal Hierarchy)</option>
                <option value="functional">Functional Departments</option>
                <option value="divisional">Divisional/Business Units</option>
                <option value="matrix">Matrix Structure</option>
                <option value="hybrid">Hybrid/Unclear</option>
              </select>
            </div>
            <div class="form-group">
              <label>Recent Revenue Trend</label>
              <select name="revenueTrend" class="form-control">
                <option value="">Select Trend</option>
                <option value="growing">Growing Significantly (>20%)</option>
                <option value="moderate">Moderate Growth (5-20%)</option>
                <option value="stable">Stable/Flat (0-5%)</option>
                <option value="declining">Declining</option>
                <option value="volatile">Highly Volatile</option>
              </select>
            </div>
            <button type="button" class="btn btn-primary btn-block" onclick="FEOS_diagnostic.generate()">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
              Generate Executive Diagnostic Report
            </button>
          </form>
        </div>
        <div class="output-panel">
          <div class="output-header">
            <h3><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg> Executive Diagnostic Report</h3>
            <div class="output-actions" id="diagnosticActions" style="display:none">
              <button class="btn btn-secondary btn-sm" onclick="FEOSUtils.printReport('diagnosticReport')">Print</button>
              <button class="btn btn-secondary btn-sm" onclick="FEOS_diagnostic.exportReport()">Export</button>
            </div>
          </div>
          <div class="output-body" id="diagnosticOutput">
            <div class="output-placeholder">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
              <h4>Ready for Analysis</h4>
              <p>Complete the organization profile form and click "Generate Executive Diagnostic Report" to receive your comprehensive assessment.</p>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  generate() {
    const validation = FEOSUtils.validateForm('diagnosticForm', 
      ['companyName', 'industry', 'companySize', 'yearsOperation', 'mainChallenge', 'situation']);
    if (!validation.valid) {
      alert('Please complete all required fields: ' + validation.missing.join(', '));
      return;
    }

    const d = validation.data;
    FEOSUtils.showLoading('diagnosticOutput', 'Analyzing Organizational Health...', 'Evaluating 7-Dimension Framework');

    setTimeout(() => {
      const report = this.buildReport(d);
      FEOSUtils.renderReport('diagnosticOutput', report);
      document.getElementById('diagnosticActions').style.display = 'flex';
    }, 1800);
  },

  buildReport(d) {
    const frameworks = {
      strategy: this.analyzeStrategy(d),
      structure: this.analyzeStructure(d),
      people: this.analyzePeople(d),
      process: this.analyzeProcess(d),
      technology: this.analyzeTechnology(d),
      governance: this.analyzeGovernance(d),
      risk: this.analyzeRisk(d)
    };

    const overallScore = this.calculateOverallScore(frameworks);
    const riskLevel = overallScore < 40 ? 'Critical' : overallScore < 60 ? 'High' : overallScore < 75 ? 'Medium' : 'Low';
    const riskClass = overallScore < 40 ? 'risk-critical' : overallScore < 60 ? 'risk-high' : overallScore < 75 ? 'risk-medium' : 'risk-low';

    return `
      <div class="report" id="diagnosticReport">
        <div class="report-header">
          <h2>Executive Diagnostic Report</h2>
          <div class="report-meta">
            <span>&#x1F4C5; ${FEOSUtils.formatDate()}</span>
            <span>&#x1F3E2; ${FEOSUtils.escapeHtml(d.companyName)}</span>
            <span class="risk-badge ${riskClass}">${riskLevel} Risk</span>
          </div>
        </div>

        <div class="report-section">
          <h3>&#x1F4CB; Executive Summary</h3>
          <p>${this.generateExecutiveSummary(d, overallScore, riskLevel)}</p>
        </div>

        <div class="report-section">
          <h3>&#x1F50D; 7-Dimension Organizational Assessment</h3>
          <table class="report-table">
            <tr><th>Dimension</th><th>Score</th><th>Status</th><th>Key Finding</th></tr>
            <tr><td><strong>Strategy</strong></td><td>${frameworks.strategy.score}/100</td><td><span class="risk-badge ${frameworks.strategy.score < 50 ? 'risk-high' : frameworks.strategy.score < 75 ? 'risk-medium' : 'risk-low'}">${frameworks.strategy.status}</span></td><td>${frameworks.strategy.finding}</td></tr>
            <tr><td><strong>Structure</strong></td><td>${frameworks.structure.score}/100</td><td><span class="risk-badge ${frameworks.structure.score < 50 ? 'risk-high' : frameworks.structure.score < 75 ? 'risk-medium' : 'risk-low'}">${frameworks.structure.status}</span></td><td>${frameworks.structure.finding}</td></tr>
            <tr><td><strong>People</strong></td><td>${frameworks.people.score}/100</td><td><span class="risk-badge ${frameworks.people.score < 50 ? 'risk-high' : frameworks.people.score < 75 ? 'risk-medium' : 'risk-low'}">${frameworks.people.status}</span></td><td>${frameworks.people.finding}</td></tr>
            <tr><td><strong>Process</strong></td><td>${frameworks.process.score}/100</td><td><span class="risk-badge ${frameworks.process.score < 50 ? 'risk-high' : frameworks.process.score < 75 ? 'risk-medium' : 'risk-low'}">${frameworks.process.status}</span></td><td>${frameworks.process.finding}</td></tr>
            <tr><td><strong>Technology</strong></td><td>${frameworks.technology.score}/100</td><td><span class="risk-badge ${frameworks.technology.score < 50 ? 'risk-high' : frameworks.technology.score < 75 ? 'risk-medium' : 'risk-low'}">${frameworks.technology.status}</span></td><td>${frameworks.technology.finding}</td></tr>
            <tr><td><strong>Governance</strong></td><td>${frameworks.governance.score}/100</td><td><span class="risk-badge ${frameworks.governance.score < 50 ? 'risk-high' : frameworks.governance.score < 75 ? 'risk-medium' : 'risk-low'}">${frameworks.governance.status}</span></td><td>${frameworks.governance.finding}</td></tr>
            <tr><td><strong>Risk Management</strong></td><td>${frameworks.risk.score}/100</td><td><span class="risk-badge ${frameworks.risk.score < 50 ? 'risk-high' : frameworks.risk.score < 75 ? 'risk-medium' : 'risk-low'}">${frameworks.risk.status}</span></td><td>${frameworks.risk.finding}</td></tr>
          </table>
        </div>

        <div class="report-section">
          <h3>&#x1F4A1; Key Findings</h3>
          <ul>${this.generateKeyFindings(d, frameworks).map(f => `<li>${f}</li>`).join('')}</ul>
        </div>

        <div class="report-section">
          <h3>&#x1F332; Root Cause Analysis</h3>
          <p>${this.generateRootCause(d, frameworks)}</p>
        </div>

        <div class="report-section">
          <h3>&#x1F4C8; Business Impact Assessment</h3>
          <p>${this.generateBusinessImpact(d, frameworks, overallScore)}</p>
        </div>

        <div class="report-section">
          <h3>&#x2705; Recommended Actions</h3>
          <ul>${this.generateRecommendations(d, frameworks).map(r => `<li>${r}</li>`).join('')}</ul>
        </div>

        <div class="report-section">
          <h3>&#x1F4C5; 30-60-90 Day Improvement Plan</h3>
          <div class="plan-timeline">
            <div class="plan-phase">
              <div class="plan-phase-marker"><div class="plan-dot"></div><div class="plan-line"></div></div>
              <div class="plan-phase-content">
                <div class="plan-phase-title">Days 1-30: Stabilize & Assess</div>
                <div class="plan-phase-desc">${this.generate30DayPlan(d, frameworks)}</div>
              </div>
            </div>
            <div class="plan-phase">
              <div class="plan-phase-marker"><div class="plan-dot"></div><div class="plan-line"></div></div>
              <div class="plan-phase-content">
                <div class="plan-phase-title">Days 31-60: Structure & Implement</div>
                <div class="plan-phase-desc">${this.generate60DayPlan(d, frameworks)}</div>
              </div>
            </div>
            <div class="plan-phase">
              <div class="plan-phase-marker"><div class="plan-dot"></div></div>
              <div class="plan-phase-content">
                <div class="plan-phase-title">Days 61-90: Optimize & Scale</div>
                <div class="plan-phase-desc">${this.generate90DayPlan(d, frameworks)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  analyzeStrategy(d) {
    const base = d.mainChallenge === 'strategy' ? 35 : d.revenueTrend === 'declining' ? 45 : d.revenueTrend === 'growing' ? 80 : 60;
    const score = Math.max(20, Math.min(95, base + (d.yearsOperation === '0-2' ? -10 : d.yearsOperation === '20+' ? 10 : 0)));
    return { score, status: score < 50 ? 'At Risk' : score < 75 ? 'Developing' : 'Strong', finding: score < 50 ? 'Strategic direction lacks clarity and alignment with market reality.' : score < 75 ? 'Strategy exists but execution gaps and market adaptation needed.' : 'Clear strategic vision with effective execution mechanisms.' };
  },

  analyzeStructure(d) {
    const base = d.mainChallenge === 'growth' ? 40 : d.managementStructure === 'flat' && d.companySize === 'enterprise' ? 30 : d.managementStructure === 'functional' ? 65 : 55;
    const score = Math.max(20, Math.min(90, base));
    return { score, status: score < 50 ? 'At Risk' : score < 75 ? 'Developing' : 'Strong', finding: score < 50 ? 'Organizational structure creates bottlenecks and accountability gaps.' : score < 75 ? 'Structure functional but scaling limitations evident.' : 'Well-designed structure supporting current and future operations.' };
  },

  analyzePeople(d) {
    const base = d.mainChallenge === 'people' ? 35 : d.companySize === 'startup' ? 55 : d.companySize === 'enterprise' ? 60 : 50;
    const score = Math.max(20, Math.min(90, base));
    return { score, status: score < 50 ? 'At Risk' : score < 75 ? 'Developing' : 'Strong', finding: score < 50 ? 'Critical talent gaps and retention risks threatening operational continuity.' : score < 75 ? 'Adequate workforce but capability gaps in key strategic roles.' : 'Strong talent pipeline with effective development and retention.' };
  },

  analyzeProcess(d) {
    const base = d.mainChallenge === 'process' ? 35 : d.industry === 'manufacturing' ? 60 : d.industry === 'technology' ? 70 : 55;
    const score = Math.max(25, Math.min(88, base));
    return { score, status: score < 50 ? 'At Risk' : score < 75 ? 'Developing' : 'Strong', finding: score < 50 ? 'Business processes are ad-hoc, creating inefficiency and quality inconsistency.' : score < 75 ? 'Core processes documented but standardization and automation needed.' : 'Well-documented, efficient processes with continuous improvement culture.' };
  },

  analyzeTechnology(d) {
    const base = d.mainChallenge === 'technology' ? 30 : d.industry === 'technology' ? 75 : d.industry === 'finance' ? 70 : 50;
    const score = Math.max(20, Math.min(90, base));
    return { score, status: score < 50 ? 'At Risk' : score < 75 ? 'Developing' : 'Strong', finding: score < 50 ? 'Technology infrastructure significantly lags business requirements.' : score < 75 ? 'Basic systems in place but integration and modernization required.' : 'Technology effectively enables and differentiates business operations.' };
  },

  analyzeGovernance(d) {
    const base = d.mainChallenge === 'governance' ? 30 : d.yearsOperation === '0-2' ? 45 : d.yearsOperation === '20+' ? 55 : 50;
    const score = Math.max(20, Math.min(85, base));
    return { score, status: score < 50 ? 'At Risk' : score < 75 ? 'Developing' : 'Strong', finding: score < 50 ? 'Governance framework insufficient for current organizational complexity.' : score < 75 ? 'Basic governance exists but formalization and board effectiveness needed.' : 'Robust governance with clear accountability and decision rights.' };
  },

  analyzeRisk(d) {
    const base = d.mainChallenge === 'compliance' ? 35 : d.mainChallenge === 'financial' ? 40 : 55;
    const score = Math.max(25, Math.min(85, base));
    return { score, status: score < 50 ? 'At Risk' : score < 75 ? 'Developing' : 'Strong', finding: score < 50 ? 'Risk management reactive rather than proactive; significant exposure.' : score < 75 ? 'Risk awareness present but formal ERM framework not established.' : 'Comprehensive risk management integrated into strategic planning.' };
  },

  calculateOverallScore(frameworks) {
    const scores = Object.values(frameworks).map(f => f.score);
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  },

  generateExecutiveSummary(d, score, riskLevel) {
    const summaries = {
      'Critical': `The diagnostic of <strong>${FEOSUtils.escapeHtml(d.companyName)}</strong> reveals a <strong>Critical</strong> organizational health status with an overall maturity score of <strong>${score}/100</strong>. The primary challenge identified is <strong>${d.mainChallenge}</strong>, which is creating systemic strain across multiple organizational dimensions. Immediate executive intervention is required to prevent further deterioration of business performance, governance integrity, and operational sustainability. The organization is operating beyond its current management capacity, and without structured intervention, the risk of operational failure or significant financial loss is elevated.`,
      'High': `<strong>${FEOSUtils.escapeHtml(d.companyName)}</strong> demonstrates a <strong>High-Risk</strong> organizational profile with a maturity score of <strong>${score}/100</strong>. While the organization has foundational elements in place, the <strong>${d.mainChallenge}</strong> challenge is creating measurable drag on performance and scalability. Strategic realignment and targeted capability building are required within the next 90 days to prevent escalation to critical status. Key vulnerabilities exist in governance, process standardization, and people management that require executive attention.`,
      'Medium': `<strong>${FEOSUtils.escapeHtml(d.companyName)}</strong> presents a <strong>Medium-Risk</strong> organizational health profile with a maturity score of <strong>${score}/100</strong>. The organization has established operational foundations but faces meaningful gaps in <strong>${d.mainChallenge}</strong> that could constrain growth and competitive positioning. Proactive optimization of governance, processes, and talent systems will be essential to sustain current trajectory and prepare for next-stage scaling.`,
      'Low': `<strong>${FEOSUtils.escapeHtml(d.companyName)}</strong> demonstrates a <strong>Low-Risk</strong>, fundamentally healthy organizational profile with a maturity score of <strong>${score}/100</strong>. The organization has strong foundational systems and the <strong>${d.mainChallenge}</strong> challenge, while present, is manageable within current capabilities. Focus should be on continuous improvement, innovation, and preparing the organization for the next phase of strategic growth.`
    };
    return summaries[riskLevel];
  },

  generateKeyFindings(d, f) {
    const findings = [];
    if (f.strategy.score < 60) findings.push(`<strong>Strategic Misalignment:</strong> The organization's strategic direction lacks clarity or is not effectively cascaded to operational levels, creating execution gaps and resource misallocation.`);
    if (f.structure.score < 60) findings.push(`<strong>Structural Bottlenecks:</strong> Current organizational structure creates decision-making delays, unclear authority, and accountability gaps that hinder operational agility.`);
    if (f.people.score < 60) findings.push(`<strong>Talent Vulnerability:</strong> Critical roles lack qualified incumbents or succession plans, creating operational dependency risks and constraining growth capacity.`);
    if (f.process.score < 60) findings.push(`<strong>Process Fragmentation:</strong> Business processes are inconsistently executed, poorly documented, or lack standardization, resulting in quality variance and inefficiency.`);
    if (f.technology.score < 60) findings.push(`<strong>Technology Gap:</strong> Digital infrastructure does not adequately support current operational requirements or strategic ambitions, creating competitive disadvantage.`);
    if (f.governance.score < 60) findings.push(`<strong>Governance Deficit:</strong> Decision-making authority, accountability mechanisms, and board oversight are insufficient for organizational complexity and regulatory requirements.`);
    if (f.risk.score < 60) findings.push(`<strong>Risk Exposure:</strong> Enterprise risk management is reactive rather than systematic, leaving the organization exposed to operational, financial, and compliance risks.`);
    if (findings.length === 0) findings.push(`<strong>Organizational Resilience:</strong> The organization demonstrates strong fundamentals across all assessed dimensions. Primary focus should shift to innovation, market expansion, and next-level capability building.`);
    return findings;
  },

  generateRootCause(d, f) {
    const causes = [];
    if (f.strategy.score < 60) causes.push('absence of a formal strategic planning process');
    if (f.structure.score < 60) causes.push('organic growth outpacing structural design');
    if (f.people.score < 60) causes.push('HR function operating administratively rather than strategically');
    if (f.process.score < 60) causes.push('founder-dependent operations without systematization');
    if (f.governance.score < 60) causes.push('family or founder-centric decision-making without formal governance');
    if (causes.length === 0) causes.push('natural evolution requiring next-level professionalization');
    return `The root cause of the current organizational challenges at <strong>${FEOSUtils.escapeHtml(d.companyName)}</strong> can be traced to ${causes.join(', ')}. This has resulted in a compounding effect where operational inefficiencies create financial pressure, which constrains investment in capability building, which further limits operational improvement. Breaking this cycle requires executive-level commitment to structured organizational development, not merely symptomatic fixes. The ${d.yearsOperation} years of operation suggest the organization has passed the entrepreneurial stage and now requires professional management systems to sustain and accelerate growth.`;
  },

  generateBusinessImpact(d, f, score) {
    const impacts = [];
    if (score < 50) {
      impacts.push(`<strong>Financial Impact:</strong> Revenue leakage estimated at 15-25% due to operational inefficiency, rework, and missed opportunities. Cost of inaction increases exponentially with organizational size.`);
      impacts.push(`<strong>Governance Impact:</strong> Elevated exposure to regulatory penalties, shareholder disputes, and board liability due to inadequate governance controls.`);
      impacts.push(`<strong>People Impact:</strong> Accelerated talent attrition in critical roles, with replacement costs estimated at 1.5-2x annual salary per key departure.`);
    } else if (score < 75) {
      impacts.push(`<strong>Financial Impact:</strong> Moderate revenue impact of 5-15% from process inefficiencies and suboptimal resource allocation.`);
      impacts.push(`<strong>Growth Impact:</strong> Scaling constraints becoming visible; without intervention, growth will plateau or become unsustainable.`);
      impacts.push(`<strong>Competitive Impact:</strong> Competitors with stronger organizational foundations are capturing market share and talent.`);
    } else {
      impacts.push(`<strong>Financial Impact:</strong> Minimal direct financial impact; organization is well-positioned for value creation.`);
      impacts.push(`<strong>Growth Impact:</strong> Strong foundation for aggressive growth and market expansion initiatives.`);
      impacts.push(`<strong>Strategic Impact:</strong> Organizational capability is a competitive advantage enabling faster execution than peers.`);
    }
    impacts.push(`<strong>Long-Term Sustainability:</strong> ${score < 60 ? 'Without intervention, the organization faces existential risk within 12-24 months.' : score < 80 ? 'Sustainability achievable with targeted improvements over 6-12 months.' : 'Well-positioned for long-term sustainable growth and succession planning.'}`);
    return impacts.join('<br><br>');
  },

  generateRecommendations(d, f) {
    const recs = [];
    if (f.strategy.score < 70) recs.push(`<strong>Strategic Clarity Initiative:</strong> Conduct a formal strategic planning retreat with executive team and board to redefine vision, mission, and 3-year objectives with clear KPIs.`);
    if (f.structure.score < 70) recs.push(`<strong>Organizational Redesign:</strong> Restructure reporting lines, define decision rights (RACI), and establish clear authority matrices appropriate for ${d.companySize} organization.`);
    if (f.people.score < 70) recs.push(`<strong>Talent Architecture:</strong> Implement competency-based job grading, succession planning for critical roles, and leadership development programs.`);
    if (f.process.score < 70) recs.push(`<strong>Process Standardization:</strong> Document core business processes (SOP), establish quality control points, and implement continuous improvement methodology.`);
    if (f.technology.score < 70) recs.push(`<strong>Digital Transformation Roadmap:</strong> Assess current technology stack, identify integration gaps, and prioritize ERP/HRIS/CRM implementations.`);
    if (f.governance.score < 70) recs.push(`<strong>Governance Formalization:</strong> Establish board charter, management authority matrix, compliance committee, and regular governance review cycles.`);
    if (f.risk.score < 70) recs.push(`<strong>Enterprise Risk Management:</strong> Implement formal ERM framework with risk register, heat map, mitigation plans, and quarterly risk review.`);
    recs.push(`<strong>Executive Coaching:</strong> Provide CEO/Founder with executive coaching to support transition from operational management to strategic leadership.`);
    return recs;
  },

  generate30DayPlan(d, f) {
    const items = [];
    items.push(`Form an Executive Transformation Committee with CEO, CFO, and key department heads.`);
    if (f.strategy.score < 60) items.push(`Conduct emergency strategic alignment workshop to clarify immediate priorities.`);
    if (f.people.score < 60) items.push(`Identify and secure critical talent; implement retention bonuses for key personnel.`);
    if (f.governance.score < 60) items.push(`Draft emergency authority matrix and decision-making protocols.`);
    items.push(`Complete comprehensive data gathering: financials, org chart, process maps, policy inventory.`);
    items.push(`Establish weekly executive steering meetings with clear action tracking.`);
    return items.join('; ');
  },

  generate60DayPlan(d, f) {
    const items = [];
    items.push(`Implement redesigned organizational structure with clear roles, responsibilities, and reporting lines.`);
    if (f.process.score < 60) items.push(`Document and standardize top 10 critical business processes with SOPs.`);
    if (f.technology.score < 60) items.push(`Select and initiate procurement for core ERP/HRIS system.`);
    if (f.governance.score < 60) items.push(`Formalize board structure, committee charters, and governance policies.`);
    items.push(`Launch performance management system with department-level KPIs.`);
    items.push(`Conduct mid-point diagnostic review to assess progress and adjust trajectory.`);
    return items.join('; ');
  },

  generate90DayPlan(d, f) {
    const items = [];
    items.push(`Complete full ERM risk register with mitigation plans for top 10 risks.`);
    items.push(`Launch talent development program and succession planning for C-suite and critical roles.`);
    items.push(`Implement compliance monitoring system with quarterly audit schedule.`);
    items.push(`Conduct organization-wide communication of new structure, processes, and expectations.`);
    items.push(`Perform 90-day diagnostic reassessment to measure improvement and plan next phase.`);
    items.push(`Develop 12-month strategic roadmap with quarterly milestones and resource allocation.`);
    return items.join('; ');
  },

  exportReport() {
    const report = document.getElementById('diagnosticReport');
    if (!report) return;
    const text = report.innerText;
    FEOSUtils.exportToTxt('Executive_Diagnostic', text);
  }
};

window.FEOS_diagnostic = FEOS_diagnostic;
