# PowerShell wrapper to run the Node image conversion script
Param(
  [int]$Quality = 80
)

$repo = Split-Path -Parent $MyInvocation.MyCommand.Definition
$node = Get-Command node -ErrorAction SilentlyContinue
if (-not $node) {
  Write-Error "Node.js is not installed or not in PATH. Please install Node.js from https://nodejs.org/"
  exit 1
}

Push-Location $repo
if (-not (Test-Path node_modules)) {
  Write-Host "Installing dependencies (sharp). This may take a few moments..."
  npm install
}

node .\convert-images.js --quality=$Quality
Pop-Location
