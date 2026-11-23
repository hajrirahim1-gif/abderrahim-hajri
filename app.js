// 1. Animated Network Topology Canvas Background
(function initNetworkCanvas() {
  const canvas = document.getElementById('network-bg');
  const ctx = canvas.getContext('2d');
  let width, height, nodes = [], pulses = [];
  const mouse = { x: null, y: null };

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    const count = Math.min(72, Math.max(28, Math.floor((width * height) / 22000)));
    nodes = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.48,
      vy: (Math.random() - 0.5) * 0.48,
      r: Math.random() * 1.8 + 1.4
    }));
  }

  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
  window.addEventListener('mouseleave', () => { mouse.x = null; mouse.y = null; });

  function spawnPulse(a, b) {
    if (pulses.length < 18 && Math.random() < 0.004) {
      pulses.push({ ax: a.x, ay: a.y, bx: b.x, by: b.y, t: 0, speed: 0.018 + Math.random() * 0.015 });
    }
  }

  function animate() {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    const nodeColor = isLight ? 'rgba(29, 78, 216, 0.45)' : 'rgba(96, 165, 250, 0.55)';
    const lineRGB = isLight ? '29, 78, 216' : '59, 130, 246';
    const pulseColor = isLight ? 'rgba(2, 132, 199, 0.9)' : 'rgba(56, 189, 248, 0.95)';

    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      n.x += n.vx;
      n.y += n.vy;

      if (n.x < 0 || n.x > width) n.vx *= -1;
      if (n.y < 0 || n.y > height) n.vy *= -1;

      if (mouse.x !== null) {
        const dx = mouse.x - n.x;
        const dy = mouse.y - n.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 140 && dist > 1) {
          n.x -= (dx / dist) * 0.6;
          n.y -= (dy / dist) * 0.6;
        }
      }

      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = nodeColor;
      ctx.fill();

      for (let j = i + 1; j < nodes.length; j++) {
        const m = nodes[j];
        const dx = n.x - m.x;
        const dy = n.y - m.y;
        const dist = Math.hypot(dx, dy);
        const maxDist = 155;
        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * (isLight ? 0.16 : 0.24);
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(m.x, m.y);
          ctx.strokeStyle = `rgba(${lineRGB}, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
          spawnPulse(n, m);
        }
      }
    }

    for (let i = pulses.length - 1; i >= 0; i--) {
      const p = pulses[i];
      p.t += p.speed;
      if (p.t >= 1) { pulses.splice(i, 1); continue; }
      const px = p.ax + (p.bx - p.ax) * p.t;
      const py = p.ay + (p.by - p.ay) * p.t;
      ctx.beginPath();
      ctx.arc(px, py, 2.2, 0, Math.PI * 2);
      ctx.fillStyle = pulseColor;
      ctx.fill();
    }

    requestAnimationFrame(animate);
  }

  resize();
  animate();
})();

// 2. Bilingual Content Dictionary
const I18N = {
  fr: {
    nav_about: 'Profil',
    nav_arch: 'Architectures',
    nav_skills: 'Compétences',
    nav_exp: 'Expériences',
    nav_train: 'Formations',
    nav_certs: 'Certifications',
    nav_contact: 'Contact',
    nav_preview: 'Aperçu CV',
    nav_dl: 'PDF',
    hero_status: 'Disponible · Remote (Paris) & Mobilité Internationale',
    hero_prefix: 'Expert en',
    hero_desc: 'Ingénieur en Génie Informatique (Réseaux & Systèmes) avec <strong>7+ ans d\'expérience</strong> en architecture, migration, haute disponibilité et maintien en condition opérationnelle (MCO / MCS). Certifié <strong>Microsoft 365 Administrator Expert (MS-102)</strong> & <strong>Huawei HCSP</strong>.',
    hero_btn_cv: 'Télécharger CV (PDF)',
    hero_btn_preview: 'Aperçu CV',
    hero_btn_contact: 'Me contacter',
    kpi_years: 'Années d\'expérience IT',
    kpi_projects: 'Projets critiques déployés',
    kpi_courses: 'Cursus techniques animés',
    kpi_certs: 'Certifications reconnues',
    about_eyebrow: 'À PROPOS',
    about_title: 'Double expertise : Architecte Infrastructure & Formateur Certifié',
    about_c1_t: 'Architecture & MCO / MCS',
    about_c1_d: 'Conception, refonte et maintien en condition opérationnelle d\'environnements Windows Server (2012–2022), Active Directory multi-sites, clusters VMware vSphere 8 et Hyper-V avec stockage SAN HPE MSA / iSCSI.',
    about_c2_t: 'Cloud Microsoft & Continuité (PRA)',
    about_c2_d: 'Déploiement hybride Microsoft Azure (Entra ID, VNet, Storage, Load Balancer), Microsoft 365 / Exchange Online, et plans de reprise d\'activité multi-sites basés sur Veeam Backup & Replication.',
    about_c3_t: 'Conseil Remote & Transmission',
    about_c3_d: 'Consultant à distance pour des clients parisiens (Sarra-Consulting) et formateur technique sur plus de 15 cursus officiels (Azure, M365, Windows Server, SCCM/MECM, Hyper-V, Veeam, PRTG, SCOM).',
    arch_eyebrow: 'ÉTUDES DE CAS & SCHÉMAS',
    arch_title: 'Architectures IT Déployées (cliquez pour voir le schéma)',
    arch1_t: 'PRA Multi-sites & Réplication Veeam',
    arch1_d: 'Serveurs HPE ProLiant DL380 Gen10+, Windows Server 2022, Veeam B&R, WAN Accelerator, Veeam ONE & Enterprise Manager.',
    arch2_t: 'Cluster Haute Disponibilité VMware vSphere 8',
    arch2_d: 'Baie SAN HPE MSA 2060, switchs SAN, ESXi, vCenter v8 et migration de production sans coupure.',
    arch3_t: 'Refonte AD 2019, P2V & Exchange Hybride',
    arch3_d: 'Migration AD 2008 → 2019 (DFSR), Hyper-V 2019, conversion P2V de 8 serveurs physiques et messagerie Exchange / M365.',
    arch4_t: 'Cluster Hyper-V Bi-nœuds & Stockage iSCSI',
    arch4_d: 'Clustering de basculement Windows, MPIO, Volumes Partagés de Cluster (CSV), Quorum et Live Migration.',
    arch_view: 'Voir le schéma d\'architecture →',
    skills_eyebrow: 'STACK TECHNIQUE',
    skills_title: 'Compétences & Technologies Maîtrisées',
    filter_all: 'Toutes',
    filter_cloud: 'Cloud & M365',
    filter_sys: 'Systèmes & Parc',
    filter_virt: 'Virtualisation & PRA',
    filter_sec: 'Réseaux & Sécurité',
    sk1_t: 'Microsoft Azure & Cloud',
    sk2_t: 'Microsoft 365 & Messagerie',
    sk3_t: 'Systèmes & Annuaire Active Directory',
    sk4_t: 'Gestion de Parc & Déploiement',
    sk5_t: 'Virtualisation, Serveurs & Stockage',
    sk6_t: 'Sauvegarde & Continuité (PRA/PCA)',
    sk7_t: 'Réseaux & Cybersécurité',
    sk8_t: 'Supervision & Automatisation',
    exp_eyebrow: 'PARCOURS PROFESSIONNEL',
    exp_title: 'Expériences & Réalisations Clients',
    tl_current: 'Poste actuel',
    exp1_role: 'Consultant Infrastructure IT & Formateur Systèmes et Réseaux',
    exp1_loc: 'Paris, France (Remote)',
    exp1_date: 'Juin 2024 – Présent',
    exp1_b1: '<strong>Architecture & MCO Microsoft / Cloud :</strong> Conception, migration et maintien en condition opérationnelle d\'infrastructures Windows Server (2016–2022), Active Directory (AD DS, AD FS, FSMO, GPO, DNS/DHCP HA), Azure (Entra ID, VNet, Storage) et Microsoft 365.',
    exp1_b2: '<strong>Virtualisation, PRA & Gestion de Parc :</strong> Déploiement de clusters Hyper-V haute disponibilité (CSV, MPIO, réplication), automatisation OS/applicative via SCCM/MECM, MDT & WSUS, et sauvegardes Veeam.',
    exp1_b3: '<strong>Sécurité Périmétrique & Support N2/N3 :</strong> Pare-feux FortiGate & Sophos en HA (VPN SSL/IPsec, filtrage Web), durcissement postes (AppLocker, BitLocker, Defender) et résolution d\'incidents N2/N3 à distance.',
    exp1_b4: '<strong>Formateur Technique IT :</strong> Animation à distance de formations certifiantes et workshops pratiques (Windows Server, Azure, Microsoft 365, SCCM/MECM, Hyper-V, Veeam, PRTG, SCOM).',
    exp2_role: 'Consultant Administrateur Systèmes & Réseaux',
    exp2_date: 'Décembre 2023 – Juin 2024',
    exp2_b1: '<strong>Sauvegarde & Réplication inter-sites Veeam (Client : Sergaz) :</strong> Mise en rack serveurs HPE ProLiant DL380 Gen10+ (SPP, RAID), déploiement Windows Server 2022 et architecture complète Veeam Backup & Replication (Repository, Proxy, WAN Accelerator, Veeam ONE & Enterprise Manager).',
    exp2_b2: '<strong>Cluster Haute Disponibilité VMware vSphere 8 (Client : Pharmacie Centrale) :</strong> Initialisation baie SAN HPE MSA 2060, configuration switchs SAN et RAID, déploiement ESXi & vCenter v8, création du cluster et migration de VMs sans interruption.',
    exp3_role: 'Consultant Infrastructure IT & Formateur Systèmes et Réseaux',
    exp3_date: 'Octobre 2019 – Décembre 2023',
    exp3_b1: '<strong>Refonte Infrastructure & Messagerie Hybride (Groupe Hygiène Industrielle) :</strong> Migration AD 2008 → 2019 (SYSVOL FRS → DFSR), Hyper-V 2012 → 2019, conversion P2V de 8 serveurs physiques via Veeam et messagerie hybride Exchange 2019 / Microsoft 365.',
    exp3_b2: '<strong>Restructuration AD & Sécurité Multi-sites (AFRIKISOL) :</strong> Mise à niveau AD DS (2008 → 2016 via 2012 R2, DFSR), déploiement RODC sur sites distants, pare-feu FortiGate 30E et VPN clients.',
    exp3_b3: '<strong>Gestion de Parc SCCM/MECM & Sauvegarde Veeam (HAMILA) :</strong> Déploiement SCCM/MECM, WSUS, KMS, Office 365 et sauvegarde Veeam (10 VMs + 5 serveurs physiques) avec réplication Hyper-V.',
    exp3_b4: '<strong>Clustering Hyper-V HA (VACPA & Ministère de l\'Environnement) :</strong> Clusters Hyper-V bi-nœuds avec stockage partagé iSCSI (CSV, MPIO, Quorum) et migration dynamique.',
    exp3_b5: '<strong>Formateur Technique (15+ cursus animés) :</strong> Azure (AZ-303), Microsoft 365 (MS-100/101), MD-100/101, Windows Server (M20740/41/42), SCCM/MECM, Hyper-V, App-V/RemoteApp, Veeam, PRTG & SCOM.',
    exp4_role: 'Administrateur Systèmes',
    exp4_date: 'Janvier 2019 – Octobre 2019',
    exp4_b1: 'Administration Windows Server (2012/2012 R2), Active Directory (AD DS, DNS, DHCP, GPO), hyperviseurs Hyper-V, réseaux, bases de données et plateformes de calcul distant.',
    exp5_role: 'Stagiaire Ingénieur Réseaux & Automatisation (PFE)',
    exp5_date: 'Février 2018 – Juin 2018',
    exp5_b1: 'Plateforme d\'automatisation et supervision d\'un backbone IP/MPLS Cisco (OSPF, BGP) sous Linux Ubuntu Server, Zabbix et scripting Bash/Expect.',
    tr_eyebrow: 'TRANSMISSION & WORKSHOPS',
    tr_title: 'Formateur Technique IT — 15+ Cursus Professionnels Animés',
    tr_c1: 'Cloud Azure & Microsoft 365',
    tr_c2: 'Windows Server & Identités',
    tr_c3: 'Virtualisation, Parc, Backup & Ops',
    cert_eyebrow: 'QUALIFICATIONS',
    cert_title: 'Certifications & Formation Académique',
    cert_md100: 'Configuration & Sécurisation des postes',
    cert_ccna: 'Évolutivité & Connexion des réseaux',
    edu1_deg: 'Diplôme d\'Ingénieur en Génie Informatique — Réseaux & Systèmes',
    edu2_deg: 'Licence Appliquée en Technologies de l\'Informatique',
    contact_eyebrow: 'COLLABORATION & RECRUTEMENT',
    contact_title: 'Discutons de votre infrastructure IT',
    contact_sub: 'Disponible pour des postes d\'Ingénieur Systèmes, Réseaux & Cloud Microsoft en Remote, en France, en Tunisie ou à l\'international.',
    copy_btn: 'Copier',
    phone_lbl: 'Téléphone / WhatsApp',
    loc_lbl: 'Localisation',
    loc_val: 'Bizerte, Tunisie · Remote & Mobilité internationale',
    form_title: 'Envoyer un message rapide (100 % statique)',
    form_send: 'Envoyer par e-mail',
    form_copy: 'Copier le message',
    footer_rights: 'Ingénieur Systèmes, Réseaux & Cloud Microsoft',
    cv_modal_t: 'Aperçu du CV — Abderrahim HAJRI',
    roles: [
      'Infrastructure Microsoft & Cloud Azure',
      'Virtualisation VMware vSphere & Hyper-V',
      'Sauvegarde Veeam & Haute Disponibilité',
      'Sécurité FortiGate, Sophos & Cisco',
      'Gestion de Parc SCCM / MECM & Formation IT'
    ]
  },
  en: {
    nav_about: 'Profile',
    nav_arch: 'Architectures',
    nav_skills: 'Skills',
    nav_exp: 'Experience',
    nav_train: 'Training',
    nav_certs: 'Certifications',
    nav_contact: 'Contact',
    nav_preview: 'Preview CV',
    nav_dl: 'PDF',
    hero_status: 'Available · Remote (Paris) & Open to International Relocation',
    hero_prefix: 'Specialist in',
    hero_desc: 'Computer Engineering graduate (Networks & Systems) with <strong>7+ years of experience</strong> architecting, migrating, and maintaining enterprise IT infrastructures (L2/L3 & HA). Certified <strong>Microsoft 365 Administrator Expert (MS-102)</strong> & <strong>Huawei HCSP</strong>.',
    hero_btn_cv: 'Download Resume (PDF)',
    hero_btn_preview: 'Preview CV',
    hero_btn_contact: 'Contact Me',
    kpi_years: 'Years IT Experience',
    kpi_projects: 'Enterprise Projects Delivered',
    kpi_courses: 'Technical Courses Taught',
    kpi_certs: 'Industry Certifications',
    about_eyebrow: 'ABOUT ME',
    about_title: 'Dual Expertise: Infrastructure Architect & Certified Trainer',
    about_c1_t: 'Architecture & Operations',
    about_c1_d: 'Design, migration, and lifecycle operations across Windows Server (2012–2022), multi-site Active Directory, VMware vSphere 8 and Hyper-V clusters backed by HPE MSA / iSCSI SAN storage.',
    about_c2_t: 'Microsoft Cloud & DRP / BCP',
    about_c2_d: 'Hybrid Microsoft Azure deployments (Entra ID, VNet, Storage, Load Balancer), Microsoft 365 / Exchange Online, and multi-site Disaster Recovery architectures powered by Veeam Backup & Replication.',
    about_c3_t: 'Remote Consulting & Training',
    about_c3_d: 'Remote IT consultant for Paris-based clients (Sarra-Consulting) and technical trainer across 15+ official courses (Azure, M365, Windows Server, SCCM/MECM, Hyper-V, Veeam, PRTG, SCOM).',
    arch_eyebrow: 'CASE STUDIES & DIAGRAMS',
    arch_title: 'Deployed IT Architectures (click to view diagram)',
    arch1_t: 'Multi-Site DR & Veeam Replication',
    arch1_d: 'HPE ProLiant DL380 Gen10+ servers, Windows Server 2022, Veeam B&R, WAN Accelerator, Veeam ONE & Enterprise Manager.',
    arch2_t: 'VMware vSphere 8 High-Availability Cluster',
    arch2_d: 'HPE MSA 2060 SAN storage, SAN switches, ESXi, vCenter v8, and zero-downtime production VM migration.',
    arch3_t: 'AD 2019 Upgrade, P2V & Hybrid Exchange',
    arch3_d: 'AD 2008 → 2019 migration (DFSR), Hyper-V 2019, P2V conversion of 8 physical servers, and Exchange / M365.',
    arch4_t: '2-Node Hyper-V Cluster & iSCSI Storage',
    arch4_d: 'Windows Failover Clustering, MPIO, Cluster Shared Volumes (CSV), Quorum, and Live Migration.',
    arch_view: 'View architecture diagram →',
    skills_eyebrow: 'TECH STACK',
    skills_title: 'Core Skills & Technologies',
    filter_all: 'All',
    filter_cloud: 'Cloud & M365',
    filter_sys: 'Systems & Endpoints',
    filter_virt: 'Virtualization & DR',
    filter_sec: 'Network & Security',
    sk1_t: 'Microsoft Azure & Cloud',
    sk2_t: 'Microsoft 365 & Messaging',
    sk3_t: 'Systems & Active Directory',
    sk4_t: 'Endpoint & Patch Management',
    sk5_t: 'Virtualization, Compute & Storage',
    sk6_t: 'Backup & Business Continuity',
    sk7_t: 'Networking & Cybersecurity',
    sk8_t: 'Monitoring & Automation',
    exp_eyebrow: 'CAREER TIMELINE',
    exp_title: 'Professional Experience & Client Projects',
    tl_current: 'Current Role',
    exp1_role: 'IT Infrastructure Consultant & Technical Trainer',
    exp1_loc: 'Paris, France (Remote)',
    exp1_date: 'June 2024 – Present',
    exp1_b1: '<strong>Microsoft Systems & Cloud Architecture:</strong> Designed, migrated, and maintained Windows Server (2016–2022), Active Directory (AD DS, AD FS, FSMO, GPO, DNS/DHCP HA), Azure (Entra ID, VNet, Storage), and Microsoft 365 environments.',
    exp1_b2: '<strong>Virtualization, DR & Endpoint Mgmt:</strong> Deployed Hyper-V failover clusters (CSV, MPIO, replication), automated OS/app deployment via SCCM/MECM, MDT & WSUS, and managed Veeam Backup & Replication.',
    exp1_b3: '<strong>Perimeter Security & L2/L3 Support:</strong> Configured FortiGate & Sophos HA firewalls (SSL/IPsec VPN, Web filtering), hardened endpoints (AppLocker, BitLocker, Defender), and resolved escalated incidents remotely.',
    exp1_b4: '<strong>Technical Trainer:</strong> Delivered remote certification courses and hands-on workshops across Windows Server, Azure, Microsoft 365, SCCM/MECM, Hyper-V, Veeam, PRTG, and SCOM.',
    exp2_role: 'Systems & Network Infrastructure Consultant',
    exp2_date: 'December 2023 – June 2024',
    exp2_b1: '<strong>Cross-Site Veeam Backup & Replication (Client: Sergaz):</strong> Racked HPE ProLiant DL380 Gen10+ servers (SPP, RAID), deployed Windows Server 2022 VMs, and implemented Veeam Backup & Replication (Repository, Proxy, WAN Accelerator, Veeam ONE & Enterprise Manager).',
    exp2_b2: '<strong>VMware vSphere 8 HA Cluster (Client: Pharmacie Centrale):</strong> Initialized HPE MSA 2060 SAN storage, configured SAN switches & RAID, deployed ESXi & vCenter v8, built an HA cluster, and migrated production VMs with zero downtime.',
    exp3_role: 'IT Infrastructure Consultant & Technical Trainer',
    exp3_date: 'October 2019 – December 2023',
    exp3_b1: '<strong>Infrastructure Modernization & Hybrid Messaging (Groupe Hygiène Industrielle):</strong> Upgraded AD 2008 → 2019 (FRS → DFSR), Hyper-V 2012 → 2019, P2V conversion of 8 physical servers via Veeam, and hybrid Exchange 2019 / Microsoft 365.',
    exp3_b2: '<strong>AD Restructuring & Multi-Site Security (AFRIKISOL):</strong> Upgraded AD DS (2008 → 2016 via 2012 R2, DFSR), deployed branch RODCs, FortiGate 30E firewalls, and secure client VPNs.',
    exp3_b3: '<strong>SCCM/MECM & Veeam Backup (HAMILA):</strong> Deployed SCCM/MECM, WSUS, KMS, Office 365, and Veeam Backup (10 VMs + 5 physical servers) with Hyper-V replication.',
    exp3_b4: '<strong>HA Hyper-V Clustering (VACPA & Ministry of Environment):</strong> Built 2-node Hyper-V failover clusters backed by iSCSI SAN storage (CSV, MPIO, Quorum) with live migration.',
    exp3_b5: '<strong>Technical Trainer (15+ courses):</strong> Azure (AZ-303), Microsoft 365 (MS-100/101), MD-100/101, Windows Server (M20740/41/42), SCCM/MECM, Hyper-V, App-V/RemoteApp, Veeam, PRTG & SCOM.',
    exp4_role: 'Systems Administrator',
    exp4_date: 'January 2019 – October 2019',
    exp4_b1: 'Administered Windows Server (2012/2012 R2), Active Directory (AD DS, DNS, DHCP, GPO), Hyper-V virtualization hosts, networking, databases, and remote computing platforms.',
    exp5_role: 'Network Automation Engineering Intern (Final-Year Project)',
    exp5_date: 'February 2018 – June 2018',
    exp5_b1: 'Built an automation and monitoring platform for a Cisco IP/MPLS backbone (OSPF, BGP) on Ubuntu Server using Zabbix and Bash/Expect scripting.',
    tr_eyebrow: 'KNOWLEDGE TRANSFER & WORKSHOPS',
    tr_title: 'Technical IT Trainer — 15+ Enterprise Courses Delivered',
    tr_c1: 'Microsoft Azure & M365',
    tr_c2: 'Windows Server & Identity',
    tr_c3: 'Virtualization, Endpoint, Backup & Ops',
    cert_eyebrow: 'CREDENTIALS',
    cert_title: 'Certifications & Academic Education',
    cert_md100: 'Configuring & Protecting Windows Desktops',
    cert_ccna: 'Scaling & Connecting Enterprise Networks',
    edu1_deg: 'Engineering Degree in Computer Science — Networks & Systems',
    edu2_deg: 'Applied Bachelor\'s Degree in Information Technology',
    contact_eyebrow: 'HIRE & COLLABORATE',
    contact_title: 'Let\'s discuss your IT infrastructure',
    contact_sub: 'Open to Systems, Network & Microsoft Cloud Engineer opportunities (Remote, France, Tunisia, or International Relocation).',
    copy_btn: 'Copy',
    phone_lbl: 'Phone / WhatsApp',
    loc_lbl: 'Location',
    loc_val: 'Bizerte, Tunisia · Remote & Open to Relocation',
    form_title: 'Send a quick message (100% static)',
    form_send: 'Send via Email',
    form_copy: 'Copy Message',
    footer_rights: 'Systems, Network & Microsoft Cloud Engineer',
    cv_modal_t: 'Resume Preview — Abderrahim HAJRI',
    roles: [
      'Microsoft Infrastructure & Azure Cloud',
      'VMware vSphere & Hyper-V Virtualization',
      'Veeam Backup & Disaster Recovery',
      'FortiGate, Sophos & Cisco Security',
      'SCCM / MECM & Enterprise IT Training'
    ]
  }
};

let currentLang = 'fr';

// 3. Typing Effect
let roleIdx = 0, charIdx = 0, deleting = false;
const typedEl = document.getElementById('typed-role');

function typeLoop() {
  const roles = I18N[currentLang].roles;
  const word = roles[roleIdx % roles.length];
  if (!deleting) {
    charIdx++;
    typedEl.textContent = word.slice(0, charIdx);
    if (charIdx >= word.length) { deleting = true; setTimeout(typeLoop, 1800); return; }
    setTimeout(typeLoop, 46);
  } else {
    charIdx--;
    typedEl.textContent = word.slice(0, charIdx);
    if (charIdx <= 0) { deleting = false; roleIdx = (roleIdx + 1) % roles.length; setTimeout(typeLoop, 300); return; }
    setTimeout(typeLoop, 26);
  }
}
typeLoop();

// 4. Language Switcher
function applyLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = currentLang;
  const dict = I18N[currentLang];

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) el.innerHTML = dict[key];
  });

  document.querySelectorAll('[data-ph-fr]').forEach(el => {
    el.placeholder = el.getAttribute(`data-ph-${currentLang}`);
  });

  const pdfHref = currentLang === 'fr' ? 'assets/CV_Abderrahim_Hajri_FR.pdf' : 'assets/CV_Abderrahim_Hajri_EN.pdf';
  document.getElementById('nav-cv-btn').href = pdfHref;
  document.getElementById('hero-cv-link').href = pdfHref;
  document.getElementById('cv-modal-dl').href = pdfHref;
  const iframe = document.getElementById('cv-iframe');
  if (!document.getElementById('cv-modal').classList.contains('hidden')) {
    iframe.src = pdfHref;
  }

  charIdx = 0;
  deleting = false;
}

document.getElementById('lang-toggle').addEventListener('click', () => {
  applyLanguage(currentLang === 'fr' ? 'en' : 'fr');
});

// 5. Theme Toggle
const themeBtn = document.getElementById('theme-toggle');
const sunIcon = document.getElementById('theme-icon-sun');
const moonIcon = document.getElementById('theme-icon-moon');

themeBtn.addEventListener('click', () => {
  const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  sunIcon.classList.toggle('hidden', next === 'dark');
  moonIcon.classList.toggle('hidden', next === 'light');
});

// 6. Mobile Nav
document.getElementById('menu-toggle').addEventListener('click', () => {
  document.getElementById('nav-links').classList.toggle('open');
});
document.querySelectorAll('#nav-links a').forEach(a => {
  a.addEventListener('click', () => document.getElementById('nav-links').classList.remove('open'));
});

// 7. Skill Filter
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.getAttribute('data-filter');
    document.querySelectorAll('.skill-card').forEach(card => {
      const cat = card.getAttribute('data-cat');
      card.classList.toggle('hide', filter !== 'all' && cat !== filter);
    });
  });
});

// 8. Scroll Reveal, Progress Bar, Back to Top & Spotlight Glow
const scrollBar = document.getElementById('scroll-progress');
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  scrollBar.style.width = `${pct}%`;
  backToTop.classList.toggle('show', scrollTop > 450);
});

backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

document.querySelectorAll('.spotlight').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${e.clientX - r.left}px`);
    card.style.setProperty('--my', `${e.clientY - r.top}px`);
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

