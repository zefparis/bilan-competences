/**
 * Market Data Module
 * Provides salary estimates, demand insights, and growth rates
 */

import { RIASECCode } from './riasecOptimizer';

export interface SalaryInsights {
  current: string;
  potential: string;
  increase: string;
}

export interface DemandInsights {
  hotRoles: string[];
  growthRate: string;
  timeToHire: string;
}

export interface SkillsInsights {
  hotSkills: string[];
  recommendations: string[];
}

export interface MarketInsights {
  salaryInsights: SalaryInsights;
  demandInsights: DemandInsights;
  skillsInsights: SkillsInsights;
}

// Salary data by role (in EUR/year)
const AVERAGE_SALARIES: Record<string, { junior: number; mid: number; senior: number }> = {
  'Développeur Backend': { junior: 35000, mid: 45000, senior: 60000 },
  'Développeur Frontend': { junior: 33000, mid: 43000, senior: 58000 },
  'Développeur Full Stack': { junior: 37000, mid: 47000, senior: 62000 },
  'Lead Developer': { junior: 50000, mid: 65000, senior: 80000 },
  'Architecte': { junior: 60000, mid: 75000, senior: 95000 },
  'Engineering Manager': { junior: 70000, mid: 85000, senior: 110000 },
  'Data Scientist': { junior: 42000, mid: 55000, senior: 75000 },
  'Data Analyst': { junior: 35000, mid: 45000, senior: 60000 },
  'Product Manager': { junior: 45000, mid: 60000, senior: 85000 },
  'UX Designer': { junior: 35000, mid: 48000, senior: 65000 },
  'DevOps Engineer': { junior: 40000, mid: 52000, senior: 70000 },
  'Consultant': { junior: 38000, mid: 50000, senior: 75000 },
  'Chef de Projet': { junior: 38000, mid: 50000, senior: 68000 },
  'Business Analyst': { junior: 35000, mid: 45000, senior: 60000 },
  'Scrum Master': { junior: 40000, mid: 52000, senior: 68000 },
};

// Demand by RIASEC profile
const DEMAND_BY_PROFILE: Record<string, DemandInsights> = {
  'IEC': {
    hotRoles: ['Data Scientist', 'Product Manager', 'Solutions Architect'],
    growthRate: '+18%/an',
    timeToHire: '45 jours',
  },
  'IAC': {
    hotRoles: ['UX Researcher', 'Innovation Manager', 'R&D Lead'],
    growthRate: '+12%/an',
    timeToHire: '60 jours',
  },
  'IAS': {
    hotRoles: ['UX Designer', 'Design Researcher', 'Service Designer'],
    growthRate: '+15%/an',
    timeToHire: '50 jours',
  },
  'EIC': {
    hotRoles: ['Product Manager', 'Consultant Stratégie', 'Business Analyst'],
    growthRate: '+16%/an',
    timeToHire: '48 jours',
  },
  'ESC': {
    hotRoles: ['Chef de Projet', 'Scrum Master', 'Account Manager'],
    growthRate: '+10%/an',
    timeToHire: '55 jours',
  },
  'RIC': {
    hotRoles: ['DevOps Engineer', 'Solutions Architect', 'Infrastructure Lead'],
    growthRate: '+20%/an',
    timeToHire: '42 jours',
  },
  'SAE': {
    hotRoles: ['Coach Agile', 'Facilitateur', 'Change Manager'],
    growthRate: '+14%/an',
    timeToHire: '52 jours',
  },
  'CAE': {
    hotRoles: ['Chef de Projet PMO', 'Business Analyst', 'Process Manager'],
    growthRate: '+11%/an',
    timeToHire: '58 jours',
  },
};

