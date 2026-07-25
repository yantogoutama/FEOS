/* FEOS Policy Builder */
const FEOS_policy = {
  init() {
    const container = document.getElementById('view-policy');
    if (!container) return;
    container.innerHTML = `
      <div class="module-view-header">
        <h2>Policy Builder</h2>
        <p>Develop corporate policies, HR policies, compliance policies, and governance policies with enforcement frameworks.</p>
      </div>
      <div class="module-layout">
        <div class="form-panel">
          <h3>Policy Parameters</h3>
          <form id="policyForm">
            <div class="form-group">
              <label>Company Name <span class="required">*</span></label>
              <input type="text" name="companyName" class="form-control" placeholder="Company name">
            </div>
            <div class="form-group">
              <label>Policy Type <span class="required">*</span></label>
              <select name="policyType" class="form-control">
                <option value="">Select Policy Type</option>
                <option value="hr">HR Policy</option>
                <option value="code">Code of Conduct & Ethics</option>
                <option value="compliance">Compliance Policy</option>
                <option value="operational">Operational Policy</option>
                <option value="governance">Corporate Governance Policy</option>
                <option value="it">IT & Data Security Policy</option>
                <option value="whistleblower">Whistleblower Policy</option>
                <option value="antibribery">Anti-Bribery & Anti-Corruption</option>
              </select>
            </div>
            <div class="form-group">
              <label>Policy Title <span class="required">*</span></label>
              <input type="text" name="policyTitle" class="form-control" placeholder="e.g., Employee Leave Policy">
            </div>
            <div class="form-group">
              <label>Department / Scope <span class="required">*</span></label>
              <select name="scope" class="form-control">
                <option value="">Select Scope</option>
                <option value="company">Company-Wide</option>
                <option value="hr">Human Resources</option>
                <option value="finance">Finance</option>
                <option value="operations">Operations</option>
                <option value="it">IT</option>
                <option value="sales">Sales</option>
              </select>
            </div>
            <div class="form-group">
              <label>Policy Purpose / Context <span class="required">*</span></label>
              <textarea name="purpose" class="form-control" rows="4" placeholder="Describe why this policy is needed, what problem it solves, and the desired outcomes..."></textarea>
            </div>
            <div class="form-group">
              <label>Key Issues to Address</label>
              <textarea name="issues" class="form-control" rows="3" placeholder="List specific issues, incidents, or regulatory requirements driving this policy..."></textarea>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>Effective Date</label>
                <input type="date" name="effectiveDate" class="form-control">
              </div>
              <div class="form-group">
                <label>Review Cycle</label>
                <select name="reviewCycle" class="form-control">
                  <option value="annual">Annual</option>
                  <option value="biannual">Bi-Annual</option>
                  <option value="quarterly">Quarterly</option>
                </select>
              </div>
            </div>
            <button type="button" class="btn btn-primary btn-block" onclick="FEOS_policy.generate()">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
              Generate Policy Document
            </button>
          </form>
        </div>
        <div class="output-panel">
          <div class="output-header">
            <h3><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg> Generated Policy Document</h3>
            <div class="output-actions" id="policyActions" style="display:none">
              <button class="btn btn-secondary btn-sm" onclick="FEOSUtils.printReport('policyReport')">Print</button>
              <button class="btn btn-secondary btn-sm" onclick="FEOS_policy.exportReport()">Export</button>
            </div>
          </div>
          <div class="output-body" id="policyOutput">
            <div class="output-placeholder">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
              <h4>Policy Builder Ready</h4>
              <p>Define your policy parameters to generate a comprehensive corporate policy with statement, principles, procedures, and enforcement framework.</p>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  generate() {
    const v = FEOSUtils.validateForm('policyForm', ['companyName','policyType','policyTitle','scope','purpose']);
    if (!v.valid) { alert('Please complete all required fields: ' + v.missing.join(', ')); return; }
    const d = v.data;
    FEOSUtils.showLoading('policyOutput', 'Generating Policy Document...', 'Building policy structure, principles, and enforcement framework');
    setTimeout(() => {
      FEOSUtils.renderReport('policyOutput', this.buildReport(d));
      document.getElementById('policyActions').style.display = 'flex';
    }, 1800);
  },

  buildReport(d) {
    const effectiveDate = d.effectiveDate || new Date().toISOString().split('T')[0];
    const reviewCycle = d.reviewCycle || 'annual';
    const policyContent = this.getPolicyContent(d.policyType, d.policyTitle);

    return `
      <div class="report" id="policyReport">
        <div class="report-header">
          <h2>${FEOSUtils.escapeHtml(d.policyTitle)}</h2>
          <div class="report-meta">
            <span>&#x1F4C5; ${effectiveDate}</span>
            <span>&#x1F3E2; ${FEOSUtils.escapeHtml(d.companyName)}</span>
            <span class="tag">${d.scope.toUpperCase()} SCOPE</span>
          </div>
        </div>

        <div class="report-section">
          <h3>1. Policy Statement</h3>
          <p>${FEOSUtils.escapeHtml(d.companyName)} is committed to ${policyContent.commitment}. This policy establishes the framework, standards, and expectations for all employees, contractors, and stakeholders to ensure ${policyContent.outcome}. Compliance with this policy is mandatory and non-compliance may result in disciplinary action up to and including termination and legal proceedings.</p>
        </div>

        <div class="report-section">
          <h3>2. Purpose</h3>
          <p>${FEOSUtils.escapeHtml(d.purpose)}</p>
          <p>Specifically, this policy aims to:</p>
          <ul>
            <li>Establish clear standards and expectations for ${policyContent.topic}.</li>
            <li>Ensure compliance with applicable laws, regulations, and industry standards.</li>
            <li>Protect the interests of the company, its employees, customers, and stakeholders.</li>
            <li>Provide a framework for consistent decision-making and fair treatment.</li>
            <li>Mitigate operational, financial, legal, and reputational risks.</li>
          </ul>
        </div>

        <div class="report-section">
          <h3>3. Scope</h3>
          <p>This policy applies to all employees (permanent, contract, and temporary), directors, officers, agents, consultants, and any other individuals acting on behalf of ${FEOSUtils.escapeHtml(d.companyName)}. The policy covers all ${d.scope === 'company' ? 'business units, departments, subsidiaries, and affiliated entities' : `${d.scope} department activities and related cross-functional interactions`}.</p>
        </div>

        <div class="report-section">
          <h3>4. Principles</h3>
          <ul>
            ${policyContent.principles.map(p => `<li><strong>${p.title}:</strong> ${p.desc}</li>`).join('')}
          </ul>
        </div>

        <div class="report-section">
          <h3>5. Responsibility</h3>
          <table class="report-table">
            <tr><th>Role</th><th>Responsibility</th></tr>
            <tr><td><strong>Board of Directors</strong></td><td>Ultimate accountability for policy effectiveness; annual policy review and approval; oversight of policy compliance culture.</td></tr>
            <tr><td><strong>CEO / Managing Director</strong></td><td>Executive ownership of policy implementation; resource allocation; enforcement decisions; escalation handling.</td></tr>
            <tr><td><strong>Department Heads</strong></td><td>Operational implementation within respective departments; monitoring compliance; reporting violations; conducting training.</td></tr>
            <tr><td><strong>All Employees</strong></td><td>Personal compliance with policy requirements; reporting suspected violations; participating in training; seeking clarification when uncertain.</td></tr>
            <tr><td><strong>Compliance / Legal</strong></td><td>Policy interpretation; investigation of violations; regulatory liaison; policy update recommendations.</td></tr>
          </table>
        </div>

        <div class="report-section">
          <h3>6. Procedure</h3>
          ${policyContent.procedures.map((proc, i) => `
            <div style="margin-bottom:16px;">
              <div style="font-weight:600; color:var(--text-primary); margin-bottom:6px;">6.${i+1} ${proc.title}</div>
              <div style="color:var(--text-secondary); font-size:0.9375rem; line-height:1.6;">${proc.desc}</div>
            </div>
          `).join('')}
        </div>

        <div class="report-section">
          <h3>7. Enforcement</h3>
          <p>Violations of this policy will be subject to disciplinary action based on severity, intent, and impact:</p>
          <ul>
            <li><strong>Minor Violation:</strong> Verbal warning, mandatory retraining, and documented counseling.</li>
            <li><strong>Moderate Violation:</strong> Written warning, performance improvement plan, suspension (with or without pay), and loss of privileges.</li>
            <li><strong>Serious Violation:</strong> Immediate suspension pending investigation, termination of employment/contract, and potential legal action.</li>
            <li><strong>Criminal Violation:</strong> Immediate termination, referral to law enforcement, and cooperation with legal proceedings.</li>
          </ul>
          <p>All enforcement actions will be documented, consistent, and fair. Employees have the right to appeal disciplinary decisions through the established grievance procedure.</p>
        </div>

        <div class="report-section">
          <h3>8. Reporting & Whistleblower Protection</h3>
          <p>Employees are encouraged and obligated to report suspected violations through the following channels:</p>
          <ul>
            <li>Direct supervisor or department head</li>
            <li>Human Resources Department</li>
            <li>Compliance Officer / Legal Department</li>
            <li>Anonymous whistleblower hotline: [To be configured]</li>
            <li>Email: compliance@[company].com</li>
          </ul>
          <p>${FEOSUtils.escapeHtml(d.companyName)} prohibits retaliation against any individual who reports violations in good faith. Retaliation is itself a serious policy violation subject to immediate disciplinary action.</p>
        </div>

        <div class="report-section">
          <h3>9. Policy Review & Updates</h3>
          <p>This policy will be reviewed ${reviewCycle === 'annual' ? 'annually' : reviewCycle === 'biannual' ? 'every six months' : 'quarterly'} or upon significant regulatory changes, organizational restructuring, or material incidents. The Compliance / Legal Department is responsible for coordinating reviews, gathering stakeholder input, and presenting updates to the Board for approval.</p>
          <p><strong>Effective Date:</strong> ${effectiveDate}</p>
          <p><strong>Next Review Date:</strong> ${this.getNextReviewDate(effectiveDate, reviewCycle)}</p>
          <p><strong>Approval:</strong> Board of Directors, ${FEOSUtils.escapeHtml(d.companyName)}</p>
        </div>
      </div>
    `;
  },

  getPolicyContent(type, title) {
    const contents = {
      hr: {
        commitment: 'maintaining a fair, equitable, and professional workplace that respects the dignity and rights of all employees',
        outcome: 'consistent and compliant human resource management practices',
        topic: 'employee relations, recruitment, compensation, performance, and workplace conduct',
        principles: [
          { title: 'Fairness & Equity', desc: 'All employment decisions are based on merit, qualifications, and business needs without discrimination.' },
          { title: 'Transparency', desc: 'HR policies, procedures, and decisions are communicated clearly and consistently to all employees.' },
          { title: 'Compliance', desc: 'All HR practices comply with UU Cipta Kerja, BPJS requirements, and applicable labor regulations.' },
          { title: 'Respect & Dignity', desc: 'Every employee is treated with respect, and harassment or discrimination of any form is prohibited.' }
        ],
        procedures: [
          { title: 'Recruitment & Selection', desc: 'All positions are filled through a structured process including job analysis, approved requisition, multi-stage interview, background verification, and formal offer. Selection criteria must be job-related and consistently applied.' },
          { title: 'Compensation & Benefits', desc: 'Compensation is determined by job grade, market benchmarking, and individual performance. All employees receive BPJS Ketenagakerjaan and Kesehatan. Payroll is processed monthly with detailed payslips.' },
          { title: 'Performance Management', desc: 'Performance is evaluated through quarterly OKR reviews and annual performance appraisals. Underperformance is addressed through coaching and PIP; high performance is recognized and rewarded.' },
          { title: 'Leave & Attendance', desc: 'Employees are entitled to annual leave, sick leave, maternity/paternity leave, and public holidays per UU Cipta Kerja. All leave requests require supervisor approval and HR recording.' },
          { title: 'Discipline & Termination', desc: 'Disciplinary actions follow progressive discipline principles. Termination must comply with UU Cipta Kerja procedures, including notification, severance calculation, and BPJS transition.' }
        ]
      },
      code: {
        commitment: 'the highest standards of integrity, ethics, and lawful conduct in all business activities',
        outcome: 'an ethical culture where employees act with integrity and accountability',
        topic: 'ethical conduct, conflicts of interest, and professional behavior',
        principles: [
          { title: 'Integrity', desc: 'We act with honesty and integrity in all business dealings, maintaining the trust of stakeholders.' },
          { title: 'Accountability', desc: 'We take responsibility for our actions and decisions, and we hold ourselves and others accountable.' },
          { title: 'Respect', desc: 'We treat colleagues, customers, suppliers, and communities with dignity and respect.' },
          { title: 'Compliance', desc: 'We comply with all applicable laws, regulations, and internal policies without exception.' }
        ],
        procedures: [
          { title: 'Conflict of Interest', desc: 'Employees must disclose any actual or potential conflicts of interest, including financial interests in competitors, suppliers, or customers. Annual conflict of interest declarations are mandatory.' },
          { title: 'Gifts & Hospitality', desc: 'Employees may not accept gifts exceeding IDR 500,000 or any gift that could influence business decisions. All gifts must be reported and recorded. Offering bribes or improper payments is strictly prohibited.' },
          { title: 'Confidentiality', desc: 'Company confidential information, trade secrets, and customer data must be protected. Disclosure to unauthorized parties is prohibited both during and after employment.' },
          { title: 'Fair Competition', desc: 'We compete fairly and ethically. Anti-competitive practices, price-fixing, and collusion are prohibited.' },
          { title: 'Workplace Behavior', desc: 'Harassment, discrimination, bullying, and retaliation are strictly prohibited. All employees are entitled to a safe and respectful workplace.' }
        ]
      },
      compliance: {
        commitment: 'full compliance with all applicable laws, regulations, and industry standards',
        outcome: 'regulatory compliance and risk mitigation across all operations',
        topic: 'regulatory compliance, reporting, and control',
        principles: [
          { title: 'Proactive Compliance', desc: 'We identify and address compliance requirements before they become violations.' },
          { title: 'Continuous Monitoring', desc: 'Compliance is monitored continuously through audits, assessments, and reporting systems.' },
          { title: 'Accountability', desc: 'Every employee is responsible for compliance within their area of responsibility.' },
          { title: 'Transparency', desc: 'Compliance issues are reported transparently without fear of retaliation.' }
        ],
        procedures: [
          { title: 'Regulatory Monitoring', desc: 'The Compliance Officer monitors regulatory changes and updates policies and practices accordingly. Monthly regulatory update briefings are provided to department heads.' },
          { title: 'Compliance Training', desc: 'All employees receive annual compliance training relevant to their role. Specialized training is provided for high-risk roles (finance, procurement, sales).' },
          { title: 'Internal Audit', desc: 'Internal audit conducts quarterly compliance audits with findings reported to the Audit Committee. Corrective action plans are tracked to completion.' },
          { title: 'Incident Reporting', desc: 'All compliance incidents must be reported within 24 hours. Investigation is conducted by Compliance/Legal with findings reported to the Board.' },
          { title: 'Regulatory Liaison', desc: 'All regulatory communications, inspections, and inquiries are coordinated through the Compliance Officer. No employee may communicate with regulators without authorization.' }
        ]
      },
      operational: {
        commitment: 'safe, efficient, and high-quality operations that meet customer expectations and regulatory requirements',
        outcome: 'operational excellence and continuous improvement',
        topic: 'operational standards, quality, and safety',
        principles: [
          { title: 'Safety First', desc: 'Employee safety and health are paramount. No operational priority overrides safety requirements.' },
          { title: 'Quality Excellence', desc: 'We deliver products and services that meet or exceed customer expectations and quality standards.' },
          { title: 'Efficiency', desc: 'We continuously seek to improve operational efficiency while maintaining quality and safety.' },
          { title: 'Sustainability', desc: 'Operations are conducted with consideration for environmental impact and resource conservation.' }
        ],
        procedures: [
          { title: 'Standard Operating Procedures', desc: 'All operational activities follow approved SOPs. Deviations require documented approval from the Department Head and Quality Assurance.' },
          { title: 'Quality Control', desc: 'In-process and final quality checks are mandatory. Non-conforming products/services are quarantined, investigated, and dispositioned per NC procedure.' },
          { title: 'Safety Management', desc: 'SMK3 (OHS Management System) is implemented. Hazard assessments, safety training, PPE provision, and incident reporting are mandatory.' },
          { title: 'Environmental Compliance', desc: 'Waste management, emissions control, and resource usage comply with AMDAL/UKL-UPL requirements. Environmental incidents are reported immediately.' },
          { title: 'Continuous Improvement', desc: 'Kaizen suggestions are encouraged and evaluated monthly. Process improvement projects follow DMAIC or PDCA methodology.' }
        ]
      },
      governance: {
        commitment: 'strong corporate governance that ensures transparency, accountability, and sustainable value creation',
        outcome: 'effective board oversight and stakeholder confidence',
        topic: 'corporate governance, board effectiveness, and stakeholder relations',
        principles: [
          { title: 'Board Independence', desc: 'The Board maintains independence in oversight and decision-making, with independent directors constituting at least 30% of the board.' },
          { title: 'Transparency', desc: 'Financial and operational information is disclosed accurately and timely to shareholders and regulators.' },
          { title: 'Shareholder Rights', desc: 'All shareholders are treated equitably, with voting rights and dividend entitlements protected.' },
          { title: 'Stakeholder Engagement', desc: 'We engage with employees, customers, suppliers, and communities in a transparent and constructive manner.' }
        ],
        procedures: [
          { title: 'Board Composition', desc: 'The Board comprises executive and non-executive directors with diverse expertise. Independent directors are appointed per regulatory requirements.' },
          { title: 'Board Committees', desc: 'Audit Committee, Nomination Committee, and Remuneration Committee are established with majority independent membership and written charters.' },
          { title: 'GMS Procedures', desc: 'Annual and Extraordinary GMS follow UU PT requirements with proper notice, quorum, minutes, and voting records. Shareholder proposals are addressed per procedure.' },
          { title: 'Related Party Transactions', desc: 'All RPTs require board approval with independent director review. Transactions are conducted at arm's length and fully disclosed.' },
          { title: 'Disclosure & Reporting', desc: 'Annual reports, financial statements, and material information are disclosed per regulatory requirements and published on the company website.' }
        ]
      },
      it: {
        commitment: 'secure, reliable, and compliant information technology and data management practices',
        outcome: 'data security, system availability, and regulatory compliance in IT operations',
        topic: 'IT security, data protection, and technology governance',
        principles: [
          { title: 'Security by Design', desc: 'Security is integrated into all IT systems and processes from inception, not added as an afterthought.' },
          { title: 'Data Protection', desc: 'Personal and confidential data is protected through technical controls, access management, and encryption.' },
          { title: 'Availability', desc: 'Critical systems maintain >99.9% uptime with disaster recovery capabilities.' },
          { title: 'Compliance', desc: 'IT practices comply with UU PDP, sector regulations, and international standards (ISO 27001).' }
        ],
        procedures: [
          { title: 'Access Control', desc: 'User access is granted on a need-to-know basis with role-based permissions. Access reviews are conducted quarterly. Privileged access requires MFA and logging.' },
          { title: 'Data Classification', desc: 'Data is classified as Public, Internal, Confidential, or Restricted. Handling, storage, and transmission controls are applied per classification.' },
          { title: 'Incident Response', desc: 'Security incidents are reported immediately to IT Security. Incident response team activates containment, eradication, recovery, and post-incident review.' },
          { title: 'Acceptable Use', desc: 'Company IT resources are for business purposes only. Prohibited activities include unauthorized software, personal use of company assets, and circumvention of security controls.' },
          { title: 'Backup & Recovery', desc: 'Critical data is backed up daily with off-site storage. Recovery Time Objective (RTO) is 4 hours; Recovery Point Objective (RPO) is 24 hours.' }
        ]
      },
      whistleblower: {
        commitment: 'protecting employees who report misconduct in good faith and ensuring thorough investigation of all reports',
        outcome: 'a culture where misconduct is reported and addressed without fear of retaliation',
        topic: 'whistleblower protection and incident reporting',
        principles: [
          { title: 'Protection', desc: 'Whistleblowers are protected from retaliation, harassment, or adverse employment action.' },
          { title: 'Confidentiality', desc: 'Whistleblower identity is kept confidential to the maximum extent permitted by law and investigation requirements.' },
          { title: 'Fair Investigation', desc: 'All reports are investigated promptly, objectively, and thoroughly by qualified personnel.' },
          { title: 'Non-Retaliation', desc: 'Retaliation against whistleblowers is a serious violation subject to immediate termination.' }
        ],
        procedures: [
          { title: 'Reporting Channels', desc: 'Reports may be submitted via: (a) Direct supervisor, (b) HR Department, (c) Compliance Officer, (d) Anonymous hotline, (e) Email: whistleblower@[company].com. All channels are monitored daily.' },
          { title: 'Report Handling', desc: 'Reports are logged within 24 hours. Preliminary assessment determines investigation scope and priority. The whistleblower receives acknowledgment within 48 hours.' },
          { title: 'Investigation', desc: 'Investigations are conducted by Compliance/Legal with support from Internal Audit. Findings are documented and reported to the Audit Committee for serious matters.' },
          { title: 'Corrective Action', desc: 'Confirmed violations result in corrective action per disciplinary policy. Systemic issues trigger policy or process improvements.' },
          { title: 'Whistleblower Support', desc: 'Whistleblowers may request transfer, leave, or other protective measures during investigation. HR monitors whistleblower treatment for 12 months post-report.' }
        ]
      },
      antibribery: {
        commitment: 'zero tolerance for bribery, corruption, and improper payments in any form',
        outcome: 'ethical business relationships free from corruption',
        topic: 'anti-bribery, anti-corruption, and ethical business conduct',
        principles: [
          { title: 'Zero Tolerance', desc: 'Bribery and corruption are never acceptable, regardless of local customs, competitive pressure, or business necessity.' },
          { title: 'Due Diligence', desc: 'Third parties, agents, and business partners are subject to anti-corruption due diligence before engagement.' },
          { title: 'Accurate Records', desc: 'All transactions are recorded accurately and transparently. Off-book accounts and secret funds are prohibited.' },
          { title: 'Training & Awareness', desc: 'All employees receive anti-bribery training. High-risk roles receive specialized training and monitoring.' }
        ],
        procedures: [
          { title: 'Prohibited Conduct', desc: 'Offering, promising, or giving bribes to public officials, customers, or business partners is prohibited. Facilitation payments are prohibited. Kickbacks and secret commissions are prohibited.' },
          { title: 'Gifts & Hospitality', desc: 'Gifts to public officials are prohibited. Business gifts must be modest, transparent, and recorded. Hospitality must be reasonable and business-related.' },
          { title: 'Third Party Management', desc: 'Agents, distributors, and intermediaries must sign anti-bribery clauses. Commission rates are capped and reviewed. Unusual payment patterns trigger investigation.' },
          { title: 'Political Contributions', desc: 'Company political contributions require Board approval and are disclosed. Personal political contributions by executives require pre-approval.' },
          { title: 'Record Keeping', desc: 'All payments to third parties are supported by contracts, invoices, and proof of service. Cash payments exceeding IDR 10M require dual approval.' }
        ]
      }
    };
    return contents[type] || contents.hr;
  },

  getNextReviewDate(dateStr, cycle) {
    const d = new Date(dateStr);
    if (cycle === 'annual') d.setFullYear(d.getFullYear() + 1);
    else if (cycle === 'biannual') d.setMonth(d.getMonth() + 6);
    else d.setMonth(d.getMonth() + 3);
    return d.toISOString().split('T')[0];
  },

  exportReport() {
    const r = document.getElementById('policyReport');
    if (r) FEOSUtils.exportToTxt('Policy_Document', r.innerText);
  }
};
window.FEOS_policy = FEOS_policy;