function animateCounters() {
  document.querySelectorAll('.counter').forEach(el => {
    const target = parseInt(el.getAttribute('data-target'), 10);
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 30));
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { el.textContent = target; clearInterval(timer); }
      else { el.textContent = current; }
    }, 40);
  });
}
setTimeout(animateCounters, 350);

// 9. Interactive SysAdmin Console (100% Static JS)
const termOut = document.getElementById('terminal-output');
const termForm = document.getElementById('terminal-form');
const termInput = document.getElementById('terminal-input');

const TERM_RESPONSES = {
  'get-profile': () => currentLang === 'fr'
    ? 'Nom : Abderrahim HAJRI | Poste : Ingénieur Systèmes, Réseaux & Cloud Microsoft | Exp : 7+ ans | Actuel : Sarra-Consulting (Paris · Remote) | Langues : Arabe, Français, Anglais'
    : 'Name: Abderrahim HAJRI | Role: Systems, Network & Microsoft Cloud Engineer | Exp: 7+ yrs | Current: Sarra-Consulting (Paris · Remote) | Languages: Arabic, French, English',
  'get-certifications': () =>
    '[2024] Microsoft Certified: MS-102 — M365 Administrator Expert (ID: AE4A4395F2524281)\n[2024] Microsoft Certified: MS-700 — Teams Administrator Associate (ID: 792E50CD24076110)\n[2024] Huawei HCSP (ID: 03021301825809622691409)\n[2021] Microsoft MD-100 · [2017-18] Cisco CCNA 2, 3 & 4',
  'get-stack': () =>
    'Cloud: Azure (Entra ID, VNet, Storage, LB) · Microsoft 365 · Exchange Hybride\nVirt & PRA: VMware vSphere 8 (ESXi/vCenter) · Hyper-V Cluster · Veeam B&R / ONE\nOS & Parc: Windows Server 2012–2022 · AD DS/AD FS · SCCM/MECM · MDT · WSUS · Ubuntu\nSécurité: FortiGate (HA) · Sophos · VPN SSL/IPsec · Cisco (OSPF/BGP) · PRTG · SCOM · Zabbix',
  'get-contact': () =>
    'Email: hajri.rahim@hotmail.com | Tel/WhatsApp: +216 55 50 12 37 | LinkedIn: linkedin.com/in/hajri-abderrahim-249916155',
  'help': () =>
    'Commandes disponibles : Get-Profile | Get-Certifications | Get-Stack | Get-Contact | clear'
};

