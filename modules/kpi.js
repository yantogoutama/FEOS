/* FEOS KPI Builder */
const FEOS_kpi = {
  init() {
    const container = document.getElementById('view-kpi');
    if (!container) return;
    container.innerHTML = `
      <div class="module-view-header">
        <h2>KPI Builder</h2>
        <p>Create measurable performance systems using Balanced Scorecard frameworks for financial, customer, process, and learning metrics.</p>
      </div>
      <div class="module-layout">
        <div class="form-panel">
          <h3>KPI Configuration</h3>
          <form id="kpiForm">
            <div class="form-group">
              <label>Company Name <span class="required">*</span></label>
              <input type="text" name="companyName" class="form-control" placeholder="Company name">
            </div>
            <div class="form-group">
              <label>Department / Function <span class="required">*</span></label>
              <select name="department" class="form-control">
                <option value="">Select Department</option>
                <option value="company">Company-Wide (CEO/BOD)</option>
                <option value="sales">Sales & Marketing</option>
                <option value="finance">Finance & Accounting</option>
                <option value="operations">Operations / Production</option>
                <option value="hr">Human Resources</option>
                <option value="it">IT & Technology</option>
                <option value="procurement">Procurement</option>
                <option value="quality">Quality Assurance</option>
                <option value="warehouse">Warehouse / Logistics</option>
              </select>
            </div>
            <div class="form-group">
              <label>Primary Business Objective <span class="required">*</span></label>
              <select name="objective" class="form-control">
                <option value="">Select Objective</option>
                <option value="revenue">Revenue Growth</option>
                <option value="profit">Profitability Improvement</option>
                <option value="market">Market Share Expansion</option>
                <option value="customer">Customer Satisfaction & Retention</option>
                <option value="efficiency">Operational Efficiency</option>
                <option value="quality">Quality Excellence</option>
                <option value="innovation">Innovation & R&D</option>
                <option value="people">People Development</option>
                <option value="compliance">Compliance & Risk Management</option>
              </select>
            </div>
            <div class="form-group">
              <label>Current Performance Context <span class="required">*</span></label>
              <textarea name="context" class="form-control" rows="4" placeholder="Describe current performance challenges, baseline metrics, and what success looks like for this department..."></textarea>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>Measurement Period</label>
                <select name="period" class="form-control">
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="annual">Annual</option>
                </select>
              </div>
              <div class="form-group">
                <label>Number of KPIs</label>
                <select name="kpiCount" class="form-control">
                  <option value="4">4 (Balanced Scorecard)</option>
                  <option value="6">6 (Extended)</option>
                  <option value="8">8 (Comprehensive)</option>
                </select>
              </div>
            </div>
            <button type="button" class="btn btn-primary btn-block" onclick="FEOS_kpi.generate()">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
              Generate KPI Dashboard
            </button>
          </form>
        </div>
        <div class="output-panel">
          <div class="output-header">
            <h3><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg> KPI Dashboard</h3>
            <div class="output-actions" id="kpiActions" style="display:none">
              <button class="btn btn-secondary btn-sm" onclick="FEOSUtils.printReport('kpiReport')">Print</button>
              <button class="btn btn-secondary btn-sm" onclick="FEOS_kpi.exportReport()">Export</button>
            </div>
          </div>
          <div class="output-body" id="kpiOutput">
            <div class="output-placeholder">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
              <h4>KPI Builder Ready</h4>
              <p>Configure your department and objective to generate a Balanced Scorecard KPI dashboard with targets and measurement methods.</p>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  generate() {
    const v = FEOSUtils.validateForm('kpiForm', ['companyName','department','objective','context']);
    if (!v.valid) { alert('Please complete all required fields: ' + v.missing.join(', ')); return; }
    const d = v.data;
    FEOSUtils.showLoading('kpiOutput', 'Building KPI Dashboard...', 'Designing Balanced Scorecard metrics and targets');
    setTimeout(() => {
      FEOSUtils.renderReport('kpiOutput', this.buildReport(d));
      document.getElementById('kpiActions').style.display = 'flex';
    }, 1800);
  },

  buildReport(d) {
    const kpis = this.generateKPIs(d.department, d.objective, parseInt(d.kpiCount || '4'));
    const period = d.period || 'quarterly';
    const periodLabel = { monthly: 'Monthly', quarterly: 'Quarterly', annual: 'Annual' }[period];

    return `
      <div class="report" id="kpiReport">
        <div class="report-header">
          <h2>KPI Dashboard: ${this.deptName(d.department)}</h2>
          <div class="report-meta">
            <span>&#x1F4C5; ${FEOSUtils.formatDate()}</span>
            <span>&#x1F3E2; ${FEOSUtils.escapeHtml(d.companyName)}</span>
            <span class="tag">${periodLabel} Review</span>
          </div>
        </div>

        <div class="report-section">
          <h3>&#x1F4CB; Strategic Objective</h3>
          <p><strong>Primary Objective:</strong> ${this.objectiveName(d.objective)}</p>
          <p><strong>Context:</strong> ${FEOSUtils.escapeHtml(d.context)}</p>
          <p><strong>Balanced Scorecard Framework:</strong> This KPI dashboard measures performance across four perspectives: Financial, Customer, Internal Process, and Learning & Growth. Each perspective ensures balanced organizational performance rather than optimizing single dimensions at the expense of others.</p>
        </div>

        <div class="report-section">
          <h3>&#x1F4CA; Key Performance Indicators</h3>
          <table class="report-table">
            <tr><th>Perspective</th><th>Objective</th><th>KPI</th><th>Target</th><th>Measurement</th><th>Frequency</th></tr>
            ${kpis.map(k => `
              <tr>
                <td><strong>${k.perspective}</strong></td>
                <td>${k.objective}</td>
                <td>${k.kpi}</td>
                <td style="color:var(--accent-gold); font-weight:600;">${k.target}</td>
                <td>${k.measurement}</td>
                <td>${k.frequency}</td>
              </tr>
            `).join('')}
          </table>
        </div>

        <div class="report-section">
          <h3>&#x1F4A1; Implementation Guidance</h3>
          <ul>
            <li><strong>Data Collection:</strong> Assign data owners for each KPI. Automate data collection where possible through ERP, CRM, or HRIS integration. Manual data collection should use standardized templates with validation rules.</li>
            <li><strong>Reporting Cadence:</strong> ${periodLabel} performance review meetings with pre-distributed dashboards. Monthly operational reviews for lagging indicators. Real-time dashboards for leading indicators where feasible.</li>
            <li><strong>Target Setting:</strong> Targets should be SMART (Specific, Measurable, Achievable, Relevant, Time-bound). Baseline current performance before setting stretch targets. Review and adjust targets annually based on strategic priorities and market conditions.</li>
            <li><strong>Accountability:</strong> Each KPI must have a single accountable owner (typically department head or functional leader). Performance against KPIs should be linked to variable compensation and promotion decisions.</li>
            <li><strong>Continuous Improvement:</strong> Quarterly KPI effectiveness review: Are we measuring what matters? Are targets driving right behaviors? Are data sources reliable? Retire or replace KPIs that no longer serve strategic objectives.</li>
          </ul>
        </div>

        <div class="report-section">
          <h3>&#x26A0; KPI Governance</h3>
          <p><strong>Escalation Triggers:</strong> Red flag when any KPI misses target by >20% for two consecutive periods. Amber flag when any KPI misses target by >10% for one period. Trigger root cause analysis and corrective action plan within 5 business days.</p>
          <p><strong>Data Integrity:</strong> All KPI data subject to internal audit verification. Data manipulation or misreporting is a disciplinary offense. KPI definitions and calculation methodologies must be documented and approved.</p>
        </div>
      </div>
    `;
  },

  generateKPIs(dept, objective, count) {
    const baseKPIs = {
      company: [
        { perspective: 'Financial', objective: 'Sustainable Profitability', kpi: 'Revenue Growth Rate', target: '15-20% YoY', measurement: 'Financial statements comparison', frequency: 'Quarterly' },
        { perspective: 'Financial', objective: 'Capital Efficiency', kpi: 'EBITDA Margin', target: '> 18%', measurement: 'P&L analysis', frequency: 'Quarterly' },
        { perspective: 'Customer', objective: 'Market Leadership', kpi: 'Market Share', target: 'Top 3 in segment', measurement: 'Industry reports / internal tracking', frequency: 'Annual' },
        { perspective: 'Customer', objective: 'Customer Loyalty', kpi: 'Net Promoter Score (NPS)', target: '> 50', measurement: 'Customer survey', frequency: 'Semi-Annual' },
        { perspective: 'Internal Process', objective: 'Operational Excellence', kpi: 'Process Efficiency Ratio', target: 'Improve 10% YoY', measurement: 'Process cost / output analysis', frequency: 'Quarterly' },
        { perspective: 'Internal Process', objective: 'Quality Assurance', kpi: 'Defect / Error Rate', target: '< 1%', measurement: 'Quality audit', frequency: 'Monthly' },
        { perspective: 'Learning & Growth', objective: 'Talent Capability', kpi: 'Employee Engagement Score', target: '> 75%', measurement: 'Annual engagement survey', frequency: 'Annual' },
        { perspective: 'Learning & Growth', objective: 'Leadership Pipeline', kpi: 'Succession Readiness', target: '100% critical roles covered', measurement: 'Succession plan review', frequency: 'Semi-Annual' }
      ],
      sales: [
        { perspective: 'Financial', objective: 'Revenue Growth', kpi: 'Total Revenue', target: '120% of target', measurement: 'Sales system', frequency: 'Monthly' },
        { perspective: 'Financial', objective: 'Sales Efficiency', kpi: 'Sales Cost Ratio', target: '< 15% of revenue', measurement: 'Sales expense analysis', frequency: 'Quarterly' },
        { perspective: 'Customer', objective: 'Customer Acquisition', kpi: 'New Customer Count', target: 'Per quarterly target', measurement: 'CRM data', frequency: 'Monthly' },
        { perspective: 'Customer', objective: 'Customer Retention', kpi: 'Customer Churn Rate', target: '< 5%', measurement: 'CRM / billing data', frequency: 'Monthly' },
        { perspective: 'Internal Process', objective: 'Sales Cycle Efficiency', kpi: 'Average Sales Cycle', target: 'Reduce 10% YoY', measurement: 'CRM pipeline analysis', frequency: 'Quarterly' },
        { perspective: 'Internal Process', objective: 'Forecast Accuracy', kpi: 'Sales Forecast Variance', target: '< 10%', measurement: 'Forecast vs actual', frequency: 'Monthly' },
        { perspective: 'Learning & Growth', objective: 'Sales Capability', kpi: 'Sales Training Completion', target: '100% of sales team', measurement: 'LMS tracking', frequency: 'Quarterly' },
        { perspective: 'Learning & Growth', objective: 'Team Performance', kpi: 'Top Performer Ratio', target: '> 20% of team', measurement: 'Performance ranking', frequency: 'Quarterly' }
      ],
      finance: [
        { perspective: 'Financial', objective: 'Financial Control', kpi: 'Budget Variance', target: '< 5%', measurement: 'Budget vs actual', frequency: 'Monthly' },
        { perspective: 'Financial', objective: 'Cash Management', kpi: 'Days Sales Outstanding (DSO)', target: '< 45 days', measurement: 'AR aging report', frequency: 'Monthly' },
        { perspective: 'Customer', objective: 'Stakeholder Confidence', kpi: 'Audit Findings', target: 'Zero material findings', measurement: 'Internal / external audit', frequency: 'Annual' },
        { perspective: 'Customer', objective: 'Service Quality', kpi: 'Internal Customer Satisfaction', target: '> 80%', measurement: 'Internal survey', frequency: 'Semi-Annual' },
        { perspective: 'Internal Process', objective: 'Reporting Timeliness', kpi: 'Financial Close Cycle', target: '< 10 business days', measurement: 'Close calendar tracking', frequency: 'Monthly' },
        { perspective: 'Internal Process', objective: 'Process Automation', kpi: 'Automated Transaction %', target: '> 70%', measurement: 'System analysis', frequency: 'Quarterly' },
        { perspective: 'Learning & Growth', objective: 'Team Competency', kpi: 'Professional Certification', target: '100% of senior staff', measurement: 'Certification tracking', frequency: 'Annual' },
        { perspective: 'Learning & Growth', objective: 'Digital Finance', kpi: 'Finance System Uptime', target: '> 99.5%', measurement: 'IT monitoring', frequency: 'Monthly' }
      ],
      operations: [
        { perspective: 'Financial', objective: 'Cost Control', kpi: 'Unit Production Cost', target: 'Reduce 5% YoY', measurement: 'Cost accounting', frequency: 'Monthly' },
        { perspective: 'Financial', objective: 'Asset Utilization', kpi: 'OEE (Overall Equipment Effectiveness)', target: '> 85%', measurement: 'Production data', frequency: 'Daily' },
        { perspective: 'Customer', objective: 'Delivery Performance', kpi: 'On-Time Delivery Rate', target: '> 95%', measurement: 'Delivery tracking', frequency: 'Weekly' },
        { perspective: 'Customer', objective: 'Quality Assurance', kpi: 'Customer Complaint Rate', target: '< 0.5%', measurement: 'Complaint log', frequency: 'Monthly' },
        { perspective: 'Internal Process', objective: 'Production Efficiency', kpi: 'Throughput / Capacity Utilization', target: '> 80%', measurement: 'MES / Production system', frequency: 'Daily' },
        { perspective: 'Internal Process', objective: 'Safety Performance', kpi: 'LTIFR (Lost Time Injury Frequency)', target: 'Zero', measurement: 'Safety incident log', frequency: 'Monthly' },
        { perspective: 'Learning & Growth', objective: 'Operational Excellence', kpi: 'Lean / Six Sigma Projects', target: '4 per year', measurement: 'Project tracking', frequency: 'Quarterly' },
        { perspective: 'Learning & Growth', objective: 'Skills Development', kpi: 'Operator Certification Rate', target: '100%', measurement: 'Training records', frequency: 'Quarterly' }
      ],
      hr: [
        { perspective: 'Financial', objective: 'Cost Efficiency', kpi: 'HR Cost per Employee', target: '< 8% of payroll', measurement: 'HR budget analysis', frequency: 'Quarterly' },
        { perspective: 'Financial', objective: 'Talent ROI', kpi: 'Revenue per Employee', target: 'Improve 10% YoY', measurement: 'Financial / HR data', frequency: 'Annual' },
        { perspective: 'Customer', objective: 'Employee Satisfaction', kpi: 'eNPS (Employee Net Promoter)', target: '> 30', measurement: 'Quarterly pulse survey', frequency: 'Quarterly' },
        { perspective: 'Customer', objective: 'Talent Retention', kpi: 'Voluntary Turnover Rate', target: '< 10%', measurement: 'HRIS data', frequency: 'Monthly' },
        { perspective: 'Internal Process', objective: 'Recruitment Efficiency', kpi: 'Time to Fill (Critical Roles)', target: '< 45 days', measurement: 'ATS tracking', frequency: 'Monthly' },
        { perspective: 'Internal Process', objective: 'Performance Management', kpi: 'Performance Review Completion', target: '100%', measurement: 'HRIS tracking', frequency: 'Semi-Annual' },
        { perspective: 'Learning & Growth', objective: 'Capability Building', kpi: 'Training Hours per Employee', target: '> 40 hours/year', measurement: 'LMS data', frequency: 'Quarterly' },
        { perspective: 'Learning & Growth', objective: 'Leadership Pipeline', kpi: 'Internal Promotion Rate', target: '> 60%', measurement: 'Promotion tracking', frequency: 'Annual' }
      ],
      it: [
        { perspective: 'Financial', objective: 'IT Cost Management', kpi: 'IT Spend vs Budget', target: '< 5% variance', measurement: 'IT financial tracking', frequency: 'Monthly' },
        { perspective: 'Financial', objective: 'ROI on IT', kpi: 'IT Project ROI', target: '> 150%', measurement: 'Project business case', frequency: 'Per project' },
        { perspective: 'Customer', objective: 'User Satisfaction', kpi: 'IT Service Satisfaction', target: '> 80%', measurement: 'User survey', frequency: 'Quarterly' },
        { perspective: 'Customer', objective: 'Service Delivery', kpi: 'SLA Achievement Rate', target: '> 95%', measurement: 'ITSM system', frequency: 'Monthly' },
        { perspective: 'Internal Process', objective: 'System Reliability', kpi: 'System Uptime', target: '> 99.9%', measurement: 'Monitoring tools', frequency: 'Monthly' },
        { perspective: 'Internal Process', objective: 'Security Posture', kpi: 'Security Incident Count', target: 'Zero critical', measurement: 'SIEM / incident log', frequency: 'Monthly' },
        { perspective: 'Learning & Growth', objective: 'Digital Capability', kpi: 'Cloud Migration Progress', target: 'Per roadmap', measurement: 'Infrastructure audit', frequency: 'Quarterly' },
        { perspective: 'Learning & Growth', objective: 'Team Development', kpi: 'Certified IT Staff %', target: '> 70%', measurement: 'Certification tracking', frequency: 'Annual' }
      ]
    };
    const deptKPIs = baseKPIs[dept] || baseKPIs.company;
    return deptKPIs.slice(0, count);
  },

  deptName(d) {
    const names = { company: 'Company-Wide', sales: 'Sales & Marketing', finance: 'Finance & Accounting', operations: 'Operations', hr: 'Human Resources', it: 'IT & Technology', procurement: 'Procurement', quality: 'Quality Assurance', warehouse: 'Warehouse / Logistics' };
    return names[d] || d;
  },

  objectiveName(o) {
    const names = { revenue: 'Revenue Growth', profit: 'Profitability Improvement', market: 'Market Share Expansion', customer: 'Customer Satisfaction & Retention', efficiency: 'Operational Efficiency', quality: 'Quality Excellence', innovation: 'Innovation & R&D', people: 'People Development', compliance: 'Compliance & Risk Management' };
    return names[o] || o;
  },

  exportReport() {
    const r = document.getElementById('kpiReport');
    if (r) FEOSUtils.exportToTxt('KPI_Dashboard', r.innerText);
  }
};
window.FEOS_kpi = FEOS_kpi;
