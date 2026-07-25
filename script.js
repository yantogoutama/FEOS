/* ============================================
   FORISA EXECUTIVE OPERATING SYSTEM (FEOS)
   Main Application Script
   Version 1.0
   ============================================ */

const FEOS = {
  currentView: 'dashboard',
  modules: {},

  init() {
    this.updateDate();
    this.initModules();
    this.handleResize();
    window.addEventListener('resize', () => this.handleResize());
    document.getElementById('sidebarOverlay').addEventListener('click', () => this.closeSidebar());
  },

  updateDate() {
    const el = document.getElementById('lastUpdated');
    if (el) {
      const now = new Date();
      el.textContent = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
  },

  initModules() {
    const moduleList = ['diagnostic', 'strategy', 'governance', 'hr', 'compliance', 
                        'risk', 'sop', 'kpi', 'policy', 'decision', 'news'];
    moduleList.forEach(key => {
      if (window[`FEOS_${key}`]) {
        this.modules[key] = window[`FEOS_${key}`];
        this.modules[key].init();
      }
    });
  },

  navigate(view) {
    this.currentView = view;

    // Update sidebar
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.toggle('active', item.dataset.view === view);
    });

    // Update views
    document.querySelectorAll('.module-view').forEach(v => v.classList.remove('active'));
    const targetView = document.getElementById(`view-${view}`);
    if (targetView) targetView.classList.add('active');

    // Update page title
    const titles = {
      dashboard: { title: 'Executive Dashboard', subtitle: 'Executive Intelligence Platform for Building Scalable Organizations' },
      diagnostic: { title: 'Executive Diagnostic', subtitle: 'Organizational Health & Management Maturity Assessment' },
      strategy: { title: 'Strategy Advisor', subtitle: 'Strategic Planning & Business Transformation Analysis' },
      governance: { title: 'Governance Advisor', subtitle: 'Corporate Governance & Board Effectiveness' },
      hr: { title: 'HR Business Advisor', subtitle: 'Strategic Human Capital & Organization Design' },
      compliance: { title: 'Compliance Advisor', subtitle: 'Regulatory Compliance & Ethical Standards' },
      risk: { title: 'Risk Advisor', subtitle: 'Enterprise Risk Management & Mitigation' },
      sop: { title: 'SOP Builder', subtitle: 'Standard Operating Procedure Generator' },
      kpi: { title: 'KPI Builder', subtitle: 'Performance Measurement & Balanced Scorecard' },
      policy: { title: 'Policy Builder', subtitle: 'Corporate Policy & Governance Framework' },
      decision: { title: 'Decision Assistant', subtitle: 'Executive Decision Intelligence & Analysis' },
      news: { title: 'Executive News Intelligence', subtitle: 'Strategic Business Intelligence Briefing' }
    };

    const info = titles[view] || titles.dashboard;
    document.getElementById('pageTitle').textContent = info.title;
    document.getElementById('pageSubtitle').textContent = info.subtitle;

    // Close sidebar on mobile
    this.closeSidebar();

    // Scroll to top
    document.getElementById('contentArea').scrollTop = 0;
  },

  toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    sidebar.classList.toggle('open');
    overlay.classList.toggle('active');
  },

  closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
  },

  handleResize() {
    if (window.innerWidth > 768) {
      this.closeSidebar();
    }
  }
};

/* ============================================
   UTILITY FUNCTIONS
   ============================================ */

const FEOSUtils = {
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  },

  formatDate(date = new Date()) {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
    });
  },

  generateId() {
    return 'FEOS-' + Date.now().toString(36).toUpperCase();
  },

  showLoading(containerId, text = 'Analyzing...', subtext = 'Processing executive intelligence') {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = `
      <div class="loading-state">
        <div class="loading-spinner"></div>
        <div class="loading-text">${this.escapeHtml(text)}</div>
        <div class="loading-subtext">${this.escapeHtml(subtext)}</div>
      </div>
    `;
  },

  renderReport(containerId, reportHtml) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = reportHtml;
  },

  getFormData(formId) {
    const form = document.getElementById(formId);
    if (!form) return {};
    const data = {};
    form.querySelectorAll('input, select, textarea').forEach(el => {
      if (el.name) data[el.name] = el.value.trim();
    });
    return data;
  },

  validateForm(formId, requiredFields) {
    const data = this.getFormData(formId);
    const missing = requiredFields.filter(f => !data[f] || data[f] === '');
    return { valid: missing.length === 0, missing, data };
  },

  printReport(reportId) {
    const report = document.getElementById(reportId);
    if (!report) return;
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html><head><title>FORISA Executive Report</title>
      <style>
        body { font-family: 'Inter', sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 800px; margin: 40px auto; padding: 20px; }
        h1 { color: #1a1a1a; border-bottom: 2px solid #c9a96e; padding-bottom: 10px; }
        h2 { color: #333; margin-top: 30px; font-size: 1.2rem; }
        h3 { color: #555; font-size: 1rem; margin-top: 20px; }
        p { color: #444; }
        ul { padding-left: 20px; }
        li { margin-bottom: 6px; color: #444; }
        table { width: 100%; border-collapse: collapse; margin: 15px 0; font-size: 0.9rem; }
        th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
        th { background: #f5f5f5; font-weight: 600; }
        .meta { color: #888; font-size: 0.85rem; margin-bottom: 20px; }
        .badge { display: inline-block; padding: 3px 10px; border-radius: 12px; font-size: 0.75rem; font-weight: 600; }
        .badge-critical { background: #fee; color: #c00; }
        .badge-high { background: #fff3e0; color: #e65100; }
        .badge-medium { background: #e3f2fd; color: #1565c0; }
        .badge-low { background: #e8f5e9; color: #2e7d32; }
        @media print { body { margin: 0; } }
      </style></head><body>
      <div style="text-align:center; margin-bottom:30px;">
        <h1 style="border:none; margin-bottom:5px;">FORISA IMPACT</h1>
        <p style="color:#888; font-size:0.9rem;">Executive Operating System | Confidential Advisory Report</p>
      </div>
      ${report.innerHTML}
      <div style="margin-top:40px; padding-top:20px; border-top:1px solid #ddd; text-align:center; color:#888; font-size:0.8rem;">
        Generated by FORISA Executive Operating System v1.0 | For Internal Use Only
      </div>
      </body></html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => printWindow.print(), 500);
  },

  exportToTxt(title, content) {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `FEOS_${title.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
};

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => FEOS.init());