function runTermCmd(raw) {
  const cmd = raw.trim();
  if (!cmd) return;
  if (cmd.toLowerCase() === 'clear') {
    termOut.innerHTML = '';
    return;
  }
  const resFn = TERM_RESPONSES[cmd.toLowerCase()];
  const line = document.createElement('div');
  line.className = 'term-line';
  line.innerHTML = `<span class="prompt">PS&gt;</span> <span class="cmd-txt"></span>`;
  line.querySelector('.cmd-txt').textContent = cmd;
  const res = document.createElement('div');
  res.className = 'term-res';
  res.textContent = resFn ? resFn() : `Commande inconnue: '${cmd}'. Tapez 'help'.`;
  termOut.appendChild(line);
  termOut.appendChild(res);
  termOut.scrollTop = termOut.scrollHeight;
}

document.querySelectorAll('.term-cmd-btn').forEach(btn => {
  btn.addEventListener('click', () => runTermCmd(btn.getAttribute('data-cmd')));
});
termForm.addEventListener('submit', e => {
  e.preventDefault();
  runTermCmd(termInput.value);
  termInput.value = '';
});

// 10. Architecture Diagrams Modal (SVG Interactive Diagrams)
const ARCH_DATA = {
  sergaz: {
    client: 'SERGAZ · 2024 (Prologic Tunisie)',
    title_fr: 'Architecture de Sauvegarde & Réplication Multi-sites Veeam',
    title_en: 'Multi-Site Veeam Backup & Replication Architecture',
    svg: `<svg viewBox="0 0 760 220" xmlns="http://www.w3.org/2000/svg">
      <style>
        .box{fill:#0f2942;stroke:#3b82f6;stroke-width:1.5;rx:10}
        .box2{fill:#132a4a;stroke:#06b6d4;stroke-width:1.5;rx:10}
        .t1{fill:#fff;font:700 13px Inter,sans-serif;text-anchor:middle}
        .t2{fill:#93c5fd;font:500 11px Inter,sans-serif;text-anchor:middle}
        .flow{stroke:#38bdf8;stroke-width:2;stroke-dasharray:6 5;fill:none}
      </style>
      <rect class="box" x="20" y="35" width="185" height="150" rx="10"/>
      <text class="t1" x="112" y="65">Site Principal</text>
      <text class="t2" x="112" y="90">HPE DL380 Gen10+</text>
      <text class="t2" x="112" y="110">SPP Firmware + RAID</text>
      <text class="t2" x="112" y="130">VMs Windows Server 2022</text>
      <text class="t2" x="112" y="152">Veeam Proxy &amp; Repo</text>

      <line class="flow" x1="205" y1="110" x2="295" y2="110"/>
      <polygon points="295,105 305,110 295,115" fill="#38bdf8"/>

      <rect class="box2" x="305" y="55" width="150" height="110" rx="10"/>
      <text class="t1" x="380" y="90">WAN Accelerator</text>
      <text class="t2" x="380" y="112">Déduplication &amp;</text>
      <text class="t2" x="380" y="130">Réplication inter-sites</text>
      <text class="t2" x="380" y="150">Chiffrement PRA</text>

      <line class="flow" x1="455" y1="110" x2="545" y2="110"/>
      <polygon points="545,105 555,110 545,115" fill="#38bdf8"/>

      <rect class="box" x="555" y="35" width="185" height="150" rx="10"/>
      <text class="t1" x="647" y="65">Site Secondaire (PRA)</text>
      <text class="t2" x="647" y="90">Veeam Backup &amp; Rep.</text>
      <text class="t2" x="647" y="110">Veeam ONE Monitoring</text>
      <text class="t2" x="647" y="130">Veeam Enterprise Mgr</text>
      <text class="t2" x="647" y="152">Jobs Réplication &amp; Backup</text>
    </svg>`,
    details_fr: '<strong>Périmètre :</strong> Mise en rack de serveurs HPE ProLiant DL380 Gen10+, mise à jour SPP et configuration RAID, déploiement de VMs Windows Server 2022 et intégration complète de Veeam (Repository, Proxy, WAN Accelerator, réplication inter-sites, Veeam ONE & Enterprise Manager).',
    details_en: '<strong>Scope:</strong> Racked HPE ProLiant DL380 Gen10+ servers, updated SPP firmware and configured RAID, deployed Windows Server 2022 VMs, and implemented end-to-end Veeam (Repository, Proxy, WAN Accelerator, cross-site replication, Veeam ONE & Enterprise Manager).'
  },
  pharmacie: {
    client: 'PHARMACIE CENTRALE · 2024 (Prologic Tunisie)',
    title_fr: 'Infrastructure HPE & Cluster Haute Disponibilité VMware vSphere 8',
    title_en: 'HPE Infrastructure & VMware vSphere 8 HA Cluster',
    svg: `<svg viewBox="0 0 760 220" xmlns="http://www.w3.org/2000/svg">
      <style>
        .box{fill:#0f2942;stroke:#3b82f6;stroke-width:1.5}
        .box2{fill:#132a4a;stroke:#10b981;stroke-width:1.5}
        .t1{fill:#fff;font:700 13px Inter,sans-serif;text-anchor:middle}
        .t2{fill:#93c5fd;font:500 11px Inter,sans-serif;text-anchor:middle}
        .flow{stroke:#34d399;stroke-width:2;stroke-dasharray:6 5;fill:none}
      </style>
      <rect class="box" x="25" y="28" width="210" height="72" rx="10"/>
      <text class="t1" x="130" y="56">Hôtes HPE ESXi (Nœud 1 &amp; 2)</text>
      <text class="t2" x="130" y="78">RAID 1 · Réseau vSwitch / vMotion</text>

      <rect class="box" x="25" y="122" width="210" height="72" rx="10"/>
      <text class="t1" x="130" y="150">VMware vCenter Server v8</text>
      <text class="t2" x="130" y="172">Cluster HA / DRS · Migration à chaud</text>

      <line class="flow" x1="235" y1="64" x2="310" y2="110"/>
      <line class="flow" x1="235" y1="158" x2="310" y2="110"/>

      <rect class="box2" x="310" y="55" width="160" height="110" rx="10"/>
      <text class="t1" x="390" y="95">Switchs SAN Redondés</text>
      <text class="t2" x="390" y="118">Zoning &amp; Mappage LUN</text>
      <text class="t2" x="390" y="138">Multipathing Haute Dispo</text>

      <line class="flow" x1="470" y1="110" x2="535" y2="110"/>

      <rect class="box" x="535" y="45" width="200" height="130" rx="10"/>
      <text class="t1" x="635" y="82">Baie SAN HPE MSA 2060</text>
      <text class="t2" x="635" y="106">Initialisation &amp; Pools Disques</text>
      <text class="t2" x="635" y="126">Datastores VMFS Partagés</text>
      <text class="t2" x="635" y="148">Migration VMs : 0 coupure</text>
    </svg>`,
    details_fr: '<strong>Périmètre :</strong> Initialisation de la baie SAN HPE MSA 2060, configuration RAID 1 sur serveurs HPE, paramétrage des switchs SAN, mappage des volumes, déploiement de vCenter v8, création du cluster vSphere et migration des machines virtuelles en production sans interruption.',
    details_en: '<strong>Scope:</strong> Initialized HPE MSA 2060 SAN storage, configured server RAID 1, SAN switches, and LUN mapping; deployed vCenter v8, built a vSphere HA cluster, and migrated production VMs with zero downtime.'
  },
  hygiene: {
    client: 'GROUPE HYGIÈNE INDUSTRIELLE (Vnext-Consulting)',
    title_fr: 'Refonte Active Directory 2019, P2V & Messagerie Hybride',
    title_en: 'AD 2019 Upgrade, P2V Conversion & Hybrid Messaging',
    svg: `<svg viewBox="0 0 760 220" xmlns="http://www.w3.org/2000/svg">
      <style>
        .box{fill:#0f2942;stroke:#3b82f6;stroke-width:1.5}
        .box2{fill:#132a4a;stroke:#f59e0b;stroke-width:1.5}
        .t1{fill:#fff;font:700 13px Inter,sans-serif;text-anchor:middle}
        .t2{fill:#cbd5e1;font:500 11px Inter,sans-serif;text-anchor:middle}
        .flow{stroke:#60a5fa;stroke-width:2;stroke-dasharray:6 5;fill:none}
      </style>
      <rect class="box2" x="20" y="40" width="180" height="140" rx="10"/>
      <text class="t1" x="110" y="72">Existant Legacy</text>
      <text class="t2" x="110" y="98">Active Directory 2008</text>
      <text class="t2" x="110" y="118">SYSVOL FRS · Hyper-V 2012</text>
      <text class="t2" x="110" y="140">8 Serveurs Physiques</text>

      <line class="flow" x1="200" y1="110" x2="275" y2="110"/>
      <polygon points="275,105 285,110 275,115" fill="#60a5fa"/>

      <rect class="box" x="285" y="40" width="195" height="140" rx="10"/>
      <text class="t1" x="382" y="72">Migration &amp; P2V</text>
      <text class="t2" x="382" y="98">Palier 2012 R2 → AD 2019</text>
      <text class="t2" x="382" y="118">Migration FRS → DFSR</text>
      <text class="t2" x="382" y="140">8 P2V via Veeam → Hyper-V 19</text>

      <line class="flow" x1="480" y1="110" x2="550" y2="110"/>
      <polygon points="550,105 560,110 550,115" fill="#60a5fa"/>

      <rect class="box" x="560" y="40" width="180" height="140" rx="10"/>
      <text class="t1" x="650" y="72">Cible Hybride</text>
      <text class="t2" x="650" y="98">Exchange Server 2019</text>
      <text class="t2" x="650" y="118">Microsoft 365 Cloud</text>
      <text class="t2" x="650" y="140">Hyper-V 2019 Modernisé</text>
    </svg>`,
    details_fr: '<strong>Périmètre :</strong> Audit complet de l\'infrastructure, montée de niveau Active Directory 2008 vers 2019 (avec palier 2012 R2 et migration SYSVOL FRS vers DFSR), migration Hyper-V 2012 vers 2019, conversion P2V de 8 serveurs physiques avec Veeam et déploiement d\'une messagerie hybride Exchange 2019 / Microsoft 365.',
    details_en: '<strong>Scope:</strong> Full infrastructure audit, AD upgrade from 2008 to 2019 (via 2012 R2 & FRS-to-DFSR), Hyper-V 2012-to-2019 upgrade, P2V conversion of 8 physical servers via Veeam, and hybrid Exchange Server 2019 / Microsoft 365 deployment.'
  },
  vacpa: {
    client: 'VACPA & MIN. ENVIRONNEMENT (Vnext-Consulting)',
    title_fr: 'Cluster Hyper-V Bi-nœuds Haute Disponibilité & Stockage iSCSI',
    title_en: '2-Node High-Availability Hyper-V Cluster & iSCSI Storage',
    svg: `<svg viewBox="0 0 760 220" xmlns="http://www.w3.org/2000/svg">
      <style>
        .box{fill:#0f2942;stroke:#3b82f6;stroke-width:1.5}
        .box2{fill:#132a4a;stroke:#06b6d4;stroke-width:1.5}
        .t1{fill:#fff;font:700 13px Inter,sans-serif;text-anchor:middle}
        .t2{fill:#93c5fd;font:500 11px Inter,sans-serif;text-anchor:middle}
        .flow{stroke:#38bdf8;stroke-width:2;stroke-dasharray:6 5;fill:none}
      </style>
      <rect class="box" x="30" y="30" width="210" height="70" rx="10"/>
      <text class="t1" x="135" y="58">Nœud Hyper-V #1</text>
      <text class="t2" x="135" y="80">Failover Clustering · Live Migration</text>

      <rect class="box" x="30" y="120" width="210" height="70" rx="10"/>
      <text class="t1" x="135" y="148">Nœud Hyper-V #2</text>
      <text class="t2" x="135" y="170">Basculement Automatique HA</text>

      <line class="flow" x1="240" y1="65" x2="320" y2="110"/>
      <line class="flow" x1="240" y1="155" x2="320" y2="110"/>

      <rect class="box2" x="320" y="55" width="175" height="110" rx="10"/>
      <text class="t1" x="407" y="92">Initiateurs iSCSI + MPIO</text>
      <text class="t2" x="407" y="114">Quorum du Cluster</text>
      <text class="t2" x="407" y="136">CSV (Cluster Shared Vol.)</text>

      <line class="flow" x1="495" y1="110" x2="555" y2="110"/>

      <rect class="box" x="555" y="45" width="180" height="130" rx="10"/>
      <text class="t1" x="645" y="85">Cible Stockage iSCSI</text>
      <text class="t2" x="645" y="108">Volumes Partagés VMs</text>
      <text class="t2" x="645" y="130">Tolérance aux pannes</text>
      <text class="t2" x="645" y="150">Haute Disponibilité 24/7</text>
    </svg>`,
    details_fr: '<strong>Périmètre :</strong> Mise en place de serveurs bi-nœuds avec rôles Hyper-V et Clustering de basculement, configuration MPIO et initiateurs iSCSI, mappage des volumes partagés de cluster (CSV), configuration du Quorum et haute disponibilité des VMs.',
    details_en: '<strong>Scope:</strong> Deployed 2-node Hyper-V servers with Windows Failover Clustering, configured MPIO and iSCSI initiators, mapped Cluster Shared Volumes (CSV), configured Cluster Quorum, and enabled VM high availability.'
  }
};

