param(
    [string]$HostAddress = "0.0.0.0",
    [int]$Port = 8000,
    [string]$AllowedHosts = "127.0.0.1,localhost",
    [string]$DjangoDevServer = "http://127.0.0.1:8000"
)

$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

$RepoRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$FrontendDir = Join-Path $RepoRoot "frontend-ice"
$BackendDir = Join-Path $RepoRoot "backend-django"
$BackendRequirements = Join-Path $BackendDir "requirements.app.txt"

if (-not (Test-Path $FrontendDir)) {
    throw "Frontend directory not found: $FrontendDir"
}

if (-not (Test-Path $BackendDir)) {
    throw "Backend directory not found: $BackendDir"
}

if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
    throw "npm was not found. Install Node.js and ensure npm is available in PATH."
}

if (-not (Get-Command uv -ErrorAction SilentlyContinue)) {
    throw "uv was not found. Install uv and ensure it is available in PATH."
}

if (-not (Test-Path $BackendRequirements)) {
    throw "Backend requirements file not found: $BackendRequirements"
}

Write-Host "[1/5] Installing frontend dependencies..." -ForegroundColor Cyan
Push-Location $FrontendDir
npm install

Write-Host "[2/5] Building Ice frontend..." -ForegroundColor Cyan
npm run build
Pop-Location

Write-Host "[3/5] Setting production environment variables..." -ForegroundColor Cyan
$env:DJANGO_DEBUG = "0"
$env:DJANGO_ALLOWED_HOSTS = $AllowedHosts
$env:SERVE_FRONTEND = "1"
$env:DJANGO_DEV_SERVER = $DjangoDevServer

Write-Host "[4/5] Running Django migrations and collectstatic..." -ForegroundColor Cyan
Push-Location $BackendDir
uv run --with-requirements requirements.app.txt python manage.py migrate --noinput
uv run --with-requirements requirements.app.txt python manage.py collectstatic --noinput

Write-Host "[5/5] Starting Django server in production mode..." -ForegroundColor Cyan
Write-Host "Server URL: http://$HostAddress`:$Port" -ForegroundColor Green
Write-Host "Frontend URL: http://$HostAddress`:$Port/app/" -ForegroundColor Green
uv run --with-requirements requirements.app.txt python manage.py runserver $HostAddress`:$Port
Pop-Location
