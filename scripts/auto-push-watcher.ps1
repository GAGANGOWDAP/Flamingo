# Flamingo Auto-Push File System Watcher
$repoPath = "c:\Users\USER\Downloads\PitifulStrongShell\Flamingo"
Set-Location $repoPath

Write-Host "==================================================" -ForegroundColor Green
Write-Host "   Flamingo Git Auto-Push Watcher Active          " -ForegroundColor Green
Write-Host "   Monitoring: $repoPath                          " -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Green

$global:pendingSync = $false

$watcher = New-Object System.IO.FileSystemWatcher
$watcher.Path = $repoPath
$watcher.IncludeSubdirectories = $true
$watcher.EnableRaisingEvents = $true

$action = {
    $path = $Event.SourceEventArgs.FullPath
    if ($path -match '\\.git\\' -or $path -match '\\node_modules\\' -or $path -match '\\dist\\' -or $path -match '\\\.system_generated\\') {
        return
    }
    $global:pendingSync = $true
}

Register-ObjectEvent $watcher 'Changed' -Action $action | Out-Null
Register-ObjectEvent $watcher 'Created' -Action $action | Out-Null
Register-ObjectEvent $watcher 'Deleted' -Action $action | Out-Null
Register-ObjectEvent $watcher 'Renamed' -Action $action | Out-Null

while ($true) {
    Start-Sleep -Seconds 5
    if ($global:pendingSync) {
        # Small quiet window to allow multi-file saves to complete
        Start-Sleep -Seconds 3
        $global:pendingSync = $false
        
        $status = git status --porcelain
        if ($status) {
            $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
            Write-Host "[$(Get-Date -Format 'HH:mm:ss')] File save detected! Staging and committing..." -ForegroundColor Yellow
            git add .
            git commit -m "Auto-update site changes ($timestamp)"
            git push origin main
            Write-Host "[$(Get-Date -Format 'HH:mm:ss')] Successfully pushed to GitHub main!" -ForegroundColor Green
        }
    }
}