const archModal = document.getElementById('arch-modal');
document.querySelectorAll('.arch-card').forEach(card => {
  card.addEventListener('click', () => {
    const key = card.getAttribute('data-arch');
    const data = ARCH_DATA[key];
    if (!data) return;
    document.getElementById('arch-modal-client').textContent = data.client;
    document.getElementById('arch-modal-title').textContent = currentLang === 'fr' ? data.title_fr : data.title_en;
    document.getElementById('arch-modal-svg').innerHTML = data.svg;
    document.getElementById('arch-modal-details').innerHTML = currentLang === 'fr' ? data.details_fr : data.details_en;
    archModal.classList.remove('hidden');
  });
});

document.getElementById('arch-modal-close').addEventListener('click', () => archModal.classList.add('hidden'));
archModal.addEventListener('click', e => { if (e.target === archModal) archModal.classList.add('hidden'); });

// 11. PDF Resume Preview Modal
const cvModal = document.getElementById('cv-modal');
const cvIframe = document.getElementById('cv-iframe');
let previewLang = 'fr';

function openCvModal() {
  previewLang = currentLang;
  const src = previewLang === 'fr' ? 'assets/CV_Abderrahim_Hajri_FR.pdf' : 'assets/CV_Abderrahim_Hajri_EN.pdf';
  cvIframe.src = src;
  document.getElementById('cv-modal-dl').href = src;
  cvModal.classList.remove('hidden');
}