// Skills demand and growth
const SKILLS_DEMAND: Record<string, { demand: 'Très élevée' | 'Élevée' | 'Modérée'; growthRate: string }> = {
  'Python': { demand: 'Très élevée', growthRate: '+25%/an' },
  'JavaScript': { demand: 'Très élevée', growthRate: '+18%/an' },
  'TypeScript': { demand: 'Très élevée', growthRate: '+30%/an' },
  'React': { demand: 'Très élevée', growthRate: '+22%/an' },
  'Cloud': { demand: 'Très élevée', growthRate: '+30%/an' },
  'AWS': { demand: 'Très élevée', growthRate: '+28%/an' },
  'Azure': { demand: 'Élevée', growthRate: '+24%/an' },
  'Docker': { demand: 'Élevée', growthRate: '+20%/an' },
  'Kubernetes': { demand: 'Très élevée', growthRate: '+35%/an' },
  'DevOps': { demand: 'Très élevée', growthRate: '+26%/an' },
  'Data Science': { demand: 'Très élevée', growthRate: '+28%/an' },
  'Machine Learning': { demand: 'Très élevée', growthRate: '+32%/an' },
  'Leadership': { demand: 'Élevée', growthRate: '+15%/an' },
  'Product Management': { demand: 'Élevée', growthRate: '+18%/an' },
  'Agile': { demand: 'Élevée', growthRate: '+12%/an' },
  'UX Design': { demand: 'Élevée', growthRate: '+16%/an' },
  'SQL': { demand: 'Élevée', growthRate: '+10%/an' },
  'Git': { demand: 'Élevée', growthRate: '+8%/an' },
};

/**
 * Get market insights for a profile
 */
export function getMarketInsights(
  currentRole: string,
  targetRoles: string[],
  skills: string[],
  riasecCode: string,
  yearsExperience: number
): MarketInsights {
  // 1. Salary insights
  const currentRoleKey = Object.keys(AVERAGE_SALARIES).find(key =>
    currentRole.toLowerCase().includes(key.toLowerCase())
  ) || 'Développeur Backend';

  const level = yearsExperience < 3 ? 'junior' : yearsExperience < 7 ? 'mid' : 'senior';
  const currentSalary = AVERAGE_SALARIES[currentRoleKey][level];

  const targetSalaries = targetRoles.map(role => {
    const roleKey = Object.keys(AVERAGE_SALARIES).find(key =>
      role.toLowerCase().includes(key.toLowerCase())
    ) || currentRoleKey;
    return AVERAGE_SALARIES[roleKey].senior;
  });

  const avgTargetSalary = targetSalaries.length > 0
    ? targetSalaries.reduce((a, b) => a + b, 0) / targetSalaries.length
    : currentSalary * 1.2;

  const salaryIncrease = ((avgTargetSalary - currentSalary) / currentSalary * 100).toFixed(0);

  const salaryInsights: SalaryInsights = {
    current: `${currentSalary.toLocaleString('fr-FR')}€/an`,
    potential: `${Math.round(avgTargetSalary).toLocaleString('fr-FR')}€/an`,
    increase: `+${salaryIncrease}%`,
  };

  // 2. Demand insights
  const demandInsights = DEMAND_BY_PROFILE[riasecCode] || {
    hotRoles: ['Product Manager', 'Consultant', 'Chef de Projet'],
    growthRate: '+12%/an',
    timeToHire: '55 jours',
  };

  // 3. Skills insights
  const hotSkills = skills.filter(skill =>
    SKILLS_DEMAND[skill]?.demand === 'Très élevée'
  );

  const recommendations = Object.entries(SKILLS_DEMAND)
    .filter(([skill, data]) => 
      data.demand === 'Très élevée' && 
      !skills.includes(skill) &&
      parseInt(data.growthRate) >= 20
    )
    .sort((a, b) => parseInt(b[1].growthRate) - parseInt(a[1].growthRate))
    .slice(0, 2)
    .map(([skill]) => skill);

  const skillsInsights: SkillsInsights = {
    hotSkills,
    recommendations,
  };

  return {
    salaryInsights,
    demandInsights,
    skillsInsights,
  };
}

/**
 * Get skill growth rate
 */
export function getSkillGrowthRate(skill: string): string {
  return SKILLS_DEMAND[skill]?.growthRate || 'N/A';
}

/**
 * Get skill demand level
 */
export function getSkillDemand(skill: string): string {
  return SKILLS_DEMAND[skill]?.demand || 'Modérée';
}
