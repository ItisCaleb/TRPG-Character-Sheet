import openpyxl

filename = 'excle_file.xlsx'

locate_dict = {
    'name': (2, 5),
    'class': (9, 5),
    'age': (2, 8),
    'sex': (2, 7),
    'player': (2, 6),
    'residence': (9, 7),
    'birthplace': (9, 6),
    'Role_describtion': (3, 89),
    'hp': (22, 11),
    'san': (22, 13),
    'mp': (22, 12),
    'luk': (17, 14),
    'injury': (22, 14),
    'madness': (17, 16),
    'belief': (3, 92),
    'significant_people': (3, 95),
    'meaningful_location': (3, 98),
    'treasured_possession': (16, 98),
    'trait': (16, 89),
    'myth': (17, 15),
    'injuries': (16, 92),
    'mania': (16, 95),
    'description': (),
    'money': (19, 23),
    'weapon': (),
    'class-future': (),
    'str': (),
    'con': (),
    'dex': (),
    'app': (),
    'pow': (),
    'siz': (),
    'int': (),
    'edu': ()
}


def input_encounter():  # 第三類接觸
    pass


def input_magic():  # 魔法書與咒文
    pass


def input_equip():  # 身上裝備
    pass


excel_file = openpyxl.load_workbook(filename)

for sheet in excel_file._sheets:
    if sheet.title == '人物卡':
        character_sheet = sheet
        break
else:
    print('Unknown Format: "人物卡" sheet not found.')
    exit()

input_value_list = []
for i in character_sheet.rows:
    for j in i:

        if j.value is not None:
            print(j.value)
            if type(j.value) == int:
                input_value_list.append(j.value)

            if j.value == '1a':
                print(i, j)
                j.value = 1
                name = j

print(input_value_list)

input_value_list.sort()

print(input_value_list)

print(name.column, name.row)
