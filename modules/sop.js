/* FEOS SOP Builder */
const FEOS_sop = {
  init() {
    const container = document.getElementById('view-sop');
    if (!container) return;
    container.innerHTML = `
      <div class="module-view-header">
        <h2>SOP Builder</h2>
        <p>Generate professional Standard Operating Procedures with process flows, responsibility matrices, and control points.</p>
      </div>
      <div class="module-layout">
        <div class="form-panel">
          <h3>SOP Parameters</h3>
          <form id="sopForm">
            <div class="form-group">
              <label>Company Name <span class="required">*</span></label>
              <input type="text" name="companyName" class="form-control" placeholder="Company name">
            </div>
            <div class="form-group">
              <label>SOP Title / Process Name <span class="required">*</span></label>
              <input type="text" name="sopTitle" class="form-control" placeholder="e.g., Employee Recruitment Process">
            </div>
            <div class="form-group">
              <label>Department / Function <span class="required">*</span></label>
              <select name="department" class="form-control">
                <option value="">Select Department</option>
                <option value="hr">Human Resources</option>
                <option value="finance">Finance & Accounting</option>
                <option value="operations">Operations / Production</option>
                <option value="sales">Sales & Marketing</option>
                <option value="procurement">Procurement</option>
                <option value="it">IT & Technology</option>
                <option value="quality">Quality Assurance</option>
                <option value="warehouse">Warehouse / Logistics</option>
                <option value="general">General Affairs</option>
              </select>
            </div>
            <div class="form-group">
              <label>SOP Type <span class="required">*</span></label>
              <select name="sopType" class="form-control">
                <option value="">Select Type</option>
                <option value="sop">Standard Operating Procedure</option>
                <option value="wi">Work Instruction</option>
                <option value="form">Form / Template</option>
                <option value="policy">Departmental Policy</option>
              </select>
            </div>
            <div class="form-group">
              <label>Process Description <span class="required">*</span></label>
              <textarea name="description" class="form-control" rows="4" placeholder="Describe the process: what it does, why it exists, key inputs and outputs, current pain points..."></textarea>
            </div>
            <div class="form-group">
              <label>Key Stakeholders / Roles</label>
              <input type="text" name="roles" class="form-control" placeholder="e.g., HR Manager, Department Head, Finance Director">
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>Document Code Prefix</label>
                <input type="text" name="docCode" class="form-control" placeholder="e.g., SOP-HR-001">
              </div>
              <div class="form-group">
                <label>Effective Date</label>
                <input type="date" name="effectiveDate" class="form-control">
              </div>
            </div>
            <button type="button" class="btn btn-primary btn-block" onclick="FEOS_sop.generate()">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
              Generate SOP Document
            </button>
          </form>
        </div>
        <div class="output-panel">
          <div class="output-header">
            <h3><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg> Generated SOP Document</h3>
            <div class="output-actions" id="sopActions" style="display:none">
              <button class="btn btn-secondary btn-sm" onclick="FEOSUtils.printReport('sopReport')">Print</button>
              <button class="btn btn-secondary btn-sm" onclick="FEOS_sop.exportReport()">Export</button>
            </div>
          </div>
          <div class="output-body" id="sopOutput">
            <div class="output-placeholder">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              <h4>SOP Builder Ready</h4>
              <p>Define your process parameters to generate a professional SOP document with full structure, workflow, and control points.</p>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  generate() {
    const v = FEOSUtils.validateForm('sopForm', ['companyName','sopTitle','department','sopType','description']);
    if (!v.valid) { alert('Please complete all required fields: ' + v.missing.join(', ')); return; }
    const d = v.data;
    FEOSUtils.showLoading('sopOutput', 'Generating SOP Document...', 'Building process structure, workflow, and control points');
    setTimeout(() => {
      FEOSUtils.renderReport('sopOutput', this.buildReport(d));
      document.getElementById('sopActions').style.display = 'flex';
    }, 1800);
  },

  buildReport(d) {
    const docCode = d.docCode || `SOP-${d.department.toUpperCase().substring(0,3)}-${String(Math.floor(Math.random()*900)+100)}`;
    const effectiveDate = d.effectiveDate || new Date().toISOString().split('T')[0];
    const deptNames = { hr: 'Human Resources', finance: 'Finance & Accounting', operations: 'Operations', sales: 'Sales & Marketing', procurement: 'Procurement', it: 'IT & Technology', quality: 'Quality Assurance', warehouse: 'Warehouse / Logistics', general: 'General Affairs' };
    const deptName = deptNames[d.department] || d.department;
    const typeNames = { sop: 'Standard Operating Procedure', wi: 'Work Instruction', form: 'Form / Template', policy: 'Departmental Policy' };
    const typeName = typeNames[d.sopType] || d.sopType;

    const steps = this.generateSteps(d.department, d.sopTitle, d.description);

    return `
      <div class="report" id="sopReport">
        <div class="report-header">
          <h2>${FEOSUtils.escapeHtml(d.sopTitle)}</h2>
          <div class="report-meta">
            <span>&#x1F4C5; ${effectiveDate}</span>
            <span>&#x1F3E2; ${FEOSUtils.escapeHtml(d.companyName)}</span>
            <span class="tag">${docCode}</span>
          </div>
        </div>

        <div class="report-section">
          <h3>1. Document Information</h3>
          <table class="report-table">
            <tr><td style="width:30%"><strong>Document Title</strong></td><td>${FEOSUtils.escapeHtml(d.sopTitle)}</td></tr>
            <tr><td><strong>Document Code</strong></td><td>${docCode}</td></tr>
            <tr><td><strong>Document Type</strong></td><td>${typeName}</td></tr>
            <tr><td><strong>Department</strong></td><td>${deptName}</td></tr>
            <tr><td><strong>Effective Date</strong></td><td>${effectiveDate}</td></tr>
            <tr><td><strong>Review Cycle</strong></td><td>Annual (or upon significant process change)</td></tr>
            <tr><td><strong>Classification</strong></td><td>Internal Use - Confidential</td></tr>
          </table>
        </div>

        <div class="report-section">
          <h3>2. Purpose</h3>
          <p>This ${typeName.toLowerCase()} establishes the standardized method for executing <strong>${FEOSUtils.escapeHtml(d.sopTitle)}</strong> within ${FEOSUtils.escapeHtml(d.companyName)}. The purpose is to ensure consistency, quality, compliance, and efficiency in process execution while minimizing operational risk and ensuring accountability.</p>
        </div>

        <div class="report-section">
          <h3>3. Scope</h3>
          <p>This document applies to all personnel involved in the <strong>${FEOSUtils.escapeHtml(d.sopTitle)}</strong> process within the <strong>${deptName}</strong> department and any cross-functional stakeholders. It covers the end-to-end process from initiation through completion, including exception handling and escalation protocols.</p>
        </div>

        <div class="report-section">
          <h3>4. Definitions</h3>
          <ul>
            <li><strong>SOP:</strong> Standard Operating Procedure - a set of step-by-step instructions to help workers carry out routine operations.</li>
            <li><strong>Process Owner:</strong> The individual or role accountable for the design, execution, and continuous improvement of this process.</li>
            <li><strong>Control Point:</strong> A verification step designed to ensure process quality and compliance.</li>
            <li><strong>Escalation:</strong> The process of elevating an issue to a higher authority when predefined thresholds or exceptions are encountered.</li>
          </ul>
        </div>

        <div class="report-section">
          <h3>5. Responsibility Matrix (RACI)</h3>
          <table class="report-table">
            <tr><th>Role</th><th>Responsibility</th><th>Accountability</th><th>Consulted</th><th>Informed</th></tr>
            <tr><td>Process Owner</td><td>Design, monitor, improve</td><td>R, A</td><td>C</td><td>I</td></tr>
            <tr><td>Department Head</td><td>Approve, resource allocation</td><td>A</td><td>C</td><td>I</td></tr>
            <tr><td>Executor</td><td>Execute per SOP</td><td>R</td><td>-</td><td>I</td></tr>
            <tr><td>Quality / Audit</td><td>Verify compliance</td><td>-</td><td>C</td><td>I</td></tr>
            <tr><td>Cross-Functional Stakeholders</td><td>Provide input as needed</td><td>-</td><td>C</td><td>I</td></tr>
          </table>
          <p style="margin-top:8px; font-size:0.8125rem; color:var(--text-muted);"><em>Specific roles: ${d.roles ? FEOSUtils.escapeHtml(d.roles) : 'To be defined based on organizational structure'}</em></p>
        </div>

        <div class="report-section">
          <h3>6. Procedure</h3>
          ${steps.map((step, i) => `
            <div style="margin-bottom:16px; padding:14px; background:var(--bg-tertiary); border-radius:var(--radius-md); border-left:3px solid var(--accent-gold);">
              <div style="font-weight:600; color:var(--accent-gold); margin-bottom:6px;">Step ${i+1}: ${step.title}</div>
              <div style="color:var(--text-secondary); font-size:0.9375rem; line-height:1.6;">${step.desc}</div>
              ${step.control ? `<div style="margin-top:8px; padding:8px 12px; background:rgba(16,185,129,0.1); border-radius:var(--radius-sm); border:1px solid rgba(16,185,129,0.2); color:var(--accent-green); font-size:0.8125rem;"><strong>Control Point:</strong> ${step.control}</div>` : ''}
            </div>
          `).join('')}
        </div>

        <div class="report-section">
          <h3>7. Workflow</h3>
          <p><strong>Process Flow:</strong> Initiation &rarr; ${steps.map(s => s.title).join(' &rarr; ')} &rarr; Completion &rarr; Documentation &rarr; Review</p>
          <p><strong>Decision Points:</strong> Each step contains defined criteria for proceed, rework, or escalate. Escalation triggers are: (a) exception beyond authority limit, (b) quality failure at control point, (c) timeline breach, (d) resource unavailability.</p>
        </div>

        <div class="report-section">
          <h3>8. Control Points</h3>
          <ul>
            <li><strong>Input Control:</strong> All inputs to the process are verified for completeness, accuracy, and authorization before processing begins.</li>
            <li><strong>In-Process Control:</strong> Quality checks at each major step to prevent error propagation.</li>
            <li><strong>Output Control:</strong> Final deliverables are verified against acceptance criteria before handoff.</li>
            <li><strong>Documentation Control:</strong> All process records are maintained per document retention policy with audit trail.</li>
          </ul>
        </div>

        <div class="report-section">
          <h3>9. KPI Measurement</h3>
          <table class="report-table">
            <tr><th>KPI</th><th>Target</th><th>Measurement Method</th><th>Frequency</th></tr>
            <tr><td>Process Cycle Time</td><td>Within defined SLA</td><td>Timestamp tracking</td><td>Per transaction</td></tr>
            <tr><td>Error / Rework Rate</td><td>&lt; 2%</td><td>Quality audit</td><td>Monthly</td></tr>
            <tr><td>Compliance Rate</td><td>100%</td><td>SOP adherence audit</td><td>Quarterly</td></tr>
            <tr><td>Stakeholder Satisfaction</td><td>&gt; 80%</td><td>Survey</td><td>Quarterly</td></tr>
          </table>
        </div>

        <div class="report-section">
          <h3>10. Revision History</h3>
          <table class="report-table">
            <tr><th>Version</th><th>Date</th><th>Changes</th><th>Approved By</th></tr>
            <tr><td>1.0</td><td>${effectiveDate}</td><td>Initial release</td><td>[Department Head]</td></tr>
          </table>
        </div>
      </div>
    `;
  },

  generateSteps(dept, title, desc) {
    const commonSteps = [
      { title: 'Process Initiation & Request Validation', desc: 'Receive and validate the request or trigger for this process. Verify completeness of required information, authorization level, and alignment with applicable policies. Log the request in the tracking system with unique reference number.', control: 'Verify all mandatory fields are completed; confirm requestor has authority to initiate.' },
      { title: 'Information Gathering & Analysis', desc: 'Collect all necessary data, documents, and stakeholder inputs required for process execution. Conduct preliminary analysis to identify any anomalies, risks, or special handling requirements.', control: 'Cross-check data accuracy against source documents; flag inconsistencies for resolution.' },
      { title: 'Execution & Processing', desc: 'Perform the core process activities per defined standards and specifications. Apply technical expertise and judgment within authorized parameters. Document all actions taken and decisions made.', control: 'Mid-process quality check: verify outputs against standards at 50% completion milestone.' },
      { title: 'Review & Approval', desc: 'Submit outputs for review by designated authority. Address any feedback or correction requests. Obtain formal sign-off before proceeding to completion.', control: 'Approval authority must verify compliance with all requirements before sign-off.' },
      { title: 'Completion & Handover', desc: 'Finalize all deliverables, update systems and records, communicate completion to stakeholders, and archive documentation per retention policy. Close the process record.', control: 'Final verification checklist: deliverables complete, records updated, stakeholders notified.' }
    ];
    return commonSteps;
  },

  exportReport() {
    const r = document.getElementById('sopReport');
    if (r) FEOSUtils.exportToTxt('SOP_Document', r.innerText);
  }
};
window.FEOS_sop = FEOS_sop;
