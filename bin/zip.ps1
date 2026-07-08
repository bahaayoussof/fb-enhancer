Add-Type -AssemblyName System.IO.Compression.FileSystem
Add-Type -AssemblyName System.IO.Compression

$sourceDirectory = [System.IO.Path]::GetFullPath((Join-Path $PSScriptRoot "..\dist"))
$zipPath = [System.IO.Path]::GetFullPath((Join-Path $PSScriptRoot "..\fb-enhancer-v1.0.0.zip"))

# Remove existing zip if it exists
if (Test-Path $zipPath) {
    Remove-Item $zipPath -Force
}

Write-Host "Creating zip archive at $zipPath..."
$zipArchive = [System.IO.Compression.ZipFile]::Open($zipPath, [System.IO.Compression.ZipArchiveMode]::Create)

$files = Get-ChildItem -Path $sourceDirectory -Recurse | Where-Object { -not $_.PSIsContainer }

foreach ($file in $files) {
    # Calculate the relative path
    $relativePath = $file.FullName.Substring($sourceDirectory.Length + 1)
    
    # CRITICAL: Replace backslashes with forward slashes for Unix/Chrome Web Store compatibility!
    $zipEntryPath = $relativePath.Replace("\", "/")
    
    Write-Host "Adding entry: $zipEntryPath"
    
    # Create the entry and copy file contents
    $entry = $zipArchive.CreateEntry($zipEntryPath, [System.IO.Compression.CompressionLevel]::Optimal)
    $entryStream = $entry.Open()
    $fileStream = [System.IO.File]::OpenRead($file.FullName)
    $fileStream.CopyTo($entryStream)
    
    # Close streams
    $fileStream.Close()
    $entryStream.Close()
}

$zipArchive.Dispose()
Write-Host "Zip archive created successfully!"
