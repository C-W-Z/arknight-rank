import json

def skinID(id: str):
    return id.replace('#', '_').replace('@', '_')

with open('skin_table.json', 'r', encoding="utf-8") as file:
    data = file.read()
    data:dict[str, dict[str, dict]] = json.loads(data)

    charToSkin = {}

    for key, value in data['buildinEvolveMap'].items():
        if key.startswith('char_'):
            key = skinID(key)
            obj = {}
            # obj['char_id'] = key
            obj['e0'] = skinID(value['0'])
            if '1' in value:
                obj['e1'] = skinID(value['1'])
            else:
                obj['e1'] = ""
            if '2' in value:
                obj['e2'] = skinID(value['2'])
            else:
                obj['e2'] = ""
            obj['patch'] = []
            obj['other'] = []
            charToSkin[key] = obj

    print(len(charToSkin))

    for key, value in data['buildinPatchMap'].items():
        if key.startswith('char_'):
            key = skinID(key)
            for k, v in value.items():
                charToSkin[key]['patch'].append(skinID(v))

    groupToSkin = {}
    # objs = []
    map = {}

    for key, value in data['charSkins'].items():
        if key.startswith('char_'):
            obj = {}
            skin_id = skinID(value['skinId'])
            # obj['skin_id'] = skin_id
            obj['char_id'] = value['charId']
            obj['avatar_id'] = value['avatarId'].replace('#', '_')
            obj['portrait_id'] = value['portraitId'].replace('#', '_')
            displaySkin = value['displaySkin']
            obj['name'] = displaySkin['skinName']
            # obj['description'] = displaySkin['description']
            obj['drawers'] = displaySkin['drawerList']
            if obj['drawers'] == None:
                obj['drawers'] = []
            obj['designers'] = displaySkin['designerList']
            if obj['designers'] == None:
                obj['designers'] = []
            obj['group_id'] = displaySkin['skinGroupId']
            obj['group_name'] = displaySkin['skinGroupName']
            # objs.append(obj)
            map[skin_id] = obj

            if displaySkin['skinGroupId'] in groupToSkin:
                groupToSkin[displaySkin['skinGroupId']].append(skin_id)
            else:
                groupToSkin[displaySkin['skinGroupId']] = []
                groupToSkin[displaySkin['skinGroupId']].append(skin_id)

            if (skin_id != charToSkin[obj['char_id']]['e0'] and
                skin_id != charToSkin[obj['char_id']]['e1'] and
                skin_id != charToSkin[obj['char_id']]['e2'] and
                skin_id not in charToSkin[obj['char_id']]['patch']):
                charToSkin[obj['char_id']]['other'].append(skin_id)

    # print(len(objs))
    print(len(map))

    with open('skin.json', 'w', encoding="utf-8") as out:
        js = json.dumps(map, ensure_ascii = False).replace('null', '""')
        out.write(js)

    with open('char_skin.json', 'w', encoding="utf-8") as out:
        out.write(json.dumps(charToSkin, ensure_ascii = False))

    with open('skin.css', 'w', encoding="utf-8") as out:
        for k, v in map.items():
            out.write(".skin." + k + " {\nbackground-image: url('../assets/skin/" + k + ".webp');\n}\n")
        for k, v in map.items():
            out.write(".portrait." + v['portrait_id'] + " {\nbackground-image: url('../assets/portrait/" + v['portrait_id'] + ".webp');\n}\n")

    objs = []

    print(len(data['brandList']))

    for key, value in data['brandList'].items():
        obj = {}
        obj['brand_id'] = value['brandId']
        obj['name'] = value['brandName']
        obj['name2'] = value['brandCapitalName']
        obj['description'] = value['description']
        obj['skins'] = []
        for g in value['groupList']:
            obj['skins'] += (groupToSkin[g['skinGroupId']])
        objs.append(obj)

    with open('brand.json', 'w', encoding="utf-8") as out:
        out.write(json.dumps(objs, ensure_ascii = False))
