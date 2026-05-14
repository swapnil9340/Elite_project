-- Safe Companion India — Initial Database Schema
-- Run this on TiDB Cloud SQL Editor: https://tidbcloud.com/console → cluster → Chat2Query / SQL Editor
-- Or it will auto-create via app/lib/db.js on first API request.

-- =========================================================
-- TABLE 1: inquiries
-- Stores all booking/contact form submissions from /contact + city pages
-- =========================================================
CREATE TABLE IF NOT EXISTS inquiries (
  id                  BIGINT PRIMARY KEY AUTO_INCREMENT,
  name                VARCHAR(120) NOT NULL,
  age                 INT,
  phone               VARCHAR(20),
  email               VARCHAR(150),
  city                VARCHAR(80),
  service_preference  VARCHAR(120),
  booking_date        VARCHAR(40),
  budget_range        VARCHAR(60),
  details             TEXT,
  source_page         VARCHAR(255),
  ip_hash             VARCHAR(64),
  user_agent          VARCHAR(255),
  status              ENUM('new','contacted','booked','closed','spam') NOT NULL DEFAULT 'new',
  created_at          TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at          TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_status  (status),
  INDEX idx_city    (city),
  INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =========================================================
-- TABLE 2: job_applications
-- Stores submissions from /join/[role] apply forms (gigolo/playboy/callboy/escort)
-- =========================================================
CREATE TABLE IF NOT EXISTS job_applications (
  id            BIGINT PRIMARY KEY AUTO_INCREMENT,
  role          VARCHAR(60) NOT NULL,
  name          VARCHAR(120) NOT NULL,
  age           INT,
  phone         VARCHAR(20),
  email         VARCHAR(150),
  city          VARCHAR(80),
  height        VARCHAR(20),
  languages     VARCHAR(200),
  experience    VARCHAR(40),
  about         TEXT,
  source_page   VARCHAR(255),
  ip_hash       VARCHAR(64),
  user_agent    VARCHAR(255),
  status        ENUM('new','verifying','approved','rejected','onboarded') NOT NULL DEFAULT 'new',
  created_at    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_status  (status),
  INDEX idx_role    (role),
  INDEX idx_city    (city),
  INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =========================================================
-- TABLE 3: rate_limit
-- Anti-spam IP-hash-based rate limiting for form submissions
-- =========================================================
CREATE TABLE IF NOT EXISTS rate_limit (
  bucket       VARCHAR(80) PRIMARY KEY,
  count        INT NOT NULL DEFAULT 0,
  window_start TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
