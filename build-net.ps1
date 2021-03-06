﻿<#

    Script targetted to get new developers up and running once IIS is installed

    1) Ensure web.config file is present
    2) Builds all projects in Sln

#>


$dotNetRoot = ".\dotnet\"
$dotNetApiRoot = $dotNetRoot + "Sabio.Web.Api\"

$webConfigName = "web.config"
$pathToWebConfig = $dotNetApiRoot + $webConfigName

$pathToDEVConfig = $dotNetApiRoot + "dev.web.config"


if( !(Test-Path -Path ($pathToWebConfig)) )
{
    Write-Host "Copying Web.Config for development"

    Copy-Item $pathToDEVConfig  -Destination $pathToWebConfig
    Write-Host "--------------------------------------------------------------"
    Write-Host "----------           Your web.config was just swapped out."
   
}

Write-Host "--------------------------------------------------------------`n"
Write-Host "Building dotnet project ..."

$apiSolution = $dotNetRoot + "Sabio.Starter.Core.sln"

dotnet build $apiSolution

Write-Host "dotnet Build complete.`n"


Write-Host "Happy Coding  😎 😎 😎 😎"