document.getElementById('open-cv-preview').addEventListener('click', openCvModal);
document.getElementById('hero-preview-btn').addEventListener('click', openCvModal);
document.getElementById('contact-preview-btn').addEventListener('click', openCvModal);

document.getElementById('cv-modal-switch').addEventListener('click', () => {
  previewLang = previewLang === 'fr' ? 'en' : 'fr';
  const src = previewLang === 'fr' ? 'assets/CV_Abderrahim_Hajri_FR.pdf' : 'assets/CV_Abderrahim_Hajri_EN.pdf';
  cvIframe.src = src;
  document.getElementById('cv-modal-dl').href = src;
});

document.getElementById('cv-modal-close').addEventListener('click', () => {
  cvModal.classList.add('hidden');
  cvIframe.src = '';
});
cvModal.addEventListener('click', e => {
  if (e.target === cvModal) { cvModal.classList.add('hidden'); cvIframe.src = ''; }
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    archModal.classList.add('hidden');
    cvModal.classList.add('hidden');
    cvIframe.src = '';
  }
});

// 12. Copy Buttons & Static Contact Form
document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', async () => {
    const val = btn.getAttribute('data-copy');
    try {
      await navigator.clipboard.writeText(val);
      const orig = btn.textContent;
      btn.textContent = currentLang === 'fr' ? 'Copié !' : 'Copied!';
      setTimeout(() => btn.textContent = orig, 1600);
    } catch {}
  });
});

