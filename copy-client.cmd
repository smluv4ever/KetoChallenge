if not exist "Sabio.Web\Client" mkdir Sabio.Web\Client
del /f /s /q Sabio.Web\Client\*.* > NUL
xcopy /q /e sabio.web.client\build\*.* Sabio.Web\Client
dir Sabio.Web\Client
