import json

with open('character_table.json', 'r', encoding="utf-8") as file:
    data = file.read().replace('null', '""')
    data:dict[str, dict[str, dict]] = json.loads(data)

    objs = []

    for key, value in data.items():
        if key.startswith('char_'):
            obj = {}
            obj['char_id'] = key
            obj['name'] = value['name']
            obj['name2'] = value['appellation']
            obj['rarity'] = value['rarity']
            # obj['displayNum'] = value['displayNumber']
            obj['prof'] = value['profession']
            obj['sub_prof'] = value['subProfessionId']
            obj['position'] = value['position']
            obj['tags'] = value['tagList']
            obj['nation'] = value['nationId']
            obj['group'] = value['groupId']
            obj['team'] = value['teamId']
            objs.append(obj)

    print(len(objs))

    with open('char.json', 'w', encoding="utf-8") as out:
        out.write(json.dumps(objs, ensure_ascii = False))
