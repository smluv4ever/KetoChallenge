#Requires -RunAsAdministrator
clear
$scriptpath = $MyInvocation.MyCommand.Path
$dir = Split-Path $scriptpath
$nodePath = $dir + "\node";
$reactPath = $dir + "\react";
$dotnetPath = $dir + "\dotnet";

cd $dir
Write-host "Running Script out of $dir"


#----------------------------------
# React

if (Test-Path $reactPath) {
    
    $pathToDevEnv = $reactPath + "\.env.development"
    $pathToEnv = $reactPath + "\.env"


    Write-Host "Installing packages for react ...  `n"
    
    cd .\react
    yarn install
    Write-Host "Install complete"

    if( !(Test-Path -Path ($pathToDevEnv)) )
    {
        Write-Host "Copying .env for development"

        Copy-Item  $pathToEnv -Destination $pathToDevEnv
        
        Write-Host "New .env.development file create `n"
    }


    Write-Host "Building react..."
    yarn build
    Write-Host "`nReact Build A-OK. 👌 `n"

    cd ..\
}

#----------------------------------
# Node

if (Test-Path $nodePath) {

	Write-Host "Installing the latest typescript packages ..."
	npm install -g typescript@latest
	
    Write-Host "Installing select peer dependencies packages for node project ..."
    Write-Host "( You may get WARN messages. Those are OK. Look for Errors to determine if there is an issue )"
    cd .\node
    npm install babel-eslint -D --loglevel=error

    Write-Host "Installing all npm packages for node project ..."
    Write-Host "( You may get WARN messages. Those are OK. Look for Errors to determine if there is an issue )"
    npm install --loglevel=error

    Write-Host "Install complete`n"

    Write-Host "Compiling App... 🔨"

    $command = "npm "
    $args = " run babel-app --loglevel=error "

    Start-Process $command $args -PassThru -WindowStyle Normal 

    Start-Sleep -s 5
    Write-Host "`nChecking server integrity for node api ..."

    npm run spinup-die

    Write-Host "`nNode Server OK 👌 `n"
    
    cd ..\
}
#----------------------------------
# dotnet


if (Test-Path $dotnetPath) {

    & ($dir + "\build-net.ps1")

}


