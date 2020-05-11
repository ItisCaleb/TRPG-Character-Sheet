TRPG-Character-Sheet
===

A project for the TRPG player and GM who suffering from managing character sheets.

## Structure 

- Main Web
    - Groups
        - Group1
        - Group2
        - Group3
    - players
        - user1
            - info.txt
            - character_sheets
                - sheets1
                - sheets2
        - user2
        - user3
    - System
        - Dungeon and Dragon
        - Call of Cthulu
        - Sword World
        - ......
## Using

- Nodejs
- MongoDB
- MacOS
- Nginx


# Todo List

## FrontEnd
* 角色卡創建頁面(擲骰及自動換算)(目前只做COC7th跟DND5e)(COC完工)
* ~~角色卡管理頁面~~(完工)
* 404彩蛋
* 自訂背景
* 使用手冊
* 暗色介面
* ~~行動裝置排版~~(差不多完工)
* 將首頁完善(加入操作說明)
* 上方菜單重新設計，換到大螢幕就知道了
* Bug回報機制

## BackEnd
* 角色卡MongoDB schema
* ~~團務系統優化 (可進行管理操作)(等待角卡創建頁面及管理頁面完工)~~(已完工，等待介面優化)
* 角色卡創建系統(COC7th完成)
* 資料庫轉移(可選)(再觀察)


## Web Design
* 網頁Icon
* 主要風格(以後再說)
* 角色卡創建頁面重新排版

## Bug
~~* 管理員非預期登出時還是看的到管理員貼文選項~~
~~* 創建跑團群組會提示輸入帳號密碼~~

## Issue
~~* 團務介面，團務密碼裸露~~(現在只有GM看的到了)

## Hack Point
* Password backEnd doesn't check special symbol.
* Password frountEnd doesn't check space.
* Email backEnd doesn't check.
* DDOS/DOS not prevent.
* Password don't send with light text.
