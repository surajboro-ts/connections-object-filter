/**
 * Mock metadata for the Create-connection wizard, mirroring the Figma frames.
 * The two frames in Figma use different sample names, so each step keeps its
 * own set for a faithful recreation (easy to unify later).
 */

/* ---------------------------------------------------------- Shared types */

export type DbObjectType = 'Table' | 'View'

export interface DbObject {
  name: string
  type: DbObjectType
}

const t = (name: string): DbObject => ({ name, type: 'Table' })
const v = (name: string): DbObject => ({ name, type: 'View' })

/* ------------------------------------------------- Carry-forward filter */
/* We cannot query table names at the "databases & schemas" step, so the table
   filter is intent the user declares here and we apply later, when the tables
   are actually loaded in "Select tables". */

export type MatchMode =
  | 'contains'
  | 'notContains'
  | 'startsWith'
  | 'exact'
  | 'isNot'
  | 'wildcard'

export const MATCH_MODES: { value: MatchMode; label: string }[] = [
  { value: 'contains', label: 'Contains' },
  { value: 'notContains', label: 'Does not contain' },
  { value: 'startsWith', label: 'Starts with' },
  { value: 'exact', label: 'Is' },
  { value: 'isNot', label: 'Is not' },
  { value: 'wildcard', label: 'Pattern' },
]

export interface CarryFilter {
  pattern: string
  mode: MatchMode
  objType: 'All' | DbObjectType
}

export const EMPTY_CARRY: CarryFilter = { pattern: '', mode: 'contains', objType: 'All' }

export const carryActive = (f: CarryFilter) => f.pattern.trim() !== '' || f.objType !== 'All'

/** Apply a declared pattern + match mode to a single name. */
export function matchesName(name: string, pattern: string, mode: MatchMode): boolean {
  const p = pattern.trim()
  if (!p) return true
  const n = name.toLowerCase()
  const q = p.toLowerCase()
  switch (mode) {
    case 'startsWith':
      return n.startsWith(q)
    case 'exact':
      return n === q
    case 'isNot':
      return n !== q
    case 'notContains':
      return !n.includes(q)
    case 'wildcard': {
      const body = q
        .split('')
        // % and * both mean "any run"; ? is one char; _ (common in names) stays literal
        .map((c) =>
          c === '*' || c === '%' ? '.*' : c === '?' ? '.' : c.replace(/[.+^${}()|[\]\\]/g, '\\$&'),
        )
        .join('')
      try {
        return new RegExp(`^${body}$`).test(n)
      } catch {
        return false
      }
    }
    case 'contains':
    default:
      return n.includes(q)
  }
}

/** Does an object pass the full carry filter (name pattern + object type)? */
export const objectPassesCarry = (o: DbObject, f: CarryFilter) =>
  (f.objType === 'All' || o.type === f.objType) && matchesName(o.name, f.pattern, f.mode)

/** Human-readable summary of an active carry filter. */
export function describeCarry(f: CarryFilter): string {
  const typeBit = f.objType !== 'All' ? `${f.objType.toLowerCase()}s only` : ''
  const pat = f.pattern.trim()
  if (pat) {
    const mode = (MATCH_MODES.find((m) => m.value === f.mode)?.label ?? f.mode).toLowerCase()
    return `tables matching “${pat}” (${mode})${typeBit ? `, ${typeBit}` : ''}`
  }
  if (typeBit) return typeBit
  return 'all tables'
}

/* ---------------------------------------------------------------- Step 1 */
/* "Select databases and schemas" — a database → schema tree. Schemas carry
   typed objects so the carry-forward object-type filter has a target later. */

export interface DbSchema {
  name: string
  objects: DbObject[]
}

export interface DbNode {
  name: string
  schemas: DbSchema[]
}

