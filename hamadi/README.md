# Database Restoration Files for mfumo3

This directory contains all necessary files to restore the HR Management System database to a target system with mfumo3 database.

## Contents

- `.env` - Environment configuration for mfumo3 database
- `package.json` - Node.js dependencies
- `schema.prisma` - Prisma database schema
- `prisma/` - Complete Prisma directory with migrations
- `database_backup.sql` - Full database backup from current system
- `README.md` - This instruction file

## Target System Requirements

- PostgreSQL installed and running
- Empty database named `mfumo3` created
- PostgreSQL user `postgres` with password `password`
- Node.js and npm installed

## Restoration Steps

### 1. Database Setup
```bash
# Ensure PostgreSQL is running
sudo systemctl start postgresql

# Create mfumo3 database if not exists
sudo -u postgres createdb mfumo3

# Set postgres user password
sudo -u postgres psql -c "ALTER USER postgres PASSWORD 'password';"
```

### 2. Restore Database
```bash
# Set password for restore
export PGPASSWORD="password"

# Restore the database
psql -h localhost -U postgres -d mfumo3 -f database_backup.sql

# Verify restoration
psql -h localhost -U postgres -d mfumo3 -c "\dt"
```

### 3. Application Setup
```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Verify database connection
npx prisma db push --accept-data-loss
```

## Verification Commands

### Check Database Content
```bash
# Connect to database
psql -h localhost -U postgres -d mfumo3

# Check table counts
SELECT COUNT(*) FROM "User";
SELECT COUNT(*) FROM "Employee";
SELECT COUNT(*) FROM "Institution";
```

### Test Prisma Connection
```bash
# Generate client
npx prisma generate

# View database
npx prisma studio
```

## Environment Variables

The `.env` file contains:
```
DATABASE_URL="postgresql://postgres:password@localhost:5432/mfumo3?schema=public"
```

Ensure this matches your target system configuration.

## Troubleshooting

### Connection Issues
- Verify PostgreSQL is running: `sudo systemctl status postgresql`
- Check database exists: `sudo -u postgres psql -l | grep mfumo3`
- Verify user permissions: `sudo -u postgres psql -c "\du"`

### Restore Issues
- Clear database before restore: `psql -h localhost -U postgres -d mfumo3 -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"`
- Check backup file integrity: `head -n 20 database_backup.sql`

### Prisma Issues
- Regenerate client: `npx prisma generate`
- Reset database: `npx prisma db push --force-reset`
- Check schema sync: `npx prisma db pull`

## File Sizes and Verification

Check that all files transferred correctly:
```bash
ls -la hamadi/
wc -l hamadi/database_backup.sql
head -5 hamadi/database_backup.sql
```

The backup should start with PostgreSQL comments and contain DROP/CREATE statements.