document.getElementById('cf-copy-btn').addEventListener('click', async () => {
  const name = document.getElementById('cf-name').value.trim() || '-';
  const email = document.getElementById('cf-email').value.trim() || '-';
  const msg = document.getElementById('cf-msg').value.trim() || '-';
  try {
    await navigator.clipboard.writeText(`Pour: hajri.rahim@hotmail.com\nDe: ${name} (${email})\n\n${msg}`);
    document.getElementById('cf-feedback').textContent =
      currentLang === 'fr' ? 'Message copié ! Vous pouvez le coller directement dans votre e-mail.' : 'Message copied! You can paste it directly into your email.';
  } catch {}
});

document.getElementById('contact-form').addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('cf-name').value.trim();
  const email = document.getElementById('cf-email').value.trim();
  const msg = document.getElementById('cf-msg').value.trim();
  const subject = encodeURIComponent(`[Portfolio] Contact de ${name}`);
  const body = encodeURIComponent(`De: ${name} (${email})\n\n${msg}`);
  window.location.href = `mailto:hajri.rahim@hotmail.com?subject=${subject}&body=${body}`;
  document.getElementById('cf-feedback').textContent =
    currentLang === 'fr'
      ? 'Votre client mail s\'ouvre avec le message prêt à envoyer.'
      : 'Your email client is opening with your message ready to send.';
});
