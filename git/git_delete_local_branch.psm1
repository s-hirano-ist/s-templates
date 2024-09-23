function Remove-GitBranchMerged {

    # 引数で指定されていなければカレントディレクトリを対象にする

    $dir = $args[0]
    if ($args.count -eq 0) {
        $dir = (Get-Location)
    }

    Write-Host ("target directory:" + $dir)

    Push-Location $dir

    git fetch --prune origin
    git branch --merged `
        | Select-String -NotMatch -Pattern "(\*|develop|master)" `
        | ForEach-Object{ git branch -d $_.ToString().Trim() }

    Pop-Location
}
