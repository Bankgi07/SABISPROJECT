@echo off
chcp 65001 >nul
title Open Database in DB Browser for SQLite
echo กำลังเปิดฐานข้อมูลใน DB Browser for SQLite...

set "DB_PATH=%~dp0backend\database.sqlite"
set "APP_PATH=C:\Program Files (x86)\DB Browser for SQLite\DB Browser for SQLite.exe"

if exist "%APP_PATH%" (
    start "" "%APP_PATH%" "%DB_PATH%"
    echo เปิดสำเร็จแล้ว!
) else (
    echo ไม่พบโปรแกรม DB Browser for SQLite ในตำแหน่งเริ่มต้น
    echo กำลังเปิดโฟลเดอร์ที่เก็บไฟล์ฐานข้อมูลแทน...
    explorer.exe /select,"%DB_PATH%"
)
