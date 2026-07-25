/* FEOS Executive News Intelligence */
const FEOS_news = {
  init() {
    const container = document.getElementById('view-news');
    if (!container) return;
    container.innerHTML = `
      <div class="module-view-header">
        <h2>Executive News Intelligence</h2>
        <p>Strategic business intelligence on global economy, Indonesia market, regulations, technology trends, and ESG developments.</p>
      </div>
      <div class="module-layout">
        <div class="form-panel">
          <h3>Briefing Preferences</h3>
          <form id="newsForm">
            <div class="form-group">
              <label>Company Name <span class="required">*</span></label>
              <input type="text" name="companyName" class="form-control" placeholder="Company name">
            </div>
            <div class="form-group">
              <label>Industry Focus <span class="required">*</span></label>
              <select name="industry" class="form-control">
                <option value="">Select Industry</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="technology">Technology & Digital</option>
                <option value="retail">Retail & Consumer</option>
                <option value="finance">Financial Services</option>
                <option value="construction">Construction & Property</option>
                <option value="energy">Energy & Resources</option>
                <option value="healthcare">Healthcare & Pharma</option>
                <option value="logistics">Logistics & Transportation</option>
                <option value="general">General Business</option>
              </select>
            </div>
            <div class="form-group">
              <label>Areas of Interest <span class="required">*</span></label>
              <div style="display:flex; flex-direction:column; gap:8px; margin-top:8px;">
                <label style="display:flex; align-items:center; gap:8px; font-weight:400; color:var(--text-secondary); cursor:pointer;">
                  <input type="checkbox" name="interest" value="economy" checked style="accent-color:var(--accent-gold);"> Global & Indonesia Economy
                </label>
                <label style="display:flex; align-items:center; gap:8px; font-weight:400; color:var(--text-secondary); cursor:pointer;">
                  <input type="checkbox" name="interest" value="regulation" checked style="accent-color:var(--accent-gold);"> Regulations & Policy
                </label>
                <label style="display:flex; align-items:center; gap:8px; font-weight:400; color:var(--text-secondary); cursor:pointer;">
                  <input type="checkbox" name="interest" value="technology" checked style="accent-color:var(--accent-gold);"> Technology & Innovation
                </label>
                <label style="display:flex; align-items:center; gap:8px; font-weight:400; color:var(--text-secondary); cursor:pointer;">
                  <input type="checkbox" name="interest" value="industry" checked style="accent-color:var(--accent-gold);"> Industry Trends
                </label>
                <label style="display:flex; align-items:center; gap:8px; font-weight:400; color:var(--text-secondary); cursor:pointer;">
                  <input type="checkbox" name="interest" value="esg" style="accent-color:var(--accent-gold);"> ESG & Sustainability
                </label>
                <label style="display:flex; align-items:center; gap:8px; font-weight:400; color:var(--text-secondary); cursor:pointer;">
                  <input type="checkbox" name="interest" value="governance" style="accent-color:var(--accent-gold);"> Corporate Governance
                </label>
              </div>
            </div>
            <div class="form-group">
              <label>Briefing Focus</label>
              <select name="focus" class="form-control">
                <option value="comprehensive">Comprehensive Executive Brief</option>
                <option value="strategic">Strategic Implications Only</option>
                <option value="risk">Risk-Focused Alert</option>
                <option value="opportunity">Opportunity-Focused</option>
              </select>
            </div>
            <button type="button" class="btn btn-primary btn-block" onclick="FEOS_news.generate()">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
              Generate Executive Daily Brief
            </button>
          </form>
        </div>
        <div class="output-panel">
          <div class="output-header">
            <h3><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6Z"/></svg> FORISA Executive Daily Brief</h3>
            <div class="output-actions" id="newsActions" style="display:none">
              <button class="btn btn-secondary btn-sm" onclick="FEOSUtils.printReport('newsReport')">Print</button>
              <button class="btn btn-secondary btn-sm" onclick="FEOS_news.exportReport()">Export</button>
            </div>
          </div>
          <div class="output-body" id="newsOutput">
            <div class="output-placeholder">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6Z"/></svg>
              <h4>Executive Briefing Ready</h4>
              <p>Select your industry and areas of interest to generate a strategic executive intelligence briefing with market impact and recommended actions.</p>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  generate() {
    const v = FEOSUtils.validateForm('newsForm', ['companyName','industry']);
    if (!v.valid) { alert('Please complete all required fields: ' + v.missing.join(', ')); return; }
    const d = v.data;
    const interests = Array.from(document.querySelectorAll('#newsForm input[name="interest"]:checked')).map(cb => cb.value);
    if (interests.length === 0) { alert('Please select at least one area of interest'); return; }
    FEOSUtils.showLoading('newsOutput', 'Compiling Executive Intelligence...', 'Analyzing market signals and strategic implications');
    setTimeout(() => {
      FEOSUtils.renderReport('newsOutput', this.buildReport(d, interests));
      document.getElementById('newsActions').style.display = 'flex';
    }, 2000);
  },

  buildReport(d, interests) {
    const focus = d.focus || 'comprehensive';
    const dateStr = FEOSUtils.formatDate();

    return `
      <div class="report" id="newsReport">
        <div class="report-header">
          <h2>FORISA Executive Daily Brief</h2>
          <div class="report-meta">
            <span>&#x1F4C5; ${dateStr}</span>
            <span>&#x1F3E2; ${FEOSUtils.escapeHtml(d.companyName)}</span>
            <span class="tag">${d.industry.toUpperCase()}</span>
          </div>
          <div style="margin-top:8px; font-size:0.875rem; color:var(--text-muted);">Confidential - Executive Use Only</div>
        </div>

        <div class="report-section">
          <h3>&#x1F4CB; Executive Summary</h3>
          <p>This Executive Daily Brief provides strategic intelligence for <strong>${FEOSUtils.escapeHtml(d.companyName)}</strong> across selected focus areas: <strong>${interests.map(i => this.interestLabel(i)).join(', ')}</strong>. The briefing synthesizes current market developments, regulatory signals, and competitive dynamics relevant to the ${d.industry} sector in Indonesia and globally. Key themes include ${this.getKeyThemes(d.industry, interests)}.</p>
        </div>

        ${interests.includes('economy') ? `
        <div class="report-section">
          <h3>&#x1F4C8; Global & Indonesia Economy</h3>
          <p><strong>Global Macro:</strong> ${this.getGlobalEconomy(d.industry)}</p>
          <p><strong>Indonesia Economy:</strong> ${this.getIndonesiaEconomy(d.industry)}</p>
          <p><strong>Market Impact:</strong> ${this.getEconomyImpact(d.industry)}</p>
          <p><strong>Strategic Implication:</strong> ${this.getEconomyImplication(d.industry)}</p>
        </div>
        ` : ''}

        ${interests.includes('regulation') ? `
        <div class="report-section">
          <h3>&#x1F4C4; Regulations & Policy</h3>
          <p><strong>Key Regulatory Developments:</strong></p>
          <ul>
            ${this.getRegulations(d.industry).map(r => `<li>${r}</li>`).join('')}
          </ul>
          <p><strong>Compliance Implications:</strong> ${this.getRegulationImpact(d.industry)}</p>
          <p><strong>Recommended Executive Attention:</strong> ${this.getRegulationAction(d.industry)}</p>
        </div>
        ` : ''}

        ${interests.includes('technology') ? `
        <div class="report-section">
          <h3>&#x1F4BB; Technology & Innovation</h3>
          <p><strong>Emerging Technology Trends:</strong></p>
          <ul>
            ${this.getTechnology(d.industry).map(t => `<li>${t}</li>`).join('')}
          </ul>
          <p><strong>Strategic Implication:</strong> ${this.getTechImplication(d.industry)}</p>
          <p><strong>Recommended Executive Attention:</strong> ${this.getTechAction(d.industry)}</p>
        </div>
        ` : ''}

        ${interests.includes('industry') ? `
        <div class="report-section">
          <h3>&#x1F3ED; Industry Trends</h3>
          <p><strong>${d.industry.charAt(0).toUpperCase() + d.industry.slice(1)} Sector Developments:</strong></p>
          <ul>
            ${this.getIndustryTrends(d.industry).map(t => `<li>${t}</li>`).join('')}
          </ul>
          <p><strong>Competitive Dynamics:</strong> ${this.getCompetitiveDynamics(d.industry)}</p>
          <p><strong>Strategic Implication:</strong> ${this.getIndustryImplication(d.industry)}</p>
        </div>
        ` : ''}

        ${interests.includes('esg') ? `
        <div class="report-section">
          <h3>&#x1F331; ESG & Sustainability</h3>
          <p><strong>ESG Developments:</strong></p>
          <ul>
            ${this.getESG(d.industry).map(e => `<li>${e}</li>`).join('')}
          </ul>
          <p><strong>Strategic Implication:</strong> ${this.getESGImplication(d.industry)}</p>
          <p><strong>Recommended Executive Attention:</strong> ${this.getESGAction(d.industry)}</p>
        </div>
        ` : ''}

        ${interests.includes('governance') ? `
        <div class="report-section">
          <h3>&#x2696; Corporate Governance</h3>
          <p><strong>Governance Developments:</strong></p>
          <ul>
            <li>OJK continues to strengthen corporate governance requirements for publicly listed companies with updated POJK on board independence and audit committee composition.</li>
            <li>Increased shareholder activism in Indonesia, particularly around ESG disclosures and executive compensation.</li>
            <li>Regulatory push for enhanced whistleblower protection and anonymous reporting mechanisms.</li>
            <li>Board diversity requirements under discussion for large-cap listed companies.</li>
          </ul>
          <p><strong>Strategic Implication:</strong> Organizations should proactively enhance governance frameworks ahead of regulatory mandates. Early adopters of best-practice governance will attract institutional investment and reduce compliance costs.</p>
          <p><strong>Recommended Executive Attention:</strong> Conduct governance gap assessment against OJK requirements and international standards (OECD). Prepare for enhanced disclosure requirements. Strengthen board evaluation processes.</p>
        </div>
        ` : ''}

        <div class="report-section">
          <h3>&#x1F3AF; Recommended Executive Actions</h3>
          <ul>
            <li><strong>This Week:</strong> Review briefing with executive team; identify immediate actions required; assign owners for follow-up.</li>
            <li><strong>This Month:</strong> Integrate intelligence into strategic planning cycle; update risk register; brief board on material developments.</li>
            <li><strong>This Quarter:</strong> Conduct deep-dive analysis on highest-impact trends; evaluate strategic pivot requirements; assess competitive response needs.</li>
          </ul>
        </div>

        <div class="report-section">
          <h3>&#x1F4C5; Intelligence Methodology</h3>
          <p style="font-size:0.875rem; color:var(--text-muted);">This briefing is generated based on FORISA Executive Operating System intelligence frameworks. For real-time news integration, connect FEOS to your preferred news API (Bloomberg, Reuters, Kontan, Bisnis Indonesia) for live data feeds. Current briefing reflects synthesized strategic intelligence as of ${dateStr}.</p>
        </div>
      </div>
    `;
  },

  interestLabel(i) {
    const labels = { economy: 'Economy', regulation: 'Regulations', technology: 'Technology', industry: 'Industry Trends', esg: 'ESG', governance: 'Governance' };
    return labels[i] || i;
  },

  getKeyThemes(industry, interests) {
    const themes = {
      manufacturing: 'supply chain resilience, automation adoption, and export market dynamics',
      technology: 'AI regulation, digital infrastructure investment, and talent scarcity',
      retail: 'omnichannel transformation, consumer behavior shifts, and margin pressure',
      finance: 'interest rate trajectory, digital banking competition, and regulatory capital requirements',
      construction: 'infrastructure spending, material cost volatility, and sustainability mandates',
      energy: 'energy transition, renewable investment, and regulatory framework evolution',
      healthcare: 'digital health adoption, regulatory approval pathways, and pharmaceutical pricing',
      logistics: 'supply chain digitization, fuel cost management, and last-mile innovation',
      general: 'economic resilience, digital transformation, and regulatory adaptation'
    };
    return themes[industry] || themes.general;
  },

  getGlobalEconomy(industry) {
    return 'Global economic indicators show mixed signals with moderating inflation in major economies but persistent geopolitical risks affecting trade flows. The US Federal Reserve maintains a data-dependent stance on interest rates. China's economic recovery remains uneven, impacting commodity demand and manufacturing supply chains. ASEAN continues to demonstrate relative resilience with strong FDI inflows.';
  },

  getIndonesiaEconomy(industry) {
    return 'Indonesia's GDP growth remains robust at approximately 5% annually, supported by domestic consumption and infrastructure investment. Inflation is within BI target range. The rupiah has shown stability against major currencies. Government continues to prioritize downstream industrialization, digital economy development, and MSME empowerment. Tax reform and ease-of-business initiatives are ongoing.';
  },

  getEconomyImpact(industry) {
    const impacts = {
      manufacturing: 'Input cost pressures from commodity volatility; export demand sensitivity to global slowdown; opportunity from downstream industrialization policies.',
      technology: 'Strong domestic demand for digital services; favorable regulatory environment for tech investment; talent competition intensifying.',
      retail: 'Consumer spending resilient but shifting toward value and digital channels; inflation impact on purchasing power varies by segment.',
      finance: 'Interest rate environment supporting net interest margins; credit growth healthy; digital disruption accelerating competitive pressure.',
      construction: 'Government infrastructure budget execution critical; private sector investment recovering; material cost stabilization supporting margins.',
      energy: 'Energy transition creating investment opportunities; fossil fuel demand remaining strong in near term; renewable project pipeline expanding.',
      healthcare: 'Aging population and NHI expansion driving demand; pharmaceutical import dependency creating supply risk; digital health investment accelerating.',
      logistics: 'E-commerce growth sustaining logistics demand; infrastructure improvements reducing transit times; fuel cost volatility affecting margins.',
      general: 'Overall business environment supportive with manageable risks. Organizations should optimize working capital and maintain operational flexibility.'
    };
    return impacts[industry] || impacts.general;
  },

  getEconomyImplication(industry) {
    return 'Organizations should maintain scenario-based planning with base, optimistic, and pessimistic economic assumptions. Build operational flexibility to adapt to demand fluctuations. Prioritize cash flow management and working capital optimization. Consider hedging strategies for currency and commodity exposure.';
  },

  getRegulations(industry) {
    const regs = {
      manufacturing: ['UU Cipta Kerja implementation continues with ongoing derivative regulations affecting labor practices.', 'Environmental regulations (AMDAL/UKL-UPL) becoming more stringent for manufacturing operations.', 'Import duty and VAT regulations affecting raw material sourcing strategies.', 'Industrial standards (SNI) enforcement expanding to additional product categories.'],
      technology: ['UU PDP (Personal Data Protection) enforcement timeline and implementation guidance being finalized.', 'Digital platform regulations (PSE) requiring registration and compliance.', 'Taxation of digital transactions and e-commerce under continuous refinement.', 'AI governance framework under development by Kominfo and relevant ministries.'],
      retail: ['Consumer protection regulations strengthening around product safety and labeling.', 'E-commerce regulations affecting marketplace operations and seller accountability.', 'Halal certification requirements expanding to additional product categories.', 'Packaging and waste management regulations creating compliance obligations.'],
      finance: ['OJK regulations on digital banking, peer-to-peer lending, and insurance technology evolving rapidly.', 'POJK on corporate governance and risk management being updated for listed companies.', 'Anti-money laundering (APUPPT) requirements intensifying for financial institutions.', 'Sustainable finance regulations (POJK) requiring ESG integration in lending and investment.'],
      construction: ['Building code and safety regulations being updated post-major incidents.', 'Environmental impact assessment requirements for large projects becoming more rigorous.', 'Public-private partnership (KPBU) regulatory framework being streamlined.', 'Property tax and land acquisition regulations affecting development timelines.'],
      energy: ['New and Renewable Energy (EBT) regulations providing incentives for renewable projects.', 'Carbon pricing mechanism under discussion with potential implementation timeline.', 'Mining regulations (Minerba) affecting coal and mineral operations.', 'Electric vehicle ecosystem regulations supporting charging infrastructure development.'],
      healthcare: ['BPJS Kesehatan reimbursement rates and formulary updates affecting pharmaceutical companies.', 'Medical device registration and import regulations being harmonized with ASEAN standards.', 'Digital health regulations enabling telemedicine and health tech innovation.', 'Pharmaceutical pricing controls and generic drug policies affecting market dynamics.'],
      logistics: ['Road transport regulations affecting fleet operations and driver welfare.', 'Customs and import/export procedures being digitized under INSW platform.', 'Logistics infrastructure regulations supporting multimodal transport development.', 'Environmental regulations affecting fleet emissions and fuel standards.'],
      general: ['UU Cipta Kerja continues to shape labor market dynamics.', 'Tax regulations (HPP Law) affecting corporate and individual taxpayers.', 'Investment regulations (BKPM) streamlining licensing for foreign and domestic investors.', 'Competition law (UU Persaingan Usaha) enforcement increasing.']
    };
    return regs[industry] || regs.general;
  },

  getRegulationImpact(industry) {
    return 'Regulatory compliance costs are increasing across sectors. Organizations must invest in compliance infrastructure, legal advisory, and staff training. Non-compliance exposure includes financial penalties, operational suspension, and reputational damage. Proactive regulatory engagement reduces compliance cost and positions the organization favorably with regulators.';
  },

  getRegulationAction(industry) {
    return 'Establish regulatory monitoring system with quarterly regulatory update briefings. Engage industry associations for collective regulatory advocacy. Conduct compliance gap assessment against new and pending regulations. Build relationships with relevant ministries and regulatory bodies.';
  },

  getTechnology(industry) {
    const tech = {
      manufacturing: ['Industry 4.0 adoption accelerating with IoT, predictive maintenance, and digital twins.', 'AI-powered quality control and defect detection reducing waste and improving yield.', 'Additive manufacturing (3D printing) enabling rapid prototyping and customized production.', 'Robotic process automation (RPA) streamlining administrative and operational processes.'],
      technology: ['Generative AI transforming software development, customer service, and content creation.', 'Cloud-native architecture becoming standard for scalability and resilience.', 'Edge computing enabling real-time processing for IoT and autonomous systems.', 'Quantum computing emerging with long-term implications for cryptography and optimization.'],
      retail: ['AI-driven personalization and recommendation engines increasing conversion rates.', 'Omnichannel inventory management integrating online and offline stock visibility.', 'Cashier-less stores and automated checkout reducing labor costs.', 'Blockchain for supply chain transparency and product authenticity verification.'],
      finance: ['Open banking APIs enabling fintech collaboration and embedded finance.', 'AI-powered credit scoring and fraud detection improving risk management.', 'Blockchain and distributed ledger technology for settlement and clearing.', 'Robo-advisory and algorithmic trading democratizing investment access.'],
      construction: ['BIM (Building Information Modeling) becoming standard for project planning and execution.', 'Drones and IoT sensors for site monitoring and safety management.', 'Prefabrication and modular construction reducing timelines and waste.', 'Digital twins for facility management and predictive maintenance.'],
      energy: ['Smart grid technology enabling distributed energy resource integration.', 'Battery storage technology advancing with declining costs.', 'Hydrogen economy emerging as long-term decarbonization pathway.', 'Digital oilfield technology optimizing extraction and reducing environmental impact.'],
      healthcare: ['Telemedicine and remote patient monitoring expanding access and reducing costs.', 'AI in diagnostics and drug discovery accelerating medical innovation.', 'Wearable health devices generating real-time patient data.', 'Blockchain for pharmaceutical supply chain integrity and clinical trial transparency.'],
      logistics: ['Autonomous vehicles and drones for last-mile delivery under pilot programs.', 'Blockchain for supply chain transparency and smart contracts.', 'Predictive analytics for demand forecasting and route optimization.', 'Warehouse robotics and automated sorting systems improving throughput.'],
      general: ['Generative AI adoption accelerating across all business functions.', 'Cloud migration continuing with hybrid and multi-cloud strategies.', 'Cybersecurity threats evolving requiring zero-trust architecture.', 'Data analytics and business intelligence becoming core competitive capabilities.']
    };
    return tech[industry] || tech.general;
  },

  getTechImplication(industry) {
    return 'Technology is no longer a support function but a core competitive differentiator. Organizations that fail to digitize operations, adopt AI, and build data capabilities will face existential competitive pressure within 3-5 years. Technology investment must be strategic, not experimental, with clear ROI and business outcome linkages.';
  },

  getTechAction(industry) {
    return 'Develop 3-year digital transformation roadmap with board approval. Prioritize high-ROI technology investments aligned with strategic objectives. Build internal digital capabilities or establish strategic technology partnerships. Implement cybersecurity framework (ISO 27001) as foundational requirement.';
  },

  getIndustryTrends(industry) {
    const trends = {
      manufacturing: ['Reshoring and nearshoring trends affecting global supply chain configurations.', 'Circular economy principles driving sustainable manufacturing practices.', 'Customization and mass personalization becoming competitive requirements.', 'Skills gap in advanced manufacturing requiring workforce development investment.'],
      technology: ['Platform economy consolidation with winner-take-most dynamics.', 'Regulatory fragmentation across jurisdictions creating compliance complexity.', 'Talent war for AI/ML engineers and data scientists intensifying globally.', 'Tech valuation corrections creating acquisition opportunities for strategic buyers.'],
      retail: ['Experience-driven retail replacing transactional shopping.', 'Social commerce and live streaming emerging as major sales channels.', 'Private label and direct-to-consumer brands challenging established players.', 'Sustainability and ethical sourcing becoming purchase decision factors.'],
      finance: ['Embedded finance integrating financial services into non-financial platforms.', 'Neobanks and digital lenders challenging traditional branch-based models.', 'Wealth management democratization through micro-investment platforms.', 'Climate finance and green bonds experiencing rapid growth.'],
      construction: ['Sustainable and green building certifications becoming market requirements.', 'Modular and prefabricated construction reducing project timelines.', 'Smart building technology integrating IoT, AI, and energy management.', 'Workforce aging and shortage driving automation and robotics adoption.'],
      energy: ['Energy transition accelerating with policy support and investor pressure.', 'Distributed energy resources (DER) challenging centralized utility models.', 'Corporate PPAs for renewable energy becoming standard practice.', 'Carbon capture and storage (CCS) gaining traction as transition technology.'],
      healthcare: ['Value-based care models replacing fee-for-service in some segments.', 'Preventive health and wellness becoming core healthcare strategy.', 'Biosimilars and generic competition pressuring pharmaceutical pricing.', 'Medical tourism and cross-border healthcare creating new market dynamics.'],
      logistics: ['Same-day and next-day delivery becoming baseline customer expectation.', 'Sustainable logistics (green fleets, carbon offsetting) gaining importance.', 'Collaborative logistics and shared warehousing optimizing asset utilization.', 'Real-time visibility and predictive ETA becoming competitive requirements.'],
      general: ['Customer experience becoming primary competitive differentiator.', 'Agile organizational models replacing traditional hierarchies.', 'Sustainability integration across value chains becoming mandatory.', 'Remote and hybrid work models reshaping workplace and talent strategies.']
    };
    return trends[industry] || trends.general;
  },

  getCompetitiveDynamics(industry) {
    return 'Competition is intensifying across all sectors with new entrants leveraging technology, capital, and agility to challenge incumbents. Market consolidation is accelerating as scale becomes critical for efficiency and investment capacity. Organizations must continuously scan competitive landscape, benchmark capabilities, and adapt strategies to maintain or improve market position.';
  },

  getIndustryImplication(industry) {
    return 'Industry boundaries are blurring as technology enables cross-sector competition. Organizations must define their competitive arena broadly, monitoring not just traditional competitors but also tech-enabled disruptors and adjacent market entrants. Strategic partnerships and ecosystem participation may be as important as organic capability building.';
  },

  getESG(industry) {
    const esg = {
      manufacturing: ['Carbon footprint reduction targets becoming customer and investor requirements.', 'Circular economy practices (waste reduction, recycling, remanufacturing) gaining traction.', 'Supply chain ESG audits expanding to tier-2 and tier-3 suppliers.', 'Water stewardship and resource efficiency under increasing scrutiny.'],
      technology: ['Data center energy consumption and carbon footprint under ESG spotlight.', 'E-waste management and responsible disposal requirements increasing.', 'Digital inclusion and accessibility becoming social responsibility priorities.', 'AI ethics and algorithmic bias emerging as governance concerns.'],
      retail: ['Sustainable packaging regulations and consumer preferences driving change.', 'Ethical sourcing and fair trade becoming brand differentiation factors.', 'Food waste reduction and redistribution programs expanding.', 'Diversity, equity, and inclusion in marketing and workforce.'],
      finance: ['Sustainable finance taxonomy guiding investment and lending decisions.', 'Climate risk stress testing becoming regulatory requirement.', 'Green bonds and sustainability-linked loans experiencing rapid growth.', 'ESG ratings and disclosures influencing capital access and cost.'],
      construction: ['Green building certifications (GBC Indonesia, LEED) becoming standard.', 'Embodied carbon in construction materials under increasing scrutiny.', 'Sustainable urban development and climate-resilient infrastructure priorities.', 'Worker safety and welfare in supply chain ESG assessments.'],
      energy: ['Net-zero commitments driving strategic portfolio transformation.', 'Just transition considerations for fossil fuel-dependent communities.', 'Biodiversity impact assessment for new energy projects.', 'Community engagement and benefit-sharing for renewable projects.'],
      healthcare: ['Access to affordable healthcare as social responsibility priority.', 'Sustainable healthcare waste management and pharmaceutical disposal.', 'Clinical trial diversity and equitable access to medical innovations.', 'Healthcare worker wellbeing and mental health support.'],
      logistics: ['Fleet electrification and alternative fuels for decarbonization.', 'Sustainable packaging and reverse logistics for circular economy.', 'Last-mile delivery optimization reducing emissions and congestion.', 'Driver welfare and fair labor practices in logistics supply chain.'],
      general: ['TCFD-aligned climate disclosures becoming expectation for large companies.', 'Biodiversity and nature-related financial disclosures (TNFD) emerging.', 'Social license to operate increasingly dependent on community engagement.', 'Board diversity and executive compensation ESG linkages expanding.']
    };
    return esg[industry] || esg.general;
  },

  getESGImplication(industry) {
    return 'ESG is transitioning from compliance obligation to competitive advantage and risk management imperative. Organizations with strong ESG credentials access lower-cost capital, attract talent, and build stakeholder trust. ESG integration must be authentic, measurable, and aligned with core business strategy rather than superficial marketing.';
  },

  getESGAction(industry) {
    return 'Develop ESG strategy with board-level ownership and measurable targets. Conduct materiality assessment to identify priority ESG issues. Establish ESG data collection and reporting infrastructure. Align with global frameworks (GRI, SASB, TCFD) for credibility. Communicate ESG progress transparently to stakeholders.';
  },

  exportReport() {
    const r = document.getElementById('newsReport');
    if (r) FEOSUtils.exportToTxt('Executive_Daily_Brief', r.innerText);
  }
};
window.FEOS_news = FEOS_news;
