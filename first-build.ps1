#Requires -RunAsAdministrator
clear

& ((Split-Path $MyInvocation.InvocationName) + "\build-all-v2.ps1")

& ((Split-Path $MyInvocation.InvocationName) + "\run-dev-sites.ps1")