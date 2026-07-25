/* FEOS Compliance Advisor */
const FEOS_compliance = {
  init() {
    const container = document.getElementById('view-compliance');
    if (!container) return;
    container.innerHTML = `
      <div class="module-view-header">
        <h2>Compliance Advisor</h2>
        <p>Ensure business operates within regulations and ethical standards with comprehensive gap analysis.</p>
      </div>
      <div class="module-layout">
        <div class="form-panel">
          <h3>Compliance Profile</h3>
          <form id="complianceForm">
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
              <label>Primary Compliance Area <span class="required">*</span></label>
              <select name="area" class="form-control">
                <option value="">Select Area</option>
                <option value="labor">Labor Law (UU Cipta Kerja)</option>
                <option value="tax">Tax Compliance</option>
                <option value="environment">Environmental Regulations</option>
                <option value="data">Data Protection & Privacy</option>
                <option value="osh">Occupational Safety & Health</option>
                <option value="corporate">Corporate Law & GMS</option>
                <option value="industry">Industry-Specific Regulations</option>
                <option value="ethics">Code of Conduct & Ethics</option>
              </select>
            </div>
            <div class="form-group">
              <label>Compliance Situation <span class="required">*</span></label>
              <textarea name="situation" class="form-control" rows="4" placeholder="Describe compliance concerns: recent violations, audit findings, regulatory changes, or areas of uncertainty..."></textarea>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>Last Compliance Audit</label>
                <select name="lastAudit" class="form-control">
                  <option value="never">Never</option>
                  <option value="over2">Over 2 years ago</option>
                  <option value="1-2">1-2 years ago</option>
                  <option value="under1">Under 1 year</option>
                </select>
              </div>
              <div class="form-group">
                <label>Have Compliance Officer?</label>
                <select name="hasOfficer" class="form-control">
                  <option value="no">No</option>
                  <option value="parttime">Part-time/Combined role</option>
                  <option value="yes">Yes, dedicated</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label>Regulatory History</label>
              <select name="history" class="form-control">
                <option value="none">No violations</option>
                <option value="minor">Minor warnings</option>
                <option value="fines">Fines imposed</option>
                <option value="serious">Serious violations</option>
              </select>
            </div>
            <button type="button" class="btn btn-primary btn-block" onclick="FEOS_compliance.generate()">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
              Generate Compliance Assessment
            </button>
          </form>
        </div>
        <div class="output-panel">
          <div class="output-header">
            <h3><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M9 15l2 2 4-4"/></svg> Compliance Assessment</h3>
            <div class="output-actions" id="complianceActions" style="display:none">
              <button class="btn btn-secondary btn-sm" onclick="FEOSUtils.printReport('complianceReport')">Print</button>
              <button class="btn btn-secondary btn-sm" onclick="FEOS_compliance.exportReport()">Export</button>
            </div>
          </div>
          <div class="output-body" id="complianceOutput">
            <div class="output-placeholder">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M9 15l2 2 4-4"/></svg>
              <h4>Compliance Analysis Ready</h4>
              <p>Provide your compliance profile to receive a comprehensive assessment with gap analysis, risk levels, and required actions.</p>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  generate() {
    const v = FEOSUtils.validateForm('complianceForm', ['companyName','industry','size','area','situation']);
    if (!v.valid) { alert('Please complete all required fields: ' + v.missing.join(', ')); return; }
    const d = v.data;
    FEOSUtils.showLoading('complianceOutput', 'Analyzing Compliance Framework...', 'Evaluating regulatory gaps and control effectiveness');
    setTimeout(() => {
      FEOSUtils.renderReport('complianceOutput', this.buildReport(d));
      document.getElementById('complianceActions').style.display = 'flex';
    }, 2000);
  },

  buildReport(d) {
    const areaMap = {
      labor: { name: 'Labor Law Compliance', regs: 'UU Cipta Kerja No. 11/2020, Government Regulations on Wages, Working Hours, Termination, and BPJS', gaps: ['Employment contracts not standardized', 'Working hours / overtime not properly recorded', 'BPJS registration gaps', 'Termination procedures non-compliant', 'PKWT / PKWTT classification errors'], actions: ['Standardize all employment contracts with legal review', 'Implement attendance and overtime tracking system', 'Audit BPJS Ketenagakerjaan and Kesehatan registration', 'Develop compliant termination SOP', 'Review all PKWT agreements for compliance'] },
      tax: { name: 'Tax Compliance', regs: 'UU HPP, UU PPh, UU PPN, PMK regulations', gaps: ['Tax reporting delays or errors', 'Transfer pricing documentation', 'VAT compliance on digital transactions', 'Employee tax withholding issues'], actions: ['Engage tax consultant for comprehensive review', 'Implement tax calendar with deadline alerts', 'Prepare transfer pricing documentation', 'Automate employee PPh 21 calculations'] },
      environment: { name: 'Environmental Compliance', regs: 'UU Lingkungan Hidup No. 32/2009, AMDAL / UKL-UPL requirements', gaps: ['AMDAL/UKL-UPL not updated', 'Waste management non-compliance', 'Emissions monitoring gaps'], actions: ['Update environmental permits and AMDAL', 'Implement waste management SOP', 'Install emissions monitoring systems'] },
      data: { name: 'Data Protection & Privacy', regs: 'UU PDP (Personal Data Protection), sector-specific regulations', gaps: ['No data protection policy', 'Employee and customer data not secured', 'Cross-border data transfer risks'], actions: ['Draft and implement data protection policy', 'Conduct data mapping and classification', 'Implement technical security controls', 'Appoint Data Protection Officer'] },
      osh: { name: 'Occupational Safety & Health', regs: 'UU No. 1/1970 on Safety, SMK3 requirements', gaps: ['No SMK3 certification', 'Workplace hazard assessment outdated', 'PPE compliance gaps', 'Incident reporting not systematic'], actions: ['Implement SMK3 (OHS Management System)', 'Conduct comprehensive hazard assessment', 'Standardize PPE provision and training', 'Establish incident reporting and investigation SOP'] },
      corporate: { name: 'Corporate Law & Governance', regs: 'UU PT No. 40/2007, POJK for listed companies', gaps: ['GMS procedures non-compliant', 'Board minutes incomplete', 'Shareholder register not maintained', 'Annual reporting delays'], actions: ['Review and update GMS procedures', 'Standardize board meeting documentation', 'Maintain shareholder register digitally', 'Establish compliance calendar for annual obligations'] },
      industry: { name: 'Industry-Specific Regulations', regs: 'Sector-dependent (OJK, Bappebti, Kemenperin, etc.)', gaps: ['Sector licenses not renewed', 'Reporting to regulator incomplete', 'Product/service standards not met'], actions: ['Audit all sector-specific licenses and permits', 'Establish regulatory reporting calendar', 'Review product/service compliance with standards'] },
      ethics: { name: 'Code of Conduct & Ethics', regs: 'Internal governance, anti-corruption (UU Tipikor)', gaps: ['No formal code of conduct', 'Conflict of interest not managed', 'Whistleblower channel absent', 'Gift and hospitality policy missing'], actions: ['Develop comprehensive code of conduct', 'Implement conflict of interest disclosure', 'Establish whistleblower hotline/channel', 'Create gift and hospitality policy'] }
    };
    const a = areaMap[d.area] || areaMap.labor;
    const riskLevel = d.history === 'serious' ? 'Critical' : d.history === 'fines' ? 'High' : d.lastAudit === 'never' || d.hasOfficer === 'no' ? 'High' : d.history === 'minor' ? 'Medium' : 'Medium';
    const riskClass = riskLevel === 'Critical' ? 'risk-critical' : riskLevel === 'High' ? 'risk-high' : 'risk-medium';

    return `
      <div class="report" id="complianceReport">
        <div class="report-header">
          <h2>Compliance Assessment: ${a.name}</h2>
          <div class="report-meta">
            <span>&#x1F4C5; ${FEOSUtils.formatDate()}</span>
            <span>&#x1F3E2; ${FEOSUtils.escapeHtml(d.companyName)}</span>
            <span class="risk-badge ${riskClass}">${riskLevel} Risk</span>
          </div>
        </div>

        <div class="report-section">
          <h3>&#x1F4CB; Executive Summary</h3>
          <p>The compliance assessment for <strong>${FEOSUtils.escapeHtml(d.companyName)}</strong> in the area of <strong>${a.name}</strong> reveals a <strong>${riskLevel}</strong> compliance risk profile. ${riskLevel === 'Critical' ? 'The organization has a history of serious violations and lacks fundamental compliance infrastructure. Immediate executive intervention and legal counsel engagement are required.' : riskLevel === 'High' ? 'Significant compliance gaps exist that could result in regulatory penalties, operational disruption, or reputational damage within 6-12 months if not addressed.' : 'Moderate compliance gaps are present. While not immediately threatening, proactive remediation is recommended to prevent escalation.'}</p>
        </div>

        <div class="report-section">
          <h3>&#x2696; Applicable Regulations</h3>
          <p><strong>Primary Regulatory Framework:</strong> ${a.regs}</p>
          <p>Compliance with these regulations is ${d.size === 'enterprise' || d.size === 'large' ? 'mandatory and subject to regular regulatory inspection and audit.' : 'legally required and non-compliance exposes the organization to fines, operational suspension, and criminal liability for directors.'}</p>
        </div>

        <div class="report-section">
          <h3>&#x1F50D; Compliance Gap Analysis</h3>
          <table class="report-table">
            <tr><th>#</th><th>Compliance Gap</th><th>Risk Level</th><th>Required Action</th></tr>
            ${a.gaps.map((g, i) => `<tr><td>${i+1}</td><td>${g}</td><td><span class="risk-badge ${riskClass}">${riskLevel}</span></td><td>${a.actions[i] || 'Review and remediate'}</td></tr>`).join('')}
          </table>
        </div>

        <div class="report-section">
          <h3>&#x1F6A8; Risk Assessment</h3>
          <ul>
            <li><strong>Legal Risk:</strong> ${riskLevel === 'Critical' ? 'Directors and commissioners may face criminal liability under applicable laws. Company may face operational suspension.' : riskLevel === 'High' ? 'Significant fines and regulatory sanctions likely. Potential for license revocation in repeated violations.' : 'Regulatory warnings and minor fines possible. Reputational impact manageable.'}</li>
            <li><strong>Financial Risk:</strong> Estimated financial exposure ranges from ${riskLevel === 'Critical' ? 'IDR 500M - 5B+ in fines, penalties, and remediation costs, plus potential revenue loss from operational suspension.' : riskLevel === 'High' ? 'IDR 100M - 500M in fines and remediation costs.' : 'IDR 10M - 100M in fines and compliance improvement costs.'}</li>
            <li><strong>Reputational Risk:</strong> ${riskLevel === 'Critical' ? 'Severe reputational damage with customers, investors, and regulators. Media coverage likely.' : 'Moderate reputational risk affecting customer confidence and talent attraction.'}</li>
            <li><strong>Operational Risk:</strong> ${d.area === 'labor' ? 'Work stoppages, union action, and mass resignation possible.' : d.area === 'tax' ? 'Bank account freezing and asset seizure risk.' : d.area === 'osh' ? 'Workplace accidents with criminal liability for management.' : 'Operational disruption from regulatory enforcement actions.'}</li>
          </ul>
        </div>

        <div class="report-section">
          <h3>&#x1F3AF; Control Recommendations</h3>
          <ul>
            <li><strong>Immediate Controls (0-30 days):</strong> ${d.hasOfficer === 'no' ? 'Appoint compliance officer (dedicated or external consultant). ' : ''}Engage legal counsel for emergency compliance review. Cease any practices identified as non-compliant. Document all remediation actions.</li>
            <li><strong>Short-Term Controls (1-3 months):</strong> Implement compliance monitoring system with monthly reporting to board. Complete gap remediation for highest-risk items. Conduct compliance training for all relevant personnel.</li>
            <li><strong>Long-Term Controls (3-12 months):</strong> Establish internal audit function with compliance audit scope. Implement compliance management system (CMS) with automated tracking. Conduct annual compliance risk assessment. Build compliance culture through leadership modeling and recognition.</li>
          </ul>
        </div>

        <div class="report-section">
          <h3>&#x1F4C5; Action Plan</h3>
          <div class="plan-timeline">
            <div class="plan-phase">
              <div class="plan-phase-marker"><div class="plan-dot"></div><div class="plan-line"></div></div>
              <div class="plan-phase-content">
                <div class="plan-phase-title">Emergency Response (Week 1-2)</div>
                <div class="plan-phase-desc">Board resolution on compliance priority; engage legal counsel; cease non-compliant practices; notify relevant regulators if required by law.</div>
              </div>
            </div>
            <div class="plan-phase">
              <div class="plan-phase-marker"><div class="plan-dot"></div><div class="plan-line"></div></div>
              <div class="plan-phase-content">
                <div class="plan-phase-title">Gap Remediation (Month 1-3)</div>
                <div class="plan-phase-desc">Execute all required actions from gap analysis; update policies and procedures; implement tracking systems; conduct compliance training.</div>
              </div>
            </div>
            <div class="plan-phase">
              <div class="plan-phase-marker"><div class="plan-dot"></div></div>
              <div class="plan-phase-content">
                <div class="plan-phase-title">Sustainability (Month 4-12)</div>
                <div class="plan-phase-desc">Quarterly compliance audits; annual regulatory update review; continuous improvement; embed compliance in organizational culture.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  exportReport() {
    const r = document.getElementById('complianceReport');
    if (r) FEOSUtils.exportToTxt('Compliance_Assessment', r.innerText);
  }
};
window.FEOS_compliance = FEOS_compliance;
