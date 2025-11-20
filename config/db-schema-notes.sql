-- Database Schema Definitions for Insight Terminal
-- These are SQL definitions only - not executed here
-- Apply these migrations to your Supabase project

-- ============================================================================
-- INDICATORS TABLE
-- ============================================================================
-- Stores macroeconomic indicators (e.g., GDP, inflation, unemployment)
CREATE TABLE IF NOT EXISTS indicators (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  category TEXT,
  source TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- INDICATOR_VALUES TABLE
-- ============================================================================
-- Stores time-series values for indicators
CREATE TABLE IF NOT EXISTS indicator_values (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  indicator_id UUID NOT NULL REFERENCES indicators(id) ON DELETE CASCADE,
  timestamp DATE NOT NULL,
  value NUMERIC NOT NULL,
  UNIQUE(indicator_id, timestamp)
);

-- ============================================================================
-- COMPANIES TABLE
-- ============================================================================
-- Stores company information
CREATE TABLE IF NOT EXISTS companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticker TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  sector TEXT,
  industry TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- FILINGS TABLE
-- ============================================================================
-- Stores SEC filing information (10-K, 10-Q, etc.)
CREATE TABLE IF NOT EXISTS filings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  form_type TEXT NOT NULL,
  cik TEXT NOT NULL,
  period_end_date DATE NOT NULL,
  filed_at DATE NOT NULL,
  source_url TEXT,
  raw_text_path TEXT,
  parsed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- FILING_METRICS TABLE
-- ============================================================================
-- Stores extracted metrics from filings
CREATE TABLE IF NOT EXISTS filing_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  filing_id UUID NOT NULL REFERENCES filings(id) ON DELETE CASCADE,
  metric_name TEXT NOT NULL,
  value NUMERIC NOT NULL,
  unit TEXT
);

-- ============================================================================
-- RATIO_DEFINITIONS TABLE
-- ============================================================================
-- Stores definitions for financial ratios
CREATE TABLE IF NOT EXISTS ratio_definitions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT
);

-- ============================================================================
-- FILING_RATIOS TABLE
-- ============================================================================
-- Stores calculated ratios for filings
CREATE TABLE IF NOT EXISTS filing_ratios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  filing_id UUID NOT NULL REFERENCES filings(id) ON DELETE CASCADE,
  ratio_code TEXT NOT NULL,
  value NUMERIC NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  FOREIGN KEY (ratio_code) REFERENCES ratio_definitions(code)
);

-- ============================================================================
-- AI_ANALYSES TABLE
-- ============================================================================
-- Stores AI-generated analyses
CREATE TABLE IF NOT EXISTS ai_analyses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  scope TEXT,
  input_context JSONB,
  analysis_text TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- INDEXES (Recommended for performance)
-- ============================================================================

-- Indicator values lookups
CREATE INDEX IF NOT EXISTS idx_indicator_values_indicator_id ON indicator_values(indicator_id);
CREATE INDEX IF NOT EXISTS idx_indicator_values_timestamp ON indicator_values(timestamp);

-- Filing lookups
CREATE INDEX IF NOT EXISTS idx_filings_company_id ON filings(company_id);
CREATE INDEX IF NOT EXISTS idx_filings_period_end_date ON filings(period_end_date);
CREATE INDEX IF NOT EXISTS idx_filings_form_type ON filings(form_type);

-- Filing metrics and ratios
CREATE INDEX IF NOT EXISTS idx_filing_metrics_filing_id ON filing_metrics(filing_id);
CREATE INDEX IF NOT EXISTS idx_filing_ratios_filing_id ON filing_ratios(filing_id);
CREATE INDEX IF NOT EXISTS idx_filing_ratios_ratio_code ON filing_ratios(ratio_code);

-- AI analyses
CREATE INDEX IF NOT EXISTS idx_ai_analyses_user_id ON ai_analyses(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_analyses_scope ON ai_analyses(scope);