export const DATABASES: DbNode[] = [
  {
    name: 'CUSTOMER_ANALYTICS',
    schemas: [
      { name: 'PUBLIC', objects: [t('CUSTOMERS'), t('SESSIONS'), t('EVENTS'), v('ACTIVE_CUSTOMERS')] },
      { name: 'STAGING', objects: [t('STG_CUSTOMERS'), t('STG_EVENTS')] },
      { name: 'MARTS', objects: [t('DIM_CUSTOMER'), t('FCT_SESSIONS'), v('V_CUSTOMER_360')] },
    ],
  },
  {
    name: 'FINANCE_REPORTING',
    schemas: [
      { name: 'PUBLIC', objects: [t('LEDGER'), t('INVOICES'), t('PAYMENTS'), v('V_AR_AGING')] },
      { name: 'FY2024', objects: [t('Q1_SUMMARY'), t('Q2_SUMMARY'), t('Q3_SUMMARY')] },
    ],
  },
  {
    name: 'HR_METRICS',
    schemas: [
      { name: 'PUBLIC', objects: [t('HEADCOUNT'), t('ATTRITION'), t('COMP_BANDS'), v('V_ORG_CHART')] },
    ],
  },
  {
    name: 'PRODUCT_INVENTORY',
    schemas: [
      { name: 'PUBLIC', objects: [t('SKUS'), t('WAREHOUSES'), t('STOCK_LEVELS'), v('V_LOW_STOCK')] },
      { name: 'ARCHIVE', objects: [t('STOCK_2022'), t('STOCK_2023')] },
    ],
  },
  {
    name: 'SALES_DATA',
    schemas: [
      { name: 'PUBLIC', objects: [t('OPPORTUNITIES'), t('ACCOUNTS'), t('QUOTAS'), v('V_PIPELINE')] },
      { name: 'RAW', objects: [t('SALESFORCE_SYNC'), t('HUBSPOT_SYNC')] },
    ],
  },
  {
    name: 'SUPPLY_CHAIN_MANAGEMENT',
    schemas: [
      { name: 'PUBLIC', objects: [t('SHIPMENTS'), t('SUPPLIERS'), t('ROUTES'), v('V_LATE_SHIPMENTS')] },
    ],
  },
  {
    name: 'WEB_TRAFFIC_LOGS',
    schemas: [
      { name: 'PUBLIC', objects: [t('PAGEVIEWS'), t('REFERRERS'), t('BOT_HITS')] },
      { name: 'DERIVED', objects: [t('DAILY_ROLLUP'), v('V_UTM_BREAKDOWN')] },
    ],
  },
]

/* ---------------------------------------------------------------- Step 2 */
/* "Select tables" tree (connection sidebar). Tables are typed so a carried
   object-type filter can narrow them. */

export interface SchemaNode {
  name: string
  tables: DbObject[]
}

export interface DatabaseNode {
  name: string
  schemas: SchemaNode[]
}

export const CONNECTION_NAME = 'Google Cloud SQL Server Connection 2024'

export const TABLE_TREE: DatabaseNode[] = [
  {
    name: 'FOREST',
    schemas: [
      { name: 'PUBLIC', tables: [t('TREES'), t('SPECIES'), t('PLOTS'), t('SURVEYS'), v('V_TREE_HEALTH')] },
      { name: 'CANOPY', tables: [t('HEIGHT_SCANS'), t('DENSITY')] },
    ],
  },
  {
    name: 'METRICS_EXPERIMENT',
    schemas: [
      { name: 'PUBLIC', tables: [t('EXPERIMENTS'), t('VARIANTS'), t('EXPOSURES'), t('RESULTS'), v('V_WINNERS')] },
    ],
  },
  {
    name: 'MIGRATION_TEST',
    schemas: [{ name: 'PUBLIC', tables: [t('SOURCE_ROWS'), t('TARGET_ROWS'), t('DIFF_LOG')] }],
  },
  {
    name: 'NEBULADEV',
    schemas: [
      { name: 'DEV', tables: [t('USERS'), t('ORGS'), t('FEATURE_FLAGS'), v('V_ACTIVE_USERS')] },
      { name: 'SANDBOX', tables: [t('SCRATCH_A'), t('SCRATCH_B')] },
    ],
  },
  {
    name: 'NPATH',
    schemas: [{ name: 'PUBLIC', tables: [t('JOURNEYS'), t('STEPS'), t('DROPOFFS')] }],
  },
  {
    name: 'RETAIL_APPAREL_TEST_WAREHOUSE',
    schemas: [
      { name: 'PUBLIC', tables: [t('ORDERS'), t('PRODUCTS'), t('RETURNS'), t('CUSTOMERS'), v('V_TOP_SELLERS')] },
      { name: 'STAGING', tables: [t('STG_ORDERS'), t('STG_PRODUCTS')] },
    ],
  },
]
